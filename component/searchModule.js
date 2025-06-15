// component/searchModule.js

'use client'

import touristCities from "@/imformation/touristCities";
import travelProducts from "@/imformation/topSearch";
import useExchangeRates from "@/api/api_exchangerate";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function SearchModule() {

      const { currency } = useCurrency();
      const { language } = useLanguage();

    const rates = useExchangeRates();
    const convertRate = rates?.[currency] ?? 1;

    const trendingCities = touristCities
        .sort((a, b) => b.searchVolume - a.searchVolume)
        .slice(0, 10);

    // 1. เอา top 10 ออกก่อน
    const nonTrendingCities = touristCities
        .sort((a, b) => b.searchVolume - a.searchVolume)
        .slice(10); // ตัด top 10 ออก

    // 2. สุ่ม (เช่น สุ่ม 10 เมืองจากที่เหลือ)
    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const randomCities = getRandomItems(nonTrendingCities, 10);

    const topSearchProducts = travelProducts
        .slice(0, 10);

    return (
        <div className="conSearchList" >
            <div>
                <h3>Search history</h3>
                <div>detail search history</div>
            </div>
            <div>
                <h3>Other travelers searched for</h3>
                <div className="conRandomSearchCity">
                    {randomCities.map((data, index) => (
                        <div key={index} className="randomSearch">{data.city}</div>
                    ))}
                </div>
            </div>
            <div className="conTopandTrendList">
                <div className="conSearchTopTrend">
                    <div className="bgColorTopTreandSearch" />
                    <h4>Top searches</h4>
                    {topSearchProducts.map((data) => {

                        const formatter = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: currency,
                            maximumFractionDigits: 2,
                        });

                        const convertedPrice = formatter.format(data.price * convertRate);

                        return (
                            <li key={data.id} className="conLi">
                                <span className={`num ${data.id > 3 ? "num4" : ""}`}>{data.id}</span>
                                <Link href={`@/app/city/${data.city}`} className="linkTrendingSearch">
                                    <Image
                                        width={60}
                                        height={60}
                                        alt={data.city}
                                        src={`/${data.image}`}
                                        className="imgTrending"
                                    />
                                    <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.7rem" }}>
                                        <p style={{ padding: 0, margin: 0, flexWrap: "wrap", fontSize: "14px" }}>
                                            {data.name} : {data.description}
                                        </p>
                                        <div className="pTrending pTopSearch">
                                            <p>{data.city}</p>
                                            <p style={{ color: "#ff6600", marginRight: "1rem" }}>
                                                From
                                                <span style={{ fontWeight: "600", paddingLeft: "5px" }}>{convertedPrice}</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </div>
                <div className="conSearchTopTrend">
                    <div className="bgColorTopTreandSearch"></div>
                    <h4>Trending destinations</h4>
                    {trendingCities.map((data, index) => (
                        <li key={data.id} className="conLi">
                            <span className={`num ${index + 1 > 3 ? "num4" : ""}`}>{index + 1}</span>
                            <Link href={`/city/${data.city}`} className="linkTrendingSearch">
                                <Image width={60} height={60} alt={data.city} src={`/${data.image}`} className="imgTrending" />
                                <div >
                                    <p style={{ padding: "0", margin: "0" }}>{data.city}</p>
                                    <p className="pTrending">
                                        {data.type[1]} {data.type[2]} | {data.highlights} | {data.country}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}

