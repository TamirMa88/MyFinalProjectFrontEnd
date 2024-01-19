import { FunctionComponent } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { message } from "antd";
import { isAdmin } from "../utils/validation";



export const Authenticated = function<T>(Component: FunctionComponent<T>) {
    return function useAuth(props: T) {

        const {user} = useUser()
        if(!user) {
            message.info("You must be logged in to access this page")
            return <Navigate to={"/"}/>
        }
        return <Component {...props as any}/>
    }
}


export const AlreadyLoggedIn = function<T>(Component: FunctionComponent<T>) {
    return function useAuth(props: T) {
        const {user} = useUser()
        if(user) {
            return <Navigate to={"/"}/>
        }
        return <Component {...props as any}/>
    }
}



export const AdminRoute = function<T>(Component: FunctionComponent<T>) {
    return function useAuth(props: T) {
        const {user} = useUser()
        if(!isAdmin(user)) {
            message.info("You are not authorized")
            return <Navigate to={"/"}/>
        }
        return <Component {...props as any}/>
    }
}