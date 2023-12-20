import Link from "next/link";
import Image from "next/image";

async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  return res.json();
}

function formatCategory(category: string, isTitleFormat = false) {
  if (isTitleFormat) {
    return category
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return category;
  }
}

export default async function Header() {
  const categories = await getCategories();
  const specifiedIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18];
  const specifiedCategories = specifiedIndexes.map(
    (index) => categories[index]
  );

  return (
    <header>
      <div className="pt-6">
        <div className="2xl:container">
          <div className="flex justify-between items-center">
            <div>
              <Link href={"/"}>
                <Image src="/logo-en.svg" width={95} height={27} alt="Logo" />
              </Link>
            </div>
            <div>
              <div className="relative">
                <Image src="/basket.png" width={48} height={48} alt="basket" />
                <span className="bg-red-200 text-red-500 p-1 text-xs absolute bottom-0 right-0 font-bold">
                  0
                </span>
                <div className="absolute top-10 right-5 w-80 bg-blue-200 p-5">
                  <header className="text-center border-b border-blue-300 p-2">
                    <span className="text-lg font-bold mr-5">My Bag</span>
                    <span>0 Items</span>
                  </header>
                  <ul className="overflow-y-auto lg:max-h-64 flex flex-col">
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-900 mt-6">
          <div className="2xl:container">
            <ul className="flex py-4">
              {specifiedCategories.map((category: string) => (
                <li
                  key={category}
                  className="flex border-r-2 border-slate-200 px-4 first:ps-0 last:pr-0 last:border-0"
                >
                  <Link
                    href={`${category}`}
                    passHref
                    className="text-white hover:text-blue-300 font-bold whitespace-nowrap"
                  >
                    {formatCategory(category, true)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
