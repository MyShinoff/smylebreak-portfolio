import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ClapAnim from './ClapAnim.jsx'
import carbonneLogo from '../../brand/images/Logos/carbonnecafe.webp'

gsap.registerPlugin(ScrollTrigger, SplitText)

const PARAGRAPHS = [
  {
    side: 'right',
    content: (
      <>
        Je suis diplômé d'un Baccalauréat en Sciences et Technologies de
        l'Industrie et du Développement Durable et d'un BUT en Métiers du
        multimédia 🎬.{' '}
        Passionné par l'art de raconter des histoires visuellement, je suis
        désormais à temps plein chez{' '}
        <img className="about__logo" src={carbonneLogo} alt="Carbone Café" />,
        l'agence qui m'a accueilli en alternance 2 ans auparavant.
      </>
    ),
  },
  {
    side: 'left',
    content: (
      <>
        Je suis spécialisé dans la production et la post-production vidéo, de la
        première prise au montage final. Mon objectif est de donner vie à des
        visions artistiques tout en conjuguant rigueur technique et créativité !
        🎬
      </>
    ),
  },
]

function APropos() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const splits = []
    let ctx

    const build = () => {
      gsap.utils.toArray('.about__text').forEach((text) => {
        splits.push(
          SplitText.create(text, {
            type: 'words',
            mask: 'words',
            wordsClass: 'about__word',
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                yPercent: 110,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.04,
                scrollTrigger: { trigger: text, start: 'top 82%', once: true },
              })
            },
          }),
        )
      })
    }

    const placeClaps = () => {
      gsap.utils.toArray('.about__clap').forEach((clap) => {
        const row = clap.closest('.about__row')
        const p = row && row.querySelector('.about__text')
        if (!p) return
        const w = clap.offsetWidth
        clap.style.left = `${Math.max(0, p.offsetLeft / 2 - w / 2 + w * 0.1)}px`
      })
    }

    document.fonts.ready.then(() => {
      ctx = gsap.context(build, sectionRef)

      placeClaps()
      window.addEventListener('resize', placeClaps)
      ScrollTrigger.refresh()
    })

    return () => {
      if (ctx) ctx.revert()
      splits.forEach((s) => s.revert())
      window.removeEventListener('resize', placeClaps)
    }
  }, [])

  return (
    <section className="about" id="a-propos" ref={sectionRef}>
      {PARAGRAPHS.map((p, index) =>
        p.side === 'right' ? (
          <div className="about__row" key={index}>
            <ClapAnim />
            <p className="about__text about__text--right">{p.content}</p>
          </div>
        ) : (
          <p className="about__text about__text--left" key={index}>
            {p.content}
          </p>
        ),
      )}
    </section>
  )
}

export default APropos