import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Nav from './Nav.jsx'
import ParallaxScroll from './ParallaxScroll.jsx'
import APropos from './APropos.jsx'
import Work from './Work.jsx'
import Wave from './Wave.jsx'
import teaserVideo from '../../brand/video/Teaser Reflet du crime - Film Interactif.mp4'
import meImg from '../../brand/images/moi/me.png'

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
    <main className="home" id="top" ref={rootRef}>
      <Nav />

      <section className="hero">
        <video
          className="hero__video"
          src={teaserVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="hero__content">
          <img
            ref={imgRef}
            className="hero__me"
            src={meImg}
            alt=""
            aria-hidden="true"
          />
          <h2 className="hero__title">
            <span className="hero__line hero__line--big">
              Hello <Wave className="hero__wave" />, moi c&apos;est{' '}
              <strong
                className="hero__trigger hero__mark"
                onMouseEnter={onEnter}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
              >
                SmyleBreak
              </strong>
            </span>

            <span className="hero__line">
              Si t&apos;es arrivé ici, c&apos;est que tu souhaites découvrir mon
              travail 🎬. C&apos;est parfait, t&apos;es au{' '}
              <strong>bon endroit</strong> !
            </span>

            <span className="hero__line hero__line--tail">
              Si t&apos;es perdu sur internet, tu peux repartir… ou rester.{' '}
              <strong>Bonne visite !</strong>
            </span>
          </h2>
        </div>
      </section>

      <ParallaxScroll />
      <APropos />
      <Work />
    </main>
  )
}

export default Home