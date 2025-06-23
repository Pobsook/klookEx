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
import travelersFavorite from "@/imformation/favoriteChoices";
import useExchangeRates from "@/api/api_exchangerate";
import topThindtodo from "@/imformation/topThindtodo";

export default function Home() {

  const routerSearchText = useRouter();

  const [searchText, setSearchText] = useState("");
  const searchFunc = () => {
    routerSearchText.push(`?newSearch=${searchText}`);
    setIsOpenModalBannerSearch(true);
  }

  const { currency } = useCurrency();

  const rates = useExchangeRates();
  const convertRate = rates?.[currency] ?? 1;

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
  const setTranform = 1 / totalPages;
  const [page, setPage] = useState(0);
  const prevNext = (e) => {
    const page001 = page + e;

    if (page001 >= totalPages) {
      setPage(totalPages - 1);
    } else if (page001 < 0) {
      setPage(0);
    } else {
      setPage(page001);
    }
  };

  const [page003, setPage003] = useState(0);
  const totalPages003 = Math.ceil(travelersFavorite.length / 4);
  const setTranform003 = 1 / totalPages003;
  const prevNext003 = (e) => {
    const page3 = page003 + e;

    if (page3 >= totalPages003) {
      setPage003(totalPages003 - 1);
    } else if (page3 < 0) {
      setPage003(0);
    } else {
      setPage003(page3);
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  });

  const bannerRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        bannerRef.current &&
        listRef.current &&
        !bannerRef.current.contains(event.target) &&
        !listRef.current.contains(event.target)
      ) {
        closeBannerSearch() // ฟังก์ชันที่ใช้ปิด
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const [page004, setPage004] = useState(0);
  const totalPages004 = Math.ceil(topThindtodo.length / 3);
  const setTranform004 = 1 / totalPages004;
  const prevNext004 = (e) => {
    const page4 = page004 + e;

    if (page4 >= totalPages004) {
      setPage004(totalPages004 - 1);
    } else if (page4 < 0) {
      setPage004(0);
    } else {
      setPage004(page4);
    }
  };

  return (
    <>
      <div data-hp001 className="conMainHomePage">
        <ul data-hp001 className="listToDo">
          <div className="conList">
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
          </div>
        </ul>
      </div>
      <div className="conBanner">
        <div className="ddesdw">
          <div
            ref={bannerRef}
            style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}
          >
            <h2 className="h2">Your world of joy</h2>
            <p className="p">From local escapes to far-flung adventures...</p>
            <div className="conSearchBanner">
              <label className="iconSearch2" htmlFor="searchInput">
                <i className="fas fa-search"></i>
              </label>
              <input className="inputSearch" id="searchInput" placeholder={randomLandmark || "Search attractions..."}
                onInput={openBannerModalSearch}
                onClick={openBannerModalSearch}
                onChange={(e) => setSearchText(e.target.value)} />
              <Link href={`/search/${searchText}`} className="btn-search" onClick={searchFunc}>
                Search
              </Link>
            </div>
          </div>
          <div ref={listRef} className={`conSearchList ${isOpenModalBannerSearch ? "conSearchList2" : ""}`}>
            {searchText ? <Searching keyword={searchText} /> : <SearchModule />}
          </div>
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
      <div className="conAllHomepage">
        <div className="con">
          <h2>Offers for you</h2>
          <div className="conHomepage">
            <div className="header-wraper001">
              <div className="conHomePage001" style={{ transform: `translateX(-${page * setTranform * 100}%)`, transition: "transform 0.5s ease-in-out", width: `${totalPages * 100}%` }}>
                {promotions.map((promo, idx) => (
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
            </div>
            <span className="prevnext prevnext2 prev" onClick={() => prevNext(-1)} style={{ display: `${page <= 0 ? "none" : ""}` }}>
              <i className="fa-solid fa-angle-left"></i>
            </span>
            <span className="prevnext prevnext2 next" onClick={() => prevNext(1)} style={{ display: `${page >= totalPages - 1 ? "none" : ""}` }}>
              <i className="fa-solid fa-angle-right"></i>
            </span>
          </div>
        </div>
        <div className="con">
          <h2>Why choose Klook</h2>
          <div className="conHomepage">
            <div className="easeCon002">
              <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655841/ued/platform/Discover_the_possibilities.webp" width={60} height={60} alt="Discover the possibilities" />
              <h3>Discover the possibilities</h3>
              <p>With nearly half a million attractions, hotels & more, you're sure to find joy.</p>
            </div>
            <div className="easeCon002">
              <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655837/ued/platform/Enjoy_deals_delights.webp" width={60} height={60} alt="Discover the possibilities" />
              <h3>Enjoy deals & delights</h3>
              <p>Quality activities. Great prices. Plus, earn Klook credits to save more.</p>
            </div>
            <div className="easeCon002">
              <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655837/ued/platform/Exploring_made_easy.webp" width={60} height={60} alt="Discover the possibilities" />
              <h3>Exploring made easy</h3>
              <p>Book last minute, skip lines & get free cancellation for easier exploring.</p>
            </div>
            <div className="easeCon002">
              <Image src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_112,h_112/v1663655837/ued/platform/Travel_you_can_trust.webp" width={60} height={60} alt="Discover the possibilities" />
              <h3>Travel you can trust</h3>
              <p>Read reviews & get reliable customer support. We're with you at every step.</p>
            </div>
          </div>
        </div>
        <div className="con">
          <h2>Travelers' favorite choices</h2>
          <div className="conHomepage">
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div className="conHomepage003" style={{ transform: `translateX(-${page003 * setTranform003 * 100}%)`, transition: "transform 0.5s ease-in-out", width: `${totalPages003 * 100}%` }}>
                {travelersFavorite.map((data, index) => (
                  <div className="easeCon003" key={index} style={{ margin: "0" }}>
                    <div className="easeCon003-1" style={{ backgroundImage: `url(${data.url})`, backgroundSize: "cover" }} />
                    <div className="easeCon003-2">
                      <div style={{ display: "flex", gap: "0.5rem", fontSize: "14px", color: "#7e7e7e", marginBottom: "0.1rem" }}>
                        <div style={{ margin: "0" }}>{data.type}</div>
                        <div style={{ margin: "0" }}>• {data.where}</div>
                      </div>
                      <h4 style={{ margin: "0", fontWeight: "500", marginBottom: "0.1rem" }}>{data.name}</h4>
                      <p style={{ margin: "0", fontSize: "12px", backgroundColor: "#e2e2e2", padding: "0.1rem 0.2rem", color: "#7e7e7e", display: "inline-block", marginBottom: "0.1rem" }}>{data.etc[0]}</p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ margin: "0", color: "#ff9735", fontWeight: "500" }}>★ {data.rate}</p>
                        <p style={{ margin: "0", color: "#7e7e7e" }}>({data.review})</p>
                        <p style={{ margin: "0", marginLeft: "0.5rem", color: "#7e7e7e" }}>• {data.booked} booked</p>
                      </div>
                      <div style={{ position: "absolute", gap: "0.5rem", display: "flex", bottom: "0.7rem", left: "0rem" }}>
                        <span style={{ fontWeight: "500" }}>From {formatter.format(data.price * convertRate)}</span>
                        <span style={{ textDecoration: "line-through", color: "#7e7e7e" }}>{data.exprice ? `${formatter.format(data.exprice * convertRate)}` : ""}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span className="prevnext prevnext2 prev" onClick={() => prevNext003(-1)} style={{ display: `${page003 <= 0 ? "none" : ""}` }}>
              <i className="fa-solid fa-angle-left"></i>
            </span>
            <span className="prevnext prevnext2 next" onClick={() => prevNext003(1)} style={{ display: `${page003 >= totalPages003 - 1 ? "none" : ""}` }}>
              <i className="fa-solid fa-angle-right"></i>
            </span>
          </div>
          <button className="btn-003">See more</button>
        </div>
        <div className="con">
          <h2>Travelers' favorite choice</h2>
          <div className="conHomepage">
            <div style={{ position: "relative", overflow: "hidden", paddingTop: "0.5rem" }}>
              <div style={{ transform: `translateX(-${page004 * setTranform004 * 100}%)`, width: `${totalPages004 * 100}%`, display: "flex", gap: "1.5rem", transition: "transform 0.5s ease-in-out", position: "relative" }}>
                {topThindtodo.map((data, index) => (
                  <div key={index} className="easeCon004">
                    <div className="cardGradient004"/>
                    <h3>Top things to do in {data.city}</h3>
                    {data.activities.map((activity, subIndex) => (
                      <div key={subIndex} className="easeCon004-1-1">
                        <div className="imgCon4" style={{ backgroundImage: `url(${activity.img})`, backgroundSize: "cover" }} />
                        <div className="TextCon4">
                          <h5>{activity.nameeActi}</h5>
                          <p>{activity.info}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <span className="prevnext prevnext2 prev" onClick={() => prevNext004(-1)} style={{ display: `${page004 <= 0 ? "none" : ""}` }}>
              <i className="fa-solid fa-angle-left" />
            </span>
            <span className="prevnext prevnext2 next" onClick={() => prevNext004(1)} style={{ display: `${page004 >= totalPages004 - 1 ? "none" : ""}` }}>
              <i className="fa-solid fa-angle-right" />
            </span>
          </div>
        </div>
        <div className="con">
          <h2>Inspiration for your itinerary</h2>
          <div className="conHomepage">
            <div className="easeCon005">
              <h3>Best staycation deals</h3>
              <p>Enjoy these cool staycation promotions in Singapore</p>
              <div className="btn-ease005">See activities</div>
            </div>
            <div className="easeCon005">
              <h3>All Time Favourite Activities in Dubai</h3>
              <p>Don't forget to check out activities while you're here</p>
              <div className="btn-ease005">See activities</div>
            </div>
          </div>
        </div>
        <div className="con">
          <h2>Where to next?</h2>
          <div className="conHomepage">
            <div className="easeCon006">
              <h3>Bangkok</h3>
            </div>
            <div className="easeCon006">
              <h3>Hong Kong</h3>
            </div>
            <div className="easeCon006">
              <h3>Phuket</h3>
            </div>
            <div className="easeCon006">
              <h3>Osaka</h3>
            </div>
            <div className="easeCon006">
              <h3>Tokyo</h3>
            </div>
            <div className="easeCon006">
              <h3>Pattaya</h3>
            </div>
            <span className="prevnext prevnext2 prev"  >
              <i className="fa-solid fa-angle-left"></i>
            </span>
            <span className="prevnext prevnext2 next"  >
              <i className="fa-solid fa-angle-right"></i>
            </span>
          </div>
          <button className="btn-003 btn-006">See all</button>
        </div>
        <div className="con">
          <h2>More to explore</h2>
          <div className="conHomepage">
            <div className="easeCon007">
              <Image src="https://res.klook.com/image/upload/v1640179720/veeon5jzqyjccj5m3lkg.webp" width={220} height={180} alt="0" />
              <div className="easeCon007-text">
                <h3>Check out the Klook blog</h3>
                <p>Follow the team's musings on trends in travel, itinerary ideas and travel tips</p>
                <button>Read now</button>
              </div>
            </div>
            <div className="easeCon007">
              <Image src="https://res.klook.com/image/upload/v1640179766/arto4pac628jzdsuu3df.webp" width={220} height={180} alt="0" />
              <div className="easeCon007-text">
                <h3>Save on fun with <br />KloolCash</h3>
                <p>Find out how to save more When you book and leave a review</p>
                <button>How KlookCash works</button>
              </div>
            </div>
            <div className="easeCon007">
              <Image src="https://res.klook.com/image/upload/v1640179875/ggxmmubhiq9nxkbobcro.webp" width={220} height={180} alt="0" />
              <div className="easeCon007-text">
                <h3>Share joy & get rewarded</h3>
                <p>After your friend signs up and completes a booking, you'll get a US$5 reward!</p>
                <button>Invite friends</button>
              </div>
            </div>
          </div>
        </div>
        <div className="con">
          <h2>Explore more on Klook</h2>
          <h3>Top attractions in United States</h3>
          <div className="conHomepage008">
            <div className="easeCon008">
              <div className="easeCon008-num">1</div>
              <div className="easeCon008-text">Grand Canyon</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">2</div>
              <div className="easeCon008-text">Upper Antelope Canyon</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">3</div>
              <div className="easeCon008-text">Statue of Liberty</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">4</div>
              <div className="easeCon008-text">Universal Studios Hollywood</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">5</div>
              <div className="easeCon008-text">Niagara Falls</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">6</div>
              <div className="easeCon008-text">Alcatraz Island</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">7</div>
              <div className="easeCon008-text">Yosemite National Park</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">8</div>
              <div className="easeCon008-text">Disneyland Resort</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">9</div>
              <div className="easeCon008-text">Kualoa Ranch</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">10</div>
              <div className="easeCon008-text">Las Vegas Strip</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">11</div>
              <div className="easeCon008-text">Lower Antelope Canyon</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">12</div>
              <div className="easeCon008-text">The Metropolitan Museum of Art</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">13</div>
              <div className="easeCon008-text">Golden Gate Bridge</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">14</div>
              <div className="easeCon008-text">Broadway</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">15</div>
              <div className="easeCon008-text">The White House</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">16</div>
              <div className="easeCon008-text">Hollywood</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">17</div>
              <div className="easeCon008-text">Griffith Observatory</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">18</div>
              <div className="easeCon008-text">Time Square</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">19</div>
              <div className="easeCon008-text">Hollywood Walk of Fame</div>
            </div>
            <div className="easeCon008">
              <div className="easeCon008-num">20</div>
              <div className="easeCon008-text">The Dallas Arboretum and Botanical Garden</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}