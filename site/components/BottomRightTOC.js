import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import TOCInline from '@/components/TOCInline'

const BottomRightTOC = ({ toc }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment').scrollIntoView()
  }
  return (
    <div
      //   className={`fixed right-8 bottom-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
      className={`fixed right-8 bottom-8 hidden flex-col gap-3 text-sm ${
        show ? '2xl:flex' : 'md:hidden'
      }`}
    >
      <TOCInline toc={toc} exclude="" toHeading={3} />
    </div>
  )
}

export default BottomRightTOC
