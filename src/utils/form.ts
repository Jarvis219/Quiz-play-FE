import { each, isUndefined, omitBy } from '.'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformFormDataRequestBody(input: any): FormData {
  input = omitBy(input, isUndefined)

  const form = new FormData()

  each(input, (value, key) => {
    if (value instanceof File) {
      form.append(key, value)
      return
    }

    if (value instanceof Date) {
      form.append(key, value.toISOString())
      return
    }

    if (value instanceof Array || value instanceof Object) {
      form.append(key, JSON.stringify(value))
      return
    }

    form.append(key, value as string)
  })

  return form
}
