export const AppConfig = {
  api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  redisPort: process.env.NEXT_PRIVATE_REDIS_PORT,
  redisPassword: process.env.NEXT_PRIVATE_REDIS_PASSWORD,
  redisHost: process.env.NEXT_PRIVATE_REDIS_HOST,
  site_name: 'Starter',
  title: 'Nextjs Starter',
  description: 'Starter code for your Nextjs Boilerplate with Tailwind CSS',
  locale: 'en',
}
