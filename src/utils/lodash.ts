/**
 * Filter an array by a unique value based on a callback function.
 * @param array Array to filter
 * @param iteratee Callback function that returns a unique value of the array
 * @returns Filtered array
 */
export function uniqBy<T>(array: T[], iteratee: (value: T) => any): T[] {
  const seen = new Set()
  return array.filter((value) => {
    const key = iteratee(value)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

// cloneDeep recursively clones an object and all of its sub-objects. This
// function is used to create a copy of an object that can be mutated without
// changing the original object.
export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const clonedObj: any = Array.isArray(obj) ? [] : {}
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      clonedObj[prop] = cloneDeep(obj[prop])
    }
  }
  return clonedObj as T
}

/**
 * Filters an array of strings, returning only the unique strings.
 * @param arr The array of strings to filter.
 * @returns An array of strings that are unique to the input array.
 */
export function uniqueArray(arr: string[]): string[] {
  return arr.filter((v, i, a) => v && a.indexOf(v) === i)
}

// isEmpty() checks if the given value is empty
// Returns true if the value is empty, false otherwise
// An empty value is one of:
//  - null
//  - undefined
//  - an empty array
//  - an empty string
//  - an object with no keys
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true
  } else if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0
  } else {
    return false
  }
}

/**
 * Shorten `text` to `maxLength` characters, appending '...' if the text was shortened.
 * @param text The text to shorten.
 * @param maxLength The maximum length of the text.
 */

export function shortenText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}
