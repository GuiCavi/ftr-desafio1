import { DynamicIcon } from "lucide-react/dynamic";
import type { CSSProperties, ComponentProps } from "react";

export type IconProps = ComponentProps<typeof DynamicIcon> & {
	className: CSSProperties;
};

export function CustomIcon({ name, size = 16, color, className }: IconProps) {
	return (
		<DynamicIcon name={name} size={size} color={color} className={className} />
	);
}
