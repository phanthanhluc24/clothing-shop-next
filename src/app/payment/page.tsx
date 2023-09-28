"use client"
import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import Payment from "./payment";
import Cookies from "universal-cookie";
import { URL } from "../helper";
import { useRouter } from "next/navigation";


export default function Page({searchParams}:any) {
  interface Address{
    province:string,
    districts:string,
    wrars:string,
    address:string
  }
  
  const route=useRouter()
  if (searchParams==0 || searchParams==null || searchParams==undefined) {
    route.push("/cart")
  }
  const cookie=new Cookies()
  const token=cookie.get("access_token")
  const [province, setProvince] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);

  const [address,setAddress]=useState<Address>({
    province:"",
    districts:"",
    wrars:"",
    address:""
  })
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProvince(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectProvince = (value: string) => {
    const selectedProvince = province.find((item) => item.Name === value);
    if (selectedProvince) {
      setDistricts(selectedProvince.Districts.map((district) => district.Name));
      setWards([]);
    }
    setAddress((prve)=>({
      ...prve,
      province:value
    }))
  };

  const selectDistricts = (value: string) => {
    const selectedDistrict = districts.find((district) => district === value);
    if (selectedDistrict) {
      const selectedProvince = province.find((item) =>
        item.Districts.some((district) => district.Name === selectedDistrict)
      );
      if (selectedProvince) {
        const selectedDistrictObj = selectedProvince.Districts.find(
          (district) => district.Name === selectedDistrict
        );
        if (selectedDistrictObj) {
          setWards(selectedDistrictObj.Wards.map((ward) => ward.Name));
        }
      }
    }
    setAddress((prve)=>({
      ...prve,
      districts:value
    }))
  };

  const handleWards=(value:string)=>{
    setAddress((prve)=>({
      ...prve,
      wrars:value
    }))
  }

  const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setAddress((prve)=>({
      ...prve,
      address:e.target.value
    }))
  }

  const handlePayment=(id:number,new_price:string)=>{
    const cart={...address,id,new_price}
    if (token!=undefined) {
      const headers={Authorization:`Bearer ${token}`}
      fetch(URL+"store_cart",{
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
    
   
  }

  const dropItem=(id:number)=>{
    if (token!=undefined) {
      const headers={Authorization:`Bearer ${token}`}
      fetch(URL+"deleteItem",{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          ...headers
        },
        body:JSON.stringify({id})
      })
      .then((res)=>res.json())
      .then((data)=>{
        route.push("/")
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }
  return (
    <div className="mx-auto w-2/3 grid grid-cols-12 gap-6 mt-10">
      <div className="col-span-6">
        <h3 className="text-xl mb-4">Nhập địa chỉ giao hàng</h3>
        <Form>
          <Form.Item
          rules={[
           {
            required:true,
            message:"Khong duoc bo trong"
           }
          ]}
          >
            <Select placeholder="Chọn tỉnh thành" onChange={selectProvince}>
              {province.map((item, index) => (
                <Select.Option key={index} value={item.Name}>
                  {item.Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
          rules={[
            {
             required:true,
             message:"Khong duoc bo trong"
            }
           ]}
          >
            <Select placeholder="Chọn huyện" onChange={selectDistricts}>
              {districts.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
          rules={[
            {
             required:true,
             message:"Khong duoc bo trong"
            }
           ]}
          >
            <Select placeholder="Chọn xã" onChange={handleWards}>
              {wards.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
          rules={[
            {
             required:true,
             message:"Khong duoc bo trong"
            }
           ]}
          >
            <Input placeholder="Địa chỉ cụ thể" name="address" onChange={handleInput}></Input>
          </Form.Item>
        </Form>
      </div>
      <div className="col-span-6">
           <Payment handlePayment={handlePayment} dropItem={dropItem} searchParams={searchParams}/>
      </div>
     
    </div>
  );
}

interface Province {
  Name: string;
  Districts: {
    Name: string;
    Wards: {
      Name: string;
    }[];
  }[];
}
