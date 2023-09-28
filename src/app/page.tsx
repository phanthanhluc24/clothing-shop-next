import { Router } from "next/router"
import Nav_bar from "./layout/nav_bar"
import Header from "./layout/header"
import Menu from "./home/menu"
import Product from "./home/product"

export default function Home() {
  return (
   <>
    <Menu/>
    <Product/>
   </>
  )
}
