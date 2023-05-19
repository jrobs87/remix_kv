import type { LinksFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from './styles.css'
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, NavLink } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];

export const loader = async ({
  context,
  params,
}: LoaderArgs) => {

  // TODO - This needs to be properly typed.
  return await context.TEST.list()
};

export default function App() {
  const pages = useLoaderData<typeof loader>();

  console.log(pages)

  if (!pages) throw new Response(null, { status: 404 })

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav style={{ padding: "2rem", display: "flex", flexWrap: "wrap"}}>
          {
            pages.keys.map((page: any) => {
              return (
                <NavLink prefetch="render" to={`/${page.name}`} key={page.name} style={{ display: "block", padding: "0rem 1rem 0rem 0" }}>
                  {page.metadata.title}
                </NavLink>
              )
            })
          }
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
