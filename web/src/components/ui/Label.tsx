import { type VariantProps, cva } from "class-variance-authority";

export const label = cva("font-normal text-xs uppercase text-grayscale-500");

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement>,
		VariantProps<typeof label> {}

export default function Label({
	children,
	htmlFor,
	className,
	...props
}: LabelProps) {
	return (
		<label htmlFor={htmlFor} {...props} className={label({ className })}>
			{children}
		</label>
	);
}
