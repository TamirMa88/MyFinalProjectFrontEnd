import { httpClient } from ".";
import { Cart, CartItemDTO, Product,NewProductForm, Order } from "../utils/Definitions";


export async function getProducts() : Promise<Product[]>{
    return httpClient.get("/shop").then(response => {
        return response.data
    })
}



export async function adminCreateItem(form : NewProductForm) : Promise<Product> {
    return httpClient.post("/shop/create", JSON.stringify(form))
    .then(response => {
        return response.data
})
}

export async function adminEditItem(id: any, form : NewProductForm) : Promise<Product> {
    return httpClient.patch(`/shop/update/${id}`, JSON.stringify(form))
    .then(response => {
        return response.data
})
}

export async function getCategory(category: string): Promise<Product[]> {
    return httpClient.get('/shop/category/${category}').then(response => {
        return response.data;
    })
}


export async function getOrders(): Promise<Order[]> {
    return httpClient.get('/shop/orders').then(response => {
        return response.data;
    })
}



export async function createOrder<T>(order: T): Promise<T> {
    return httpClient.post('/shop/create-order', JSON.stringify(order)).then(response => {
        return response.data;
    })
}

export async function updateCart(dto : CartItemDTO) : Promise<Cart> {
    return httpClient.put("/user/cart", JSON.stringify(dto))
    .then(response => {
        return response.data
    })
}


export async function adminDeleteItem(id: any): Promise<Product> {
    return httpClient.delete(`/shop/delete/${id}`)
        .then(response => {
    return response.data;
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            throw error;
        });
}
