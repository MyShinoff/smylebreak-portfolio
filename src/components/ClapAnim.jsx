import clap1 from '../../brand/anim_clap/clap1.svg?raw'
import clap2 from '../../brand/anim_clap/clap2.svg?raw'
import clap3 from '../../brand/anim_clap/clap3.svg?raw'

const CLAP_FRAMES = [clap1, clap2, clap3].map((raw) => {
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

function ClapAnim() {
  return (
    <span className="about__clap" aria-hidden="true">
      {CLAP_FRAMES.map((frame, index) => (
        <svg
          key={index}
          className="about__clap-frame"
          viewBox={frame.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: frame.inner }}
        />
      ))}
    </span>
  )
}

export default ClapAnim