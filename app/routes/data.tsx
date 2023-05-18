import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
  context,
  params,
}: LoaderArgs) => {
  
  return await context.TEST.list()
};

export default function Product() {
  const product = useLoaderData<typeof loader>();

  console.log(product)

  if (!product) throw new Response(null, { status: 404 })

  return (
    <div>
      <p>Product</p>
   
      <p>Products</p>
      {/* ... */}
    </div>
  );
}