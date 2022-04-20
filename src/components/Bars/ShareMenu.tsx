import { useContext, useEffect, useRef, useState } from "react";
import { IconShare } from "@components/Icons"

import { style } from '../../../plinct.config'

import css from './bars.module.scss';
import { ContainerContext } from "@contexts/ContainerContext";
import { BarsLeftContext } from "@contexts/BarsLeftContext";


export default function ShareMenu() 
{
  const { setEventInfo, setGeocoder } = useContext(ContainerContext);
  const { showShare, setShowShare, setShowLayers } = useContext(BarsLeftContext);
  
  const shareRef = useRef(null);
  const shareListRef = useRef(null);  
  
  /** SHARE */
  useEffect(() => {
    if (showShare) {
      const submenu = shareRef.current.lastChild;
      shareRef.current.firstChild.style.backgroundColor = style.color.background.submenu;
      submenu.style.backgroundColor = style.color.background.submenu;
      submenu.style.top = '60px';
      setGeocoder(false);
      setShowLayers(false);
    } else {
      shareRef.current.firstChild.style.backgroundColor = 'white';
    }
  },[showShare]);

  function copyFromIframe() {
    const location = window.location;
    const src = location.origin + '/embed' + location.search;
    const htmlIframe = `<iframe src="${src}"><p>Your browser does not support iframes.</p></iframe>`;

    navigator.clipboard.writeText(htmlIframe).then(() => {
      setEventInfo(<p>Copied iframe for embed!</p>);
      setShowShare(false);
    });
  };

  function copyURL() {
    const location = window.location;
    const href = location.href;
    saveClipboard(href,'Copied URL to clipboard!')

  }

  function copyQuerystrings() {
    const location = window.location;
    const search = location.search; 
    saveClipboard(search,'Copied query strings to clipboard!');
  }

  function saveClipboard(writeText: string, message: string) {
    navigator.clipboard.writeText(writeText).then(() => {
      setEventInfo(<p>{message}</p>);
      setShowShare(false);
    });
  }

  return (
    <div ref={shareRef} className={css.barsMain} data-name='share'>
      <div className={css.barsIconMain} onClick={() => setShowShare(!showShare)}>
        <IconShare width={'28'} color={style.color.icon.green} style={{cursor: 'pointer'}}/>
      </div>
      {showShare && 
        <ul ref={shareListRef} className={css.barsList}>
          <li onClick={copyFromIframe}>Copy viewport to HTML iframe</li>
          <li onClick={copyURL}>copy URL</li>
          <li onClick={copyQuerystrings}>copy query strings</li>
        </ul>
      }
    </div>
  )
}