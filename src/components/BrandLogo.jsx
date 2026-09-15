import { useMemo } from 'react'
import logoPortfolioRaw from '../../brand/logos/logo_portfolio.svg?raw'

function parseLogo(raw) {
  const clean = raw.replace(/^<\?xml[\s\S]*?\?>\s*/, '')
  const doc = new DOMParser().parseFromString(clean, 'image/svg+xml')
  const svg = doc.querySelector('svg')
  return {
    viewBox: svg.getAttribute('viewBox'),
    inner: svg.innerHTML,
  }
}

function BrandLogo({ className }) {
  const logo = useMemo(() => parseLogo(logoPortfolioRaw), [])

  return (
    <svg
      className={className}
      viewBox={logo.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SmyleBreak"
      dangerouslySetInnerHTML={{ __html: logo.inner }}
    />
  )
}

export default BrandLogo