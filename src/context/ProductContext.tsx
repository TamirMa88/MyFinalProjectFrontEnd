import { createContext, useContext, useEffect, useState } from "react"
import { NewProductForm, Product} from "../utils/Definitions"
import {adminCreateItem,adminDeleteItem, adminEditItem, getCategory, getProducts, updateCart } from "../services/shopService"
import { message } from "antd"


interface IProductContext {
    products: Product[],
    error: unknown,
    loading: boolean
    getProductsLocal: () => void
    addProduct: (p: NewProductForm) =>  Promise<boolean>
    deleteProduct: (id:any) => Promise<boolean>
    editProduct: (id:any, p:NewProductForm) => Promise<boolean>
  }
  
  
  
  const wait = (time:number) => new Promise((resolve) => setTimeout(resolve,time))
  const ProductContext = createContext<IProductContext | null>(null)
  
  export const ProductContextProvider = ({children} : {children : React.ReactNode}) => {
      const [products,setProducts] = useState<Product[]>([])
      const [error,setError] = useState<unknown>()
      const [loading, setLoading] = useState(true)
      
      useEffect(() => {
        getProductsLocal()
      }, [])
  
      const deleteProduct = async (id:any) => {
        try {
            const productAfterDelete =  await adminDeleteItem(id)
            if(productAfterDelete.id) {
              setProducts(products.filter(p => p.id !== id))
              message.info("Product deleted")
              return true
            }
        } catch(e) {
          setError(e)
        }
        message.error("Something went wrong, please try again")
        return false

      }

      const addProduct = async (p: NewProductForm) => {
        try {
          const product = await adminCreateItem(p)
          if(product.id) {
            setProducts([...products, product])
            return true
          }
        } catch(e) {
          setError(e)
        }
        return false
      }
      const editProduct = async (id:any, p: NewProductForm) => {
        try {
          const product = await adminEditItem(id,p)
          if(product.id) {
            setProducts(products.map(prod => prod.id == id ? {...product,id} : prod))
            return true
          }
        } catch(e) {
          setError(e)
        }
        return false
      }
  
      const getProductsLocal = async () => {
        setLoading(true)
        try {
                const products = await getProducts()
                setProducts(products)
        } catch(e) {
          setError(e)
        }
        await wait(2000);
        setLoading(false)
      }
  
      return <ProductContext.Provider value={{
        products,error,loading,addProduct,
        getProductsLocal,deleteProduct,editProduct
      }}>
        {children}
      </ProductContext.Provider>
  }
  
  export const useProducts = () => {
  
    const context = useContext(ProductContext)
    if(!context) {
      throw new Error("ProductContext not provided")
    }
    return context
      /*const [products,setProducts] = useState<Product[]>([])
      const [error,setError] = useState<unknown>()
  
      useEffect(() => {
        if(category) {
          getCategory(category).then(setProducts).catch(setError)
        } else {
          getProducts().then(setProducts).catch(setError)
        }
      }, [category])
      
  
      return {products, error}*/
}