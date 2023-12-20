
import Image from "next/image"
import Header from "./components/Header"
import Product from "./components/ListProduct"

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products')
  return res.json()
}


interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: string;
  stock: string;
  brand: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  products: Product[];
}


export default async function Home() {
  const data: Product = await getProducts();

  return (
    <main>
      <Header></Header>
      <div className="pt-6 container">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8">
          {data.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}