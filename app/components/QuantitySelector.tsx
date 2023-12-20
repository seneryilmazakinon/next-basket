import { useState } from "react";

type QuantitySelectorProps = {
    product: {
        id: number;
        title: string;
        price: number;
    };
    maxStock: number;
};

const QuantitySelector = ({ product, maxStock }: QuantitySelectorProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleInputChange = (e: { target: { value: string; }; }) => {
        const inputVal = parseInt(e.target.value);
        if (!isNaN(inputVal) && inputVal > 0 && inputVal <= maxStock) {
            setQuantity(inputVal);
        }
    };

    const increaseQuantity = () => {
        if (quantity < maxStock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = () => {
        const selectedItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity,
            // Diğer ürün bilgilerini buraya ekleyebilirsiniz
        };

        // Daha önce kaydedilmiş olan ürünleri alalım (eğer varsa)
        const existingItems = localStorage.getItem('cartItems');
        const cartItems = existingItems ? JSON.parse(existingItems) : [];

        // Yeni ürünü sepete ekleyelim
        cartItems.push(selectedItem);

        // Güncellenmiş sepeti tekrar localStorage'e kaydedelim
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        console.log('Ürün sepete eklendi:', product.title);
    };


    return (
        <div className="flex items-center">
            <button className="h-12 w-10 border border-blue-900 text-blue-900" onClick={decreaseQuantity}>-</button>
            <input
                type="tel"
                value={quantity}
                min={1}
                max={maxStock}
                onChange={handleInputChange}
                inputMode="numeric"
                className="h-12 w-16 text-center font-bold border-t border-b border-blue-900 text-blue-900 focus-visible:outline-none hover:border-black-100 focus:border-black"
            />
            <button className="h-12 w-10 border border-blue-900 text-blue-900" onClick={increaseQuantity} disabled={quantity >= maxStock}>+</button>
        </div>
    );
};

export default QuantitySelector;