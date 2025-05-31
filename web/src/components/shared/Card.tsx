import { type VariantProps, cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";

const card = cva(
	"flex flex-col gap-6 items-start p-6 w-full bg-grayscale-100 rounded-lg",
);

export interface CardContainerProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
		VariantProps<typeof card> {}

function Container({ className, children }: CardContainerProps) {
	return <div className={card({ className })}>{children}</div>;
}

type CardHeaderProps = PropsWithChildren;

function Header({ children }: CardHeaderProps) {
	return <header className="text-lg font-bold">{children}</header>;
}

export default { Container, Header };
