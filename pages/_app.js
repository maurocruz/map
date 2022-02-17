import React from 'react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

import { AppProvider, MapProvider, ContainerProvider } from '../src/contexts/'

import '../styles/globals.scss'

const MapGl = dynamic(
  () => import('@components/Mapbox/MapGl'),
  {
    loading: () => <div className='iconLoading'><Icon icon="eos-icons:loading" /></div>,
    ssr: false
  }
)

function App({ Component, pageProps }) {

  return (
    <SWRConfig>
      <AppProvider {...pageProps}>
        <Head>
          <title>Plinct map</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>

        <div id="wrapper" className='wrapper'>

          <ContainerProvider>
            <Component/>
          </ContainerProvider>

          <MapProvider>
            <MapGl />
          </MapProvider>
            
        </div>

      </AppProvider>

    </SWRConfig>
  )
}

export default App
