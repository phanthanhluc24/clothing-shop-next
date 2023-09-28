"use client";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { URL } from "../helper";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
interface ModalCart {
  visible: boolean;
  handleCancel: () => void;
}
export default function Cart({ visible, handleCancel }: ModalCart) {
  const route = useRouter();
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

  const [selectedPayment, setSelectedPayment] = useState<number | any>(null);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  const [cart, setCart] = useState<Cart[] | null>(null);

  const price_sum: number | any = cart?.reduce(
    (price, sum) => price + parseFloat(sum.new_price) * sum.quantity,
    0
  );

  useEffect(() => {
    if (token != undefined) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      fetch(URL + "cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const handleIncrement =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      const status = { id: id, status: 1 };
      if (token != undefined) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        fetch(URL + "cartstore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify(status),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

  const handleDescrement =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      const status = { id: id, status: 2 };
      if (token != undefined) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        fetch(URL + "cartstore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify(status),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

  const dropItem = (id: number) => {
    if (token != undefined) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      fetch(URL + "deleteItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          route.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Modal
        title="Giỏ hàng"
        open={visible}
        onCancel={handleCancel}
        footer={null}
        width="30%"
        className="rounded absolute top-0 right-[0%]  overflow-hidden h-full animate-slide-in"
        style={{ height: "100vh" }}
      >
          {!cart || (cart.length < 1 && <h3 className="text-xl justify-center flex">Giỏ hàng trống</h3>)}
        <div className="grid grid-cols-12 gap-1 h-full">
        
          {cart &&
            cart.map((item, index) => (
              <>
                <div className="col-span-2 items-center" key={index}>
                  <img
                    className="h-20 w-24 rounded object-cover"
                    src={`http://localhost:8000/storage/image/${item.image}`}
                    alt=""
                  />
                </div>
                <div className="flex-col flex-grow justify-center ml-2 col-span-9">
                  <p className=" font-semibold">{item.title}</p>
                  <input
                    type="radio"
                    name="hello"
                    id="payment"
                    value={item.id}
                    checked={selectedPayment === item.id}
                    onChange={handlePaymentChange}
                  />
                  <div className="flex flex-row">
                    <div className="text-sm">
                      <p>Số lượng</p>
                      <div className="flex mt-1">
                        <button
                          className="border px-1"
                          onClick={handleIncrement(item.id)}
                        >
                          +
                        </button>
                        <button className="border">{item.quantity}</button>
                        <button
                          className="border px-1"
                          onClick={handleDescrement(item.id)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="flex-col">
                      <p className="ml-24 text-lg text-red-500">
                        {item.new_price}
                      </p>
                      <p
                        className="ml-24 text-sm text-red-500 mt-1 hover:cursor-pointer"
                        onClick={() => dropItem(item.id)}
                      >
                        Bỏ sản phẩm
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
        <hr className=" text-slate-500 mt-96" />

        <div className="flex">
          <b>Tổng tiền:</b>
          {price_sum !== undefined && (
            <p className="text-red-500 text-lg ml-24">{price_sum.toFixed(2)}</p>
          )}
        </div>

        <button
          className="rounded bg-slate-700 px-32 py-3 text-white hover:bg-red-500 mt-2"
          onClick={() => route.push(`/payment?id=${selectedPayment}`)}
        >
          Thanh toán
        </button>
      </Modal>
    </>
  );
}
