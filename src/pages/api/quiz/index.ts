import { fetcher } from '@/services'
import { ICreateQuiz, IQuiz } from '@/types'
import { transformFormDataRequestBody } from '@/utils'

export class Quiz {
  static async getQuiz(): Promise<IQuiz> {
    const data = await fetcher('/quiz')
    return data
  }

  static async getQuizBySlug({ slug }: { slug: number }): Promise<IQuiz> {
    const data = await fetcher(`/quiz/${slug}`)
    return data
  }

  static async create(body: ICreateQuiz): Promise<IQuiz> {
    const data = await fetcher('/quiz/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: transformFormDataRequestBody(body),
    })
    return data
  }

  static async update({ slug, body }: { body: ICreateQuiz; slug: number }): Promise<IQuiz> {
    const data = await fetcher(`/quiz/update/${slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: transformFormDataRequestBody(body),
    })
    return data
  }

  static async delete({ slug }: { slug: number }): Promise<boolean> {
    const data = await fetcher(`/quiz/delete/${slug}`, {
      method: 'DELETE',
    })
    return data
  }
}
