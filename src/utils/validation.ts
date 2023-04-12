export const validationMessage = {
  required: (field: string) => `${field} is required`,
  email: 'Please enter a valid email',
  password: 'Password must be at least 8 characters',
  confirmPassword: 'Password does not match',
  username: 'Username must be at least 6 characters',
  fullName: 'Full name must be at least 6 characters',
  phoneNumber: 'Phone number must be at least 10 characters',
  address: 'Address must be at least 6 characters',
  avatar: 'Avatar must be an image',
}
