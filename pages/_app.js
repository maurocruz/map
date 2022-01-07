import React from 'react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

import Header from '@components/Header'
import { AppProvider, MapProvider, ContainerProvider } from '../src/contexts/'

import '../styles/globals.scss'


const Mapbox = dynamic(
  () => import('@components/Mapbox'),
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
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />
          <link href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.3/mapbox-gl-geocoder.css' rel='stylesheet' />
        </Head>

        <div id="wrapper" className='wrapper'>

          <ContainerProvider>
            <Header/>  
            <Component/>
          </ContainerProvider>

          <MapProvider>
            <Mapbox />              
          </MapProvider>
            
        </div>

      </AppProvider>

    </SWRConfig>
  )
}

export default App
