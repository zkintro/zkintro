import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import siteMetadata from '@/data/siteMetadata'

const FathomAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads

    Fathom.load(`'${siteMetadata.analytics.fathomSiteId}'`, {
      includedDomains: ['zkintro.com'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <Script
      src="https://cdn.usefathom.com/script.js"
      site={siteMetadata.analytics.fathomSiteId}
      defer
    />
  )
}

export default FathomAnalytics
