import Head from 'next/head'
import React from 'react'
import { SWRConfig } from 'swr'
import { AppProvider, ContainerProvider } from '../src/contexts'

import '../styles/globals.scss'


function App({ Component, pageProps }) {

  return (
    <SWRConfig>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Plinct map</title>
      </Head>
      <AppProvider {...pageProps}>
        <div id="wrapper" className='wrapper'>

          <ContainerProvider>
            <Component/>
          </ContainerProvider>
            
        </div>
      </AppProvider>
    </SWRConfig>
  )
}

export default App
