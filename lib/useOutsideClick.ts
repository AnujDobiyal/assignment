import { useEffect, useRef } from "react"

//a useful custom hook for whenever it detects a click outside ref it will run a callback function
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    //checks for mouseEvents
    const handleClick = (event: MouseEvent) => {
      //ref.current = ref div and !ref.current.contains... means our mouse is not over ref div
      if(ref.current && !ref.current.contains(event.target as Node)){
        callback() // run callback
      }
    }
    // add a eventlistner for click to dom
    document.addEventListener("mousedown", handleClick);
    //and remove it on return
    return() => {
      document.removeEventListener("mousedown", handleClick)
    }
  },[callback])

  return ref
}