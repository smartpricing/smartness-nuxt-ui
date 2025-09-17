export const useConstants = () => {
	const colors = ["primary", "secondary", "info", "success", "warning", "error", "burgundy", "lemon", "support", "neutral", "offblack", "ai", "learning"] as const;
	const variants = ["solid", "soft", "subtle", "outline", "ghost", "link"] as const;
	const sizes = ["xl", "lg", "md", "sm", "xs"] as const;

	return {
		colors,
		variants,
		sizes
	};
};
