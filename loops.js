// Edit this file only. One entry per island, one trip() per trip.
// A trip shows on the site and the map only when days is above 0. Islands with no live trip stay hidden.
// Photos: set photos to how many you have. Name the files img/<island id>/<trip id>-01.webp, -02.webp ...
// Example: img/lombok/lombok-highlights-01.webp
// route: stops in driving order as [latitude, longitude, "name"]. Pins are approximate, check them on the map.
// options: ways to travel. The visitor taps one and it goes into the WhatsApp or email message.

const SITE = {
  email: "leo.thewildloop@gmail.com",
  whatsapp: "60132903570", // digits with country code, no plus. Empty hides the WhatsApp buttons.
  instagram: "the_wild_loop_travel", // handle without @
  tiktok: "the_wild_loop" // handle without @
};

const trip = (id, name = "", extra = {}) => ({
  id, name, days: 0, price: "", months: "", photos: 0, youtube: "", pitch: "", plan: [], route: [], options: [], ...extra
});

const RIDES = ["Motorbike, you ride", "Motorbike, your guide rides", "Minibus"];

const LOOPS = [
  { id: "lombok", name: "Lombok", lat: -8.65, lng: 116.32, trips: [
    trip("lombok-highlights", "Highlights", {
      days: 3,
      plan: ["Banyumulek pottery village and Sukarara weaving village", "Sade Sasak village and Kuta Mandalika", "Tanjung Aan beach and Merese Hill sunset"],
      route: [[-8.63, 116.06, "Banyumulek"], [-8.75, 116.26, "Sukarara"], [-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.91, 116.35, "Merese Hill"]]
    }),
    trip("lombok-waterfalls", "Waterfalls", {
      days: 4,
      plan: ["Banyumulek pottery village and Sukarara weaving village", "Sade Sasak village and Kuta Mandalika", "Tanjung Aan beach and Merese Hill sunset", "Senaru village and waterfalls, Malimbu Hill sunset"],
      route: [[-8.63, 116.06, "Banyumulek"], [-8.75, 116.26, "Sukarara"], [-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.91, 116.35, "Merese Hill"], [-8.35, 116.41, "Senaru"], [-8.41, 116.06, "Malimbu Hill"]]
    }),
    trip("lombok-gili", "Gili", {
      days: 5,
      plan: ["Sukarara weaving village", "Sade Sasak village and Kuta Mandalika", "Tanjung Aan beach and Merese Hill sunset", "Senaru village and waterfalls", "Gili Trawangan day trip with snorkeling"],
      route: [[-8.75, 116.26, "Sukarara"], [-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.35, 116.41, "Senaru"], [-8.35, 116.03, "Gili Trawangan"]]
    }),
    trip("lombok-gili-beaches", "Gili and beaches", {
      days: 6,
      plan: ["Sade Sasak village and Kuta Mandalika", "Tanjung Aan and hidden beaches", "Free day in Kuta Mandalika", "Senaru village and waterfalls", "Gili Trawangan, snorkeling", "Gili Meno and Gili Air"],
      route: [[-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.35, 116.41, "Senaru"], [-8.35, 116.03, "Gili Trawangan"], [-8.35, 116.06, "Gili Meno"], [-8.36, 116.08, "Gili Air"]]
    })
  ] },
  { id: "sulawesi", name: "Sulawesi", lat: -1.4, lng: 121.4, trips: [
    trip("sulawesi-toraja", "Toraja", {
      days: 7, months: "Apr to Oct", options: RIDES,
      plan: ["Arrive in Rantepao, town and market", "Ke'te Kesu village and Londa burial caves", "Lemo cliff graves and Makale", "Batutumonga highlands and Lolai", "Mount Sesean hike", "Funeral ceremony visit with your guide, if one is running", "Highland coffee, then depart"],
      route: [[-2.97, 119.9, "Rantepao"], [-2.99, 119.92, "Ke'te Kesu"], [-3.03, 119.89, "Londa"], [-3.07, 119.86, "Lemo"], [-3.1, 119.85, "Makale"], [-2.91, 119.89, "Batutumonga"]]
    })
  ] },
  { id: "sumatra", name: "Sumatra", lat: -0.6, lng: 101.3, trips: [
    trip("sumatra-north", "North", {
      days: 7, options: RIDES,
      plan: ["Medan to Bukit Lawang", "Orangutan jungle trek and river tubing", "Village tour by motorbike or becak", "Tangkahan elephants and hot springs", "Drive to Berastagi, fruit and flower market, Gundaling lookout", "Sibayak volcano sunrise hike, Sipiso-piso waterfall, ferry to Samosir", "Samosir Batak village, then back to Medan"],
      route: [[3.59, 98.67, "Medan"], [3.55, 98.11, "Bukit Lawang"], [3.69, 98.07, "Tangkahan"], [3.19, 98.51, "Berastagi"], [2.92, 98.52, "Sipiso-piso waterfall"], [2.67, 98.87, "Samosir, Lake Toba"]]
    }),
    trip("sumatra-north-14", "North, snorkeling and jungle", {
      days: 14, options: RIDES,
      pitch: "14 days, 13 nights. Snorkeling, jungle exploration and Lake Toba.",
      plan: ["Medan, Berastagi market and Mount Sibayak", "Lake Toba", "Sidikalang and Kedabuhen waterfall", "Singkil crocodile swamp", "Pulau Besar snorkeling", "Ketambe jungle", "Sinabung hike, Telagah Sei Bingai, Batu Katak, then back to Medan"],
      route: [[3.59, 98.67, "Medan"], [3.19, 98.51, "Berastagi"], [3.23, 98.51, "Mount Sibayak"], [2.67, 98.87, "Lake Toba"], [2.75, 98.32, "Sidikalang"], [2.65, 98.15, "Kedabuhen waterfall"], [2.29, 97.8, "Singkil"], [2.22, 97.35, "Pulau Besar"], [3.69, 97.65, "Ketambe"], [3.17, 98.39, "Mount Sinabung"], [3.46, 98.3, "Telagah Sei Bingai"], [3.55, 98.13, "Batu Katak"], [3.59, 98.67, "Medan"]]
    }),
    trip("sumatra-south", "South", {
      days: 7, options: RIDES,
      plan: ["Palembang, Ampera Bridge and Pasar 16 Ilir market", "Musi River boat trip", "Travel to Pagar Alam", "Pagar Alam highlands and tea plantations", "Travel to Lake Ranau", "Lake Ranau and lakeside villages", "Return to Palembang"],
      route: [[-2.98, 104.77, "Palembang"], [-4.02, 103.24, "Pagar Alam"], [-4.87, 103.92, "Lake Ranau"]]
    })
  ] },
  { id: "raja-ampat", name: "Raja Ampat", lat: -0.5, lng: 130.5, trips: [
    trip("raja-ampat", "", {
      days: 7,
      plan: ["Fly to Sorong, ferry to Waisai, boat to the homestay", "House reef snorkeling at Kri and Mansuar", "Piaynemo viewpoint, Telaga Bintang lagoon, Arborek village", "Manta Sandy and Pasir Timbul sandbank", "Dawn trek for birds of paradise on Waigeo or Gam", "Wayag, or Cape Kri and Friwen Wall", "Ferry back to Sorong"],
      route: [[-0.88, 131.26, "Sorong"], [-0.43, 130.82, "Waisai"], [-0.57, 130.57, "Arborek"], [-0.55, 130.69, "Kri"], [-0.55, 130.25, "Piaynemo"], [0.17, 130.03, "Wayag"]]
    })
  ] },
  // Hidden until you give them days above 0.
  { id: "nusa-penida", name: "Nusa Penida", lat: -8.73, lng: 115.54, trips: [trip("nusa-penida")] },
  { id: "bali", name: "Bali", lat: -8.34, lng: 115.09, trips: [trip("bali-north", "North"), trip("bali-south", "South")] },
  { id: "sumbawa", name: "Sumbawa", lat: -8.65, lng: 117.42, trips: [trip("sumbawa")] },
  { id: "java", name: "Java", lat: -7.5, lng: 110.5, trips: [trip("java-east", "East"), trip("java-west", "West")] }
];

// One line per guide: copy the example below and remove the //. Photo path example: img/guides/name.webp. Empty list hides the section.
const GUIDES = [
  { name: "Tessa", languages: "", bio: "Tessa is from Lombok and has spent years exploring alone on her Honda Beat. Tonight she might book you the best table in town. Tomorrow you could be eating at a street stall with zero online reviews, and she'll swear it beats the restaurant. A whole day lying in the sun on the beach suits her fine, and the next morning she'll drag you off on something properly wild. She travels for the people she meets and the wildlife she finds.", photo: "img/guides/tessa.jpg" },
  // { name: "Guide name", languages: "", bio: "Two lines about this guide.", photo: "" }
];
