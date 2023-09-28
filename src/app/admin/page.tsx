import React from 'react'
import Nab_bar from './nab_bar'
import Cookies from 'universal-cookie'


export default function Admin(){
  const cookie=new Cookies()
  const role:string|null=cookie.get("role")

  if (role !== null && role === "ADM") {
    console.log("ADMIN");
  }
  
  return (
    <>
    <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 bg-green-600">
            <Nab_bar/>
        </div>
        <div className="col-span-10">
           <h1>{role} ha ha</h1> 
        </div>
    </div>
    </>
  )
}
