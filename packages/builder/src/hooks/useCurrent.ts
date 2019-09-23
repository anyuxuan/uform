import { useRef } from 'react'

const useCurrent = value => {
  const ref = useRef(null)
  ref.current = value
  return ref
}

export default useCurrent
