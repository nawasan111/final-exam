import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const productsFilter = !!router.query?.q
    ? products.filter((prod) => String(prod.name).includes(router.query.q))
    : products.filter((prod) => Number(prod.stock) > 0);

  const FetchProduct = async () => {
    let response = await axios.get("/api/product");
    console.log(response.data);
    setProducts(response.data);
  };

  useEffect(() => {
    FetchProduct();
  }, []);
  return (
    <>
      <Head>
        <title>OpenShop</title>
      </Head>
      <div>
        <div className="mx-auto text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-w-[1520px]">
          {productsFilter.map((prod, idx) => (
            <ProductCard key={idx} isFav={false} product={prod} />
          ))}
        </div>
      </div>
    </>
  );
}
