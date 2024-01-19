import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom"
import { UserContextProvider } from "./context/UserContext"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { ProductContextProvider } from "./context/ProductContext"
import './index.css'
ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    <UserContextProvider>
        <ProductContextProvider>
      <ShoppingCartProvider>
          <App />
      </ShoppingCartProvider>
        </ProductContextProvider>
    </UserContextProvider>
    </BrowserRouter>
)
