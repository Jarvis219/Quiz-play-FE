export enum QuizType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export enum AnswerColor {
  BLUE = 'blue',
  TEAL = 'teal',
  YELLOW = 'yellow',
  PINK = 'pink',
  VIOLET = 'violet',
}

export interface IAnswerKey {
  background: string
  outline: string
  forcus: string
  textarea: string
}

export interface IAnswerColor {
  [key: string]: IAnswerKey
}

export const mapColor: IAnswerColor = {
  [AnswerColor.BLUE]: {
    background: 'bg-blue-400',
    outline: 'outline-blue-500',
    forcus: 'focus:bg-blue-500',
    textarea: 'bg-blue-400',
  },
  [AnswerColor.TEAL]: {
    background: 'bg-teal-400',
    outline: 'outline-teal-500',
    forcus: 'focus:bg-teal-500',
    textarea: 'bg-teal-400',
  },
  [AnswerColor.YELLOW]: {
    background: 'bg-yellow-400',
    outline: 'outline-yellow-500',
    forcus: 'focus:bg-yellow-500',
    textarea: 'bg-yellow-400',
  },
  [AnswerColor.PINK]: {
    background: 'bg-pink-400',
    outline: 'outline-pink-500',
    forcus: 'focus:bg-pink-500',
    textarea: 'bg-pink-400',
  },
  [AnswerColor.VIOLET]: {
    background: 'bg-violet-400',
    outline: 'outline-violet-500',
    forcus: 'focus:bg-violet-500',
    textarea: 'bg-violet-400',
  },
}

export interface IAnswer {
  id?: number
  quizDetailId?: number
  answer: string
  isCorrect: boolean
}

export interface IQuizDetail {
  id?: number
  quizId?: number
  question: string
  points: number
  type: QuizType
  photo: string
  keyImage: string
  answers: IAnswer[]
}

export interface IQuiz {
  id: number
  slug: string
  code: string
  authorId: number
  title: string
  content: string
  photo: string
  published: boolean
  views: number
  share: number
  countPlayers: number
  quizDetails: IQuizDetail[]
}

export interface ICreateQuiz {
  title: string
  content: string
  photo: string
  published?: boolean
  quizDetails: IQuizDetail[]
}
