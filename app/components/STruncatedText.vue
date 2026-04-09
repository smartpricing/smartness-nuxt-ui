<template>
	<UTooltip
		:disabled="!isTextEllipsed"
		:text="tooltipText ?? text"
		:ui="{
			content: 'max-w-[300px] h-auto py-2',
			text: 'whitespace-normal',
		}"
		:content="{ align: 'center', side: 'top' }"
		:delay-duration="0"
		disable-hoverable-content
	>
		<p
			ref="textReference"
			class="overflow-hidden"
			:style="computedStyle"
			:class="classes"
			@mouseenter="checkTruncation"
		>
			{{ text }}
		</p>
	</UTooltip>
</template>

<script setup lang="ts">
	import { layout, prepare } from "@chenglou/pretext";

	const props = withDefaults(
		defineProps<{
			text: string
			classes?: string
			lines?: number
			tooltipText?: string
		}>(),
		{
			lines: 1
		}
	);
	const { text, tooltipText, lines, classes } = toRefs(props);

	const computedStyle = computed(() => {
		const baseClasses = ["overflow: hidden;"];

		if (lines.value === 1) {
			baseClasses.push(...["text-overflow: ellipsis;", "white-space: nowrap"]);
		} else {
			baseClasses.push(
				...[
					"display: -webkit-box;",
					"-webkit-box-orient: vertical;",
					`-webkit-line-clamp: ${lines.value};`
				]
			);
		}

		return baseClasses.join(" ");
	});

	const textReference = ref<HTMLElement>();
	const isTextEllipsed = ref(false);

	let cachedPrepared: ReturnType<typeof prepare> | null = null;
	let cachedText = "";
	let cachedFont = "";

	function getElementFont(element: HTMLElement): string {
		const style = getComputedStyle(element);
		return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
	}

	function getElementLineHeight(element: HTMLElement): number {
		const style = getComputedStyle(element);
		const lh = style.lineHeight;
		if (lh === "normal")
			return Number.parseFloat(style.fontSize) * 1.2;
		return Number.parseFloat(lh);
	}

	function checkTruncation() {
		if (!textReference.value) {
			isTextEllipsed.value = false;
			return;
		}

		const element = textReference.value;
		const font = getElementFont(element);
		const currentText = text.value;

		if (cachedText !== currentText || cachedFont !== font) {
			cachedPrepared = prepare(currentText, font);
			cachedText = currentText;
			cachedFont = font;
		}

		const maxWidth = element.clientWidth;
		const lineHeight = getElementLineHeight(element);
		const { lineCount } = layout(cachedPrepared!, maxWidth, lineHeight);

		isTextEllipsed.value = lineCount > lines.value;
	}

	defineExpose({ isTextEllipsed });
</script>
