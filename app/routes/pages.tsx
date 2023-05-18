import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, Outlet, Link } from "@remix-run/react";

export const loader = async ({
  context,
  params,
}: LoaderArgs) => {

  return await context.TEST.list()
};

export default function pages() {
  const pages = useLoaderData<typeof loader>();

  console.log(pages)

  if (!pages) throw new Response(null, { status: 404 })

  return (
    <div style={{ display: "flex", padding: "2rem", gap: "1rem" }}>
      <div style={{border: '1px dashed salmon', padding: '1rem', width: "30rem"}}>
        <h1>Pages</h1>
        <br />
        {
          pages.keys.map((page: any) => {
            return <Link prefetch="render" to={`/pages/${page.name}`} key={page.name} style={{display: "block", padding: "1rem"}}>{page.name}</Link>
          })
        }
      </div>
      <div style={{border: '1px dashed blue', padding: '1rem', width: '100%', overflowX: 'scroll'}}>
        <Outlet />
      </div>
    </div>
  );
}