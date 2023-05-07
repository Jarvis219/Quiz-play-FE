import { keyItemMenu } from '@/constants'
import { Meta } from '@/layouts'
import Admin from '@/layouts/Admin'
import { GetServerSideProps } from 'next'
import { isAuthenticatedAdmin, redirectToHome } from '../api/middleware'

const DashboardPage = () => {
  return (
    <Admin selectKey={[keyItemMenu.dashboard]} meta={<Meta title='Quiz play admin' description='' />}>
      DashboardPage
    </Admin>
  )
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
