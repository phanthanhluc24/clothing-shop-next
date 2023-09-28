import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input } from "antd";
import "../scss/rating.scss";
import { headers } from "next/dist/client/components/headers";
import Swal from "sweetalert2";
import Content from "./content_comment";
interface Id {
  id: any;
  token: any;
}
export default function Comment({ id, token }: Id) {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<any>(0);
  const [image, setImage] = useState<File | any>(null);
  const [img, setImg] = useState<File | any>(null);
  const [check, setCheck] = useState<boolean>(false);
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (token != undefined || token != null) {
      const headers = { Authorization: `Bearer ${token}` };
      fetch(`http://127.0.0.1:8000/api/get_user_comment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCheck(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleForm = () => {
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", rating);
    if (img instanceof File) {
      formData.append("image", img);
    }
    formData.append("id_product", id);
    if (token != undefined || token != null) {
      const headers = { Authorization: `Bearer ${token}` };
      fetch("http://127.0.0.1:8000/api/post_comment", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          // "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
          ...headers,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const ratingStars = [...document.getElementsByClassName("rating__star")];
    const ratingResult = document.querySelector(".rating__result");

    if (ratingResult) {
      printRatingResult(ratingResult);
    }

    const executeRating = (stars: any, result: any) => {
      const starClassActive = "rating__star fas fa-star";
      const starClassUnactive = "rating__star far fa-star";
      const starsLength = stars.length;

      stars.map((star: any) => {
        star.onclick = () => {
          const i = stars.indexOf(star);

          if (star.className.indexOf(starClassUnactive) !== -1) {
            printRatingResult(result, i + 1);
            for (let j = i; j >= 0; --j) {
              stars[j].className = starClassActive;
            }
          } else {
            printRatingResult(result, i);
            for (let j = i; j < starsLength; ++j) {
              stars[j].className = starClassUnactive;
            }
          }
        };
      });
    };

    function printRatingResult(result: any, num = 0) {
      if (result) {
        result = `${num}`;

        setRating(result);
        console.log(result);
      }
    }

    executeRating(ratingStars, ratingResult);
  }, []);

  return (
    <>
      <b className="text-xl">Bình luận: </b>
      <Form className="flex flex-col mt-12" onFinish={handleForm}>
        <Form.Item>
          <Input.TextArea
            rows={4}
            placeholder="Nhập nhận xét của bạn về bài viết..."
            className="w-96 outline-none border"
            onChange={handleTextArea}
          ></Input.TextArea>
        </Form.Item>
        <div className="file-input w-96">
          <label htmlFor="" className="custom-label">
            Chọn ảnh:
          </label>
          <Form.Item>
            <Input
              type="file"
              name="file"
              id="file"
              onChange={handleSelectImage}
            ></Input>
          </Form.Item>
          <Image width={100} height={100} src={image} />
        </div>
        <div className="rating ml-10">
          <span className="rating__result"></span>
          <i className="rating__star fa fa-star text-2xl"></i>
          <i className="rating__star fa fa-star text-2xl"></i>
          <i className="rating__star fa fa-star text-2xl"></i>
          <i className="rating__star fa fa-star text-2xl"></i>
          <i className="rating__star fa fa-star text-2xl"></i>
        </div>
        <Form.Item>
          <Input type="hidden" className="star-rating" value={rating}></Input>
        </Form.Item>
        {check == true ? (
          <Button
            htmlType="submit"
            className="ml-3 py-3 px-3 w-24 bg-green-500 flex items-center hover:bg-red-500 hover:text-white mb-3"
          >
            Bình luận
          </Button>
        ) : (
          <Button
            htmlType="button"
            className="ml-3 py-3 px-3 w-24 bg-green-500 flex items-center hover:bg-red-500 hover:text-white mb-3"
            onClick={()=>Swal.fire("Không thể bình luận","Vui lòng mua hàng để bình luận","warning")}
          >
            Bình luận
          </Button>
        )}
      </Form>
      <Content id={id}></Content>
    </>
  );
}
