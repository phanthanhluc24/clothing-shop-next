"use client";
import React, { useEffect, useState } from "react";
import { URL } from "../helper";
import Highlighter  from "react-highlight-words";
export default function PDF() {
  // const [pdf, setPdf] = useState<string>("");

  interface Cv_Pdf{
    educations:"",
    skill:"",
    experience:"",
    hobbies:"",
    objectives:"",
    language:""
  }
  const [cv,setCv]=useState<Cv_Pdf[]>([])
  useEffect(() => {
    fetch(URL + "getCv", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCv(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const keywords = ["EDUCATION", "LANGUAGES","WORK EXPERIENCES","HOBBIES"];
  // const sections = pdf.split(/\s*\n\s*(?=[A-Z])/);
  // const foundSections:any = {};
  // let currentKeyword:any = null;

  // sections.forEach((section) => {
  //   const matchingKeyword = keywords.find((keyword) =>
  //     section.includes(keyword)
  //   );

  //   if (matchingKeyword) {
  //     currentKeyword = matchingKeyword;
  //     foundSections[currentKeyword] = "";
  //   } else if (currentKeyword) {
  //     foundSections[currentKeyword] += "\n" + section;
  //   }
  // });

  const [pdf,setPdf]=useState<File|null>(null)

  const [keyword, setKeyword] = useState<string>("");

  const handleFilePdf=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const file=e.target.files && e.target.files[0]
      setPdf(file)
  }

  const handlePushFile=(e:React.ChangeEvent<HTMLFormElement>)=>{
    const formData=new FormData()
    if (pdf instanceof File) {
      formData.append("pdf",pdf)
    }
    
        fetch(URL+"postPdf",{
          method:"POST",
          headers:{
           "Content-Type": "multipart/form-data"
          },
          body:JSON.stringify(formData)
        })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data)
        })
        .catch((error)=>{
          console.log(error)
        })
  }

  const handleHightWort=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setKeyword(e.target.value)
  }

  return (
    <>
      <form action="" method="post" onSubmit={handlePushFile}>
        <label htmlFor="">File PDF</label>
        <input type="file" name="pdf" onChange={handleFilePdf} />

        <button type="submit" className="px-2 py-3 bg-yellow-400 rounded">Push PDF</button>
      </form>
      <input type="text" className="mt-12 border-red-600 rounded" onChange={handleHightWort}/>
      <table className="mt-16 border">
        <thead>
          <tr>
            <th>STT</th>
            <th>Giao duc</th>
            <th>Ngon ngu</th>
            <th>Muc tieu</th>
            <th>Ky nang</th>
            <th>Kinh nghiem</th>
          </tr>
        </thead>
    {cv.map((item,index)=>(
      <tbody key={index}>
          <tr>
            <td>{index+1}</td>
            <td>{item.educations}</td>
            <td>{item.language}</td>
            <td>
              <Highlighter
              highlightClassName="highlight"
              autoEscape={true}
              searchWords={[keyword]}
              textToHighlight={item.objectives}
              >

              </Highlighter>
              
              
              </td>
            <td>{item.skill}</td>
            <td className="whitespace-pre-line">{item.experience}</td>
          </tr>
        </tbody>
    ))}
        

      
      </table>
    </>
    // <div>
    //   {keywords.map((keyword, index) => (
    //     <div key={index}>
    //       <h2>{keyword.toLocaleUpperCase()}</h2>
    //       <pre style={{ whiteSpace: "pre-line" }}>
    //         {foundSections[keyword]?foundSections[keyword].trim():""}
    //       </pre>
    //       <hr />
    //       <div style={{ height: '10px' }}></div>
    //     </div>
    //   ))}
    // </div>

 


  );
}
