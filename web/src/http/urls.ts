import axios from "axios";
import type { InputLink, ShortLink } from "../store/links";

type SaveShortUrlParams = {
	url: InputLink["url"];
	shortUrl: InputLink["shortUrl"];
};

const saveShortUrlOptions = {
	method: "POST",
	url: "http://localhost:3333/api/urls/",
	headers: { "Content-Type": "application/json" },
};

const getShortUrlsOptions = {
	method: "GET",
	url: "http://localhost:3333/api/urls/",
	headers: { "Content-Type": "application/json" },
};

const deleteShortUrlsOptions = (id: ShortLink["id"]) => ({
	method: "DELETE",
	url: `http://localhost:3333/api/urls/${id}`,
	headers: { "Content-Type": "application/json" },
});

export async function saveShortUrl({ url, shortUrl }: SaveShortUrlParams) {
	const response = await axios.request<ShortLink>({
		...saveShortUrlOptions,
		data: {
			url,
			shortUrl,
		},
	});

	return response.data;
}

export async function getShortUrls() {
	const response = await axios.request<ShortLink[]>(getShortUrlsOptions);

	return response.data;
}

export async function deleteShortUrl(id: ShortLink["id"]) {
	const response = await axios.request<string>(deleteShortUrlsOptions(id));

	return response.data === "OK";
}
