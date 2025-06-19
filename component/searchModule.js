// component/searchModule.js

'use client'

import touristCities from "@/imformation/touristCities";
import travelProducts from "@/imformation/topSearch";
import useExchangeRates from "@/api/api_exchangerate";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchModule() {

    const router = useRouter();

    const [allSearchText, setAllSearchText] = useState([]);  // 🔹 สร้าง state เพื่อเก็บคำค้นหาทั้งหมด (search history)
    const searchParams = useSearchParams();                  // 🔹 ใช้เพื่ออ่าน query parameter จาก URL เช่น ?newSearch=bangkok

    useEffect(() => {
        const urlSearchText = searchParams.get('newSearch');    // ✅ ดึงค่าจาก URL ถ้ามี query ชื่อ newSearch เช่น newSearch=bangkok
        const stored = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        // 🔹 ดึงค่าจาก localStorage ชื่อว่า "searchHistory" ถ้าไม่มีให้ใช้ array ว่าง []

        if (urlSearchText && !stored.includes(urlSearchText)) {
            // 🔹 ถ้ามีคำค้นใน URL และยังไม่อยู่ใน localStorage
            const updated = [...stored, urlSearchText];           // ✅ เพิ่มคำใหม่เข้าไปใน array
            localStorage.setItem("searchHistory", JSON.stringify(updated));
            // 🔹 อัปเดต localStorage ด้วย array ใหม่
            setAllSearchText(updated);                            // 🔹 อัปเดต state ใน React
        } else {
            setAllSearchText(stored);                             // 🔹 ถ้าไม่มีคำใหม่ แค่โหลดค่าจาก localStorage มาแสดง
        }
    }, [searchParams]);                                       // 🔹 ใช้ effect นี้ทุกครั้งที่ URL เปลี่ยน

    const handleDelete = () => {
        localStorage.removeItem("searchHistory");
        setAllSearchText([]);

        // 🔥 ลบ query ออกจาก URL โดยไม่ reload หน้า
        const newUrl = window.location.pathname;
        router.replace(newUrl);
    };

    const { currency } = useCurrency();
    const { language } = useLanguage();

    const rates = useExchangeRates();
    const convertRate = rates?.[currency] ?? 1;

    const trendingCities = touristCities
        .sort((a, b) => b.searchVolume - a.searchVolume)
        .slice(0, 10);

    const nonTrendingCities = touristCities
        .sort((a, b) => b.searchVolume - a.searchVolume)
        .slice(10);

    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const randomCities = useMemo(() => {
        return getRandomItems(nonTrendingCities, 10);
    }, []);

    const topSearchProducts = travelProducts
        .sort((a, b) => b.searchVolume - a.searchVolume)
        .slice(0, 10);

    return (
        <>
            <button onClick={handleDelete} className="deleteBtn">
                <i className="fas fa-trash"></i>
            </button>
            {Array.isArray(allSearchText) && allSearchText.length > 0 ? (
                <>
                    <h3>Search history</h3>
                    <div className="conRandomSearchCity">
                        {allSearchText.map((data, index) => (
                            <div key={index} className="randomSearch">{data}</div>
                        ))}
                    </div>
                </>
            ) : (
                <></>
            )}
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
                    {topSearchProducts.map((data, index) => {

                        const formatter = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: currency,
                            maximumFractionDigits: 2,
                        });

                        const convertedPrice = formatter.format(data.price * convertRate);

                        return (
                            <li key={index + 1} className="conLi">
                                <span className={`num ${index + 1 > 3 ? "num4" : ""}`}>{index + 1}</span>
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
        </>
    )
}

