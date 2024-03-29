import { type } from "os"

export type SignUpForm = {
    username:string
    email:string
    password:string
}
export type SignInForm = {
    username:string
    password:string
}


export type CartItemDTO = {
    itemId:number
    quantity:number
}


export type NewProductForm = {
    title:string
    price:number
    description: string
    barcode:string
    img:string
}

export type Product = {
    title:string
    barcode:string
    id:number
    price:number
    description:string
    img:string
}


export type Order ={ 
    items: (NewProductForm & {itemId:string, quantity:number})[]
    address:string
}

export type BadRequest  = {
    "Validation Failed for property" : string
    detail:string
    instance:string
    message: string 
    rejectedValue:string 
    status: number
    timestamp: string
    title:string
    type:string
}

export type CartItem = {
    id: number
    item: Product
    quantity: number
}

export type Cart = {
    items : Array<CartItem>
    id: number
}

export type User = {
    id:number
   // username:string
    password:string
    email:String
    cart: Cart
    roles :{name:string, id:string | number}[]
}

export type Token = {
    access_token:string
}

export type UserDetailsForm = {
    name: string
    address: string
    phone: string
}

export type OrderRequestDto = {
    cartId: number
    address: string
    phone: string
    cart : Array<CartItemDTO>
}
export type OrderResponseDto = {
    newCartId: number
    address: string
    phone: string
    cart : Cart
    orderConfirmationId: string
}


export const SiteColor = 'rgb(137, 93, 242)'

