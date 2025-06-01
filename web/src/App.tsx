import { useQuery } from "@tanstack/react-query";
import { Button } from "./components/Button";
import { ListLinks } from "./components/ListLinks";
import { LoadingLinks } from "./components/LoadingLinks";
import { NewLinkForm } from "./components/forms/NewLinkForm";
import { LogoIcon } from "./components/shared/LogoIcon";
import Card from "./components/ui/Card";
import { type InputLink, useLinks } from "./store/links";

export function App() {
	const { addLink, getLinks } = useLinks();
	const { isLoading } = useQuery({
		queryKey: ["links"],
		queryFn: () => getLinks(),
	});

	const handleSaveShortUrl = (formData: FormData) => {
		const shortLink = Object.fromEntries(formData.entries()) as InputLink;

		addLink(shortLink);
	};

	return (
		<div className="w-full max-w-[980px] mx-auto px-3 pt-8">
			<header className="flex items-center justify-center mb-6">
				<LogoIcon />
			</header>
			<main className="flex flex-col gap-5 md:flex-row">
				<Card.Container className="md:max-w-[380px]">
					<Card.Header>Novo link</Card.Header>
					<NewLinkForm onSubmit={handleSaveShortUrl} />
				</Card.Container>

				<Card.Container className="md:max-w-[580px] overflow-hidden relative">
					{isLoading && <LoadingLinks />}

					<Card.Header>
						Meus links
						<Button disabled variant="secondary" size="small">
							<Button.Icon name="download" />
							Baixar CSV
						</Button>
					</Card.Header>

					<ListLinks />
				</Card.Container>
			</main>
		</div>
	);
}
