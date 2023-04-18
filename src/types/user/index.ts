export enum EUserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUserDetail {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  phone_number: string
  address: string
  is_active: boolean
  is_verified: boolean
  role: EUserRoles
  avatar?: string
  email_unverify?: string
  token_expiry_date?: string
  reset_password_token?: string
}

export interface IUser {
  accessToken: string
  user: IUserDetail
}

export interface IUpdateProfile {
  first_name?: string
  last_name?: string
  phone_number?: string
  address?: string
  avatar?: string | File
  username?: string
}
