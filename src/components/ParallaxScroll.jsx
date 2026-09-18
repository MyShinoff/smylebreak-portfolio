import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import p1 from '../../brand/images/photos/1.png'
import p2 from '../../brand/images/photos/2.png'
import p3 from '../../brand/images/photos/3.png'
import p4 from '../../brand/images/photos/4.png'
import p5 from '../../brand/images/photos/5.png'
import p6 from '../../brand/images/photos/6.png'
import p7 from '../../brand/images/photos/7.png'
import p8 from '../../brand/images/photos/8.png'
import p9 from '../../brand/images/photos/9.png'

const bands = [
  { imgs: [p1, p4, p7], speed: 120 },
  { imgs: [p2, p5, p8], speed: -80 },
  { imgs: [p3, p6, p9], speed: 180 },
]

function ParallaxScroll() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const bandEls = section.querySelectorAll('.parallax__band')

      bandEls.forEach((band, i) => {
        gsap.fromTo(
          band,
          { y: bands[i].speed },
          {
            y: -bands[i].speed,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )
      })

      const home = document.querySelector('.home')
      if (home) {
        gsap.fromTo(
          home,
          { backgroundColor: '#ffffff' },
          {
            backgroundColor: '#222222',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top top',
              scrub: 1,
              onUpdate: (self) => {
                home.classList.toggle('home--dark', self.progress > 0.4)
              },
            },
          },
        )
      }
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      ctx.revert()
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <>
      <section className="parallax" ref={sectionRef}>
        {bands.map((band, i) => (
          <div className={`parallax__band parallax__band--${i + 1}`} key={i}>
            {band.imgs.map((src, j) => (
              <img className="parallax__img" src={src} key={j} alt="" />
            ))}
          </div>
        ))}
      </section>
    </>
  )
}

export default ParallaxScroll