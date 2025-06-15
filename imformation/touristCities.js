const touristCities = [
  { id: 1,
    city: "Paris",
    country: "France",
    attractions: [
      "Eiffel Tower",
      "Louvre Museum"
    ],
    type: [
      "Romantic",
      "Cultural"
    ],
    highlights: "Art and architecture",
    searchVolume: 3200000,
    image: "ExPic.JPG"
  },
  { id: 2,
    city: "Tokyo",
    country: "Japan",
    attractions: [
      "Shibuya Crossing",
      "Tokyo Tower"
    ],
    type: [
      "Modern",
      "Traditional"
    ],
    highlights: "Mix of old and new",
    searchVolume: 2800000,
    image: "ExPic.JPG"
  },
  { id: 3,
    city: "New York City",
    country: "USA",
    attractions: [
      "Statue of Liberty",
      "Central Park"
    ],
    type: [
      "Urban",
      "Cultural"
    ],
    highlights: "City that never sleeps",
    searchVolume: 3500000,
    image: "ExPic.JPG"
  },
  { id: 4,
    city: "London",
    country: "UK",
    attractions: [
      "Big Ben",
      "London Eye"
    ],
    type: [
      "Historical",
      "Cultural"
    ],
    highlights: "Royal and vibrant",
    searchVolume: 3300000,
    image: "ExPic.JPG"
  },
  { id: 5,
    city: "Rome",
    country: "Italy",
    attractions: [
      "Colosseum",
      "Vatican City"
    ],
    type: [
      "Historical",
      "Religious"
    ],
    highlights: "Ancient empire",
    searchVolume: 2500000,
    image: "ExPic.JPG"
  },
  { id: 6,
    city: "Bangkok",
    country: "Thailand",
    attractions: [
      "Grand Palace",
      "Chatuchak Market"
    ],
    type: [
      "Cultural",
      "Nightlife"
    ],
    highlights: "Vibrant street life",
    searchVolume: 2400000,
    image: "ExPic.JPG"
  },
  { id: 7,
    city: "Barcelona",
    country: "Spain",
    attractions: [
      "Sagrada Familia",
      "Park Gell"
    ],
    type: [
      "Architectural",
      "Beach"
    ],
    highlights: "Gaud architecture",
    searchVolume: 2200000,
    image: "ExPic.JPG"
  },
  { id: 8,
    city: "Dubai",
    country: "UAE",
    attractions: [
      "Burj Khalifa",
      "Palm Jumeirah"
    ],
    type: [
      "Luxury",
      "Shopping"
    ],
    highlights: "Futuristic desert city",
    searchVolume: 2600000,
    image: "ExPic.JPG"
  },
  { id: 9,
    city: "Istanbul",
    country: "Turkey",
    attractions: [
      "Hagia Sophia",
      "Blue Mosque"
    ],
    type: [
      "History",
      "Culture"
    ],
    highlights: "City on two continents",
    searchVolume: 2100000,
    image: "ExPic.JPG"
  },
  { id: 10,
    city: "Singapore",
    country: "Singapore",
    attractions: [
      "Marina Bay Sands",
      "Gardens by the Bay"
    ],
    type: [
      "Urban",
      "Luxury"
    ],
    highlights: "Modern garden city",
    searchVolume: 2200000,
    image: "ExPic.JPG"
  },
  { id: 11,
    city: "Amsterdam",
    country: "Netherlands",
    attractions: [
      "Rijksmuseum",
      "Anne Frank House"
    ],
    type: [
      "Canals",
      "Art"
    ],
    highlights: "Charming canal city",
    searchVolume: 1800000,
    image: "ExPic.JPG"
  },
  { id: 12,
    city: "Prague",
    country: "Czech Republic",
    attractions: [
      "Prague Castle",
      "Charles Bridge"
    ],
    type: [
      "Architecture",
      "History"
    ],
    highlights: "City of a hundred spires",
    searchVolume: 1700000,
    image: "ExPic.JPG"
  },
  { id: 13,
    city: "Vienna",
    country: "Austria",
    attractions: [
      "Schnbrunn Palace",
      "St. Stephen's Cathedral"
    ],
    type: [
      "Music",
      "Art"
    ],
    highlights: "Imperial music capital",
    searchVolume: 1600000,
    image: "ExPic.JPG"
  },
  { id: 14,
    city: "Seoul",
    country: "South Korea",
    attractions: [
      "Gyeongbokgung Palace",
      "Myeongdong"
    ],
    type: [
      "Tech",
      "Tradition"
    ],
    highlights: "K-culture capital",
    searchVolume: 2000000,
    image: "ExPic.JPG"
  },
  { id: 15,
    city: "Sydney",
    country: "Australia",
    attractions: [
      "Sydney Opera House",
      "Bondi Beach"
    ],
    type: [
      "Beach",
      "Culture"
    ],
    highlights: "Iconic harbor city",
    searchVolume: 1900000,
    image: "ExPic.JPG"
  },
  { id: 16,
    city: "Los Angeles",
    country: "USA",
    attractions: [
      "Hollywood",
      "Santa Monica Pier"
    ],
    type: [
      "Entertainment",
      "Beach"
    ],
    highlights: "City of Angels",
    searchVolume: 1800000,
    image: "ExPic.JPG"
  },
  { id: 17,
    city: "San Francisco",
    country: "USA",
    attractions: [
      "Golden Gate Bridge",
      "Alcatraz Island"
    ],
    type: [
      "Nature",
      "Tech"
    ],
    highlights: "Bay area beauty",
    searchVolume: 1700000,
    image: "ExPic.JPG"
  },
  { id: 18,
    city: "Rio de Janeiro",
    country: "Brazil",
    attractions: [
      "Christ the Redeemer",
      "Copacabana Beach"
    ],
    type: [
      "Festive",
      "Nature"
    ],
    highlights: "Carnival city",
    searchVolume: 1600000,
    image: "ExPic.JPG"
  },
  { id: 19,
    city: "Cape Town",
    country: "South Africa",
    attractions: [
      "Table Mountain",
      "Robben Island"
    ],
    type: [
      "Adventure",
      "History"
    ],
    highlights: "Scenic coastal city",
    searchVolume: 1500000,
    image: "ExPic.JPG"
  },
  { id: 20,
    city: "Moscow",
    country: "Russia",
    attractions: [
      "Red Square",
      "Kremlin"
    ],
    type: [
      "Historical",
      "Cultural"
    ],
    highlights: "Russian capital",
    searchVolume: 1400000,
    image: "ExPic.JPG"
  },
  { id: 21,
    city: "Athens",
    country: "Greece",
    attractions: [
      "Acropolis",
      "Parthenon"
    ],
    type: [
      "Ancient",
      "Historical"
    ],
    highlights: "Birthplace of democracy",
    searchVolume: 1300000,
    image: "ExPic.JPG"
  },
  { id: 22,
    city: "Buenos Aires",
    country: "Argentina",
    attractions: [
      "La Boca",
      "Teatro Coln"
    ],
    type: [
      "Tango",
      "Colonial"
    ],
    highlights: "Paris of South America",
    searchVolume: 1200000,
    image: "ExPic.JPG"
  },
  { id: 23,
    city: "Toronto",
    country: "Canada",
    attractions: [
      "CN Tower",
      "Royal Ontario Museum"
    ],
    type: [
      "Urban",
      "Nature"
    ],
    highlights: "Diverse metropolis",
    searchVolume: 1100000,
    image: "ExPic.JPG"
  },
  { id: 24,
    city: "Berlin",
    country: "Germany",
    attractions: [
      "Berlin Wall",
      "Brandenburg Gate"
    ],
    type: [
      "History",
      "Modern"
    ],
    highlights: "Historic capital",
    searchVolume: 1500000,
    image: "ExPic.JPG"
  },
  { id: 25,
    city: "Lisbon",
    country: "Portugal",
    attractions: [
      "Belm Tower",
      "Alfama"
    ],
    type: [
      "Cultural",
      "Coastal"
    ],
    highlights: "City of seven hills",
    searchVolume: 1250000,
    image: "ExPic.JPG"
  },
  { id: 26,
    city: "Madrid",
    country: "Spain",
    attractions: [
      "Prado Museum",
      "Royal Palace"
    ],
    type: [
      "Art",
      "Royal"
    ],
    highlights: "Spanish capital",
    searchVolume: 1350000,
    image: "ExPic.JPG"
  },
  { id: 27,
    city: "Cairo",
    country: "Egypt",
    attractions: [
      "Pyramids of Giza",
      "Egyptian Museum"
    ],
    type: [
      "Ancient",
      "Desert"
    ],
    highlights: "Gateway to antiquity",
    searchVolume: 1400000,
    image: "ExPic.JPG"
  },
  { id: 28,
    city: "Banglore",
    country: "India",
    attractions: [
      "Lalbagh Botanical Garden",
      "Bangalore Palace"
    ],
    type: [
      "Tech",
      "Green"
    ],
    highlights: "Silicon Valley of India",
    searchVolume: 1200000,
    image: "ExPic.JPG"
  },
  { id: 29,
    city: "Hanoi",
    country: "Vietnam",
    attractions: [
      "Hoan Kiem Lake",
      "Old Quarter"
    ],
    type: [
      "Cultural",
      "Colonial"
    ],
    highlights: "Historic capital",
    searchVolume: 1100000,
    image: "ExPic.JPG"
  },
  { id: 30,
    city: "Mexico City",
    country: "Mexico",
    attractions: [
      "Zcalo",
      "Frida Kahlo Museum"
    ],
    type: [
      "Cultural",
      "Urban"
    ],
    highlights: "Ancient and modern blend",
    searchVolume: 1250000,
    image: "ExPic.JPG"
  },
  { id: 31,
    city: "Lima",
    country: "Peru",
    attractions: [
      "Plaza Mayor",
      "Larco Museum"
    ],
    type: [
      "Colonial",
      "Coastal"
    ],
    highlights: "Gateway to Machu Picchu",
    searchVolume: 1150000,
    image: "ExPic.JPG"
  },
  { id: 32,
    city: "Osaka",
    country: "Japan",
    attractions: [
      "Osaka Castle",
      "Dotonbori"
    ],
    type: [
      "Food",
      "Culture"
    ],
    highlights: "Kitchen of Japan",
    searchVolume: 1600000,
    image: "ExPic.JPG"
  },
  { id: 33,
    city: "Hong Kong",
    country: "China",
    attractions: [
      "Victoria Peak",
      "Tsim Sha Tsui"
    ],
    type: [
      "Skyline",
      "Shopping"
    ],
    highlights: "Vertical city",
    searchVolume: 2100000,
    image: "ExPic.JPG"
  },
  { id: 34,
    city: "Beijing",
    country: "China",
    attractions: [
      "Forbidden City",
      "Great Wall"
    ],
    type: [
      "Ancient",
      "Imperial"
    ],
    highlights: "Historic heart of China",
    searchVolume: 2200000,
    image: "ExPic.JPG"
  },
  { id: 35,
    city: "Florence",
    country: "Italy",
    attractions: [
      "Uffizi Gallery",
      "Duomo"
    ],
    type: [
      "Art",
      "Renaissance"
    ],
    highlights: "Birthplace of the Renaissance",
    searchVolume: 1500000,
    image: "ExPic.JPG"
  },
  { id: 36,
    city: "Marrakech",
    country: "Morocco",
    attractions: [
      "Jemaa el-Fnaa",
      "Bahia Palace"
    ],
    type: [
      "Market",
      "Historic"
    ],
    highlights: "Red city of Morocco",
    searchVolume: 1000000,
    image: "ExPic.JPG"
  },
  { id: 37,
    city: "Reykjavik",
    country: "Iceland",
    attractions: [
      "Blue Lagoon",
      "Hallgr"
    ],
    type: [
      "Nature",
      "Northern Lights"
    ],
    highlights: "Land of fire and ice",
    searchVolume: 950000,
    image: "ExPic.JPG"
  },
  { id: 38,
    city: "Auckland",
    country: "New Zealand",
    attractions: [
      "Sky Tower",
      "Waiheke Island"
    ],
    type: [
      "Nature",
      "Adventure"
    ],
    highlights: "City of sails",
    searchVolume: 1050000,
    image: "ExPic.JPG"
  },
  { id: 39,
    city: "Kuala Lumpur",
    country: "Malaysia",
    attractions: [
      "Petronas Towers",
      "Batu Caves"
    ],
    type: [
      "Urban",
      "Cultural"
    ],
    highlights: "Multicultural capital",
    searchVolume: 1150000,
    image: "ExPic.JPG"
  },
  { id: 40,
    city: "Doha",
    country: "Qatar",
    attractions: [
      "Souq Waqif",
      "Museum of Islamic Art"
    ],
    type: [
      "Modern",
      "Cultural"
    ],
    highlights: "Rising Gulf city",
    searchVolume: 900000,
    image: "ExPic.JPG"
  },
  { id: 41,
    city: "Manila",
    country: "Philippines",
    attractions: [
      "Intramuros",
      "Rizal Park"
    ],
    type: [
      "History",
      "Urban"
    ],
    highlights: "Colonial legacy",
    searchVolume: 950000,
    image: "ExPic.JPG"
  },
  { id: 42,
    city: "Phuket",
    country: "Thailand",
    attractions: [
      "Patong Beach",
      "Big Buddha"
    ],
    type: [
      "Beach",
      "Resort"
    ],
    highlights: "Thailand's beach paradise",
    searchVolume: 1400000,
    image: "ExPic.JPG"
  },
  { id: 43,
    city: "Chiang Mai",
    country: "Thailand",
    attractions: [
      "Doi Suthep",
      "Night Bazaar"
    ],
    type: [
      "Nature",
      "Cultural"
    ],
    highlights: "Temple city of the north",
    searchVolume: 1100000,
    image: "ExPic.JPG"
  },
  { id: 44,
    city: "Helsinki",
    country: "Finland",
    attractions: [
      "Suomenlinna",
      "Helsinki Cathedral"
    ],
    type: [
      "Design",
      "Nordic"
    ],
    highlights: "Scandinavian capital",
    searchVolume: 850000,
    image: "ExPic.JPG"
  },
  { id: 45,
    city: "Oslo",
    country: "Norway",
    attractions: [
      "Vigeland Park",
      "Akershus Fortress"
    ],
    type: [
      "Nature",
      "Cultural"
    ],
    highlights: "Fjord capital",
    searchVolume: 800000,
    image: "ExPic.JPG"
  },
  { id: 46,
    city: "Edinburgh",
    country: "Scotland",
    attractions: [
      "Edinburgh Castle",
      "Royal Mile"
    ],
    type: [
      "Historical",
      "Festival"
    ],
    highlights: "City of literature",
    searchVolume: 1250000,
    image: "ExPic.JPG"
  },
  { id: 47,
    city: "Dubrovnik",
    country: "Croatia",
    attractions: [
      "Old Town",
      "City Walls"
    ],
    type: [
      "Medieval",
      "Coastal"
    ],
    highlights: "Game of Thrones city",
    searchVolume: 950000,
    image: "ExPic.JPG"
  },
  { id: 48,
    city: "Havana",
    country: "Cuba",
    attractions: [
      "Old Havana",
      "Malecon"
    ],
    type: [
      "Colonial",
      "Cultural"
    ],
    highlights: "Frozen in time",
    searchVolume: 880000,
    image: "ExPic.JPG"
  }
];

export default touristCities;