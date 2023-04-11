export enum EUserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  accessToken: string
  user: {
    id: string
    email: string
    username: string
    full_name: string
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
}
