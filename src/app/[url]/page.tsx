import axios from "axios";
import { notFound, redirect } from "next/navigation";

async function LinkRedirect(shortenUrl: string) {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/link/redirect",
      { shortenUrl },
    );

    if (!data.ok) return { ok: false };

    return { ok: true, url: data.url };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}
export default async function Page({ params }) {
  const { url } = await params;
  const data = await LinkRedirect(url);
  if (!data.ok) return notFound();

  redirect(data.url);
}
