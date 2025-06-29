// component/nav.js

'use client'

import Image from "next/image";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import currencies from "@/imformation/currencies";
import allLanguage from "@/imformation/allLanguage";
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext"
import SearchModule from "./searchModule";
import Searching from "./Searching"

export default function Nav() {

  const routerSearchText = useRouter();

  const [searchText, setSearchText] = useState("");
  const searchFunc = () => {
    routerSearchText.push(`?newSearch=${searchText}`);
    setOpenModalSearch(true);
  }

  const { currency } = useCurrency();

  const router = useRouter()
  const handleCurrencyChange = (curren) => {
    router.push(`?currency=${curren}`)
    setOpenModalCurrency(false)
  }

  const [openModalCurrency, setOpenModalCurrency] = useState(false);
  const openCurrency = () => {
    setOpenModalCurrency(!openModalCurrency)
  }

  const [openModalSearch, setOpenModalSearch] = useState(false);
  const openSearch = () => {
    setOpenModalSearch(true)
  }
  const closeSearch = () => {
    setOpenModalSearch(false)
  }

  const { language } = useLanguage();
  const routerLanguage = useRouter()

  const handleSelectLanguage = (e) => {
    let selected = e;

    if (e === "香港繁體" || e === "台灣繁體") {
      selected = "繁體中文";
    }

    routerLanguage.push(`?language=${selected}`)
    setOpenModalLanguage(false);
  };

  const [openModalLanguage, setOpenModalLanguage] = useState(false);

  const openLanguage = () => {
    setOpenModalLanguage(true)
  }
  const closeLanguage = () => {
    setOpenModalLanguage(false)
  }

  return (
    <nav>
      <div className="bg_close" onClick={openCurrency} style={{ display: `${openModalCurrency ? "block" : "none"}` }} />
      <div className="bg_close" onClick={closeSearch} style={{ display: `${openModalSearch ? "block" : "none"}` }} />
      <div className="bg_close" onClick={closeLanguage} style={{ display: `${openModalLanguage ? "block" : "none"}` }} />
      <div className="conNav">
        <div className="navTopLeft">
          <Link href="/" className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="115" height="32" viewBox="0 0 115 32">
              <g id="logo-icon">
                <path d="M2.54763 8.36536C3.06015 8.61137 3.59026 8.82129 4.13396 8.99281C5.30016 9.3607 5.46157 9.20603 4.95716 8.16962C4.74383 7.73129 4.50605 7.30996 4.24603 6.9069C3.73787 6.11922 3.39541 5.82966 2.58517 6.51148C2.42393 6.64717 2.27315 6.79368 2.13362 6.94961C1.64432 7.49646 1.65049 7.93473 2.54763 8.36536Z" fill="#FF5B00" />
                <path d="M14.1387 30.6133C13.9381 30.042 13.697 29.4846 13.4164 28.9461C12.8147 27.7909 12.5758 27.7861 12.1718 28.948C12.001 29.4393 11.8614 29.9363 11.7525 30.4362C11.5397 31.4131 11.579 31.8893 12.7068 31.9844C12.9312 32.0033 13.1559 32.0062 13.3793 31.9935C14.1627 31.9489 14.4898 31.6134 14.1387 30.6133Z" fill="#4D40CA" />
                <path d="M29.9921 22.1916C29.5357 21.6588 29.1166 21.0934 28.739 20.4994C27.9292 19.2255 28.0621 18.9832 29.4582 19.2528C30.0487 19.3668 30.6266 19.5154 31.1899 19.6965C32.2907 20.0503 32.7449 20.3662 32.1901 21.552C32.0797 21.788 31.9531 22.015 31.8116 22.2316C31.3156 22.991 30.7912 23.1243 29.9921 22.1916Z" fill="#00CBD0" />
                <path d="M22.4408 1.98794C22.0369 2.33178 21.6084 2.64744 21.1582 2.93187C20.1926 3.54195 20.009 3.44178 20.2133 2.39013C20.2997 1.94537 20.4124 1.50999 20.5496 1.08569C20.8178 0.2565 21.0572 -0.0856586 21.956 0.332238C22.1349 0.4154 22.3069 0.510793 22.4711 0.617347C23.0467 0.991023 23.1477 1.38605 22.4408 1.98794Z" fill="#FFC200" />
                <path d="M5.42233 21.2638C0.93364 23.938 -0.367496 20.5653 0.0845712 16.146C0.792365 9.2268 5.42233 9.10795 7.59725 14.0515C8.91167 17.0392 8.41049 19.4836 5.42233 21.2638Z" fill="#00CBD0" />
                <path d="M10.6485 26.0616C10.6485 26.811 10.6177 27.5533 10.5574 28.2872C10.4335 29.7926 9.45576 31.049 7.46783 29.7926C6.65317 29.2777 5.88662 28.6937 5.17642 28.0488C3.53171 26.5552 3.11245 25.1077 5.17642 23.3024C5.6975 22.8466 6.23639 22.4107 6.79193 21.9958C9.37625 20.0658 10.3777 21.3717 10.5759 24.0743C10.624 24.7305 10.6485 25.3932 10.6485 26.0616Z" fill="#FF5B00" />
                <path d="M25.6517 24.6001C24.0483 23.2415 22.3469 21.9943 20.5596 20.8704C16.726 18.4598 15.9969 18.8556 16.8081 23.0109C17.1512 24.7683 17.5985 26.4886 18.1434 28.1651C19.2081 31.4414 20.1587 32.7933 23.7271 31.1421C24.4373 30.8135 25.1203 30.4366 25.772 30.0156C28.0574 28.5391 28.4584 26.9783 25.6517 24.6001Z" fill="#FFC200" />
                <path d="M23.7952 7.67218C23.3049 8.31326 22.8329 8.96882 22.3797 9.6381C19.6944 13.6037 19.9603 13.7517 23.7952 15.4257C25.1767 16.0289 26.5971 16.5603 28.0514 17.0154C33.3695 18.6794 34.1829 16.8212 32.6334 12.2089C32.1916 10.8938 31.5799 9.65613 30.8244 8.52163C28.4711 4.98797 26.5415 4.08062 23.7952 7.67218Z" fill="#FF5B00" />
                <path d="M15.4106 0.0412101C14.0773 0.169808 12.7917 0.461057 11.574 0.894807C8.25614 2.07667 8.74808 3.46615 10.576 6.12C10.9533 6.66782 11.3431 7.20642 11.7451 7.73538C13.8749 10.5385 14.4369 11.1585 16.165 7.18391C16.7289 5.88706 17.23 4.55679 17.6646 3.19692C18.4003 0.894806 18.2869 -0.236201 15.4106 0.0412101Z" fill="#4D40CA" /></g> <g id="logo-en">
                <path xmlns="http://www.w3.org/2000/svg" d="M110.033 11.2082L105.034 16.6937L105.033 5.86887C105.033 5.49526 104.658 5.23652 104.308 5.36831L101.74 6.33195C101.531 6.41054 101.393 6.61003 101.393 6.8325V24.8478C101.393 25.144 101.634 25.3834 101.929 25.3834H104.497C104.794 25.3834 105.034 25.1428 105.034 24.8478V19.1155L110.366 25.1996C110.468 25.3157 110.614 25.3822 110.77 25.3822H114.126C114.589 25.3822 114.834 24.8369 114.527 24.4923L108.583 17.8146L114.057 11.9324C114.376 11.5902 114.132 11.0328 113.665 11.0328H110.429C110.279 11.0328 110.135 11.0969 110.033 11.2082Z" className="logo-en-fill" />
                <path d="M91.1668 25.8527C87.0009 25.8527 83.6133 22.3317 83.6133 18.0026C83.6133 13.908 86.8803 10.7007 91.0499 10.7007C95.4265 10.7007 98.6034 13.8862 98.6034 18.2773C98.6034 22.6684 95.4765 25.8527 91.1668 25.8527ZM91.2801 22.463C93.452 22.463 95.0282 20.7493 95.0282 18.3903C95.0282 15.8818 93.4861 14.1304 91.2801 14.1304C88.9852 14.1304 87.3833 15.821 87.3833 18.242C87.3833 20.6485 89.0595 22.463 91.2801 22.463Z" className="logo-en-fill" />
                <path d="M73.9871 25.8527C69.8224 25.8527 66.4336 22.3317 66.4336 18.0026C66.4336 13.908 69.7006 10.7007 73.8702 10.7007C78.2481 10.7007 81.4249 13.8862 81.4249 18.2773C81.4249 22.6684 78.2968 25.8527 73.9871 25.8527ZM74.1004 22.463C76.2723 22.463 77.8485 20.7493 77.8485 18.3903C77.8485 15.8818 76.3064 14.1304 74.1004 14.1304C71.8055 14.1304 70.2037 15.821 70.2037 18.242C70.2037 20.6874 71.842 22.463 74.1004 22.463Z" className="logo-en-fill" />
                <path d="M60.0078 24.9472L60.0285 6.82125C60.0285 6.59762 60.1674 6.39709 60.3781 6.31809L62.9045 5.37132C63.2577 5.23884 63.6341 5.50015 63.6329 5.87569L63.6049 24.9484C63.6049 25.245 63.3637 25.4856 63.0653 25.4856H60.5462C60.249 25.4856 60.0078 25.2438 60.0078 24.9472Z" className="logo-en-fill" />
                <path d="M52.9732 11.2082L47.9745 16.6937L47.9733 5.86887C47.9733 5.49526 47.5988 5.23652 47.2486 5.36831L44.6808 6.33195C44.4712 6.41054 44.333 6.61003 44.333 6.8325V24.8478C44.333 25.144 44.5742 25.3834 44.8698 25.3834H47.4377C47.7346 25.3834 47.9745 25.1428 47.9745 24.8478V19.1155L53.3065 25.1996C53.4082 25.3157 53.5549 25.3822 53.71 25.3822H57.0667C57.5296 25.3822 57.7744 24.8369 57.4678 24.4923L51.5239 17.8146L56.9976 11.9324C57.3163 11.5902 57.0728 11.0328 56.605 11.0328H53.3695C53.2192 11.0328 53.075 11.0969 52.9732 11.2082Z" className="logo-en-fill" /></g>
            </svg>
          </Link>
          <div className="conSearch">
            <input type="search" onClick={openSearch} onChange={(e) => setSearchText(e.target.value)} className="navSearchBar" placeholder="Search destinations or activities" />
            <Link href={`/search/${searchText}`} onClick={() => { searchFunc(); openSearch(); }} className="iconSearch" >
              <i className="fas fa-search"></i>
            </Link>
            <div className="conSearchList" >
              {searchText ? <Searching keyword={searchText} /> : <SearchModule />}
            </div>
          </div>
        </div>
        <ul className="navTopRight">
          <li className="listNav" onClick={openLanguage}>
            <div>
              <span>
                {allLanguage.find(l => l.lang === language)?.svg}
              </span>
            </div>
            <span style={{ marginLeft: '0.5rem' }}>▼</span>
          </li>
          <div className="conLanguage" style={{ display: `${openModalLanguage ? "block" : "none"}` }}>
            <h3>Select your language</h3>
            <div className="conLanguageList">
              <ul data-v-6d6f7446="" className="list">
                {allLanguage.map((easeLang, index) => (
                  easeLang.htmlLang ? (
                    <li key={index} data-v-6d6f7446="" className="chLan">
                      <div data-v-6d6f7446="" className="chLanDiv">
                        {allLanguage.find(e => e.lang === "繁體中文").svg}
                        <span data-v-6d6f7446="" className={`${language == "繁體中文" ? "selectedLang" : ""}`}>繁體中文</span>
                        <ul data-v-6d6f7446="" className="subitem">
                          <li onClick={() => handleSelectLanguage("香港繁體")} data-v-6d6f7499="" className="">香港繁體</li>|
                          <li onClick={() => handleSelectLanguage("台灣繁體")} data-v-6d6f7499="" className="">台灣繁體</li>
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li key={index} data-v-6d6f7446="" onClick={() => handleSelectLanguage(easeLang.lang)}>
                      <Link data-v-6d6f7446="" href="#" className="">
                        {easeLang.svg}
                        <span data-v-6d6f7446="" className={`${language == easeLang.lang ? "selectedLang" : ""}`}>{easeLang.lang}</span>
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>
          </div>
          <li className="listNav" onClick={openCurrency}>
            {currency}
            <span style={{ marginLeft: '0.5rem' }}>▼</span>
          </li>
          <div
            style={{ display: `${openModalCurrency ? "flex" : "none"}` }} className="conCurrentcies">
            <h3>Currencies</h3>
            <div className="listCurrency">
              {currencies.map((cur, index) => (
                <div key={index} className={`easeCurrent ${currency == cur.initials ? "selectedCurrent" : ""}`} onClick={() => handleCurrencyChange(cur.initials)}>
                  <strong>{cur.initials}</strong> :{" "}
                  {cur.name}
                </div>
              ))}
            </div>
          </div>
          <Link className="listNav" href="/">Go to app</Link>
          <Link className="listNav" href="/">Help</Link>
          <li className="listNav">Recently viewed</li>
          <li className="listNav">Sign up</li>
          <li className="login">Log in</li>
        </ul>
      </div>

    </nav>
  )
}