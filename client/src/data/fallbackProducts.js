const sizes = ["XS", "S", "M", "L", "XL"];

const sharedDetails = [
  "Statement fairy-inspired silhouette",
  "Premium occasion wear finish",
  "Photo-ready shimmer and embroidery",
  "Comfort lining for long events",
];

const productDrafts = [
  ["Blush Garden Mermaid Gown", "blush-garden-mermaid-gown", "Blush Garden", ["Fuchsia", "Blush Pink"], 18490, "/assets/products/shria-collection-01.webp"],
  ["Bluebell Tulle Mermaid Gown", "bluebell-tulle-mermaid-gown", "Bluebell", ["Powder Blue", "Mist Blue"], 19250, "/assets/products/shria-collection-02.jpg"],
  ["Aqua Pearl Vine Gown", "aqua-pearl-vine-gown", "Aqua Pearl", ["Aqua", "Silver Pearl"], 20990, "/assets/products/shria-collection-03.webp"],
  ["Prism Veil Crystal Gown", "prism-veil-crystal-gown", "Prism Glow", ["Pastel Rainbow", "Champagne"], 22490, "/assets/products/shria-collection-04.webp"],
  ["Fairy Aura Ball Gown", "fairy-aura-ball-gown", "Fairy Aura", ["Pearl Pink", "Sky Blue"], 24500, "/assets/products/shria-collection-05.webp"],
  ["Aurora Sleeve Shimmer Gown", "aurora-sleeve-shimmer-gown", "Aurora Shine", ["Icy Lavender", "Aqua Glow"], 21890, "/assets/products/shria-collection-06.webp"],
  ["Sunset Blossom Ball Gown", "sunset-blossom-ball-gown", "Sunset Blossom", ["Golden Yellow", "Plum"], 23490, "/assets/products/shria-collection-07.jpg"],
  ["Marigold Bell Sleeve Gown", "marigold-bell-sleeve-gown", "Marigold Bloom", ["Marigold", "Soft Gold"], 18900, "/assets/products/shria-collection-08.jpg"],
  ["Galaxy Sequin Drape Gown", "galaxy-sequin-drape-gown", "Galaxy Sequin", ["Magenta", "Turquoise"], 22990, "/assets/products/shria-collection-09.jpg"],
  ["Storm Petal Layered Gown", "storm-petal-layered-gown", "Storm Petal", ["Storm Blue", "Mist White"], 24100, "/assets/products/shria-collection-10.webp"],
  ["Mint Palace Ball Gown", "mint-palace-ball-gown", "Mint Palace", ["Mint", "Antique Gold"], 26990, "/assets/products/shria-collection-11.webp"],
  ["Twilight Vine Fairy Gown", "twilight-vine-fairy-gown", "Twilight Vine", ["Deep Plum", "Forest Green"], 20500, "/assets/products/shria-collection-12.jpg"],
  ["Blue Butterfly Petal Gown", "blue-butterfly-petal-gown", "Butterfly Blue", ["Royal Blue", "Midnight"], 21250, "/assets/products/shria-collection-13.webp"],
  ["Vintage Lace Fairy Dress", "vintage-lace-fairy-dress", "Vintage Lace", ["Ivory", "Black Lace"], 17650, "/assets/products/shria-collection-14.webp"],
  ["Rose Petal Sculpted Gown", "rose-petal-sculpted-gown", "Rose Petal", ["Rose Pink", "Soft Blush"], 25250, "/assets/products/shria-collection-15.webp"],
  ["Blush Ombre Cape Gown", "blush-ombre-cape-gown", "Blush Ombre", ["Dusty Rose", "Soft Grey"], 19790, "/assets/products/shria-collection-16.jpg"],
  ["Emerald Peacock Gown", "emerald-peacock-gown", "Emerald Peacock", ["Black", "Emerald"], 27990, "/assets/products/shria-collection-17.jpg"],
  ["Black Emerald Wing Gown", "black-emerald-wing-gown", "Emerald Wing", ["Black", "Aqua Green"], 21990, "/assets/products/shria-collection-18.jpg"],
];

const fallbackProducts = productDrafts.map(([name, slug, palette, colors, price, image], index) => ({
  id: slug,
  sortOrder: index + 1,
  name,
  slug,
  shortDescription: `${palette} fairy gown with couture styling and event-ready detail.`,
  description: `${name} is part of the Shria fairy gown collection, designed with a ${palette.toLowerCase()} mood, graceful movement, and a polished occasion-wear finish.`,
  price,
  currency: "INR",
  category: "Fairy Gown",
  collectionName: "Shria Fairy Gown Collection",
  palette,
  colors,
  sizes,
  featured: index < 4,
  inventory: 5 + (index % 5),
  rating: Number((4.6 + (index % 5) * 0.08).toFixed(1)),
  reviewsCount: 12 + index * 3,
  deliveryEstimate: index % 3 === 0 ? "Ships in 5-8 days" : "Ships in 7-10 days",
  artworkId: slug,
  image,
  details: sharedDetails,
}));

export default fallbackProducts;
