import { User } from "./Definitions";



export function isAdmin(user: User | undefined)  {
    if(!user) return false
    for(var role of user.roles) {
        if(role.name === 'ROLE_ADMIN')return true
    }
    return false
}