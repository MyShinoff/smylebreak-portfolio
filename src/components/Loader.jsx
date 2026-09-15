import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import grandLineRaw from '../../brand/logos/Logo_grand.svg?raw'
import logoRaw from '../../brand/logos/logo_grand.svg?raw'
import crumpledVideo from '../assets/crumpled-paper.mp4'

gsap.registerPlugin(DrawSVGPlugin)

const parseLogo = (raw) => {
  const clean = raw.replace(/^<\?xml[\s\S]*?\?>\s*/, '')
  const doc = new DOMParser().parseFromString(clean, 'image/svg+xml')
  const svg = doc.querySelector('svg')
  const paths = Array.from(svg.querySelectorAll('path'))
  const wordmark = paths.reduce((a, b) =>
    (a.getAttribute('d') || '').length > (b.getAttribute('d') || '').length
      ? a
      : b,
  )
  const fill = wordmark.getAttribute('fill') || '#ebe406'
  const extras = paths
    .filter((p) => p !== wordmark)
    .map((p) => ({
      d: p.getAttribute('d'),
      fill: p.getAttribute('fill') || fill,
    }))

  return {
    viewBox: svg.getAttribute('viewBox'),
    d: wordmark.getAttribute('d'),
    fill,
    extras,
  }
}

const parseLine = (raw) => {
  const clean = raw.replace(/^<\?xml[\s\S]*?\?>\s*/, '')
  const doc = new DOMParser().parseFromString(clean, 'image/svg+xml')
  const svg = doc.querySelector('svg')
  const path = svg.querySelector('path')
  const d = path.getAttribute('d')
  const subpaths = d.match(/M[^M]+/g) || [d]

  return {
    viewBox: svg.getAttribute('viewBox'),
    strokes: subpaths.map((s) => s.trim()),
  }
}

const unionBox = (acc, box) => {
  if (!acc) return box
  const x = Math.min(acc.x, box.x)
  const y = Math.min(acc.y, box.y)
  const x2 = Math.max(acc.x + acc.width, box.x + box.width)
  const y2 = Math.max(acc.y + acc.height, box.y + box.height)
  return { x, y, width: x2 - x, height: y2 - y }
}

function Loader({ onFinish }) {
  const rootRef = useRef(null)
  const svgRef = useRef(null)
  const videoRef = useRef(null)
  const finishedRef = useRef(false)
  const logo = useMemo(() => parseLogo(logoRaw), [])
  const line = useMemo(() => parseLine(grandLineRaw), [])

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const svgEl = svgRef.current
      const strokes = self.selector('.logo__stroke')
      const smile = self.selector('.logo__smile')
      const fill = self.selector('.logo__fill')

      let box = null
      strokes.forEach((path) => {
        box = unionBox(box, path.getBBox())
      })
      if (smile.length) {
        box = unionBox(box, smile[0].getBBox())
      }
      if (box) {
        const pad = Math.max(box.width, box.height) * 0.02
        svgEl.setAttribute(
          'viewBox',
          `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`,
        )
      }

      const ordered = [...strokes].sort((a, b) => {
        const ab = a.getBBox()
        const bb = b.getBBox()
        return ab.x - bb.x || ab.y - bb.y
      })

      gsap.set(ordered, { drawSVG: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          if (!finishedRef.current) {
            finishedRef.current = true
            onFinish()
          }
        },
      })

      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
        0,
      )

      tl.to(
        ordered,
        {
          drawSVG: '100%',
          duration: 0.45,
          ease: 'power1.inOut',
          stagger: { each: 0.07 },
        },
        0.8,
      )

      gsap.set(fill, { opacity: 0, scale: 1.06 })

      tl.to(
        fill,
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'back.out(2.5)',
        },
        2.0,
      ).to(
        smile,
        { opacity: 1, duration: 0.45 },
        2.15,
      ).to(
        rootRef.current,
        { opacity: 0, duration: 1.2 },
        3.8,
      )
    }, rootRef)

    return () => ctx.revert()
  }, [onFinish])

  return (
    <div className="loader" ref={rootRef}>
      <video
        className="loader__video"
        ref={videoRef}
        src={crumpledVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="loader__overlay" />
      <div className="loader__logo">
        <svg
          ref={svgRef}
          className="logo-svg"
          viewBox={line.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="SmyleBreak"
        >
          {line.strokes.map((d, index) => (
            <path
              key={`stroke-${index}`}
              className="logo__stroke"
              d={d}
            />
          ))}
          <g className="logo__fill">
            <path d={logo.d} fill={logo.fill} />
          </g>
          <g className="logo__smile">
            {logo.extras.map((extra, index) => (
              <path
                key={`extra-${index}`}
                d={extra.d}
                fill={extra.fill}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Loader