import { useQuery } from "@tanstack/react-query";
import { Button } from "./components/Button";
import { ListLinks } from "./components/ListLinks";
import { LoadingLinks } from "./components/LoadingLinks";
import { LogoIcon } from "./components/shared/LogoIcon";
import Card from "./components/ui/Card";
import { Input } from "./components/ui/Input";
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

					<form
						action={handleSaveShortUrl}
						className="w-full flex flex-col gap-6"
					>
						<div className="flex flex-col gap-4">
							<Input.Container>
								<Input.Label htmlFor="url">Link original</Input.Label>
								<Input type="url" name="url" placeholder="www.exemplo.com.br" />
							</Input.Container>

							<Input.Container>
								<Input.Label htmlFor="shortUrl">Link encurtado</Input.Label>
								<Input type="text" name="shortUrl" placeholder="brev.ly/" />
							</Input.Container>
						</div>

						<Button full>Salvar link</Button>
					</form>
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
