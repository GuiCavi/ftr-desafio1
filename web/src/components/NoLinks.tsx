import { CustomIcon } from "./shared/CustomIcon";

export function NoLinks() {
	return (
		<div className="border-t-1 border-t-grayscale-200 w-full flex justify-center items-center pt-8 pb-6">
			<div className="flex flex-col gap-3 items-center justify-center">
				<CustomIcon name="link" size={32} className="text-grayscale-400" />
				<span className="uppercase text-xs text-gray-500">
					ainda não existem links cadastrados
				</span>
			</div>
		</div>
	);
}
