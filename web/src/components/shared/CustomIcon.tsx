import { DynamicIcon } from "lucide-react/dynamic";
import type { ComponentProps } from "react";

export type IconProps = ComponentProps<typeof DynamicIcon>;

export function CustomIcon({ name, size = 16, color }: IconProps) {
	return <DynamicIcon name={name} size={size} color={color} />;
}
