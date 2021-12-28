import Data from '../src/lib/Data'

import dynamic from 'next/dynamic';

const Mapbox = dynamic(
  () => import('@components/Mapbox'),
  {
    loading: () => <p>Loading map</p>,
    ssr: false
  }
)

export default function Home() {

  const dataStart = new Data();
  dataStart.setViewPort().latitude(-15.791592864042546).longitude(-47.889556334719465).zoom(5)

  return (
      <Mapbox data={dataStart.ready()} />
  )
}
