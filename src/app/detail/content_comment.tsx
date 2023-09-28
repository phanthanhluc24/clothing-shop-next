import { useEffect, useState } from "react";
import { URL } from "../helper";

export default function Content({id}:any){
    type Comment = {
        comment: string;
        image: string;
        start: string;
      };
      
      type CommentData = {
        comments: Comment[];
        rating: string;
      };
    const [dataComment,setDataComment]=useState<CommentData|null>(null);

    useEffect(()=>{
        fetch(URL+`get_all_comment/${id}`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((data:CommentData)=>{
            setDataComment(data)
            console.log(data);
        })
    },[id])
    if (dataComment?.comments.length === 0) {
        return <p>No comments available.</p>;
      }
    return(
        <div className="">
             <p className="mb-5">Tổng sao đánh giá: {dataComment?.rating || "N/A"}</p>
            {dataComment?.comments.map((item,index)=>(
                <div className="text-dark" key={index}>
                    <p>{item.comment}</p>
                    <span>{item.start} sao</span>
                    <img  src={`http://127.0.0.1:8000/storage/image/${item.image}`} alt="" />
                </div>
            ))}
             
        </div>
    )
}