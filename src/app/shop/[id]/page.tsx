
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../../types/products";
import Link from "next/link";

// Fetch product by _id instead of slug
async function getProductById(id: string | undefined): Promise<Product | null> {
  if (!id) return null; // Prevent undefined ID error

  const query = `*[_type == "product" && _id == $id][0]{
    _id, title, description, price, productImage, inventory, discountPercentage
  }`;
  return await client.fetch(query, { id });
}

export default async function ProductPage({ params }: { params: { id?: string } }) {  if (!params.id) return notFound(); // Ensure ID exists before fetching

  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-6xl w-full h-50 grid grid-cols-2 md:grid-cols-2 gap-6 p-6">
      <div className="relative mt-10">
        {product.productImage?.asset?._ref && (
          <Image
            src={urlFor(product.productImage).url()}
            alt={product.title}
            width={700}
            height={400}
            className="w-full h-200 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        )}
      </div>
      <div className="p-6 flex flex-col justify-between">
        <h1 className="text-4xl font-extrabold text-gray-800">{product.title}</h1>
        <p className="text-gray-600 mt-4 leading-relaxed font-semibold">{product.description}</p>
        <p className="text-3xl font-semibold text-black mt-4">${product.price.toFixed(2)}</p>
        {product.discountPercentage && (
          <p className="text-green-600 mt-2 text-lg">Discount: {product.discountPercentage}%</p>
        )}
        <p className={`mt-2 text-lg ${product.inventory > 0 ? "text-green-600" : "text-red-600"}`}>
          {product.inventory > 0 ? `In Stock: ${product.inventory}` : "Out of Stock"}
        </p>
        <Link href="/cart1">
        <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-black transition-all">
          Add to Cart
        </button>
        </Link>
      </div>
    </div>
  </div>
);}