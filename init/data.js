const sampleListings = [
  {
    title: "Cozy Mountain Cabin in Aspen",
    description:
      "Rustic log cabin with stunning mountain views, perfect for skiing and hiking adventures.",
    image: {
      filename: "mountain-cabin",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 320,
    location: "Aspen, Colorado",
    country: "USA",
  },
  {
    title: "Charming Tuscan Villa",
    description:
      "Traditional stone villa surrounded by vineyards and olive groves in the heart of Tuscany.",
    image: {
      filename: "tuscan-villa",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 450,
    location: "Chianti, Tuscany",
    country: "Italy",
  },
  {
    title: "Modern Tokyo Apartment",
    description:
      "Sleek studio apartment in Shibuya with city views and easy access to metro stations.",
    image: {
      filename: "tokyo-apartment",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 180,
    location: "Shibuya, Tokyo",
    country: "Japan",
  },
  {
    title: "Lakeside Cottage in Finland",
    description:
      "Traditional wooden cottage on a pristine lake with sauna and Northern Lights viewing.",
    image: {
      filename: "finland-cottage",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 280,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Bamboo bungalow steps from pristine beaches with tropical gardens and infinity pool.",
    image: {
      filename: "bali-bungalow",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 220,
    location: "Uluwatu, Bali",
    country: "Indonesia",
  },
  {
    title: "Historic Brownstone in Brooklyn",
    description:
      "Restored 19th-century townhouse with original details and modern amenities.",
    image: {
      filename: "brooklyn-brownstone",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 380,
    location: "Park Slope, Brooklyn",
    country: "USA",
  },
  {
    title: "Desert Oasis in Morocco",
    description:
      "Traditional riad with rooftop terrace overlooking the Sahara Desert dunes.",
    image: {
      filename: "morocco-riad",
      url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73eef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 160,
    location: "Merzouga",
    country: "Morocco",
  },
  {
    title: "Glass House in the Woods",
    description:
      "Contemporary glass cabin surrounded by redwood forest with floor-to-ceiling windows.",
    image: {
      filename: "glass-house",
      url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 420,
    location: "Big Sur, California",
    country: "USA",
  },
  {
    title: "Santorini Cave House",
    description:
      "Traditional cave dwelling with stunning sunset views over the Aegean Sea.",
    image: {
      filename: "santorini-cave",
      url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 390,
    location: "Oia, Santorini",
    country: "Greece",
  },
  {
    title: "Riverside Treehouse in Oregon",
    description:
      "Elevated treehouse retreat with river access and wildlife observation deck.",
    image: {
      filename: "oregon-treehouse",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 250,
    location: "Crater Lake, Oregon",
    country: "USA",
  },
  {
    title: "Icelandic Northern Lights Lodge",
    description:
      "Cozy lodge with panoramic views perfect for aurora watching and glacier tours.",
    image: {
      filename: "iceland-lodge",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 340,
    location: "Reykjavik",
    country: "Iceland",
  },
  {
    title: "Parisian Loft with Eiffel Tower Views",
    description:
      "Converted artist loft in Montmartre with original exposed beams and city views.",
    image: {
      filename: "paris-loft",
      url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 480,
    location: "Montmartre, Paris",
    country: "France",
  },
  {
    title: "Safari Tent in Kenya",
    description:
      "Luxury canvas tent on the savanna with game drive access and wildlife viewing.",
    image: {
      filename: "kenya-tent",
      url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 290,
    location: "Masai Mara",
    country: "Kenya",
  },
  {
    title: "Converted Lighthouse in Maine",
    description:
      "Historic lighthouse keeper's quarters with panoramic ocean views and rocky coastline.",
    image: {
      filename: "maine-lighthouse",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 350,
    location: "Acadia National Park, Maine",
    country: "USA",
  },
  {
    title: "Floating House in Amsterdam",
    description:
      "Unique houseboat on historic canal with bike rental and canal cruise access.",
    image: {
      filename: "amsterdam-houseboat",
      url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 300,
    location: "Jordaan District, Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Patagonian Eco Lodge",
    description:
      "Sustainable lodge with glacier views and hiking trails in Torres del Paine.",
    image: {
      filename: "patagonia-lodge",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 270,
    location: "Torres del Paine",
    country: "Chile",
  },
  {
    title: "Bohemian Apartment in Prague",
    description:
      "Artistic flat in Old Town with Gothic architecture views and cobblestone streets.",
    image: {
      filename: "prague-apartment",
      url: "https://images.unsplash.com/photo-1541963463532-d68292c34d19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 140,
    location: "Old Town, Prague",
    country: "Czech Republic",
  },
  {
    title: "Surfer's Paradise in Portugal",
    description:
      "Beachside cottage with surfboard rentals and direct access to world-class waves.",
    image: {
      filename: "portugal-surf",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 190,
    location: "Ericeira",
    country: "Portugal",
  },
  {
    title: "Mongolian Yurt Experience",
    description:
      "Traditional felt yurt on the steppes with horseback riding and nomadic culture.",
    image: {
      filename: "mongolia-yurt",
      url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 120,
    location: "Gobi Desert",
    country: "Mongolia",
  },
  {
    title: "Wine Cave in Bordeaux",
    description:
      "Underground stone cellar converted into unique accommodation with wine tastings.",
    image: {
      filename: "bordeaux-cave",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 410,
    location: "Saint-Émilion, Bordeaux",
    country: "France",
  },
  {
    title: "Zen Garden House in Kyoto",
    description:
      "Traditional machiya townhouse with private garden and tea ceremony space.",
    image: {
      filename: "kyoto-machiya",
      url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 260,
    location: "Gion District, Kyoto",
    country: "Japan",
  },
  {
    title: "Converted Windmill in Netherlands",
    description:
      "Historic windmill with panoramic countryside views and tulip field access.",
    image: {
      filename: "dutch-windmill",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 330,
    location: "Keukenhof, Netherlands",
    country: "Netherlands",
  },
  {
    title: "Himalayan Mountain Hut",
    description:
      "High-altitude refuge with trekking access and mountain panorama views.",
    image: {
      filename: "himalaya-hut",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 110,
    location: "Annapurna Region",
    country: "Nepal",
  },
  {
    title: "Art Deco Hotel Suite in Miami",
    description:
      "Vintage suite in South Beach with ocean views and Art Deco architecture.",
    image: {
      filename: "miami-deco",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 370,
    location: "South Beach, Miami",
    country: "USA",
  },
  {
    title: "Scottish Highland Castle",
    description:
      "Medieval castle tower with loch views and Highland hiking trails nearby.",
    image: {
      filename: "scotland-castle",
      url: "https://images.unsplash.com/photo-1580500550469-5b2130e6c0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 460,
    location: "Isle of Skye",
    country: "Scotland",
  },
  {
    title: "Balinese Rice Terrace Villa",
    description:
      "Open-air villa overlooking ancient rice terraces with infinity pool and spa.",
    image: {
      filename: "bali-rice-villa",
      url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 200,
    location: "Ubud, Bali",
    country: "Indonesia",
  },
  {
    title: "Norwegian Fjord Cabin",
    description:
      "Wooden cabin perched on fjord edge with waterfall views and hiking access.",
    image: {
      filename: "norway-fjord",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 310,
    location: "Geiranger Fjord",
    country: "Norway",
  },
  {
    title: "Adobe House in New Mexico",
    description:
      "Traditional adobe home with desert views, hot tub, and stargazing deck.",
    image: {
      filename: "newmexico-adobe",
      url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 230,
    location: "Santa Fe, New Mexico",
    country: "USA",
  },
  {
    title: "Converted Church in Ireland",
    description:
      "Gothic church conversion with stained glass windows and countryside views.",
    image: {
      filename: "ireland-church",
      url: "https://images.unsplash.com/photo-1580500550469-5b2130e6c0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 400,
    location: "County Cork",
    country: "Ireland",
  },
  {
    title: "Jungle Canopy Lodge in Ecuador",
    description:
      "Elevated lodge in Amazon rainforest with wildlife viewing and canopy walks.",
    image: {
      filename: "ecuador-jungle",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 180,
    location: "Amazon Rainforest",
    country: "Ecuador",
  },
  {
    title: "Vintage Airstream in Joshua Tree",
    description:
      "Restored silver airstream trailer with desert views and stargazing opportunities.",
    image: {
      filename: "joshua-airstream",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 150,
    location: "Joshua Tree, California",
    country: "USA",
  },
  {
    title: "Coastal Cottage in Cornwall",
    description:
      "Traditional stone cottage overlooking dramatic cliffs and coastal paths.",
    image: {
      filename: "cornwall-cottage",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 290,
    location: "St. Ives, Cornwall",
    country: "England",
  },
  {
    title: "Thermal Spring Resort in Iceland",
    description:
      "Geothermal spa resort with natural hot springs and Northern Lights views.",
    image: {
      filename: "iceland-springs",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 380,
    location: "Blue Lagoon Area",
    country: "Iceland",
  },
  {
    title: "Trulli House in Puglia",
    description:
      "Traditional cone-shaped stone house with olive grove views and local wine.",
    image: {
      filename: "puglia-trulli",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 240,
    location: "Alberobello, Puglia",
    country: "Italy",
  },
  {
    title: "Thatched Cottage in Cotswolds",
    description:
      "Quintessential English cottage with honey-stone walls and garden views.",
    image: {
      filename: "cotswolds-cottage",
      url: "https://images.unsplash.com/photo-1580500550469-5b2130e6c0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 320,
    location: "Chipping Campden",
    country: "England",
  },
  {
    title: "Beach Shack in Goa",
    description:
      "Colorful beach hut steps from golden sand with hammocks and palm trees.",
    image: {
      filename: "goa-shack",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 100,
    location: "Arambol Beach, Goa",
    country: "India",
  },
  {
    title: "Alpine Chalet in Switzerland",
    description:
      "Traditional wooden chalet with mountain views and ski lift access.",
    image: {
      filename: "swiss-chalet",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 490,
    location: "Zermatt",
    country: "Switzerland",
  },
  {
    title: "Converted Barn in Vermont",
    description:
      "Rustic barn conversion with exposed beams and pastoral countryside views.",
    image: {
      filename: "vermont-barn",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 280,
    location: "Stowe, Vermont",
    country: "USA",
  },
  {
    title: "Riad Courtyard in Marrakech",
    description:
      "Traditional Moroccan house with central courtyard, fountain, and rooftop terrace.",
    image: {
      filename: "marrakech-riad",
      url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73eef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 170,
    location: "Medina, Marrakech",
    country: "Morocco",
  },
  {
    title: "Scandinavian Glass Igloo",
    description:
      "Thermal glass igloo for Northern Lights viewing with heated floors and bed.",
    image: {
      filename: "finland-igloo",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 350,
    location: "Rovaniemi, Lapland",
    country: "Finland",
  },
  {
    title: "Cliffside Villa in Amalfi",
    description:
      "Mediterranean villa carved into cliff face with sea views and lemon groves.",
    image: {
      filename: "amalfi-villa",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 440,
    location: "Positano, Amalfi Coast",
    country: "Italy",
  },
  {
    title: "Log Cabin in Canadian Rockies",
    description:
      "Remote log cabin with mountain lake access and wildlife viewing opportunities.",
    image: {
      filename: "canada-cabin",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 300,
    location: "Banff National Park",
    country: "Canada",
  },
  {
    title: "Converted Monastery in Spain",
    description:
      "Historic monastery with cloisters, chapel views, and peaceful gardens.",
    image: {
      filename: "spain-monastery",
      url: "https://images.unsplash.com/photo-1580500550469-5b2130e6c0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 360,
    location: "Camino de Santiago",
    country: "Spain",
  },
  {
    title: "Overwater Bungalow in Maldives",
    description:
      "Traditional thatch bungalow over crystal lagoon with direct ocean access.",
    image: {
      filename: "maldives-bungalow",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 500,
    location: "North Malé Atoll",
    country: "Maldives",
  },
  {
    title: "Hobbit Hole in New Zealand",
    description:
      "Underground earth house with round door and hobbit-style furnishings.",
    image: {
      filename: "newzealand-hobbit",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 210,
    location: "Matamata, North Island",
    country: "New Zealand",
  },
  {
    title: "Desert Camp in Rajasthan",
    description:
      "Luxury tent camp in Thar Desert with camel safaris and folk performances.",
    image: {
      filename: "rajasthan-camp",
      url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 130,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Fisherman's Hut in Lofoten",
    description:
      "Traditional red fisherman's cabin on stilts over Arctic waters.",
    image: {
      filename: "lofoten-hut",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 250,
    location: "Lofoten Islands",
    country: "Norway",
  },
  {
    title: "Converted Train Car in Oregon",
    description:
      "Vintage railway caboose converted to cozy retreat in forest setting.",
    image: {
      filename: "oregon-train",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 160,
    location: "Crater Lake, Oregon",
    country: "USA",
  },
  {
    title: "Cave Hotel in Cappadocia",
    description:
      "Ancient cave dwelling with modern amenities and hot air balloon views.",
    image: {
      filename: "cappadocia-cave",
      url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 220,
    location: "Göreme, Cappadocia",
    country: "Turkey",
  },
  {
    title: "Stilt House in Cambodia",
    description:
      "Traditional Khmer stilt house over rice paddies with cultural immersion.",
    image: {
      filename: "cambodia-stilt",
      url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 110,
    location: "Siem Reap Province",
    country: "Cambodia",
  },
  {
    title: "Lighthouse Keeper's House in Denmark",
    description:
      "Whitewashed lighthouse cottage on coastal dunes with seal watching.",
    image: {
      filename: "denmark-lighthouse",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 290,
    location: "Skagen",
    country: "Denmark",
  },
  {
    title: "Volcano View Lodge in Guatemala",
    description:
      "Mountain lodge with active volcano views and cloud forest hiking.",
    image: {
      filename: "guatemala-volcano",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 140,
    location: "Antigua Guatemala",
    country: "Guatemala",
  },
  {
    title: "Converted Water Tower in Belgium",
    description:
      "Unique circular tower conversion with panoramic countryside views.",
    image: {
      filename: "belgium-tower",
      url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 340,
    location: "Flemish Countryside",
    country: "Belgium",
  },
  {
    title: "Bamboo Eco Lodge in Philippines",
    description:
      "Sustainable bamboo construction with coral reef snorkeling access.",
    image: {
      filename: "philippines-bamboo",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 180,
    location: "Palawan",
    country: "Philippines",
  },
  {
    title: "Chateau Tower in Loire Valley",
    description:
      "Medieval tower room in historic castle with vineyard and river views.",
    image: {
      filename: "loire-chateau",
      url: "https://images.unsplash.com/photo-1580500550469-5b2130e6c0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 420,
    location: "Chambord, Loire Valley",
    country: "France",
  },
];

module.exports = { data: sampleListings };
