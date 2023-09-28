"use client";
import { URL } from "@/app/helper";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface newProduct {
  visible: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  handleCloseModal: (value: boolean) => void;
}
export default function NewProduct({
  visible,
  handleCancel,
  handleOk,
  handleCloseModal,
}: newProduct) {

  const route = useRouter();

  interface Product {
    title: string;
    new_price: string;
    old_price: string;
    category: string;
    quantity: number;
    desc: string;
    image: File | null;
  }

  const formRef=useRef<FormInstance | null>(null)

  const [newProduct, setNewProduct] = useState<Product>({
    image: null,
    title: "",
    new_price: "",
    old_price: "",
    category: "",
    quantity: 0,
    desc: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = { ...newProduct, [e.target.name]: e.target.value };
    setNewProduct(value);
  };

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setNewProduct((pre) => ({ ...pre, image: file }));
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      category: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewProduct({ ...newProduct, desc: e.target.value });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("desc", newProduct.desc);
    formData.append("category", newProduct.category);

    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    }
    
    formData.append("new_price", newProduct.new_price);
    formData.append("old_price", newProduct.old_price);
    formData.append("quantity", String(newProduct.quantity));
    formData.append("title", newProduct.title);
    // console.log(newProduct);
    fetch(URL+"addproduct", {
      mode: "cors",
      method: "POST",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          console.log(data);
          if (formRef.current) {
            formRef.current.resetFields(); // Đặt lại tất cả các trường trong biểu mẫu
          }
          route.forward();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="mx-auto flex justify-center">
        <Modal
          title={null}
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit} ref={formRef}>
            <label htmlFor="">Ten san pham</label>
            <Form.Item
              name={"title"}
              rules={[
                {
                  required: true,
                  message: "Khong duoc bo trong",
                },
              ]}
            >
              <Input name="title" type="text" onChange={handleInput}></Input>
            </Form.Item>
            <label htmlFor="">Gia moi</label>
            <Form.Item
              name={"new_price"}
              rules={[
                {
                  required: true,
                  message: "Khong duoc bo trong",
                },
              ]}
            >
              <Input
                name="new_price"
                type="text"
                onChange={handleInput}
              ></Input>
            </Form.Item>
            <label htmlFor="">Gia cu</label>
            <Form.Item
              name={"old_price"}
              rules={[
                {
                  required: true,
                  message: "Khong duoc bo trong",
                },
              ]}
            >
              <Input
                name="old_price"
                type="text"
                onChange={handleInput}
              ></Input>
            </Form.Item>
            <label htmlFor="">Anh san pham</label>
            <Form.Item
              name={"image"}
              rules={[
                {
                  required: true,
                  message: "Khong duoc bo trong",
                },
              ]}
            >
              <Input
                name="image"
                type="file"
                onChange={handleInputImage}
              ></Input>
            </Form.Item>
            <label htmlFor="">Loai san pham</label>
            <Form.Item
              name={"category"}
              rules={[
                {
                  required: true,
                  message: "Khong duoc bo trong",
                },
              ]}
            >
              <Select onChange={handleCategoryChange}>
                <Select.Option value="1">Bé trai dưới 3 tuổi</Select.Option>
                <Select.Option value="2">Bé gái dưới 5 tuổi</Select.Option>
                <Select.Option value="3">Cho người trên 10 tuổi</Select.Option>
                <Select.Option value="4">Cho người trên 30 tuổi</Select.Option>
              </Select>
            </Form.Item>
            <label htmlFor="">Số lượng sản phẩm</label>
            <Form.Item
              name={"quantity"}
              rules={[
                {
                  required: true,
                  message: "Khong duoc bo trong",
                },
              ]}
            >
              <Input
                name="quantity"
                type="number"
                onChange={handleInput}
              ></Input>
            </Form.Item>
            <label htmlFor="">Mô tả sản phẩm</label>
            <Form.Item name={"desc"}>
              <Input.TextArea
                name="desc"
                rows={5}
                onChange={handleTextareaChange}
              ></Input.TextArea>
            </Form.Item>
            <Form.Item className="flex justify-center items-center">
              <Button htmlType="submit" className="bg-green-400">
                Thêm mới
              </Button>
              <Button
                onClick={() => handleCloseModal(false)}
                className="bg-red-500"
              >
                Huy
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
