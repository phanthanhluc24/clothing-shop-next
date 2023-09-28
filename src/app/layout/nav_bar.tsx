import React from "react";
import Link from "next/link";
export default function Nav_bar() {
  return (
    <>
      <div className="flex mx-auto bg-red-600 h-12">
        <div className="flex w-1/3 justify-center">
          <div className="flex bg-red-800 h-12 items-center space-x-5">
            <Link className="text-white hover:text-black" href={"/"}>Ant Rabbit</Link>
            <Link className="text-white" href={"#"}>Mới về</Link>
            <Link className="text-white" href={"#"}>Hot Deal</Link>
          </div>
        </div>
        <div className="flex justify-center ml-64">
            <div className="flex items-center space-x-5 text-white">
                <Link className="hover:text-yellow-500" href={"#"}>Hệ thống của hàng</Link>
                <Link className="hover:text-yellow-500" href={"#"}>Ưu đãi</Link>
                <Link className="hover:text-yellow-500" href={"#"}>Tin tức</Link>
                <Link className="hover:text-yellow-500" href={"#"}>Hotline: 1900 8750</Link>
            </div>
        </div>
      </div>
    </>
  );
}
