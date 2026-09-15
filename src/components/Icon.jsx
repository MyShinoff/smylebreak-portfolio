import { useMemo } from 'react'
import starRaw from '../../brand/icones/Étoile.svg?raw'
import arrowDownRaw from '../../brand/icones/Flèche Bas.svg?raw'
import infoRaw from '../../brand/icones/Information.svg?raw'

const ICONS = {
  star: starRaw,
  'arrow-down': arrowDownRaw,
  info: infoRaw,
}

function parseIcon(raw) {
  const clean = raw.replace(/^<\?xml[\s\S]*?\?>\s*/, '')
  const doc = new DOMParser().parseFromString(clean, 'image/svg+xml')
  const svg = doc.querySelector('svg')
  return {
    viewBox: svg.getAttribute('viewBox'),
    inner: svg.innerHTML,
  }
}

function Icon({ name, className }) {
  const icon = useMemo(() => parseIcon(ICONS[name]), [name])

  return (
    <svg
      className={className}
      viewBox={icon.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.inner }}
    />
  )
}

export default Icon