import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowSvg from '../../brand/icones/Flèche Droite.svg?raw'

gsap.registerPlugin(ScrollTrigger)

import showreelUrl from '../../brand/video/showreel.mp4?url'
import combatUrl from '../../brand/video/combat contre son corps.mp4?url'
import iutUrl from '../../brand/video/180sIUT.mp4?url'

const PROJECTS = [
  { video: showreelUrl, title: 'Showreel', format: 'vertical' },
  { video: combatUrl, title: 'Combat contre son corps', format: 'horizontal' },
  { video: iutUrl, title: '180s IUT', format: 'square' },
]

function Work() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let ctx

    document.fonts.ready.then(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          sectionRef.current,
          { backgroundColor: '#222222' },
          {
            backgroundColor: '#ffffff',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: true,
            },
          },
        )

        gsap.utils.toArray('.work__card').forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            },
          )
        })

        gsap.utils.toArray('.work__video').forEach((video) => {
          gsap.fromTo(
            video,
            { scale: 1.15 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: video.closest('.work__card'),
                start: 'top 95%',
                end: 'top 30%',
                scrub: true,
              },
            },
          )
        })
      }, sectionRef)

      ScrollTrigger.refresh()
    })

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section className="work" ref={sectionRef}>
      <div className="work__grid">
        {PROJECTS.map((project) => (
          <a
            className={`work__card work__card--${project.format}`}
            href="#"
            key={project.title}
          >
            <div className="work__video-wrap">
              <video
                className="work__video"
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <div className="work__bar">
              <span className="work__label">{project.title}</span>
              <span
                className="work__arrow"
                dangerouslySetInnerHTML={{ __html: ArrowSvg }}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Work