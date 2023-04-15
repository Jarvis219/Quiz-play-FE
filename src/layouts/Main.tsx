import Header from '@/components/header/Header'
import type { ReactNode } from 'react'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className='w-full'>
    {props.meta}

    <div className='flex flex-col justify-between h-screen mb-auto'>
      <Header />
      <main className='container mx-auto mt-20 w-full'>{props.children}</main>
      <footer></footer>
    </div>
  </div>
)

export { Main }
