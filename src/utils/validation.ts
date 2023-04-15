export const validationMessages = {
  required: (field: string) => `${field} is required`,
  email: 'Please enter a valid email',
  password: (minLeng: number) => `Password must be at least ${minLeng} characters`,
  passwordsNotMatch: 'Password does not match',
  username: (minLeng: number) => `Username must be at least ${minLeng} characters`,
  fullName: (minLeng: number) => `Full name must be at least ${minLeng} characters`,
  phoneNumber: (minLeng: number) => `Phone number must be at least ${minLeng} characters`,
  address: (minLeng: number) => `Address must be at least ${minLeng} characters`,
  avatar: 'Avatar must be an image',
}
