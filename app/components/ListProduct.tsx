import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
    product: {
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
    };
}
export default async function Product({ product }: ProductProps) {

    return (
        <Link href={`/product/${product.id}`}>
            <div key={product.id} className="bg-slate-200 rounded-lg p-10 mb-5 flex flex-col ">
            <Image
                src={product.thumbnail}
                width={640}
                height={500}
                alt="Product Image"
                className="rounded-md h-[300px] object-cover mb-5"
            />
            <div className="flex justify-between mb-3">
                <div className="">
                    <div className='flex'>
                        <h1 className="font-bold text-lg text-slate-700 mb-1"> {product.title} </h1>
                    </div>
                    <div className='flex items-end'>
                        <h2 className="font-bold text-red-600 line-through mr-2 text-sm opacity-75"> {product.discountPercentage} $</h2>
                        <h2 className="font-bold text-blue-900"> {product.price} $</h2>
                    </div>
                </div>

            </div>
            <div>
                <p>{product.description}</p>
            </div>
        </div>
        </Link>
    );
}
