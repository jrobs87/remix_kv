import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import page from '../example.json'

export const loader = async ({
  context,
  params,
}: LoaderArgs) => {
  
  return await json(context.TEST.get(params.slug))
};

export default function Page() {
  const page = useLoaderData<typeof loader>();

  console.log(page)

  if (!page) throw new Response(null, { status: 404 })

  return (
    <div>
      <div><pre>{JSON.stringify(page, null, 2) }</pre></div>
    </div>
  );
}