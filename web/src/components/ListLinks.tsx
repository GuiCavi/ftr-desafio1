import { useLinks } from "../store/links";
import { Button } from "./Button";
import { NoLinks } from "./NoLinks";

export function ListLinks() {
	const links = useLinks((store) => store.links);
	const deleteLink = useLinks((store) => store.deleteLink);

	if (links.size === 0) return <NoLinks />;

	return (
		<div className="border-t-1 border-t-grayscale-200 w-full flex flex-col">
			{Array.from(links.entries()).map(([id, link]) => (
				<div
					className="flex flex-row gap-4 items-center not-last:border-b-1 border-b-grayscale-200 py-4"
					key={id}
				>
					<div className="flex flex-col gap-1 flex-1">
						<a
							href={`http://localhost:3333/${link.shortUrl}`}
							target="_blank"
							rel="noreferrer noopener"
							className="text-md font-semibold text-base"
						>
							brev.ly/{link.shortUrl}
						</a>
						<span className="text-sm text-gray-500">{link.url}</span>
					</div>
					<span className="text-sm text-gray-500">
						{link.accessCount} acessos
					</span>
					<div className="flex flex-row gap-2">
						<Button variant="icon">
							<Button.Icon name="copy" />
						</Button>
						<Button variant="icon" onClick={() => deleteLink(id)}>
							<Button.Icon name="trash" />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
