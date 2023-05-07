import QButton from '@/components/base/QButton'
import QInput from '@/components/base/QInput'
import QUploadFile from '@/components/base/QUploadFile'
import { keyItemMenu } from '@/constants'
import { Meta } from '@/layouts'
import Admin from '@/layouts/Admin'
import { isAuthenticatedAdmin, redirectToHome } from '@/pages/api/middleware'
import { EButtonType, ICreateQuiz, QuizType } from '@/types'
import { validationMessages } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'antd'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

const QuizModal = dynamic(() => import('@/components/admin/create-quiz/QuizModal'), { ssr: false })

const CreateQuizPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const quizDetailSchema = z.object({
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

  const quizSchema = z.object({
    title: z
      .string({
        required_error: validationMessages.required('Title'),
      })
      .min(1)
      .max(100),
    content: z
      .string({
        required_error: validationMessages.required('Content'),
      })
      .min(1)
      .max(1000),
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
    published: z.boolean().optional().default(false),
    quizDetails: z.array(quizDetailSchema).min(1, validationMessages.required('Quiz detail')),
  })

  const { control, handleSubmit, setError } = useForm<ICreateQuiz>({
    resolver: zodResolver(quizSchema),
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'quizDetails' })
  const questions = useWatch({ control, name: 'quizDetails' })
  console.log('questions: ', questions)

  const onSubmit = (data: ICreateQuiz) => {
    console.log(data)
  }

  // const handleAddQuestion = () => {
  //   append({
  //     question: '',
  //     points: 1,
  //     type: QuizType.SINGLE_CHOICE,
  //     photo: [] as string[],
  //     answers: [
  //       {
  //         answer: '',
  //         isCorrect: true,
  //       },
  //       {
  //         answer: '',
  //         isCorrect: false,
  //       },
  //     ],
  //   })
  // }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const handleSubmitModal = (data: any) => {
    console.log('data: ', data)
  }

  const classesInput = 'rounded-3xl drop-shadow py-3 px-4 text-xs'
  const sizeMarginBottomInput = '0.7rem'

  return (
    <Admin selectKey={[keyItemMenu.create]} meta={<Meta title='Quiz play admin' description='' />}>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl'>Create Quiz</h1>
        <QButton type={EButtonType.primary} onClick={handleSubmit(onSubmit)}>
          Save
        </QButton>
      </div>

      <div className='mt-4'>
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
          <div className='flex justify-between gap-4'>
            <QInput
              control={control}
              name='title'
              label='Tile'
              className={classesInput}
              sizeMarginBottom={sizeMarginBottomInput}
              placeholder='Enter title'
              required
            />
            <QInput
              control={control}
              name='content'
              label='Content'
              className={classesInput}
              sizeMarginBottom={sizeMarginBottomInput}
              placeholder='Enter content'
              required
            />
          </div>
          <div className='w-[150px]'>
            <label htmlFor='photo'>
              <span className='text-sm mb-2 block'>Photo</span>
            </label>
            <QUploadFile name='photo' control={control} setError={setError} />
          </div>

          <div className='mt-4'>
            {/* <QButton onClick={handleAddQuestion}>Add question</QButton> */}
            {/* {fields.map((item, index) => (
              <div key={item.id} className='mt-4'>
                <div>
                  <div className='flex justify-between gap-5'>
                    <div className='w-full'>
                      <QInput
                        control={control}
                        name={`quizDetails[${index}].question`}
                        label='Question'
                        className={classesInput}
                        sizeMarginBottom={sizeMarginBottomInput}
                        placeholder='Enter question'
                        required
                      />
                      <div className='flex items-end gap-5'>
                        <QInput
                          control={control}
                          name={`quizDetails[${index}].points`}
                          label='Points'
                          type={EInputType.NUMBER}
                          className={classesInput}
                          sizeMarginBottom={sizeMarginBottomInput}
                          placeholder='Enter points'
                          required
                        />
                        <Radio.Group name={`quizDetails[${index}].type`} className='my-4'>
                          <Radio value={QuizType.SINGLE_CHOICE}>Single choice</Radio>
                          <Radio value={QuizType.MULTIPLE_CHOICE}>Multiple choice</Radio>
                        </Radio.Group>
                      </div>
                    </div>

                    <div className='w-[150px]'>
                      <label htmlFor='photo'>
                        <span className='text-sm mb-2 block'>Photo</span>
                      </label>
                      <QUploadFile name={`quizDetails[${index}].photo`} control={control} setError={setError} />
                    </div>
                  </div>
                  <div className='flex justify-between gap-4'></div>

                  {item.answers.map((answer, indexAnswer) => (
                    <div key={indexAnswer} className='flex justify-between gap-4'>
                      <QInput
                        control={control}
                        name={`quizDetails[${index}].answers[${indexAnswer}].answer`}
                        label='Answer'
                        className={classesInput}
                        sizeMarginBottom={sizeMarginBottomInput}
                        placeholder='Enter answer'
                        required
                      />

                      {questions?.[index]?.type === QuizType.MULTIPLE_CHOICE ? (
                        <Checkbox name={`quizDetails[${index}].answers[${indexAnswer}].isCorrect`}>Correct</Checkbox>
                      ) : (
                        <Radio.Group
                          name={`quizDetails[${index}].answers[${indexAnswer}].isCorrect`}
                          defaultValue={answer.isCorrect}>
                          <Radio value={true}>Correct</Radio>
                          <Radio value={false}>Incorrect</Radio>
                        </Radio.Group>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))} */}
          </div>
        </Form>
      </div>
      <QuizModal isModalOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
    </Admin>
  )
}

export default CreateQuizPage

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
