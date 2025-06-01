import { Button } from "../Button";
import { Input } from "../ui/Input";

interface NewLinkFormProps {
	onSubmit: (formData: FormData) => void;
}

export function NewLinkForm({ onSubmit }: NewLinkFormProps) {
	return (
		<form
			action={onSubmit}
			className="w-full flex flex-col gap-6"
			onChange={(o) => console.log(o)}
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
	);
}
