import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

function Wave({ className }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/lottie.json',
    })
    return () => anim.destroy()
  }, [])

  return <span ref={containerRef} className={className} aria-hidden="true" />
}

export default Wave