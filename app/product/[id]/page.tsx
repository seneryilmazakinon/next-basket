/* eslint-disable @next/next/no-async-client-component */
"use client";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Product from "../../components/ListProduct";
import { Key } from "react";
import QuantitySelector from "../../components/QuantitySelector";

async function getProducts(id: any) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}

interface Product {
  map: any;
  id: number;
  title: string;
  price: number;
  discountPercentage: string;
  stock: number;
  brand: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  products: Product[];
}

interface PageProps {
  params: {
    id: number;
  };
}

type QuantitySelectorProps = {
    product: {
        id: number;
        title: string;
        price: number;
        quantity: number;
    };
    maxStock: number;
};


export default async function Page({ params }: PageProps) {
  const { id } = params;
  const data: Product = await getProducts(id);

  const addToCart = () => {
    const selectedItem = {
        id: data.id,
        title: data.title,
        price: data.price,
    };

    const existingItems = localStorage.getItem('cartItems');
    const cartItems = existingItems ? JSON.parse(existingItems) : [];

    cartItems.push(selectedItem);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    console.log('Ürün sepete eklendi:', data.title);
};

  return (
    <main>
      <Header></Header>
      <div className="pt-6 2xl:container">
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-5">
            <div>
              <Image
                src={data.thumbnail}
                width={500}
                height={500}
                alt={data.title}
              />
            </div>
          </div>
          <div className="col-span-7">
            <div className="flex flex-col">
              <span className="">{data.brand}</span>
              <h1 className="mb-4 text-3xl font-bold text-black-600 lg:leading-6 mt-2">
                {data.title}
              </h1>
              <div className="flex items-center">
                <span className="font-bold text-blue-900 text-2xl mr-3">
                  {data.price} $
                </span>
                <div className="items-center p-1 text-xs text-red-500 bg-red-200">
                  <span className="mr-0.5">{data.discountPercentage}%</span>
                  <span>OFF</span>
                </div>
              </div>
              <div className="mt-3">{data.description}</div>
              <div className="mt-3 text-blue-900">Stock : {data.stock}</div>
              <div className="mt-6 flex">
                <QuantitySelector product={{ id: data.id, title: data.title, price: data.price }} maxStock={data.stock}  />
                <button
                  onClick={addToCart}
                  className="px-4 h-12 rounded-sm text-lg bg-blue-900 text-white border border-primary transition-all hover:bg-white hover:border-blue-900 hover:text-blue-900 flex items-center justify-center fill-primary-foreground hover:fill-primary w-full lg:ml-4"
                >
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
