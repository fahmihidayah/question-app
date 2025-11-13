import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Platform tanya jawab kajian',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.png`,
    },
  ],
  siteName: 'Tanya Kuttab',
  title: 'Tanya Kuttab',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
