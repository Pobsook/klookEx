// app/search/[id]/page.js

import touristCities from "@/imformation/touristCities";
import topSearch from "@/imformation/topSearch"

export default async function SearchPage({ params }) {
  const searchText = decodeURIComponent(params.id);

  return (
    <>
    <div style={{position: "absolute", top: "3.7rem"}}>
      <h1>ผลการค้นหา: {searchText}</h1>      
      <h1>ผลการค้นหา: {searchText}</h1>      
      <h1>ผลการค้นหา: {searchText}</h1>      
      <h1>ผลการค้นหา: {searchText}</h1>      
      <h1>ผลการค้นหา: {searchText}</h1>    
    </div>
    </>
  );
}