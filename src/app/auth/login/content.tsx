"use client"
import React, { useState } from 'react'
import { Form, Input, Button } from "antd";
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import { URL } from '../../helper';
export default function Content(){
    const navigate=useRouter()
    const cookie=new Cookies()
    interface Login{
        email:string,
        password:string
    }
    const [login,setLogin]=useState<Login>({email:"",password:""})

    const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const data={...login,[e.target.name]:e.target.value}
        setLogin(data)
    }
    const handleFormRegister=(e:any)=>{
        fetch(URL+"login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(login)
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            cookie.set("access_token",data.token,{ path: '/', maxAge: 3600 })
            navigate.push("/")
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <>
     <div className="mx-auto w-2/3 items-center justify-center">
        <div className="grid grid-cols-10">
          <div className="col-span-5">
            <img
              src="https://bizweb.dktcdn.net/100/406/843/themes/791282/assets/account-banner.jpg?1685517817573"
              alt=""
            />
          </div>
          <div className="col-span-5">
            <div className="flex space-x-10">
              <Link href={"/auth/login"} className="border-red-600 border-b-2">
                Đăng nhập
              </Link>
              <Link href={"/auth/register"} className="hover:border-red-600  text-gray-400">
                Đăng ký
              </Link>
            </div>
            <Form className="mt-4" onFinish={handleFormRegister}>
              <b>
                <label htmlFor="">Nhập email</label>
              </b>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Email không được bỏ trống",
                  },
                ]}
                hasFeedback
              >
                <Input className="w-72" name="email" onChange={handleInput}></Input>
              </Form.Item>
              <b>
                <label htmlFor="">Nhập mật khẩu</label>
              </b>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu bắt buôc ",
                  },
                  {
                    min:8,
                    message:"Mật khẩu phải trên 8 ký tự"
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  className="w-72"
                  name="password"
                  onChange={handleInput}
                ></Input.Password>
              </Form.Item>
              <Form.Item className="mt-4 flex items-center justify-center w-2/3">
                <Button
                  className="bg-green-600 text-yellow-100"
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
