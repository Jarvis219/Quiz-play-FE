export interface IAvatarResponse {
  id: string
  name: string
  url: string
}

export interface ICreateAvatar {
  name: string
  avatar: File
}

export interface IUploadImage {
  originFileObj: File | string
}
