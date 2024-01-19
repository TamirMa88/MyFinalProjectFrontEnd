import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { useShoppingCart } from "./context/ShoppingCartContext"
import Login from "./pages/Login"
import Register from "./pages/register"
import AddItem from "./pages/AddItem"
import { useUser } from "./context/UserContext"
import { ShoppingCart } from "./components/ShoppingCart"
import EditItem from "./pages/EditItem"
import OrderSubmit from "./pages/OrderSubmit"
import { useEffect } from "react"
import { getOrders } from "./services/shopService"
import OrderPage from "./pages/OrderPage"



function App() {
  const {user} = useUser()
  const {isOpen}  = useShoppingCart()


  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Additem" element={<AddItem />} />
        <Route path="/Orders" element={<OrderPage />} />
        <Route path="/EditItem/:id" element={<EditItem />} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/order" element={<OrderSubmit/>} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ShoppingCart isOpen={isOpen} />
      </Container>
      </>
  )
}

export default App
