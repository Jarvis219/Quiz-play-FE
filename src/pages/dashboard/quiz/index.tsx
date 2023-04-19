import { isAuthenticatedAdmin, redirectToHome } from '@/pages/api/middleware'
import { GetServerSideProps } from 'next'

const QuizPage = () => {
  return <div>quiz page</div>
}

export default QuizPage

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
