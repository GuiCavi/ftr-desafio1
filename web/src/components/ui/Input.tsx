import { type VariantProps, cva } from "class-variance-authority";
import { CustomIcon } from "../shared/CustomIcon";
import Label, { label as rawLabel } from "./Label";

/**************************************************************************
 * @region Input
 */
const input = cva(
	[
		"flex flex-row gap-2 justify-center items-center py-0 px-4 h-12 border-grayscale-300 border-1 rounded-lg outline-0",
		"text-md text-shadow-gray-600",
		"placeholder:text-md placeholder:flex placeholder:items-center placeholder:text-grayscale-400",
		"focus:border-base focus:border-[1.5px] active:border-base active:border-[1.5px] focus:caret-base",
	],
	{
		variants: {
			variant: {
				danger: "border-danger! caret-danger!",
			},
		},
	},
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled">,
		VariantProps<typeof input> {}

function Input({ className, variant, ...props }: InputProps) {
	return (
		<input
			{...props}
			className={input({ className, variant })}
			data-variant={variant}
		/>
	);
}

/**************************************************************************
 * @region Container
 */
const container = cva("flex flex-col gap-2 group");

export interface ContainerProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof container> {}

function Container({ className, children }: ContainerProps) {
	return <div className={container({ className })}>{children}</div>;
}

Input.Container = Container;

/**************************************************************************
 * @region Label
 */
const label = cva([rawLabel(), "group-has-[input:focus]:text-base"], {
	variants: {
		variant: {
			danger: "text-danger!",
		},
	},
});

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement>,
		VariantProps<typeof label> {}

Input.Label = ({ className, variant, ...props }: LabelProps) => {
	return <Label {...props} className={label({ className, variant })} />;
};

/**************************************************************************
 * @region ErrorMessage
 */
const errorMessage = cva(["text-sm flex items-center text-grayscale-500"]);

export interface ErrorMessageProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof errorMessage> {}

Input.ErrorMessage = ({ className, ...props }: ErrorMessageProps) => {
	return (
		<div className="flex gap-2 items-center">
			<CustomIcon name="triangle-alert" className="text-danger" />
			<span {...props} className={errorMessage({ className })} />
		</div>
	);
};

export { Input };
