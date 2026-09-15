import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Nav from './Nav.jsx'
import ParallaxScroll from './ParallaxScroll.jsx'
import meImg from '../../brand/images/moi/me.png'
import underlineImg from '../../brand/images/surlignements/surlignement_homepage.svg'

function Home({ visible }) {
  const rootRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!visible) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [visible])

  const onEnter = () => {
    imgRef.current?.style.setProperty('opacity', '1')
  }

  const onMove = (e) => {
    const el = imgRef.current
    if (!el) return
    el.style.left = `${e.clientX + 22}px`
    el.style.top = `${e.clientY - 74}px`
  }

  const onLeave = () => {
    imgRef.current?.style.setProperty('opacity', '0')
  }

  return (
    <main className="home" ref={rootRef}>
      <Nav />

      <section className="intro">
        <img
          ref={imgRef}
          className="intro__me"
          src={meImg}
          alt=""
          aria-hidden="true"
        />
        <h2
          className="intro__title"
          style={{ '--intro-underline': `url("${underlineImg}")` }}
        >
          <span className="intro__line intro__line--big">
            Hello 👋, moi c&apos;est{' '}
            <strong
              className="intro__trigger"
              onMouseEnter={onEnter}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              Smylebreak
            </strong>
          </span>

          <span className="intro__line">
            Si t&apos;es arrivé ici, c&apos;est que tu souhaites découvrir mon travail 🎬.
            C&apos;est parfait, t&apos;es au <strong>bon endroit</strong> !
          </span>

          <span className="intro__line intro__line--tail">
            Si t&apos;es perdu sur internet, tu peux repartir… ou rester.{' '}
            <strong>Bonne visite !</strong>
          </span>
        </h2>
      </section>

      <ParallaxScroll />
    </main>
  )
}

export default Home