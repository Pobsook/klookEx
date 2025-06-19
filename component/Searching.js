'use client'

import touristCities from "@/imformation/touristCities";
import Image from "next/image";
import travelProducts from "@/imformation/topSearch";

export default function Searching({ keyword }) {                           // สร้างคอมโพเนนต์ชื่อ Searching รับ prop เป็น keyword (คำค้นหาที่พิมพ์)

    const searchTerm = keyword.toLowerCase();                           // แปลง keyword ให้เป็นตัวพิมพ์เล็กทั้งหมด เพื่อให้เทียบได้แบบ case-insensitive
    const matchedResults = new Set();                           // ใช้ Set เพื่อเก็บผลลัพธ์ที่ไม่ซ้ำกัน (เพราะ Set เก็บค่าซ้ำไม่ได้)

    const dataSources = [...touristCities, ...travelProducts];                           // รวมข้อมูลจากทั้งสองแหล่ง touristCities และ travelProducts เข้าเป็น array เดียว

    dataSources.forEach((item) => {                           // วนลูปแต่ละ item (เมืองหรือสินค้าท่องเที่ยว)
        const fields = [                           // สร้าง array ของข้อมูลที่เราจะใช้ค้นหาคำ keyword
            item.city,                           // ชื่อเมือง
            item.country,                           // ประเทศ
            item.name,                           // ชื่อสินค้า (จาก travelProducts เท่านั้น)
            item.highlights,                           // ไฮไลต์ของเมือง
            ...(item.attractions || []),                           // ถ้ามี attractions (array) ให้รวมเข้าไปด้วย
            ...(item.type || [])                           // ถ้ามี type (array) ก็รวมเข้าไปด้วย
        ];

        fields.forEach((field) => {                           // วนลูปแต่ละ field ที่เราจะใช้ค้นหา
            if (typeof field === "string" && field.toLowerCase().includes(searchTerm)) {
                matchedResults.add(field);                           // ถ้าเป็น string และมี keyword อยู่ในนั้น ให้เพิ่มเข้า Set
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
                <div key={index}>
                    {highlightKeyword(result, keyword)}
                </div>                                      // เรียกใช้ฟังก์ชัน highlightKeyword สำหรับแต่ละผลลัพธ์
            ))}
            <div>
                
            </div>
        </div>
    );

}
