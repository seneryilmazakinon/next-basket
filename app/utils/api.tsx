export async function getProductsApi(category: string) {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    return res.json();
  }