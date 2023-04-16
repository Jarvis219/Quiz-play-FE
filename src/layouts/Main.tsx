import Header from '@/components/header/Header'
import type { ReactNode } from 'react'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <>
    {props.meta}

    <div className='flex flex-col justify-between h-screen mb-auto bg-slate-50'>
      <Header />
      <main className='container px-2 sm:mx-auto mt-20 w-full'>{props.children}</main>
      <footer></footer>
    </div>
  </>
)

export { Main }
