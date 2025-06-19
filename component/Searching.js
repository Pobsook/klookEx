'use client'

import touristCities from "@/imformation/touristCities";
import Image from "next/image";
import travelProducts from "@/imformation/topSearch";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Searching({ keyword }) {                           // สร้างคอมโพเนนต์ชื่อ Searching รับ prop เป็น keyword (คำค้นหาที่พิมพ์)

    const routerSearchText = useRouter();

    const searchFunc2 = (clickSearch) => {
        routerSearchText.push(`?newSearch=${clickSearch}`);
        setOpenModalSearch(true);
    }

    const searchTerm = keyword.toLowerCase();                           // แปลง keyword ให้เป็นตัวพิมพ์เล็กทั้งหมด เพื่อให้เทียบได้แบบ case-insensitive
    const matchedResults = new Set();                           // ใช้ Set เพื่อเก็บผลลัพธ์ที่ไม่ซ้ำกัน (เพราะ Set เก็บค่าซ้ำไม่ได้)

    const dataSources = [...touristCities, ...travelProducts];                           // รวมข้อมูลจากทั้งสองแหล่ง touristCities และ travelProducts เข้าเป็น array เดียว

    dataSources.forEach((item) => {
        const fields = [
            item.city,
            item.country,
            item.name,
            item.highlights,
            ...(item.attractions || []),
            ...(item.type || [])
        ];

        fields.forEach((field) => {
            if (typeof field === "string") { // ตรวจว่า field เป็น string เท่านั้น
                const words = field.split(/\s+/); // แยกคำใน field ออก เช่น "The Great Wall" => ["The", "Great", "Wall"]

                words.forEach((word) => {
                    if (word.toLowerCase().startsWith(searchTerm)) {
                        matchedResults.add(field);
                        // ถ้าคำเริ่มต้นด้วย keyword เช่น "th" ตรงกับ "Thailand", "The", "Thamel" 
                        // ให้เพิ่ม field ทั้งหมดลงในผลลัพธ์ เช่น "The Great Wall"
                    }
                });
            }
        });
    });

    const results = Array.from(matchedResults).slice(0, 7);                           // แปลง Set เป็น array แล้วเลือกแค่ 7 รายการแรกเท่านั้น

    function highlightKeyword(text, keyword) {                           // ฟังก์ชันสำหรับทำ highlight คำ keyword ที่ match
        const regex = new RegExp(`(${keyword})`, 'gi');                           // สร้าง regex ที่ match คำ keyword (ไม่สนตัวพิมพ์เล็กใหญ่)
        const parts = text.split(regex);                           // แยกข้อความออกตามตำแหน่งของ keyword

        return parts.map((part, index) =>                           // วนแต่ละ part ที่ได้จากการ split
            part.toLowerCase() === keyword.toLowerCase() ? (                           // ถ้าคือ keyword (match แบบไม่สน case)
                <span key={index} style={{ color: '#ff6600' }}>{part}</span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    }

    return (
        <div>
            {results.map((result, index) => (
                <div key={index} onClick={() => searchFunc2(result)}>
                    <Link href={`/search/${result}`} style={{ display: 'block' }}>
                        {highlightKeyword(result, keyword)}
                    </Link>
                </div>
            ))}
        </div>
    );

}
