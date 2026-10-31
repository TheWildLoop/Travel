// Edit this file only. One entry per island, one trip() per trip.
// Photos: set photos to how many you have. Name the files img/<island id>/<trip id>-01.webp, -02.webp ...
// Example: img/lombok/lombok-north-01.webp
// Fill a trip in one line:
// trip("lombok-north", "North", { days: 4, price: "from $X", months: "May to Sep", photos: 6, youtube: "VIDEOID", pitch: "One short paragraph.", plan: ["Day one text", "Day two text"] })

const SITE = {
  email: "leo.thewildloop@gmail.com",
  whatsapp: "60132903570", // digits with country code, no plus. Empty hides the WhatsApp buttons.
  instagram: "the_wild_loop_travel", // handle without @
  tiktok: "the_wild_loop" // handle without @
};

const trip = (id, name = "", extra = {}) => ({
  id, name, days: 0, price: "", months: "", photos: 0, youtube: "", pitch: "", plan: [], ...extra
});

const LOOPS = [
  { id: "lombok", name: "Lombok", lat: -8.65, lng: 116.32, trips: [trip("lombok-north", "North"), trip("lombok-south", "South")] },
  { id: "nusa-penida", name: "Nusa Penida", lat: -8.73, lng: 115.54, trips: [trip("nusa-penida")] },
  { id: "bali", name: "Bali", lat: -8.34, lng: 115.09, trips: [trip("bali-north", "North"), trip("bali-south", "South")] },
  { id: "sumbawa", name: "Sumbawa", lat: -8.65, lng: 117.42, trips: [trip("sumbawa")] },
  { id: "sumatra", name: "Sumatra", lat: -0.6, lng: 101.3, trips: [trip("sumatra-north", "North"), trip("sumatra-south", "South")] },
  { id: "sulawesi", name: "Sulawesi", lat: -1.4, lng: 121.4, trips: [trip("sulawesi-north", "North"), trip("sulawesi-south", "South")] },
  { id: "java", name: "Java", lat: -7.5, lng: 110.5, trips: [trip("java-east", "East"), trip("java-west", "West")] }
];

// Replace the placeholder. Photo path example: img/guides/name.webp. Empty list hides the section.
const GUIDES = [
  { name: "Guide name", languages: "", bio: "Two lines about this guide.", photo: "" }
];
