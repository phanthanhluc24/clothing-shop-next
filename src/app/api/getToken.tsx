import React from 'react'
import Cookies from 'universal-cookie'
export default function getToken(){
    const cookies=new Cookies();
    const token=cookies.get("access_token");
   
    return token
  
}
