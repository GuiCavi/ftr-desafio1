import { isAxiosError } from "axios";
import { enableMapSet } from "immer";
import { toast } from "sonner";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { deleteShortUrl, getShortUrls, saveShortUrl } from "../http/urls";

export type ShortLink = {
	id: string;
	url: string;
	shortUrl: string;
	accessCount: number;
	createdAt: string;
};

export type InputLink = {
	url: string;
	shortUrl: string;
};

type LinksState = {
	links: Map<string, ShortLink>;
	getLinks: () => void;
	addLink: (link: InputLink) => void;
	deleteLink: (id: ShortLink["id"]) => void;
};

enableMapSet();

export const useLinks = create<LinksState, [["zustand/immer", never]]>(
	immer((set) => {
		async function addLink(link: InputLink) {
			try {
				const response = await saveShortUrl(link);

				set((state) => {
					state.links.set(response.id, response);
				});
			} catch (error) {
				if (isAxiosError(error)) {
					if (error?.response?.status === 409) {
						toast.error("Erro no cadastro", {
							description: "Essa URL encurtada já está presente",
						});
					}
				} else {
					toast.error("Erro desconhecido", {
						description: "Tente novamente mais tarde",
					});
				}
			}
		}

		async function getLinks() {
			try {
				const response = await getShortUrls();

				for (const link of response) {
					set((state) => {
						state.links.set(link.id, link);
					});
				}
			} catch (error) {
				toast.error("Erro desconhecido", {
					description: "Tente novamente mais tarde",
				});
			}
		}

		async function deleteLink(id: ShortLink["id"]) {
			try {
				const isOk = await deleteShortUrl(id);

				if (isOk) {
					set((state) => {
						state.links.delete(id);
					});
				} else {
					toast.error("Falha na remoção", {
						description: "Não foi possível remover essa URL",
					});
				}
			} catch (error) {
				console.log("🚀 ~ deleteLink ~ error:", error);
				if (isAxiosError(error)) {
					if (error?.response?.status === 404) {
						toast.error("Erro no cadastro", {
							description: "Essa URL encurtada já está presente",
						});
					}
				} else {
					toast.error("Erro desconhecido", {
						description: "Tente novamente mais tarde",
					});
				}
			}
		}

		return {
			links: new Map(),
			addLink,
			getLinks,
			deleteLink,
		};
	}),
);
