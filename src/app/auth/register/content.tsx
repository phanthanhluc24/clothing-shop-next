"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { URL } from "../../helper";
export default function Content() {

    const navigate=useRouter()
    interface User{
        fullname:string,
        email:string,
        phone:number,
        password:string,
    }

    const [user,setUser]=useState<User>({fullname:"",email:"",phone:0,password:""})

    const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const data={...user,[e.target.name]:e.target.value}
        setUser(data)
    }
    const handleFormRegister=(e:any)=>{
        fetch(URL+"register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then((data)=>{
          if(data.status==200){
            console.log(data)
            navigate.push("/login")
          }
          else{
            console.log(data)
          }
           
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
              <Link href={"/auth/login"} className="hover:text-red-600 text-gray-400">
                Đăng nhập
              </Link>
              <Link href={"/auth/register"} className="border-b-2 border-red-600">
                Đăng ký
              </Link>
            </div>
            <Form className="mt-4" onFinish={handleFormRegister}>
              <b>
                <label htmlFor="">Nhâp tên</label>
              </b>
              <Form.Item
                name={"fullname"}
                rules={[
                  {
                    required: true,
                    message: "Tên không được bỏ trống",
                  },
                ]}
                hasFeedback
              >
                <Input className="w-72" name="fullname" onChange={handleInput}></Input>
              </Form.Item>
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
                <label htmlFor="">Nhập số điện thoại</label>
              </b>
              <Form.Item
                name={"phone"}
                rules={[
                  {
                    required: true,
                    message: "So dien thoai không được bỏ trống",
                  },
                ]}
                hasFeedback
              >
                <Input className="w-72" name="phone" onChange={handleInput}></Input>
              </Form.Item>
              <b>
                <label htmlFor="">Nhập mật khẩu</label>
              </b>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu bắt buộc",
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
              <b>
                <label htmlFor="">Xác thực mật khẩu</label>
              </b>
              <Form.Item
                name={"confirm_pass"}
                rules={[
                  {
                    required: true,
                    message: "Xác thực không chính xác",
                  },
                  ({getFieldValue})=>({
                    validator(_,value){
                        if(!value || getFieldValue("password")===value){
                            return Promise.resolve()
                        }
                        return Promise.reject("Xác thực mật khẩu sai")
                    }
                  })
                ]}
                hasFeedback
              >
                <Input.Password
                  className="w-72"
                  name="confirm_pass"
                  onChange={handleInput}
                ></Input.Password>
              </Form.Item>
              <Form.Item className="mt-4 flex items-center justify-center w-2/3">
                <Button
                  className="bg-green-600 text-yellow-100"
                  htmlType="submit"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
