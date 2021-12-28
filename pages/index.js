import { Icon } from '@iconify/react';
import Data from '../src/lib/Data'

import dynamic from 'next/dynamic';

import * as styles from '../styles/Home.module.scss'

const Mapbox = dynamic(
  () => import('@components/Mapbox'),
  {
    loading: () => <div className={styles.iconLoading}><Icon icon="eos-icons:loading" /></div>,
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
