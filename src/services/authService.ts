import { httpClient } from ".";
import { SignInForm, SignUpForm, User, BadRequest,Token, OrderRequestDto, OrderResponseDto } from "../utils/Definitions";

export async function signUp(form: SignUpForm) : Promise<User> {

    return httpClient.post("/user/sign-up", JSON.stringify(form))
    .then(response => {
        if(response.data.id) {
            return response.data
        } else {
            throw response.data as BadRequest
        }
    })
}

export async function me() : Promise<User> {
    return httpClient.get("/user/me",)
    .then(response => {
        return response.data
    })
}

export async function newOrder(form: OrderRequestDto) : Promise<OrderResponseDto> {
    return httpClient.post("/user/newOrder", JSON.stringify(form))
    .then(response => {
        return response.data
    }) 
}

export async function signIn(form: SignInForm) : Promise<Token> {
    return httpClient.post<Token>("/user/sign-in", JSON.stringify(form))
    .then(response => {
        if(response.data.access_token) {
            localStorage.setItem('token', response.data.access_token)
        } else {
            throw response.data as any
        }
        return response.data
    }) 
}

// export function isAdmin(userRoles) {
//     // Check if the user has the admin role
//     return userRoles.includes('ADMIN');
//   }