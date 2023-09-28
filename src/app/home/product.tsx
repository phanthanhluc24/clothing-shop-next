"use client";
import React, { useEffect, useState } from "react";
import { URL } from "../helper";
import Advertisement from "./advertisement";
import Child_Product from "./child_product";
import Link from "next/link";

export default function Product() {
  interface Product {
    title: "";
    image: "";
    new_price: "";
    old_price: "";
    id:number;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(URL + "getcategory2", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const limitTitleLength = (title: string, length: number) => {
    if (title.length > length) {
      return title.substring(0, length) + "...";
    }
    return title;
  };
  return (
    <>
      <div className="mx-auto flex flex-col w-2/3 mt-24 mb-14">
        <button className="py-3 px-2 bg-red-500 text-white hover:text-yellow-400 w-44 rounded">
          Hotdeal Mỗi ngày
        </button>
        <div className="border-red-500 border-2">
          <div className="grid grid-cols-12 gap-4 ">
            {products.map((item, index) => (
              <div className="col-span-3 flex flex-col mt-2 ml-3 mr-3" key={index}>
                <Link href={`/detail/${item.id}`}>
                <img
                  className="border rounded hover:shadow-xl"
                  src={`http://127.0.0.1:8000/storage/image/${item.image}`}
                  alt=""
                />
                </Link>
                <p className="hover:text-red-500 text-sm mt-2">
                  {limitTitleLength(item.title, 30)}
                </p>
                <b className="text-red-500 mt-4">{item.new_price}</b>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button className="py-1 px-4 bg-slate-800 rounded mb-2 mt-4 uppercase text-white hover:bg-red-500">
              Xem thêm
            </button>
          </div>
        </div>

        <Advertisement/>
        <Advertisement/>
      </div>
    </>
  );
}
