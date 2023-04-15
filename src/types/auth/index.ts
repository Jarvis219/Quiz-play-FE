export interface IReisterViaUsername {
  email: string
  username: string
  password: string
  full_name?: string
  phone_number?: string
  address?: string
  avatar?: string
}

export interface ILoginWithUsername {
  email?: string
  username?: string
  password: string
}
