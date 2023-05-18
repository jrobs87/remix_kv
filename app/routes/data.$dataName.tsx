import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface TLoaderArgs extends LoaderArgs {
  context: {
    GP_DATA_JR: KVNamespace
  },
  params: any
}

// export const onRequest: PagesFunction<Env> = async (context) => {
//   const task = await context.env.GP_DATA_JR.get("Task:123");
//   return new Response(task);
// }

export const loader = async ({
  context,
  params,
}: TLoaderArgs) => {
  console.log(params)
  const kv = context.GP_DATA_JR as KVNamespace;
  const data = await kv.get(params.dataName, {type: 'json'})
  return data
};

export default function Product() {
  const product = useLoaderData<typeof loader>();

  if (!product) throw new Response(null, { status: 404 })

  return (
    <div>
      <p>Product</p>
      {/* {product.name} */}
      <p>Products</p>
      {/* ... */}
    </div>
  );
}