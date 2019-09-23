import { useRef, useEffect } from 'react'

const useCurrent = value => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref
}

export default useCurrent
