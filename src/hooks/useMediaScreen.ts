import { useMediaQuery } from 'usehooks-ts'

// This function takes in a breakpoint and returns a boolean indicating if the
// client's screen size is smaller than the breakpoint. It uses the useMediaQuery
// hook from Material UI to determine the client's screen size.
const useMediaScreen = () => {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  return { isMobile, isTablet, isDesktop }
}

export default useMediaScreen
