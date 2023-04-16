export const validationMessages = {
  required: (field: string) => `${field} is required`,
  email: 'Please enter a valid email',
  password: (minLeng: number) => `Password must be at least ${minLeng} characters`,
  passwordsNotMatch: 'Password does not match',
  username: (minLeng: number) => `Username must be at least ${minLeng} characters`,
  fristName: (minLeng: number) => `First name must be at least ${minLeng} characters`,
  lastName: (minLeng: number) => `Last name must be at least ${minLeng} characters`,
  phoneNumber: (minLeng: number) => `Phone number must be at least ${minLeng} characters`,
  address: (minLeng: number) => `Address must be at least ${minLeng} characters`,
  avatar: 'Avatar must be an image',
  noWhitespace: (field: string) => `${field} cannot contain whitespace`,
  onlyNumber: (field: string) => `${field} must be a number`,
}
