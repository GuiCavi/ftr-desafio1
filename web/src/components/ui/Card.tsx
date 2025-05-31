import { type VariantProps, cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";

const card = cva(
	"flex flex-col gap-6 items-start p-6 w-full bg-grayscale-100 rounded-lg",
);

export interface CardContainerProps
	extends Pick<React.HTMLAttributes<HTMLDivElement>, "className" | "children">,
		VariantProps<typeof card> {}

function Container({ className, children }: CardContainerProps) {
	return <div className={card({ className })}>{children}</div>;
}

type CardHeaderProps = PropsWithChildren;

function Header({ children }: CardHeaderProps) {
	return (
		<header className="w-full text-lg font-bold flex items-center justify-between">
			{children}
		</header>
	);
}

export default { Container, Header };
