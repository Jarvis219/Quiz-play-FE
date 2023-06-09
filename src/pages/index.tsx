import Overview from '@/components/home/Overview'
import { Main, Meta } from '@/layouts'

export default function Home() {
  return (
    <Main
      meta={
        <Meta
          title='Quiz Play'
          description='Quiz Play is a platform for creating and playing quizzes. Create your own quiz or play quizzes created by others.'
        />
      }>
      <Overview />
    </Main>
  )
}
