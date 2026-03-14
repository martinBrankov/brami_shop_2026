'use client'

export default function loader({ src, width, quality }) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
}
