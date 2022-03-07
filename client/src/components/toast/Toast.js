import { useState, useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'

const Toast = ({
  show,
  message,
  closeToast
}) => {
  const [isOpen, _setIsOpen] = useState(false);
  const openRef = useRef(isOpen);

  // track current state using a ref
  const setIsOpen = (x) => {
    openRef.current = x;
    _setIsOpen(x);
  }

  // set state equal to props input
  useEffect(() => {
    setIsOpen(show);
  }, [show])

  // add event listeners
  useEffect(() => {
    const listener = () => {
      if (openRef.current) closeToast();
    }
    window.addEventListener('click', listener);
    window.addEventListener('keydown', listener);

    // clear listeners on dismount
    return () => {
      window.removeEventListener('click', listener);
      window.removeEventListener('keydown', listener);
    }
  }, [closeToast])

  // close toast automatically after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000);

      // clear timer on dismount
      return () => {
        clearTimeout(timer);
      }
    }
  }, [isOpen, closeToast])

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="p-3 border rounded shadow-lg bg-white">{message}</div>
    </Transition>
  )
}

export default Toast;
