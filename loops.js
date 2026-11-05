// Edit this file only. One entry per island, one trip() per trip.
// A trip shows on the site and the map only when days is above 0. Islands with no live trip stay hidden.
// Photos: set photos to how many you have. Name the files img/<island id>/<trip id>-01.webp, -02.webp ...
// Example: img/lombok/lombok-highlights-01.webp
// Video: set video: true and put a vertical clip at img/<island id>/<trip id>.mp4. It plays first in the photo strip.
// route: stops in driving order as [latitude, longitude, "name"]. Pins are approximate, check them on the map.
// options: ways to travel. The visitor taps one and it goes into the WhatsApp or email message.
// months: the best window, shown on the trip tile. when: recommended dates as ["months", "what's on", "why go then"]; the visitor taps one to ask about it.

const SITE = {
  email: "leo.thewildloop@gmail.com",
  whatsapp: "60132903570", // digits with country code, no plus. Empty hides the WhatsApp buttons.
  instagram: "the_wild_loop_travel", // handle without @
  tiktok: "the_wild_loop" // handle without @
};

const trip = (id, name = "", extra = {}) => ({
  id, name, days: 0, price: "", months: "", photos: 0, video: false, youtube: "", pitch: "", plan: [], route: [], options: [], when: [], ...extra
});

const RIDES = ["Motorbike, you ride", "Motorbike, your guide rides", "Minibus"];

// Dates shared by trips in the same area. Festival dates follow local calendars, so confirm them each year.
const LOMBOK_DRY = ["May to Sep", "Dry season", "Sunny days and dry roads for the whole loop. June and July are the busiest months."];
const LOMBOK_FEASTS = [
  ["Feb or early Mar", "Bau Nyale", "Sasak families head to the south coast beaches before dawn to catch nyale sea worms, for the legend of Putri Mandalika. Elders set the night each year."],
  ["A week after Eid", "Lebaran Topat", "Families visit the tombs of Lombok's first Islamic teachers, then share ketupat and swim at the beaches around Mataram and Senggigi. In 2027 that's around mid-March."],
  ["Nov or Dec", "Perang Topat", "At Pura Lingsar, Hindu and Muslim neighbors pelt each other with rice cakes on the full moon of the seventh Sasak month."]
];
const QUIET_GILIS = ["Apr or Oct", "Quiet Gilis", "Still dry, with clear water for snorkeling and far fewer boats than June to September."];
const TOBA_WHEN = [
  ["Late May to Jun", "Lake Toba before the crowds", "Dry weather on Samosir, before the July and August peak."],
  ["Jun or Jul, varies", "Lake Toba Festival", "Samosir has held its lake festival around June or July, but the dates move every year, so check before you book."]
];

const LOOPS = [
  { id: "lombok", name: "Lombok", lat: -8.65, lng: 116.32, trips: [
    trip("lombok-highlights", "Highlights", {
      days: 3, months: "May to Sep", when: [LOMBOK_DRY, ...LOMBOK_FEASTS],
      plan: ["Banyumulek pottery village and Sukarara weaving village", "Sade Sasak village and Kuta Mandalika", "Tanjung Aan beach and Merese Hill sunset"],
      route: [[-8.63, 116.06, "Banyumulek"], [-8.75, 116.26, "Sukarara"], [-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.91, 116.35, "Merese Hill"]]
    }),
    trip("lombok-waterfalls", "Waterfalls", {
      days: 4, months: "May to Sep", when: [LOMBOK_DRY, ...LOMBOK_FEASTS],
      plan: ["Banyumulek pottery village and Sukarara weaving village", "Sade Sasak village and Kuta Mandalika", "Tanjung Aan beach and Merese Hill sunset", "Senaru village and waterfalls, Malimbu Hill sunset"],
      route: [[-8.63, 116.06, "Banyumulek"], [-8.75, 116.26, "Sukarara"], [-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.91, 116.35, "Merese Hill"], [-8.35, 116.41, "Senaru"], [-8.41, 116.06, "Malimbu Hill"]]
    }),
    trip("lombok-gili", "Gili", {
      days: 5, months: "May to Sep", when: [LOMBOK_DRY, QUIET_GILIS, ...LOMBOK_FEASTS],
      plan: ["Sukarara weaving village", "Sade Sasak village and Kuta Mandalika", "Tanjung Aan beach and Merese Hill sunset", "Senaru village and waterfalls", "Gili Trawangan day trip with snorkeling"],
      route: [[-8.75, 116.26, "Sukarara"], [-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.35, 116.41, "Senaru"], [-8.35, 116.03, "Gili Trawangan"]]
    }),
    trip("lombok-gili-beaches", "Gili and beaches", {
      days: 6, months: "May to Sep", when: [LOMBOK_DRY, QUIET_GILIS, ...LOMBOK_FEASTS],
      plan: ["Sade Sasak village and Kuta Mandalika", "Tanjung Aan and hidden beaches", "Free day in Kuta Mandalika", "Senaru village and waterfalls", "Gili Trawangan, snorkeling", "Gili Meno and Gili Air"],
      route: [[-8.84, 116.29, "Sade village"], [-8.89, 116.28, "Kuta Mandalika"], [-8.91, 116.32, "Tanjung Aan"], [-8.35, 116.41, "Senaru"], [-8.35, 116.03, "Gili Trawangan"], [-8.35, 116.06, "Gili Meno"], [-8.36, 116.08, "Gili Air"]]
    })
  ] },
  { id: "sulawesi", name: "Sulawesi", lat: -1.4, lng: 121.4, trips: [
    trip("sulawesi-toraja", "Toraja", {
      days: 7, months: "Jun to Sep", options: RIDES,
      when: [
        ["Jun to Sep", "Dry season", "Dry trails for the Batutumonga highlands and the Mount Sesean hike."],
        ["Jul to Sep", "Funeral season", "After the rice harvest many families hold their Rambu Solo' funerals. Dates depend on each family, so your guide asks around and checks you're welcome before you go."],
        ["Aug", "Ma'nene", "In some villages around Pangala', families open the graves to clean and re-dress their ancestors. Not every village holds it every year."],
        ["Late Oct to Dec", "Lovely December", "The yearly festival of the two Toraja regencies: buffalo carnival, bamboo cannons, coffee and choir festivals, then Christmas in the villages."]
      ],
      plan: ["Arrive in Rantepao, town and market", "Ke'te Kesu village and Londa burial caves", "Lemo cliff graves and Makale", "Batutumonga highlands and Lolai", "Mount Sesean hike", "Funeral ceremony visit with your guide, if one is running", "Highland coffee, then depart"],
      route: [[-2.97, 119.9, "Rantepao"], [-2.99, 119.92, "Ke'te Kesu"], [-3.03, 119.89, "Londa"], [-3.07, 119.86, "Lemo"], [-3.1, 119.85, "Makale"], [-2.91, 119.89, "Batutumonga"]]
    })
  ] },
  { id: "sumatra", name: "Sumatra", lat: -0.6, lng: 101.3, trips: [
    trip("sumatra-north", "North", {
      days: 7, months: "May to Sep", options: RIDES,
      when: [["May to Sep", "Dry season", "Drier trails for the Bukit Lawang jungle trek and the Sibayak sunrise hike, and orangutans are easier to spot."], ...TOBA_WHEN],
      plan: ["Medan to Bukit Lawang", "Orangutan jungle trek and river tubing", "Village tour by motorbike or becak", "Tangkahan elephants and hot springs", "Drive to Berastagi, fruit and flower market, Gundaling lookout", "Sibayak volcano sunrise hike, Sipiso-piso waterfall, ferry to Samosir", "Samosir Batak village, then back to Medan"],
      route: [[3.59, 98.67, "Medan"], [3.55, 98.11, "Bukit Lawang"], [3.69, 98.07, "Tangkahan"], [3.19, 98.51, "Berastagi"], [2.92, 98.52, "Sipiso-piso waterfall"], [2.67, 98.87, "Samosir, Lake Toba"]]
    }),
    trip("sumatra-north-14", "North, snorkeling and jungle", {
      days: 14, photos: 17, video: true, months: "May to Aug", options: RIDES,
      when: [["May to Aug", "Calm seas", "Sunny, calm weather in the Banyak Islands for snorkeling and island hopping, and drier trails at Ketambe."], ...TOBA_WHEN],
      pitch: "14 days, 13 nights. Snorkeling, jungle exploration and Lake Toba.",
      plan: ["Arrive in Medan, drive up to Berastagi", "Mount Sibayak sunrise hike, then Berastagi market", "Drive to Lake Toba, afternoon by the water", "Sidikalang and Kedabuhen waterfall", "Drive to Singkil", "Crocodile swamp by boat, then cross to Pulau Besar", "Snorkeling around Pulau Besar", "Island hopping in the Banyak Islands", "Boat back to Singkil, start the long drive inland", "Arrive in Ketambe", "Jungle trek in Ketambe", "Drive to the Karo highlands, Sinabung viewpoint hike outside the volcano's closed zone", "Telagah Sei Bingai", "Batu Katak, then back to Medan"],
      route: [[3.59, 98.67, "Medan"], [3.19, 98.51, "Berastagi"], [3.23, 98.51, "Mount Sibayak"], [2.67, 98.87, "Lake Toba"], [2.75, 98.32, "Sidikalang"], [2.65, 98.15, "Kedabuhen waterfall"], [2.29, 97.8, "Singkil"], [2.22, 97.35, "Pulau Besar"], [3.69, 97.65, "Ketambe"], [3.17, 98.39, "Mount Sinabung"], [3.46, 98.3, "Telagah Sei Bingai"], [3.55, 98.13, "Batu Katak"], [3.59, 98.67, "Medan"]]
    }),
    trip("sumatra-south", "South", {
      days: 7, months: "May to Sep", options: RIDES,
      when: [
        ["May to Sep", "Dry season", "Dry weather for the Pagar Alam tea hills under Mount Dempo."],
        ["Feb or early Mar", "Cap Go Meh", "Fifteen days after Chinese New Year, free ferries carry people to the pagoda on Pulau Kemaro, in the Musi, for prayers, lanterns and lion dances."],
        ["Mid Aug", "Bidar boat races", "For Independence Day, Palembang's riverside neighborhoods race long bidar boats on the Musi by the Ampera Bridge, usually over three days up to 17 August."]
      ],
      plan: ["Palembang, Ampera Bridge and Pasar 16 Ilir market", "Musi River boat trip", "Travel to Pagar Alam", "Pagar Alam highlands and tea plantations", "Travel to Lake Ranau", "Lake Ranau and lakeside villages", "Return to Palembang"],
      route: [[-2.98, 104.77, "Palembang"], [-4.02, 103.24, "Pagar Alam"], [-4.87, 103.92, "Lake Ranau"]]
    })
  ] },
  { id: "raja-ampat", name: "Raja Ampat", lat: -0.5, lng: 130.5, trips: [
    trip("raja-ampat", "", {
      days: 7, months: "Oct to Apr",
      when: [
        ["Dec to Mar", "Mantas and flat seas", "The calmest water of the year, and mantas gather at cleaning stations like Manta Sandy."],
        ["Oct to Nov, Mar to Apr", "Fewer boats", "Good sea conditions with fewer visitors around."]
      ],
      plan: ["Fly to Sorong, ferry to Waisai, boat to the homestay", "House reef snorkeling at Kri and Mansuar", "Piaynemo viewpoint, Telaga Bintang lagoon, Arborek village", "Manta Sandy and Pasir Timbul sandbank", "Dawn trek for birds of paradise on Waigeo or Gam", "Wayag, or Cape Kri and Friwen Wall", "Ferry back to Sorong"],
      route: [[-0.88, 131.26, "Sorong"], [-0.43, 130.82, "Waisai"], [-0.57, 130.57, "Arborek"], [-0.55, 130.69, "Kri"], [-0.55, 130.25, "Piaynemo"], [0.17, 130.03, "Wayag"]]
    })
  ] },
  // Borneo shows only its reel until its photos are picked.
  { id: "borneo", name: "Borneo", lat: 3.7, lng: 114.2, trips: [
    trip("borneo-sarawak-sabah", "Sarawak and Sabah", {
      days: 14, photos: 0, video: true, months: "Mar to Oct",
      when: [
        ["Mar to Oct", "Drier months", "Less rain on the Bako trails and along the Kinabatangan. November to February is the wettest time."],
        ["30 to 31 May", "Kaamatan", "Sabah's harvest festival runs through May and ends with the state celebration at Hongkod Koisaan in Penampang, near Kota Kinabalu."],
        ["1 to 2 Jun", "Gawai Dayak", "Sarawak's harvest festival. Longhouse families open their doors for food, rice wine and dancing."],
        ["Jun or Jul, varies", "Rainforest World Music Festival", "Three days of music at the Sarawak Cultural Village in Santubong. The dates move every year, so check before you book."]
      ],
      pitch: "14 days, 13 nights. Bako's sea stacks and proboscis monkeys, orangutans and sun bears in Sepilok, and the Kinabatangan River by boat.",
      plan: ["Arrive in Kuching, the waterfront and the cat statues", "Santubong: jungle trail, then a boat trip on the river mouth", "Kuching Chinatown and the Harmony Arch, the Tua Pek Kong temple lit up at night", "Boat to Bako National Park, bearded pigs by the beach, night walk for frogs and stick insects", "Bako at low tide: proboscis monkeys and silvered langurs, sea stacks and rock pools, then the boat back to Kuching", "Fly to Sandakan", "Sepilok: orangutan feeding and the Bornean Sun Bear Conservation Centre", "Gomantong Caves, then the Kinabatangan River: sunset cruise and night prawn fishing", "Kinabatangan: morning cruise for crocodiles and hornbills, night cruise for kingfishers", "Kinabatangan: jungle walk and monitor lizards, sunset cruise", "Limestone cave hike near Sukau", "Back to Sandakan", "Rainforest Discovery Centre in Sepilok: giant trees and the lily lake", "Sandakan, then depart"],
      route: [[1.56, 110.35, "Kuching"], [1.76, 110.33, "Santubong"], [1.72, 110.44, "Bako National Park"], [5.84, 118.12, "Sandakan"], [5.86, 117.95, "Sepilok"], [5.53, 118.07, "Gomantong Caves"], [5.52, 118.29, "Sukau, Kinabatangan River"], [5.88, 117.94, "Rainforest Discovery Centre"], [5.84, 118.12, "Sandakan"]]
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
