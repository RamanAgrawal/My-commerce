export const Navigation_Items = [
  { name: "Home", path: "/", user: true },
  { name: "My Order", path: "/orders", user: true },
  { name: "Edit Products", path: "/admin", admin: true },
  { name: "Orders", path: "/admin/orders", admin: true },
];
//profile menu drop down items
export const MenuItems = [
  {
    path: "/profile",
    title: "Profile",
  },
  {
    path: "/orders",
    title: "My Order",
  },
  {
    path: "/logout",
    title: "Sign Out",
  },
];
import mob1 from "../assets/Slider/bannermob1.jpg";
import mob2 from "../assets/Slider/bannermob2.jpg";
import mob3 from "../assets/Slider/bannermob3.jpg";
import img1 from "../assets/Slider/banner1.jpg";
import img2 from "../assets/Slider/banner2.jpg";
import img3 from "../assets/Slider/banner3.jpg";

import heromob1 from "../assets/mobile.png";
export const SliderData = [
  {
    img: img1,
    mob: mob1,
    alt: "House",
  },
  {
    img: img2,
    mob: mob2,
    alt: "House",
  },
  {
    img: img3,
    alt: "Toy",
    mob: mob3,
  },
];

export const HERO_DEAL_CARD_DATA = [
  {
    heading: "Deals on Mobiles",
    img: "https://i.dummyjson.com/data/products/1/3.jpg",
    alt: "Mobiles deals",
    discount: "45",
    path: "/",
  },
  {
    heading: "Deals on Laptops",
    img: heromob1,
    alt: "Laptop Deals",
    discount: "65",
    path: "/",
  },
  {
    heading: "Footware Deals",
    img: "https://i.dummyjson.com/data/products/13/2.png",
    alt: "House",
    discount: "50",
    path: "/",
  },
  {
    heading: "Best on Mens Fashion",
    img: "https://i.dummyjson.com/data/products/51/2.jpg",
    alt: "Cloths",
    discount: "70",
    path: "/",
  },
];

export const FIRST_PRODUCT_SLIDER_DATA = {
  heading: "Top Selling Products",
  slideData: [
    {
      heading: "adrak",
      path: "/products",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      path: "/products",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      path: "/products",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      path: "/products",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      path: "/products",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      path: "/products",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      path: "/products",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
  ],
};
export const SECOND_PRODUCT_SLIDER_DATA = {
  heading: "Top Selling Products",
  slideData: [
    {
      heading: "adrak",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "adrak",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
  ],
};

export const ProdData = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    ],
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/2/1.jpg",
      "https://i.dummyjson.com/data/products/2/2.jpg",
      "https://i.dummyjson.com/data/products/2/3.jpg",
      "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    ],
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    discountPercentage: 17.91,
    rating: 4.3,
    stock: 123,
    brand: "OPPO",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/4/1.jpg",
      "https://i.dummyjson.com/data/products/4/2.jpg",
      "https://i.dummyjson.com/data/products/4/3.jpg",
      "https://i.dummyjson.com/data/products/4/4.jpg",
      "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    ],
  },
];
