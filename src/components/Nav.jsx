import BrandLogo from './BrandLogo.jsx'
import star0 from '../../brand/hover_nav/étoile 0.svg?raw'
import star1 from '../../brand/hover_nav/étoile 1.svg?raw'
import star2 from '../../brand/hover_nav/étoile 2.svg?raw'

const LINKS = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Contact', href: '#contact' },
]

const STAR_FRAMES = [star0, star1, star2].map((raw) => {
  const doc = new DOMParser().parseFromString(
    raw.replace(/^<\?xml[\s\S]*?\?>\s*/, ''),
    'image/svg+xml',
  )
  const svg = doc.querySelector('svg')
  return {
    viewBox: svg.getAttribute('viewBox'),
    inner: svg.innerHTML,
  }
})

function StarHover() {
  return (
    <span className="nav__hover" aria-hidden="true">
      {STAR_FRAMES.map((frame, index) => (
        <svg
          key={index}
          className="nav__hover-frame"
          viewBox={frame.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: frame.inner }}
        />
      ))}
    </span>
  )
}

function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top" aria-label="Retour en haut">
        <BrandLogo className="brand-logo nav__logo" />
      </a>

      <nav className="nav__links" aria-label="Navigation principale">
        {LINKS.map((link) => (
          <a key={link.label} className="nav__link" href={link.href}>
            {link.label}
            <StarHover />
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Nav