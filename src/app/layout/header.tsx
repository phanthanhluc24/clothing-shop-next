"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { URL } from "../helper";
import Cart from "../cart/page";
import Swal from "sweetalert2";
import "../scss/logout.scss"
import { useRouter } from "next/navigation";
export default function Header() {
  const cookies = new Cookies();
  const token: string = cookies.get("access_token");
  interface LoginUser {
    fullname: string;
  }

  const route = useRouter();
  const [logined, setLogined] = useState<LoginUser>({ fullname: ""});

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (token != null || token!=undefined) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      fetch(URL + "currentUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      })
        .then((res) => res.json())
        .then((data) => {
            setLogined(data);
            console.log(data)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const handleCancel = () => {
    setVisible(false);
  };
  const handleClick = () => {
    Swal.fire("Ban chua dang nhap", "Vui long dang nhap", "warning");
  };
  return (
    <>
      <div className="flex mx-auto w-2/3 items-center bg-white h-28">
        <div className="flex mr-2">
          <img
            className="h-16"
            src="https://bizweb.dktcdn.net/100/406/843/themes/791282/assets/logo.png?1685517843053"
            alt=""
          />
        </div>
        <div className="flex relative">
          <input
            type="text"
            placeholder="Tim san pham..."
            className="px-4 py-2 outline-none rounded border w-96 ml-14"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-xl" />
        </div>
        <div className="ml-10">
          <ul className="flex space-x-5 relative">
            {token === undefined  ?(
              <>
                <li className="hover:text-red-500 relative hover:cursor-pointer">
                  <i className="fa-solid fa-heart text-xl " /> Yêu thích{" "}
                </li>
                <li
                  className="hover:text-red-500 hover:cursor-pointer"
                  onClick={handleClick}
                >
                  <i className="fa-solid fa-cart-shopping text-xl " /> Giỏ hàng
                </li>

                <li className="hover:text-red-500 hover:cursor-pointer">
                  <i className="fa-solid fa-user text-xl" />{" "}
                  <Link href={"/auth/login"}>Tài khoản</Link>{" "}
                </li>
              </>
            ) : (
              <>
                <li
                  className="hover:text-red-500 relative hover:cursor-pointer"
                  onClick={() => route.push("/wishlist")}
                >
                  <i className="fa-solid fa-heart text-xl " /> Yêu thích{" "}
                </li>
                <li
                  className="hover:text-red-500 hover:cursor-pointer"
                  onClick={() => setVisible(true)}
                >
                  <i className="fa-solid fa-cart-shopping text-xl " /> Giỏ hàng
                </li>
                <li className="div_hover border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white transition-colors relative">
                  <p className="text-sm">{logined.fullname}</p>
                  <button className="absolute bg-red-500 text-white px-2 py-1 rounded right-0 top-full transition-opacity duration-300 opacity-0 pointer-events-none">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {visible && <Cart visible={visible} handleCancel={handleCancel} />}
    </>
  );
}
