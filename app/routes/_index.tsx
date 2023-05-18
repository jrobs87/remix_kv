import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
  context,
  params,
}: LoaderArgs) => {
  console.log(context, params)


  return { context, params }
  // return json(
  //   await get<{ name: string }>(`/faqs`, {
  //     type: "json",
  //   })
  // );
};

export default function Product() {
  const product = useLoaderData<typeof loader>();

  if (!product) throw new Response(null, { status: 404 })

  console.log(product)

  return (
    <h1>
      Howdy Dev!
    </h1>
  );
}