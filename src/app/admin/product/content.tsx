"use client"

import { Button } from "antd";
import { error } from "console";
import React, { useState,useEffect  } from "react";
import NewProduct from "./new_product/page";
import { URL } from "@/app/helper";
import EditProduct from "./new_product/editproduct";

export default function Content() {
    interface Product{
        title:string,
        new_price:string,
        old_price:string,
        quantity:number
        image:string,
        id:number
    }

    const [visible,setVisible]=useState<boolean>(false)
    const [visibles,setVisibles]=useState<boolean>(false)
    const [id,setId]=useState<number|null>(null)

    const [product,setProduct]=useState<Product[]>([])
    useEffect(()=>{
        fetch(URL+"getproducts",{
            method:"GET"
        })
        .then((res)=>res.json())
        .then((data)=>{
          setProduct(data)
          // console.log(data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    const handleAddNew=(e:React.MouseEvent<HTMLButtonElement>)=>{
        setVisible(true)
    }

    const handleUpdate=(id:number)=>(e:React.MouseEvent<HTMLButtonElement>)=>{
      setVisibles(true)
      setId(id)
  }

    const handleCancel=()=>{
      setVisible(false)
    }

    const handleOk=()=>{
      setVisible(true)
    }

    const handleCancels=()=>{
      setVisible(false)
    }

    const handleOks=()=>{
      setVisible(true)
    }


    const handleDelete=(id:number)=>(e:React.MouseEvent<HTMLButtonElement>)=>{
        fetch(URL+`deleteproduct/${+id}`,{
            method:"DELETE",
        })
        .then(()=>{
          setProduct(prve=>prve.filter(product=>product.id !=id))
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div className="mt-2">
      <Button onClick={handleAddNew} className="px-4 py-5 flex items-center justify-center fixed" htmlType="button">Them moi san pham</Button>
      <table className="mx-auto w-full w-3/3 border mt-28">
        <thead className="border">
          <tr className="border">
            <th className="">STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá mới</th>
            <th>Giá cũ</th>
            <th>Sô lượng</th>
            <th>Hình ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        {product.map((item,index)=>(
        <tbody key={index} className="border">
          <tr className="border text-center">
            <td>{index+1}</td>
            <td>{item.title}</td>
            <td>{item.new_price}</td>
            <td>{item.old_price}</td>
            <td>{item.quantity}</td>
            <td><img className=" object-cover" src={`http://127.0.0.1:8000/storage/image/${item.image}`} alt="" style={{width:50,height:50}}/> </td>
            <td className="flex justify-center">
                <button className="rounded py-2 px-4 bg-green-400 mr-2 hover:text-white" onClick={handleUpdate(item.id)}>Update</button>
                <button className="rounded py-2 px-4 bg-red-500 hover:text-white" onClick={handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        </tbody>
        ))}
      </table>
     {visible && <NewProduct visible={visible} handleCancel={handleCancel} handleOk={handleOk} handleCloseModal={setVisible}/>} 
     {visibles && <EditProduct id={id} visibles={visibles} handleCancels={handleCancels} handleOks={handleOks} handleCloseModals={setVisibles}/>} 
    </div>
  );
}
