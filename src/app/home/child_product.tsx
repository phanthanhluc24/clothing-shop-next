"use client";
import React, { useEffect, useState } from "react";

import Advertisement from "./advertisement";
import { URL } from "../helper";
import Link from "next/link";

export default function Child_Product() {
  interface Product {
    title: string;
    image: string
    new_price: string
    old_price: string
    id:number
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(URL + "getcategory13", {
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
    
        <div className="grid grid-cols-5 gap-4 mt-5">
          {products.map((item, index) => (
            <div className=" flex-col mt-2 ml-3" key={index}>
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
      
    </>
  );
}
