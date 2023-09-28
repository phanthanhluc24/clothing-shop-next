"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { URL } from "../helper";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
export default function WishList() {
  interface WishList {
    title: "";
    image: "";
    new_price: "";
    id: number;
  }
  const route=useRouter();
  const [wishlist, setWishList] = useState<WishList[]>([]);
  const cookie = new Cookies();
  const token = cookie.get("access_token");
  // const [visible, setVisible] = useState(
  useEffect(() => {
    if (token != undefined) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      fetch(URL + "wishlist", {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            ...headers
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setWishList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const limitTitleLength = (title: string, length: number) => {
    if (title.length > length) {
      return title.substring(0, length) + "...";
    }
    return title;
  };
  return (
    <>
      <div className="w-2/3 mx-auto">

        {wishlist.length>1?(<h3 className="text-lg">Sản phẩm yêu thích</h3>):(<h3 className="text-lg">Bạn chưa có sản phẩm yêu thích</h3>)}
        
        <div className="mt-4">
          <div className="grid grid-cols-12 gap-4">
            {wishlist.map((item, index) => (
              <div
                className="col-span-3 flex flex-col mt-2 ml-3 mr-3"
                key={index}
              >
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
        </div>
      {wishlist.length>1?(<p className="text-orange-500 hover:cursor-pointer">bỏ sản phẩm yêu thích</p>):(<p className="text-orange-500 hover:cursor-pointer" onClick={()=>route.push("/")}>Đi đến trang chủ</p>)}  
      </div>
    </>
  );
}
