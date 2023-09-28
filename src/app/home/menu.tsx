"use client";
import React, { useEffect, useState } from "react";
import { URL } from "../helper";

const slide_bar = [
  "https://bizweb.dktcdn.net/100/406/843/themes/791282/assets/slider_2.jpg?1685517843053",
  "https://bizweb.dktcdn.net/100/406/843/themes/791282/assets/slider_1.jpg?1685517843053",
];
export default function Menu() {
  const [nap_bar, setNap_Bar] = useState<[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [slide, setSlide] = useState(slide_bar[index]);
  
  useEffect(() => {
    fetch(URL+"nab_bar", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setNap_Bar(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newSlide = (index + 1) % slide_bar.length;
      setIndex(newSlide);
      setSlide(slide_bar[newSlide]);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [slide]);
  return (
    <>
      <div className=" bg-pink-400">
        <div className="grid grid-cols-12 w-2/3 container mx-auto">
          <div className="col-span-2 mr-15 bg-white mt-2 min-h-min">
            <ul className="list-inside">
              {nap_bar.map((item, index) => (
                <div key={index}>
                  <li className="hover:text-red-500" >{item}</li>
                  <hr />
                </div>
              ))}
            </ul>
          </div>
          <div className="col-span-8 mt-2">
            <img className="transition duration-300" src={slide} alt="" />
          </div>
          <div className="col-span-2 mt-2 bg-white">
            <img
              src="https://bizweb.dktcdn.net/thumb/grande/100/406/843/articles/ooyttz-1.jpg?v=1602683252373"
              alt=""
            />
            <hr />
            <a href="">
              <b className="text-sm hover:text-red-500">1001+ Cách phối mũ len bé trai: Vừa đẹp lại ấm áp</b>
            </a>
            <hr />
            <a href="" className="text-sm hover:text-red-500">Cách phối chân váy bé gái: Muôn kiểu cho bé thêm xinh</a>
            <hr />
            <a href="" className="text-sm hover:text-red-500">Cách phối bộ đồ mặc nhà cho bé: Gọn – Đẹp – Ấm áp !</a>
            <hr />
            <a href="" className="text-sm hover:text-red-500">
              Chọn quần áo đi học cho bé: Không khó như bạn vẫn nghĩ!
            </a>
            <hr />
            <a href="" className="text-sm hover:text-red-500">5 kiểu áo “phải có” trong tủ đồ bé trai mùa thu đông</a>
          </div>
        </div>
      </div>
    </>
  );
}
