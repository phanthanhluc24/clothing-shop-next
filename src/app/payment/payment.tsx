"use client";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { URL } from "../helper";

interface Payment {
  searchParams:any;
  handlePayment: (id: number,new_price:string) => void;
  dropItem:(id:number)=>void
}
export default function Payment({ handlePayment,dropItem,searchParams }: Payment) {
  const cookie = new Cookies();
  const token = cookie.get("access_token");
  // const [visible, setVisible] = useState(false);
  interface Cart {
    id: number;
    title: string;
    new_price: string;
    image: string;
    quantity: number;
  }

  const [cart, setCart] = useState<Cart[] | null>(null);

  const price_sum: number | any = cart?.reduce(
    (price, sum) => price + parseFloat(sum.new_price) * sum.quantity,
    0
  );

  console.log(searchParams)

  useEffect(() => {
    if (token != undefined) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      fetch(URL + `cart/${searchParams.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setCart(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);


  return (
    <div>
      <div>
        {cart &&
          cart.map((item, index) => (
            <>
              <div className="grid grid-cols-12 gap-1 h-full">
                <div className="col-span-2 items-center" key={index}>
                  <img
                    className="h-20 w-24 rounded object-cover"
                    src={`http://localhost:8000/storage/image/${item.image}`}
                    alt=""
                  />
                </div>
                <div className="flex-col flex-grow justify-center col-span-9 ml-4">
                  <p className=" font-semibold">{item.title}</p>
                  <div className="flex flex-row">
                    <div className="text-sm">
                      <p>Số lượng</p>
                      <div className="flex mt-1">
                        <button className="border px-1">+</button>
                        <button className="border">{item.quantity}</button>
                        <button className="border px-1">-</button>
                      </div>
                    </div>
                    <div className="flex-col">
                      <p className="ml-24 text-lg text-red-500">
                        {item.new_price}
                      </p>
                      <p className="ml-24 text-sm text-red-500 mt-1 hover:cursor-pointer" onClick={()=>dropItem(item.id)}>
                        Bỏ sản phẩm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className=" text-slate-500 mt-96" />

              <div className="flex">
                <b>Tổng tiền:</b>
                {price_sum !== undefined && (
                  <p className="text-red-500 text-lg ml-24">
                    {price_sum.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="flex">
                <button
                  className="rounded bg-slate-700 px-32 py-3 text-white hover:bg-red-500 mt-14 mb-8"
                  onClick={() => handlePayment(item.id,item.new_price)}
                >
                  Đặt hàng
                </button>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
