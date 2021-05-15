import { useEffect, useState} from "react"

function checkSize() {
  if (window.innerWidth > 1080)
    return 'xlg'

  if (window.innerWidth > 768)
    return 'lg'

  if (window.innerWidth > 480)
    return 'md'
  
  return 'sm'
} 

const useScreenwidth = ():string => {

  const[windowSize, setWindowSize] = useState('')

  useEffect(()=>{
    setWindowSize(checkSize())
    window.addEventListener('resize', ()=>{
      setWindowSize(checkSize())
    })

    return () => {window.removeEventListener('resize', ()=>{setWindowSize(checkSize())})}
  },[])

  return windowSize
}

export default useScreenwidth;