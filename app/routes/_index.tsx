import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, Outlet, NavLink } from "@remix-run/react";

export const loader = async ({
  context,
  params,
}: LoaderArgs) => {

  // TODO - This needs to be properly typed.
  return await context.TEST.list()
};

export default function pages() {
  const pages = useLoaderData<typeof loader>();

  console.log(pages)

  if (!pages) throw new Response(null, { status: 404 })

  return (
    <div style={{ display: "flex", padding: "2rem", gap: "1rem" }}>
      <div style={{ border: '1px dashed #333533', padding: '1rem', width: "30rem" }}>
        <h1>Pages</h1>
        <br />
        {
          pages.keys.map((page: any) => {
            return (
              <NavLink prefetch="render" to={`/pages/${page.name}`} key={page.name} style={{ display: "block", padding: "1rem" }}>
                {page.name}
              </NavLink>
            )
          })
        }
      </div>
      <div style={{ border: '1px dashed #333533', padding: '1rem', width: '100%', overflowX: 'scroll' }}>
        <Outlet />
      </div>
    </div>
  );
}