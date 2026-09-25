'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    __drGabrielPostHogInitialized?: boolean
  }
}

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

function getDistinctId() {
  const storageKey = 'dr-gabriel-posthog-id'
  const existingId = window.localStorage.getItem(storageKey)
  if (existingId) return existingId
  const distinctId = crypto.randomUUID()
  window.localStorage.setItem(storageKey, distinctId)
  return distinctId
}

function capture(event: string, properties: Record<string, string> = {}) {
  if (!posthogKey || typeof window === 'undefined') return

  const currentUrl = new URL(window.location.href)
  const sourceProperties = {
    $current_url: currentUrl.href,
    $pathname: currentUrl.pathname,
    $referrer: document.referrer,
    utm_source: currentUrl.searchParams.get('utm_source') || '',
    utm_medium: currentUrl.searchParams.get('utm_medium') || '',
    utm_campaign: currentUrl.searchParams.get('utm_campaign') || '',
    ...properties,
  }

  void fetch(`${posthogHost}/capture/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: posthogKey, event, properties: sourceProperties, distinct_id: getDistinctId() }),
    keepalive: true,
  }).catch(() => undefined)
}

export function PostHogAnalytics() {
  useEffect(() => {
    if (!posthogKey || window.__drGabrielPostHogInitialized) return
    window.__drGabrielPostHogInitialized = true
    capture('$pageview')

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (href.includes('wa.me')) capture('whatsapp_click', { placement: link.textContent?.trim() || 'floating_button' })
      if (href.includes('calendly.com')) capture('calendly_click', { placement: link.textContent?.trim() || 'booking' })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}