"use client";
import React, { useEffect, useState } from "react";
import { URL } from "@/app/helper";
import Cookies from "universal-cookie";
import Link from "next/link";
import Comment from "../comment";
import Swal from "sweetalert2";

export default function Detail({ params }: any) {
  interface Detail {
    image: string;
    new_price: string;
    old_price: string;
    desc: string;
    title: string;
    quantity: number;
    category_id: number | null;
  }

  interface Relevant {
    image: string;
    new_price: string;
    old_price: string;
    desc: string;
    title: string;
    id:number
  }
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);
  const cookie = new Cookies();

  const role = cookie.get("role");
  const token=cookie.get("access_token");
  const [relevant, setRelevant] = useState<Relevant[]>([]);

  const [detail, setDetail] = useState<Detail>({
    image: "",
    new_price: "",
    old_price: "",
    desc: "",
    title: "",
    quantity: 1,
    category_id: null,
  });

  const [quantity, setQuantity] = useState<{quantity:number}>({quantity:1});

  useEffect(() => {
    fetch(URL + `detail/${params.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setIsDetailLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  useEffect(() => {
    if (isDetailLoaded) {
      fetch(URL + `relevant/${params.id}/${detail.category_id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setRelevant(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.id, isDetailLoaded, detail.category_id]);

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (quantity.quantity < detail.quantity) {
      setQuantity((pre)=>({quantity:pre.quantity+1}));
    }
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (quantity.quantity > 1) {
      setQuantity((pre)=>({quantity:pre.quantity-1}));
    }
  };

  const handleCart =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      const cart={
        id:id,
        quantity:quantity.quantity
      }
      if (token!=undefined) {
        const headers={
          Authorization:`Bearer ${token}`
        }
        fetch(URL+'cartstore',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            ...headers
          },
          body:JSON.stringify(cart)
        })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }
        
    };
  
    const handleLove=(id:number)=>{
      const love={id:id}
      if (token!=undefined) {
        const headers={
          Authorization:`Bearer ${token}`
        }
        fetch(URL+'store_wishlist',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            ...headers
          },
          body:JSON.stringify(love)
        })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    }
  return (
    <>
      <div className="mx-auto w-2/3">
        <div className="grid grid-cols-12 gap-4 mb-10">
          <div className="col-span-5 border rounded">
            <img
              className="w-96"
              src={`http://localhost:8000/storage/image/${detail.image}`}
              alt=""
            />
          </div>
          <div className="col-span-4">
            <div className="flex flex-col">
              <b className="text-2xl">{detail.title}</b>
              <b className="mt-6 text-red-500 text-3xl">{detail.new_price} d</b>
              <p className="mt-4">Số lượng: </p>
              <div className="flex gap-2 mt-2">
                <button
                  className="py-2 px-3 border rounded border-red-500 text-xl text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={handleIncrement}
                >
                  +
                </button>
                <button className="py-2 px-3 border rounded">
                  <b>{quantity.quantity}</b>
                </button>
                <button
                  className="py-2 px-3 border rounded border-red-500 text-xl text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={handleDecrement}
                >
                  -
                </button>
              </div>
                {token!=null?(
                <button
                  className="border border-red-500 rounded mt-4 h-14 uppercase text-2xl bg-red-500 text-white hover:text-red-500 hover:bg-white"
                  onClick={handleCart(params.id)}
                >
                  Thêm vào giỏ
                </button>
                ):(
                  <button
                  className="border border-red-500 rounded mt-4 h-14 uppercase text-2xl bg-red-500 text-white hover:text-red-500 hover:bg-white"
                  onClick={()=>Swal.fire("Bạn chưa đăng nhập","Vui lòng đăng nhập để mua hàng","warning")}
                >
                  Thêm vào giỏ
                </button>
                )}
                <a className="text-orange-500 hover:cursor-pointer hover:text-stone-400" onClick={()=>handleLove(params.id)}><i className="fa-solid fa-heart text-xl mt-2"></i> Thêm vào mục yêu thích</a>
               
              
             
             
            
            </div>
          </div>
          <div className="col-span-2"></div>
        </div>
        <b className="text-2x">Sản phẩm liên quan</b>
        <div className="grid grid-cols-5 gap-4 mt-12 mb-12">
          {relevant.map((item, index) => (
            <div className=" flex-col mt-2 ml-3" key={index}>
              <Link href={`/detail/${item.id}`}>
              <img
                className="border rounded hover:shadow-xl"
                src={`http://127.0.0.1:8000/storage/image/${item.image}`}
                alt=""
              />
              </Link>
              <p className="hover:text-red-500 text-sm mt-2">{item.title}</p>
              <b className="text-red-500 mt-4">{item.new_price}</b>
            </div>
          ))}
        </div>
        <b className="text-2xl">Mô tả sản phẩm</b>
        <p style={{ whiteSpace: "pre-line" }} className="mt-3 mb-6">
          {detail.desc}
        </p>

        <Comment id={params.id} token={token} />
      </div>
    </>
  );
}
