import { AuthStore as AuthStoreModel } from './index'

export as namespace IAuthStore

export interface AuthStore extends AuthStoreModel {}

export interface LoginParams {
    userName: string
    password: string | null
}

export interface UserInfo extends LoginParams {
    token: string
    userID: number
    roleID: number
    displayName: string
}
