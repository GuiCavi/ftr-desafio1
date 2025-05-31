import { type VariantProps, cva } from "class-variance-authority";
import { CustomIcon, type IconProps } from "./shared/CustomIcon";

const button = cva(
	"flex items-center gap-1.5 rounded-lg font-semibold border-[1px] border-transparent px-5",
	{
		variants: {
			variant: {
				primary: "bg-base text-white text-md h-12",
				secondary: "bg-grayscale-200 text-grayscale-500 text-sm h-12",
				icon: "bg-grayscale-200 text-grayscale-600 size-8 inline-flex items-center justify-center",
			},
			disabled: {
				false: null,
				true: "opacity-50 cursor-not-allowed",
			},
			full: {
				false: null,
				true: "w-full",
			},
			size: {
				small: "h-8! p-2!",
			},
		},
		compoundVariants: [
			{
				variant: "primary",
				disabled: false,
				className: "hover:bg-dark",
			},
			{
				variant: "secondary",
				disabled: false,
				className: "hover:border-base",
			},
			{
				variant: "icon",
				disabled: false,
				className: "hover:border-base",
			},
			{
				variant: "icon",
				className: "px-0! size-8!",
			},
		],
		defaultVariants: {
			variant: "primary",
			disabled: false,
		},
	},
);

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
		VariantProps<typeof button> {}

function Button({
	children,
	className,
	variant,
	disabled,
	size,
	full,
	...props
}: ButtonProps) {
	return (
		<button
			disabled={disabled ?? false}
			{...props}
			className={button({ variant, disabled, className, full, size })}
		>
			{children}
		</button>
	);
}

Button.Icon = ({ ...props }: Omit<IconProps, "size">) => {
	return <CustomIcon {...props} size={16} />;
};

export { Button };
