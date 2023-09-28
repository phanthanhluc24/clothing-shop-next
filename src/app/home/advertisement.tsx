import React from "react";
import Child_Product from "./child_product";

const advertisement = [
  "https://bizweb.dktcdn.net/100/406/843/themes/791282/assets/feature_banner_1.jpg?1685517843053",
  "https://bizweb.dktcdn.net/100/406/843/themes/791282/assets/feature_banner_2.jpg?1685517843053",
  "https://bizweb.dktcdn.net/100/406/843/themes/791282/assets/feature_banner_3.jpg?1685517843053",
];
export default function Advertisement() {
  return (
    <>
        <div className="grid grid-cols-12 gap-4 mt-10">
          {advertisement.map((item, index) => (
            <div className="col-span-4 overflow-hidden" key={index}>
                <img className="hover:transform hover:scale-110 transition-transform duration-300" src={item} alt="" />
              
            </div>
          ))}
        </div>
        
        <Child_Product/>
    </>
  );
}
