import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../utils/Definitions";
import { me } from "../services/authService";
import { message } from "antd";



type Maybe<T> = T | undefined | null

export interface IUserContext {
    user: User | undefined
    token : Maybe<string>
    setUser: (user: User | undefined) => void
    setToken: (token: string | undefined) => void
    signOut: () => void
}

const UserContext = createContext<IUserContext | null>(null)


export const UserContextProvider = ({children} : {children: React.ReactNode}) => {

    const [user,setUser] = useState<User | undefined>()
    const [token,setToken] = useState<Maybe<string>>(localStorage.getItem('token'))


    useEffect(() => {
        if(token && !user)  {
            const fetchUser = async () =>  {
                try {
                    const deUser = await me()
                    setUser(deUser)
                } catch(e) {}
                }
            fetchUser()
        } else if(!token) {
            setUser(undefined) // logged out
        }
    },[token])


    const signOut =() => {
        localStorage.removeItem('token')
        localStorage.removeItem("shopping-cart")
        setToken(undefined)
        setUser(undefined)
        message.info("Signed out successfully")
    }
    return <UserContext.Provider value={{setUser,setToken,user,token,signOut}}>
        {children}
    </UserContext.Provider>
}
export function useUser() {
  const context =  useContext(UserContext)
  if(!context) {
    throw new Error("User ctx not provided")
  }
  return context
}