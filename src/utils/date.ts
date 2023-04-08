import { format } from 'date-fns'

// Returns the date in the given format, defaults to 'do MMMM yyyy'.
// formatString is in the format of date-fns (https://date-fns.org/v2.0.0-alpha.27/docs/format)
export function formatDate(date: string | Date | number, formatString = 'do MMMM yyyy') {
  return format(new Date(date), formatString)
}
