// app/page.js

'use client'

import Image from "next/image";
import "./homepageStyle.css";
import touristCities from "@/imformation/touristCities";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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

  const images = [
    "https://res.klook.com/image/upload/v1744887188/banner/lcbfm8zwaj81ehnqfgjl.jpg",
    "https://res.klook.com/image/upload/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp",
    "https://res.klook.com/image/upload/v1670577678/banner/tvhfgpkiapfldzoaj8ll.webp"
  ];

  const [index, setIndex] = useState(1) // เริ่มที่ index 1 เพราะมี clone ด้านหน้า
  const [transition, setTransition] = useState(true)
  const sliderRef = useRef()

  const extendedImages = [images[images.length - 1], ...images, images[0]] // clone รูป

  const nextSlide = () => {
    setIndex(index + 1)
  }

  const prevSlide = () => {
    setIndex(index - 1)
  }

  // สไลด์อัตโนมัติ
  useEffect(() => {
    const timer = setInterval(nextSlide, 10000)
    return () => clearInterval(timer)
  }, [index])

  // จัดการ jump เมื่อถึง clone
  useEffect(() => {
    if (index === images.length + 1) {
      setTimeout(() => {
        setTransition(false)
        setIndex(1)
      }, 600)
    }
    if (index === 0) {
      setTimeout(() => {
        setTransition(false)
        setIndex(images.length)
      }, 600)
    } else {
      setTransition(true)
    }
  }, [index])

  const promotions = [
    { href: "/Promotions/promotion1", image: "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,h_342,c_fill,q_85/v1749431424/banner/n0sho0uocf0otnkjm7yx.webp" },
    { href: "/Promotions/promotion2", image: "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,h_342,c_fill,q_85/v1739719294/banner/yjh4rpaclt1rgo9h9lni.webp" },
    { href: "/Promotions/promotion3", image: "/KlookPro.png" },
    { href: "/Promotions/promotion4", image: "/KlookPro2.png" },
    { href: "/Promotions/promotion5", image: "/KlookPro3.png" },
    { href: "/Promotions/promotion6", image: "/KlookPro4.png" },
    { href: "/Promotions/promotion7", image: "/KlookPro5.png" },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(promotions.length / itemsPerPage);

  const [page, setPage] = useState(0); // ค่าระบุว่าอยู่ page ไหน

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const offset = page * itemsPerPage;
  const visiblePromotions = promotions.slice(offset, offset + itemsPerPage);

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
        <div className="ddesdw">
          <h2>Your world of joy</h2>
          <p>From local escapes to far-flung adventures, find what makes you happy anytime, anywhere</p>
          <div className="conSearchBanner">
            <label className="iconSearch2" htmlFor="searchInput"><i className="fas fa-search"></i></label>
            <input className="inputSearch" id="searchInput" placeholder={randomLandmark || "Search attractions..."} onInput={openBannerModalSearch} onClick={openBannerModalSearch} onChange={(e) => setSearchText(e.target.value)} />
            <div className="bg_close" onClick={closeBannerSearch} style={{ display: `${isOpenModalBannerSearch ? "block" : "none"}` }} />
            <Link href={`/search/${searchText}`} className="btn-search" onClick={searchFunc}>Search</Link>
          </div>
        </div>
        <div className={`conSearchList ${isOpenModalBannerSearch ? "conSearchList2" : ""}`}>
          {searchText ? <Searching keyword={searchText} /> : <SearchModule />}
        </div>

        <div className="slider-wrapper">
          <div
            ref={sliderRef}
            className="slider-track"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: transition ? 'transform 0.6s ease-in-out' : 'none'
            }}
          >
            {extendedImages.map((src, i) => (
              <div key={i} className="slide" style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
          <div className="gradiant-card left">
            <span className="prevnext prevbanner" onClick={prevSlide}>
              <i className="fa-solid fa-angle-left"></i>
            </span>
          </div>
          <div className="gradiant-card right">
            <span className="prevnext nextbanner" onClick={nextSlide}>
              <i className="fa-solid fa-angle-right"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="conAllHomepage">
        <h2>Offers for you</h2>
        <div className="conHomepage">
          <div className="header-wraper001">
            {visiblePromotions.map((promo, idx) => (
              <Link
                key={idx}
                href={promo.href}
                className="image-box"
                style={{
                  backgroundImage: `url(${promo.image})`,
                }}
              />
            ))}
          </div>
          <span className="prevnext prevnext2 prev" onClick={prevPage} disabled={page === 0} >
            <i className="fa-solid fa-angle-left"></i>
          </span>
          <span className="prevnext prevnext2 next" onClick={nextPage} disabled={page === totalPages - 1} >
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </div>
        <h2>Why choose Klook</h2>
        <div className="conHomepage">
          <div className="easeCon002">
            <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655841/ued/platform/Discover_the_possibilities.webp" width={50} height={50} alt="Discover the possibilities" />
            <h3>Discover the possibilities</h3>
            <p>With nearly half a million attractions, hotels & more, you're sure to find joy.</p>
          </div>
          <div className="easeCon002">
            <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655837/ued/platform/Enjoy_deals_delights.webp" width={50} height={50} alt="Discover the possibilities" />
            <h3>Enjoy deals & delights</h3>
            <p>Quality activities. Great prices. Plus, earn Klook credits to save more.</p>
          </div>
          <div className="easeCon002">
            <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655837/ued/platform/Exploring_made_easy.webp" width={50} height={50} alt="Discover the possibilities" />
            <h3>Exploring made easy</h3>
            <p>Book last minute, skip lines & get free cancellation for easier exploring.</p>
          </div>
          <div className="easeCon002">
            <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655837/ued/platform/Travel_you_can_trust.webp" width={50} height={50} alt="Discover the possibilities" />
            <h3>Travel you can trust</h3>
            <p>Read reviews & get reliable customer support. We're with you at every step.</p>
          </div>
        </div>
        <h2>Travelers' favorite choices</h2>
        <div className="conHomepage">
          <div className="easeCon003">
            <div className="easeCon003-1"></div>
            <div className="easeCon003-2"></div>
          </div>
          <div className="easeCon003">
            <div className="easeCon003-1"></div>
            <div className="easeCon003-2"></div>
          </div>
          <div className="easeCon003">
            <div className="easeCon003-1"></div>
            <div className="easeCon003-2"></div>
          </div>
          <div className="easeCon003">
            <div className="easeCon003-1"></div>
            <div className="easeCon003-2"></div>
          </div>
          <span className="prevnext prevnext2 prev" disabled={page === 0} >
            <i className="fa-solid fa-angle-left"></i>
          </span>
          <span className="prevnext prevnext2 next" disabled={page === totalPages - 1} >
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </div>
        <button className="btn-003">See more</button>
        <h2>Travelers' favorite choice</h2>
        <div className="conHomepage">
          <div className="easeCon004">
            <h3>Top things to do in Singapore</h3>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>National Museum of Singapore Ticket</h5>
                  <p>Don't miss out on your last chance to ...</p>
                </div>
              </div>
            </div>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Universal Stidio Singapore Ticket</h5>
                  <p>Make it a holiday to remember as yo...</p>
                </div>
              </div>
            </div>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Klook Pass Singapore</h5>
                  <p>Get access to 2, 3, 4, or 5 top activitie...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="easeCon004">
            <h3>Top things to do in Kuala Lumpur</h3>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Genting SkyWorlds Theme Park Tickets</h5>
                  <p>The long-awaited Genting SkyWorlds...</p>
                </div>
              </div>
            </div>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Zoo Negara Ticket in Malaysia</h5>
                  <p>View more than 5,137 animals from 47...</p>
                </div>
              </div>
            </div>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Sunway Lagoon Ticket</h5>
                  <p>DEnjoy up to 90 rides and attraction in...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="easeCon004">
            <h3>Top things to do in Bali</h3>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Nusa Penida Day Tour from Bali</h5>
                  <p>Embark on a Nusa Penida day trip fro...</p>
                </div>
              </div>
            </div>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Mount Batur Sunrise Trekking Experience</h5>
                  <p>Hike to the top of an active volcano, ...</p>
                </div>
              </div>
            </div>
            <div className="easeCon004-1">
              <div className="easeCon004-1-1">
                <div className="imgCon4" />
                <div className="TextCon4">
                  <h5>Waterbom Bali Ticket</h5>
                  <p>Visit Waterbom Bali, the first tourism ...</p>
                </div>
              </div>
            </div>
          </div>
          <span className="prevnext prevnext2 prev" disabled={page === 0} >
            <i className="fa-solid fa-angle-left"></i>
          </span>
          <span className="prevnext prevnext2 next" disabled={page === totalPages - 1} >
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </div>
      </div>
    </>
  );
}