"use client";
import { URL } from "@/app/helper";
import { Button, Form, Input, Modal, Select } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface editProduct {
  id: number | null;
  visibles: boolean;
  handleCancels: () => void;
  handleOks: () => void;
  handleCloseModals: (value: boolean) => void;
}
export default function EditProduct({
  id,
  visibles,
  handleCancels,
  handleOks,
  handleCloseModals,
}: editProduct) {
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

  const [editProduct, setEditProduct] = useState<Product>({
    image: null,
    title: "",
    new_price: "",
    old_price: "",
    category: "",
    quantity: 0,
    desc: "",
  });

  useEffect(() => {
    fetch(URL + `getproduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEditProduct(data);
        // console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(editProduct);
  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = { ...editProduct, [e.target.name]: e.target.value };
  //   setEditProduct(value);
  // };

  // const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   setEditProduct((pre) => ({ ...pre, image: file }));
  // };

  // const handleCategoryChange = (value: string) => {
  //   setEditProduct((prevProduct) => ({
  //     ...prevProduct,
  //     category: value,
  //   }));
  // };

  // const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setEditProduct({ ...editProduct, desc: e.target.value });
  // };

  const handleSubmit = () => {
    console.log(editProduct)
    // const formData = new FormData();
    // formData.append("desc", editProduct.desc);
    // formData.append("category", editProduct.category);
    // if (editProduct.image instanceof File) {
    //   formData.append("image", editProduct.image);
    // }
    // formData.append("new_price", editProduct.new_price);
    // formData.append("old_price", editProduct.old_price);
    // formData.append("quantity", String(editProduct.quantity));
    // formData.append("title", editProduct.title);
    // // console.log(newProduct);
    // fetch(URL+"addproduct", {
    //   mode: "cors",
    //   method: "POST",
    //   headers: {
    //     "Access-Control-Allow-Headers": "Content-Type",
    //     "Access-Control-Allow-Origin": "http://localhost:3000",
    //     // "Content-Type": "multipart/form-data",
    //     "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    //   },
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.status == 200) {
    //       console.log(data);
    //       route.push("/admin/product");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <>
      <div className="mx-auto flex justify-center">
        <Modal
          title={null}
          open={visibles}
          onOk={handleOks}
          onCancel={handleCancels}
          footer={null}
        >
          <Form onFinish={handleSubmit}>
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
              <Input
                name="title"
                type="text"
                // onChange={handleInput}
                value={editProduct.title}
              ></Input>
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
                // onChange={handleInput}
                value={editProduct.new_price}
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
                // onChange={handleInput}
                value={editProduct.old_price}
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
                // onChange={handleInputImage}
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
              <Select >
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
                // onChange={handleInput}
                value={editProduct.quantity}
              ></Input>
            </Form.Item>
            <label htmlFor="">Mô tả sản phẩm</label>
            <Form.Item name={"desc"}>
              <Input.TextArea
                name="desc"
                rows={5}
                // onChange={handleTextareaChange}
                value={editProduct.desc}
              ></Input.TextArea>
            </Form.Item>
            <Form.Item className="flex justify-center items-center">
              <Button htmlType="submit" className="bg-green-400">
                Cập nhật
              </Button>
              <Button
                onClick={() => handleCloseModals(false)}
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
