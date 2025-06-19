// app/page.js

'use client'

import Image from "next/image";
import "./homepageStyle.css";
import touristCities from "@/imformation/touristCities";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import SearchModule from "@/component/searchModule";
import { useRouter } from 'next/navigation';
import Searching from "@/component/Searching";

export default function Home() {
  const routerSearchText = useRouter();

  const [searchText, setSearchText] = useState("");
  const searchFunc = () => {
    routerSearchText.push(`?newSearch=${searchText}`);
    setIsOpenModalBannerSearch(true);
  }

  const { currency } = useCurrency();

  const topPopRegions = touristCities
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 12);

  const topPopDestinations = touristCities
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 28);

  const topPopLandmarks = touristCities
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 28);

  const [randomLandmark, setRandomLandmark] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCityIndex = Math.floor(Math.random() * touristCities.length);
      const city = touristCities[randomCityIndex];

      // สมมติว่า city มี field `attractions` เป็น array
      if (city && city.attractions?.length > 0) {
        const randomAttractionIndex = Math.floor(Math.random() * city.attractions.length);
        const attraction = city.attractions[randomAttractionIndex];

        // ใส่ชื่อสถานที่ท่องเที่ยวลงใน placeholder
        setRandomLandmark(attraction);
      }
    }, 5000);

    // เรียกทันทีตอนเริ่ม
    const init = () => {
      const randomCityIndex = Math.floor(Math.random() * touristCities.length);
      const city = touristCities[randomCityIndex];
      if (city && city.attractions?.length > 0) {
        const randomAttractionIndex = Math.floor(Math.random() * city.attractions.length);
        const attraction = city.attractions[randomAttractionIndex];
        setRandomLandmark(attraction);
      }
    };
    init();

    return () => clearInterval(interval);
  }, []);

  const [isOpenModalBannerSearch, setIsOpenModalBannerSearch] = useState(false)
  const openBannerModalSearch = () => {
    setIsOpenModalBannerSearch(true)
  }
  const closeBannerSearch = () => {
    setIsOpenModalBannerSearch(false)
  }

  return (
    <>
      <div data-hp001 className="conMainHomePage">
        <ul data-hp001 className="listToDo">
          <li data-hp001 className="listToDo1">
            <span style={{ cursor: "pointer" }}>Popular regions</span>
            <div data-hp001 className="conPopList list1">
              <ul className="conUl">
                {topPopRegions.map((data, index) => (
                  <li key={index} data-hp003 className="easeListTodo">
                    <div><Image className="imgListTodo" src={`/${data.image}`} width={45} height={45} alt={data.country} /></div>
                    <div>
                      <p className="pTextThingtodo">Things to do in</p>
                      <p className="pListThingTodo">{data.country}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li data-hp001 className="listToDo2">
            <span style={{ cursor: "pointer" }}>Popular destinations</span>
            <div data-hp001 className="conPopList list2">
              <ul className="conUl conOver">
                {topPopDestinations.map((data, index) => (
                  <li key={index} data-hp003 className="easeListTodo">
                    <div><Image className="imgListTodo" src={`/${data.image}`} width={45} height={45} alt={data.country} /></div>
                    <div>
                      <p className="pTextThingtodo">Things to do in</p>
                      <p className="pListThingTodo">{data.city}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li data-hp001 className="listToDo3">
            <span style={{ cursor: "pointer" }}>Popular landmarks</span>
            <div data-hp001 className="conPopList list3">
              <ul className="conUl conOver">
                {topPopLandmarks.map((data, index) => (
                  <li key={index} data-hp003 className="easeListTodo">
                    <div><Image className="imgListTodo" src={`/${data.image}`} width={45} height={45} alt={data.country} /></div>
                    <div>
                      <p className="pListThingTodo">{data.attractions[0]}</p>
                      <p className="pTextThingtodo">{data.country}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li data-hp001 className="listToDo4">
            <span style={{ cursor: "pointer" }}>Explore Klook</span>
            <div data-hp001 className="conPopList list4">
              <div className="conUl conExplore">
                <div className="easeConExplore lineEase">
                  <div className="headExplore"><Image src="/TTD.webp" width={24} height={24} alt="TTD" style={{ marginRight: "0.5rem" }} />Things to do</div>
                  <div className="listTTD">
                    <Link href="/">Tour & experiences</Link>
                    <Link href="/">Day trips</Link>
                    <Link href="/">Massages & spa</Link>
                    <Link href="/">Outdoor activities</Link>
                    <Link href="/">Cultural experiences</Link>
                    <Link href="/">Water sports</Link>
                    <Link href="/">Cruises</Link>
                    <Link href="/">Attraction tickets</Link>
                  </div>
                </div>
                <div className="easeConExplore lineEase">
                  <div className="headExplore"><Image src="/Hotel.webp" width={24} height={24} alt="Hotel" style={{ marginRight: "0.5rem" }} />Accommodation</div>
                  <div className="listTTD">
                    <Link href="/">Hotels</Link>
                  </div>
                </div>
                <div className="easeConExplore lineEase">
                  <div className="headExplore"><Image src="/Transport.webp" width={24} height={24} alt="Transport" style={{ marginRight: "0.5rem" }} />Transport options</div>
                  <div className="listTTD">
                    <Link href="/">Airport transfers</Link>
                    <Link href="/">Car rentals</Link>
                    <Link href="/">Europe train tickets</Link>
                    <Link href="/">HK High Speed Rail</Link>
                    <Link href="/">Japan train tickets</Link>
                    <Link href="/">Shinkansen tickets</Link>
                    <Link href="/">Korea bus</Link>
                  </div>
                </div>
                <div className="easeConExplore">
                  <div className="headExplore"><Image src="/Wifi.webp" width={24} height={24} alt="Wifi" style={{ marginRight: "0.5rem" }} />Travel essentials</div>
                  <div className="listTTD">
                    <Link href="/">Insurance</Link>
                    <Link href="/">WiFi & SIM cards</Link>
                  </div>
                </div>
              </div>
            </div>
          </li>|
          <li data-hp002><Image src="/category_36_gift_card.png" alt="image" width={24} height={24} style={{ paddingRight: "0.3rem" }} /> Gift cards</li>
        </ul>
      </div>
      <div className="conBanner">
        <div className="gradiant-card left">
          <span className="prevnext prev"><i className="fa-solid fa-angle-left"></i></span>
        </div>
        <div className="gradiant-card right">
          <span className="prevnext next"><i className="fa-solid fa-angle-right"></i></span>
        </div>
        <div className="ddesdw">
          <h2>Your world of joy</h2>
          <p>From local escapes to far-flung adventures, find what makes you happy anytime, anywhere</p>
          <div className="conSearchBanner">
            <label className="iconSearch2" htmlFor="searchInput"><i className="fas fa-search"></i></label>
            <input className="inputSearch" id="searchInput" placeholder={randomLandmark || "Search attractions..."} onInput={openBannerModalSearch} onClick={openBannerModalSearch} onChange={(e) => setSearchText(e.target.value)} />
            <button className="btn-search" onClick={searchFunc}>Search</button>
          </div>
        </div>
        <div className="bg_close" onClick={closeBannerSearch} style={{ display: `${isOpenModalBannerSearch ? "block" : "none"}` }} />
        <div className={`conSearchList ${isOpenModalBannerSearch ? "conSearchList2" : ""}`}>
          {searchText ? <Searching keyword={searchText} /> : <SearchModule/>}
        </div>
        <div className="banner-hp banner1" style={{ backgroundImage: "url(https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1744887188/banner/lcbfm8zwaj81ehnqfgjl.jpg)" }} />
        <div className="banner-hp banner2" style={{ backgroundImage: "url(https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp)" }} />
        <div className="banner-hp banner3" style={{ backgroundImage: "url(https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577678/banner/tvhfgpkiapfldzoaj8ll.webp)" }} />
      </div>
    </>
  );
}