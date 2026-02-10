import type { CalendarDate } from "@internationalized/date";
import type { DataCalendarItem, PositionedSegment, WeekRow } from "./types";

/**
 * Parse an ISO date string "YYYY-MM-DD" into a numeric value for comparison.
 * Returns the number of days since epoch (approx) for fast comparison.
 */
function dateToNumber(dateStr: string): number {
	const parts = dateStr.split("-").map(Number);
	const y = parts[0] ?? 0;
	const m = parts[1] ?? 0;
	const d = parts[2] ?? 0;
	// Simple numeric representation for ordering (not actual epoch days, just for comparison)
	return y * 10000 + m * 100 + d;
}

/**
 * Convert a CalendarDate to an ISO string "YYYY-MM-DD"
 */
function calendarDateToISO(date: CalendarDate): string {
	return date.toString();
}

/**
 * Get the effective end date of an item (defaults to fromDate if toDate is omitted)
 */
function getEffectiveToDate(item: DataCalendarItem): string {
	return item.toDate ?? item.fromDate;
}

/**
 * Compute the number of days between two ISO date strings (inclusive).
 * e.g. "2025-01-05" to "2025-01-07" = 3
 */
function daySpan(fromDate: string, toDate: string): number {
	const from = new Date(fromDate);
	const to = new Date(toDate);
	return Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

interface UnpositionedSegment {
	item: DataCalendarItem
	startCol: number
	spanCols: number
	isContinuation: boolean
	continuesAfter: boolean
	/** Total event duration in days (for sorting priority) */
	totalDuration: number
}

/**
 * Compute positioned event segments for an array of week rows.
 *
 * The algorithm:
 * 1. For each event, determine which week rows it intersects
 * 2. Create segments clipped to each row's boundaries
 * 3. Sort segments: multi-day events first (longer = higher priority), then by start column
 * 4. Greedy lane assignment: place each segment in the lowest available lane
 */
export function computeEventLayout(
	items: DataCalendarItem[],
	weekRows: { days: { date: CalendarDate, isOtherMonth: boolean }[] }[]
): WeekRow[] {
	// Pre-compute week row date ranges as ISO strings for fast comparison
	const rowRanges = weekRows.map((row) => {
		const firstDayEntry = row.days[0];
		const lastDayEntry = row.days[row.days.length - 1];
		if (!firstDayEntry || !lastDayEntry) {
			return { firstDay: "", lastDay: "", firstNum: 0, lastNum: 0 };
		}
		const firstDay = calendarDateToISO(firstDayEntry.date);
		const lastDay = calendarDateToISO(lastDayEntry.date);
		return { firstDay, lastDay, firstNum: dateToNumber(firstDay), lastNum: dateToNumber(lastDay) };
	});

	// Build unpositioned segments for each row
	const rowSegments: UnpositionedSegment[][] = weekRows.map(() => []);

	for (const item of items) {
		const itemFrom = item.fromDate;
		const itemTo = getEffectiveToDate(item);
		const itemFromNum = dateToNumber(itemFrom);
		const itemToNum = dateToNumber(itemTo);
		const totalDuration = daySpan(itemFrom, itemTo);

		// Skip invalid items
		if (itemToNum < itemFromNum) continue;

		for (let rowIdx = 0; rowIdx < rowRanges.length; rowIdx++) {
			const range = rowRanges[rowIdx];
			if (!range) continue;

			// Check if event intersects this row
			if (itemFromNum > range.lastNum || itemToNum < range.firstNum) continue;

			// Clip to row boundaries
			const segStartISO = itemFromNum >= range.firstNum ? itemFrom : range.firstDay;
			const segEndISO = itemToNum <= range.lastNum ? itemTo : range.lastDay;

			// Compute column indices within the row
			const rowDays = weekRows[rowIdx]?.days;
			if (!rowDays) continue;

			const startCol = findColumnIndex(rowDays, segStartISO);
			const endCol = findColumnIndex(rowDays, segEndISO);

			if (startCol === -1 || endCol === -1) continue;

			const spanCols = endCol - startCol + 1;
			const isContinuation = itemFromNum < range.firstNum;
			const continuesAfter = itemToNum > range.lastNum;

			const rowSegs = rowSegments[rowIdx];
			if (rowSegs) {
				rowSegs.push({
					item,
					startCol,
					spanCols,
					isContinuation,
					continuesAfter,
					totalDuration
				});
			}
		}
	}

	// Assign lanes for each row
	return weekRows.map((row, rowIdx) => {
		const segments = rowSegments[rowIdx] ?? [];

		// Sort: multi-day events first (longer spans prioritized), then by start column
		segments.sort((a, b) => {
			// Multi-day events before single-day
			const aMulti = a.totalDuration > 1 ? 0 : 1;
			const bMulti = b.totalDuration > 1 ? 0 : 1;
			if (aMulti !== bMulti) return aMulti - bMulti;

			// Longer total duration first
			if (a.totalDuration !== b.totalDuration) return b.totalDuration - a.totalDuration;

			// Earlier start column first
			if (a.startCol !== b.startCol) return a.startCol - b.startCol;

			// Wider span first
			return b.spanCols - a.spanCols;
		});

		// Greedy lane assignment
		// lanes[lane] = array of occupied column ranges [startCol, endCol]
		const lanes: [number, number][][] = [];

		const positioned: PositionedSegment[] = segments.map((seg) => {
			const segEnd = seg.startCol + seg.spanCols - 1;

			// Find the first lane where this segment fits
			let assignedLane = -1;
			for (let lane = 0; lane < lanes.length; lane++) {
				const occupied = lanes[lane];
				if (!occupied) continue;
				const hasCollision = occupied.some(
					([occStart, occEnd]) => seg.startCol <= occEnd && segEnd >= occStart
				);
				if (!hasCollision) {
					assignedLane = lane;
					break;
				}
			}

			// If no lane found, create a new one
			if (assignedLane === -1) {
				assignedLane = lanes.length;
				lanes.push([]);
			}

			lanes[assignedLane]!.push([seg.startCol, segEnd]);

			return {
				item: seg.item,
				startCol: seg.startCol,
				spanCols: seg.spanCols,
				lane: assignedLane,
				isContinuation: seg.isContinuation,
				continuesAfter: seg.continuesAfter
			};
		});

		return {
			days: row.days,
			segments: positioned,
			laneCount: lanes.length
		};
	});
}

/**
 * Find the column index (0-based) of a date within a week row's days array.
 */
function findColumnIndex(
	days: { date: CalendarDate, isOtherMonth: boolean }[],
	isoDate: string
): number {
	return days.findIndex((day) => calendarDateToISO(day.date) === isoDate);
}

/**
 * Compute how many events overflow per cell column in a week row,
 * given a maxVisibleItems (lanes) limit.
 *
 * Returns an array of 7 numbers, one per column, indicating how many
 * items are hidden (lane >= maxVisibleItems) in that column.
 */
export function computeOverflowPerColumn(
	segments: PositionedSegment[],
	maxVisibleItems: number,
	columnCount: number = 7
): number[] {
	// Count total items per column across all lanes
	const totalPerCol = Array.from<number>({ length: columnCount }).fill(0);
	const visiblePerCol = Array.from<number>({ length: columnCount }).fill(0);

	for (const seg of segments) {
		for (let col = seg.startCol; col < seg.startCol + seg.spanCols; col++) {
			if (col >= 0 && col < columnCount) {
				totalPerCol[col] = (totalPerCol[col] ?? 0) + 1;
				if (seg.lane < maxVisibleItems) {
					visiblePerCol[col] = (visiblePerCol[col] ?? 0) + 1;
				}
			}
		}
	}

	return totalPerCol.map((total, col) => Math.max(0, total - (visiblePerCol[col] ?? 0)));
}
