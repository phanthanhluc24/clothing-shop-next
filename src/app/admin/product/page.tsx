"use client"
import React from 'react';
import Content from './content';
import Nab_bar from '../nab_bar';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';

function Dashboard() {
      const cookie=new Cookies();
      const role:string=cookie.get("role");
      const route=useRouter()
      if(role!=="ADM"){
        route.back();
      }
  return (
    <>
    <div className="grid grid-cols-12 gap-1">
      <div className="col-span-2 bg-green-600 fixed h-full w-max px-10">
        <Nab_bar/>
      </div>
      <div className="col-span-10 pl-[250px]">
      <Content/>
      </div>
    </div>
      
    </>
  );
}

export default Dashboard;
