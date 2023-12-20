import Link from "next/link";
import Image from "next/image"
import Header from "../components/Header";
import Product from '../components/ListProduct';


async function getProducts(category: any) {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    return res.json();
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

interface PageProps {
    params: {
        category: string;
    };
}

export default async function Page({ params }: PageProps) {
    const { category } = params;
    const data: Product = await getProducts(category);

    return (
        <main>
            <Header></Header>
            <div className="pt-6 2xl:container">
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8">
                    {data.products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}