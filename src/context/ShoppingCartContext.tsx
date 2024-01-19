import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"
import {Order, Product} from "../utils/Definitions"
import {getProducts} from "../services/shopService"
import { useProducts } from "./ProductContext"
import * as shopService from "../services/shopService"
import { message } from "antd"
type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  createOrder:<T>(order:T) => Promise<boolean>
  clearCart:() => void
  cartQuantity: number
  cartProducts: {[id: string] : {p: Product, quantity:number}}
  isOpen: boolean
  cartItems: CartItem[]
  orders:Order[]
  total:() => number
}


const ShoppingCartContext = createContext({} as ShoppingCartContext)




export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [orders,setOrders] = useState<Order[]>([])
  useEffect(() => {
    const fetchOrders = async () => {
        const orders = await shopService.getOrders()
        if(orders && orders.length)
          setOrders(orders)
    }
    fetchOrders()
  },[])
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )
  const [cartProducts,setCartProducts] = useState< {[id: string] : {p: Product, quantity: number}}>({})

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const {products} = useProducts()
  useEffect(()=> {
    const data = getProductsData()
    setCartProducts(data)
  },  [cartItems,products])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  
  function getProductsData() :  {[id: string] : {p: Product, quantity: number}} {
      let dict : {[id: string] : {p: Product, quantity: number}} = {}
      for(var item of cartItems) {
        var product = products.find(p => p.id == item.id)
        if(product)
          dict[item.id] = {p:product, quantity:item.quantity }
      }
      return dict
  }

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })

  }


  function total() {
    const vals = Object.entries(cartProducts)

    return vals.reduce((totalPrice, [key, value]) => totalPrice + value.p.price*value.quantity,0)
  }

  async function createOrder<T>(order:T) {
    try {
      const product = await shopService.createOrder(order)
      if(product) {
        message.info("Order created")
        clearCart()
        return true
      }
    } catch(e:any) {
     message.error(e.message)
    }
    return false
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        clearCart,
        cartProducts,
        isOpen,
        cartItems,
        cartQuantity,
        orders,
        createOrder,
        total
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
