import QFormEditor from '@/components/base/QFormEditor'
import QModalLayout from '@/components/base/QModalLayout'
import QUploadFile from '@/components/base/QUploadFile'
import { AnswerColor, IQuizDetail, QuizType, mapColor } from '@/types'
import { validationMessages } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'
import QInputAnswer from './QInputAnswer'

interface IQuizModalProps {
  isModalOpen: boolean
  onClose: () => void
  onSubmit?: (data: any) => void
}

const QuizModal = ({ isModalOpen, onClose, onSubmit }: IQuizModalProps) => {
  const modalRef = useRef(null)

  const color = {
    0: AnswerColor.BLUE,
    1: AnswerColor.PINK,
    2: AnswerColor.TEAL,
    3: AnswerColor.VIOLET,
    4: AnswerColor.YELLOW,
  }

  const schema = z.object({
    question: z
      .string({
        required_error: validationMessages.required('Question'),
      })
      .min(1)
      .max(1000),
    points: z
      .number()
      .min(1, validationMessages.required('Points'))
      .transform((value) => Number(value)),
    type: z.string().refine((value) => value === QuizType.SINGLE_CHOICE || value === QuizType.MULTIPLE_CHOICE, {
      message: validationMessages.required('Type'),
    }),
    photo: z.union([
      z
        .array(
          z
            .string({
              required_error: validationMessages.required('Photo'),
            })
            .refine((value) => value.startsWith('http'), {
              message: validationMessages.required('Photo'),
            })
        )
        .min(1, validationMessages.required('Photo')),
      z
        .array(
          z
            .object({
              originFileObj: z.any(),
            })
            .refine((value) => value.originFileObj instanceof File, {
              message: validationMessages.required('Photo'),
            })
        )
        .min(1, validationMessages.required('Photo')),
    ]),
    answers: z
      .array(
        z.object({
          answer: z
            .string({
              required_error: validationMessages.required('Answer'),
            })
            .min(1)
            .max(1000),
          isCorrect: z.boolean().optional().default(false),
        })
      )
      .min(2, validationMessages.required('Answers')),
  })

  const { control, handleSubmit, setError } = useForm<IQuizDetail>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  useOnClickOutside(modalRef, () => onClose())
  return (
    <QModalLayout open={isModalOpen} width={1280}>
      <div ref={modalRef}>
        <header className='text-center mt-6'>
          <h2 className='text-4xl text-gray-700'>Create Quiz</h2>
        </header>
        <main className='mt-10'>
          <div className='flex justify-start'>
            <QUploadFile name='photo' control={control} setError={setError} />
            <QFormEditor control={control} name='question' />
          </div>
          <div className='mt-4 flex justify-start items-center gap-4'>
            <QInputAnswer control={control} name='answer' color={mapColor[color[0]]} />
            {/* <QInputAnswer control={control} name='answer' color={color[1]} /> */}
          </div>
        </main>
      </div>
    </QModalLayout>
  )
}

export default memo(QuizModal)
