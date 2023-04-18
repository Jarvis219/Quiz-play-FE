import { GetServerSideProps } from 'next'
import { isAuthenticatedAdmin, redirectToHome } from '../api/middleware'

const DashboardPage = () => {
  return <div>DashboardPage</div>
}

export default DashboardPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwtToken } = req['cookies']

  if (!jwtToken) {
    return redirectToHome
  }

  const isAdmin = await isAuthenticatedAdmin({ token: jwtToken })

  if (!isAdmin) {
    return redirectToHome
  }

  return {
    props: {},
  }
}
