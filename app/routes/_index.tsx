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
    <div>
      <h1>Hello</h1>
      <Outlet />
    </div>
  );
}