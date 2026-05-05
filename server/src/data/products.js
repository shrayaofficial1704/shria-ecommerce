const sizes = ["XS", "S", "M", "L", "XL"];

const sharedDetails = [
  "Statement fairy-inspired silhouette",
  "Premium occasion wear finish",
  "Photo-ready shimmer and embroidery",
  "Comfort lining for long events",
];

const productDrafts = [
  {
    name: "Blush Garden Mermaid Gown",
    slug: "blush-garden-mermaid-gown",
    shortDescription: "A pink floral mermaid gown with a bold off-shoulder bodice.",
    description:
      "A fitted blush gown with vine embroidery, bright floral appliques, and a dramatic soft train made for fairy garden entrances.",
    price: 18490,
    palette: "Blush Garden",
    colors: ["Fuchsia", "Blush Pink"],
    image: "/assets/products/shria-collection-01.webp",
    featured: true,
  },
  {
    name: "Bluebell Tulle Mermaid Gown",
    slug: "bluebell-tulle-mermaid-gown",
    shortDescription: "A powder-blue floral gown with sheer tulle volume at the hem.",
    description:
      "A blue fairy gown with delicate floral trails, crystal trim, and floating tulle that creates a graceful mermaid finish.",
    price: 19250,
    palette: "Bluebell",
    colors: ["Powder Blue", "Mist Blue"],
    image: "/assets/products/shria-collection-02.jpg",
    featured: true,
  },
  {
    name: "Aqua Pearl Vine Gown",
    slug: "aqua-pearl-vine-gown",
    shortDescription: "Aqua satin with pearl vine detail and a sculpted mermaid skirt.",
    description:
      "A luminous aqua gown with pearl embellishment, floral beadwork, and a fitted silhouette that opens into a graceful train.",
    price: 20990,
    palette: "Aqua Pearl",
    colors: ["Aqua", "Silver Pearl"],
    image: "/assets/products/shria-collection-03.webp",
    featured: true,
  },
  {
    name: "Prism Veil Crystal Gown",
    slug: "prism-veil-crystal-gown",
    shortDescription: "A pastel rainbow gown with crystal shimmer and soft flowing panels.",
    description:
      "An iridescent fairy gown with pastel pink, blue, and champagne tones, finished with vertical sparkle that catches every light.",
    price: 22490,
    palette: "Prism Glow",
    colors: ["Pastel Rainbow", "Champagne"],
    image: "/assets/products/shria-collection-04.webp",
    featured: true,
  },
  {
    name: "Fairy Aura Ball Gown",
    slug: "fairy-aura-ball-gown",
    shortDescription: "A radiant pastel ball gown with layered petals and butterfly sparkle.",
    description:
      "A fairytale ball gown with glowing pastel panels, sculpted bodice details, and airy skirt volume for a magical event look.",
    price: 24500,
    palette: "Fairy Aura",
    colors: ["Pearl Pink", "Sky Blue"],
    image: "/assets/products/shria-collection-05.webp",
  },
  {
    name: "Aurora Sleeve Shimmer Gown",
    slug: "aurora-sleeve-shimmer-gown",
    shortDescription: "A sparkling aurora gown with sheer flowing sleeves and a fitted body.",
    description:
      "A luminous lavender-blue gown with transparent sleeve drapes, crystal sparkle, and a sleek evening silhouette.",
    price: 21890,
    palette: "Aurora Shine",
    colors: ["Icy Lavender", "Aqua Glow"],
    image: "/assets/products/shria-collection-06.webp",
  },
  {
    name: "Sunset Blossom Ball Gown",
    slug: "sunset-blossom-ball-gown",
    shortDescription: "A bold floral ball gown with sunset yellow, plum, and garden motifs.",
    description:
      "A dramatic floral gown with rich purple and yellow tones, oversized blossom artwork, and regal ballroom volume.",
    price: 23490,
    palette: "Sunset Blossom",
    colors: ["Golden Yellow", "Plum"],
    image: "/assets/products/shria-collection-07.jpg",
  },
  {
    name: "Marigold Bell Sleeve Gown",
    slug: "marigold-bell-sleeve-gown",
    shortDescription: "A yellow floral gown with romantic bell sleeves and soft embroidery.",
    description:
      "A bright marigold fairy gown with off-shoulder neckline, flowing sleeves, and floral embroidery for a royal garden mood.",
    price: 18900,
    palette: "Marigold Bloom",
    colors: ["Marigold", "Soft Gold"],
    image: "/assets/products/shria-collection-08.jpg",
  },
  {
    name: "Galaxy Sequin Drape Gown",
    slug: "galaxy-sequin-drape-gown",
    shortDescription: "A vibrant sequin drape gown with magenta, turquoise, and gold shine.",
    description:
      "A sparkling couture drape gown with jewel-toned sequins, a fitted blouse, and a dramatic flowing side panel.",
    price: 22990,
    palette: "Galaxy Sequin",
    colors: ["Magenta", "Turquoise"],
    image: "/assets/products/shria-collection-09.jpg",
  },
  {
    name: "Storm Petal Layered Gown",
    slug: "storm-petal-layered-gown",
    shortDescription: "A storm-blue sculptural gown with airy layered petals.",
    description:
      "A blue-grey fairy gown with translucent petal layers, dark bodice lines, and a high-fashion floating skirt shape.",
    price: 24100,
    palette: "Storm Petal",
    colors: ["Storm Blue", "Mist White"],
    image: "/assets/products/shria-collection-10.webp",
  },
  {
    name: "Mint Palace Ball Gown",
    slug: "mint-palace-ball-gown",
    shortDescription: "A mint princess ball gown with gold embroidery and sparkling volume.",
    description:
      "A grand mint ball gown with ornate gold embroidery, full skirt volume, and palace-ready fantasy styling.",
    price: 26990,
    palette: "Mint Palace",
    colors: ["Mint", "Antique Gold"],
    image: "/assets/products/shria-collection-11.webp",
  },
  {
    name: "Twilight Vine Fairy Gown",
    slug: "twilight-vine-fairy-gown",
    shortDescription: "A sheer twilight gown with vine details and jewel-like sparkle.",
    description:
      "A moody fairy gown with green and plum ombre, delicate vine lines, and scattered crystal accents.",
    price: 20500,
    palette: "Twilight Vine",
    colors: ["Deep Plum", "Forest Green"],
    image: "/assets/products/shria-collection-12.jpg",
  },
  {
    name: "Blue Butterfly Petal Gown",
    slug: "blue-butterfly-petal-gown",
    shortDescription: "A sculptural blue petal dress inspired by butterfly wings.",
    description:
      "A dramatic blue fairy dress with layered wing-like panels, dark tulle edges, and a fantasy couture silhouette.",
    price: 21250,
    palette: "Butterfly Blue",
    colors: ["Royal Blue", "Midnight"],
    image: "/assets/products/shria-collection-13.webp",
  },
  {
    name: "Vintage Lace Fairy Dress",
    slug: "vintage-lace-fairy-dress",
    shortDescription: "A black and ivory lace fairy dress with layered vintage texture.",
    description:
      "A romantic ivory fairy dress with black corset lace, textured layers, and a soft vintage storybook finish.",
    price: 17650,
    palette: "Vintage Lace",
    colors: ["Ivory", "Black Lace"],
    image: "/assets/products/shria-collection-14.webp",
  },
  {
    name: "Rose Petal Sculpted Gown",
    slug: "rose-petal-sculpted-gown",
    shortDescription: "A pink sculptural gown with petal sleeves and floral movement.",
    description:
      "A romantic rose gown with sculpted bodice texture, sweeping petal sleeves, and soft blossom detail through the train.",
    price: 25250,
    palette: "Rose Petal",
    colors: ["Rose Pink", "Soft Blush"],
    image: "/assets/products/shria-collection-15.webp",
  },
  {
    name: "Blush Ombre Cape Gown",
    slug: "blush-ombre-cape-gown",
    shortDescription: "A blush ombre gown with flowing cape drape and floral accents.",
    description:
      "A graceful pink-to-grey fairy gown with sheer cape movement, floral embroidery, and a refined evening silhouette.",
    price: 19790,
    palette: "Blush Ombre",
    colors: ["Dusty Rose", "Soft Grey"],
    image: "/assets/products/shria-collection-16.jpg",
  },
  {
    name: "Emerald Peacock Gown",
    slug: "emerald-peacock-gown",
    shortDescription: "A black and emerald gown with peacock embroidery and a royal train.",
    description:
      "A dramatic emerald peacock gown with dark couture styling, feather embroidery, and a strong mermaid train.",
    price: 27990,
    palette: "Emerald Peacock",
    colors: ["Black", "Emerald"],
    image: "/assets/products/shria-collection-17.jpg",
  },
  {
    name: "Black Emerald Wing Gown",
    slug: "black-emerald-wing-gown",
    shortDescription: "A black velvet gown with glowing green wing-like side panels.",
    description:
      "A sleek black gown with teal fairy-wing panels, sparkling texture, and a clean modern fantasy shape.",
    price: 21990,
    palette: "Emerald Wing",
    colors: ["Black", "Aqua Green"],
    image: "/assets/products/shria-collection-18.jpg",
  },
];

const products = productDrafts.map((product, index) => ({
  sortOrder: index + 1,
  currency: "INR",
  category: "Fairy Gown",
  collectionName: "Shria Fairy Gown Collection",
  sizes,
  inventory: 5 + (index % 5),
  rating: Number((4.6 + (index % 5) * 0.08).toFixed(1)),
  reviewsCount: 12 + index * 3,
  deliveryEstimate: index % 3 === 0 ? "Ships in 5-8 days" : "Ships in 7-10 days",
  artworkId: product.slug,
  details: sharedDetails,
  featured: false,
  ...product,
}));

export default products;
