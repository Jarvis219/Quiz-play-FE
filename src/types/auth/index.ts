export interface IReisterViaUsername {
  full_name: string
  email: string
  username: string
  password: string
  phone_number?: string
  address?: string
  avatar?: string
}

export interface ILoginWithUsername {
  username: string
  password: string
}
