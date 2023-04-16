import { publicRequest } from '@/services'
import { IUpdateProfile, IUserDetail } from '@/types/user'

export class Profile {
  static async updateProfile({
    first_name,
    last_name,
    username,
    phone_number,
    address,
    avatar,
  }: IUpdateProfile): Promise<IUserDetail> {
    const { data } = await publicRequest.patch('/user/update/profile', {
      first_name,
      last_name,
      username,
      phone_number,
      address,
      avatar,
    })
    return data
  }
}
