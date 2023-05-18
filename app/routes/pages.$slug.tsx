import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import page from '../example.json'


export const loader = async ({
  context,
  params,
}: LoaderArgs) => {

  const data = json(await context.TEST.get(params.slug, { type: 'json' }))

  return data
};



export default function Page() {
  const page = useLoaderData<typeof loader>();

  console.log(page)

  if (!page) throw new Response(null, { status: 404 })

  return (
    <div>
      <div><h1>{page.title}</h1></div>
      <div><pre>{JSON.stringify(page, null, 2)}</pre></div>
    </div>
  );
}