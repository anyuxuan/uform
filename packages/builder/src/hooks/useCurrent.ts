import { useRef, useEffect } from 'react'

const useCurrent = value => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default useCurrent
