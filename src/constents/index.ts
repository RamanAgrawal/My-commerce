export const Navigation_Items = [
  { name: "Home", path: "/", user: true },
  { name: "My Order", path: "/orders", user: true },
  { name: "Edit Products", path: "/admin", admin: true },
  { name: "Orders", path: "/admin/orders", admin: true },
];

export const passWordPattern = {
  value: /^.{6,}$/gm,
  message: `at least 6 characters`,
};
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
    img: heromob1,
    alt: "Mobiles deals",
    discount: "45",
    path: "/products",
  },
  {
    heading: "Deals on Laptops",
    img: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D",
    alt: "Laptop Deals",
    discount: "65",
    path: "/products",
  },
  {
    heading: "Footware Deals",
    img: "https://media.istockphoto.com/id/1279108197/photo/variety-of-womens-fashion-comfortable-shoes-of-all-seasons-on-a-light-background-top-view.jpg?s=612x612&w=0&k=20&c=_mdUMo2tsufgilqv8IQeW6hp8YjICTR8_tF-YP1Zgxk=",
    alt: "House",
    discount: "50",
    path: "/products",
  },
  {
    heading: "Best on Mens Fashion",
    img: "https://i.dummyjson.com/data/products/51/2.jpg",
    alt: "Cloths",
    discount: "70",
    path: "/products",
  },
];

export const FIRST_PRODUCT_SLIDER_DATA = {
  heading: "Top Selling Categories",
  slideData: [
    {
      heading: "Mens Clothing",
      path: "/products",
      discount: "45",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "Mobiles",
      path: "/products",
      discount: "56",
      img: "https://i.dummyjson.com/data/products/4/2.jpg",
    },
    {
      heading: "Home-decoration",
      path: "/products",
      discount: "70",
      img: "https://i.dummyjson.com/data/products/27/4.jpg",
    },
    {
      heading: "Furniture",
      path: "/products",
      discount: "40",
      img: "https://i.dummyjson.com/data/products/31/2.jpg",
    },
    {
      heading: "Wristwatch",
      path: "/products",
      discount: "35",
      img: "https://i.dummyjson.com/data/products/61/2.png",
    },
    {
      heading: "Motorcycle",
      path: "/products",
      discount: "45",
      img: "https://i.dummyjson.com/data/products/92/2.jpg",
    },
    {
      heading: "Jewellery",
      path: "/products",
      discount: "25",
      img: "https://i.dummyjson.com/data/products/77/2.jpg",
    },
    {
      heading: "Mobiles",
      path: "/products",
      discount: "60",
      img: "https://i.dummyjson.com/data/products/4/2.jpg",
    },
    {
      heading: "Home-decoration",
      path: "/products",
      discount: "45",
      img: "https://i.dummyjson.com/data/products/27/4.jpg",
    },
  ],
};
export const SECOND_PRODUCT_SLIDER_DATA = {
  heading: "Top Selling Products",
  slideData: [
    {
      heading: "Mens Clothing",
      path: "/products",
      discount: "45",
      img: "https://i.dummyjson.com/data/products/51/2.jpg",
    },
    {
      heading: "Mobiles",
      path: "/products",
      discount: "56",
      img: "https://i.dummyjson.com/data/products/4/2.jpg",
    },
    {
      heading: "Home-decoration",
      path: "/products",
      discount: "70",
      img: "https://i.dummyjson.com/data/products/27/4.jpg",
    },
    {
      heading: "Furniture",
      path: "/products",
      discount: "40",
      img: "https://i.dummyjson.com/data/products/31/2.jpg",
    },
    {
      heading: "Wristwatch",
      path: "/products",
      discount: "35",
      img: "https://i.dummyjson.com/data/products/61/2.png",
    },
    {
      heading: "Motorcycle",
      path: "/products",
      discount: "45",
      img: "https://i.dummyjson.com/data/products/92/2.jpg",
    },
    {
      heading: "Jewellery",
      path: "/products",
      discount: "25",
      img: "https://i.dummyjson.com/data/products/77/2.jpg",
    },
    {
      heading: "Mobiles",
      path: "/products",
      discount: "60",
      img: "https://i.dummyjson.com/data/products/4/2.jpg",
    },
    {
      heading: "Home-decoration",
      path: "/products",
      discount: "45",
      img: "https://i.dummyjson.com/data/products/27/4.jpg",
    },
  ],
};

export const SALE_SECTION_CARD_DATA = [
  {
    heading: "Perfume",
    img: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
    path: "/product-detail/65491f402ce326d0302f9d15",
    discount: "45",
  },
  {
    heading: "3D Embellishment Art Lamp",
    img: "https://i.dummyjson.com/data/products/28/2.jpg",
    path: "/product-detail/65491f402ce326d0302f9d67",
    discount: "50",
  },
  {
    heading: "Temperature Controller",
    img: "https://i.dummyjson.com/data/products/87/3.jpg",
    path: "/product-detail/65491f402ce326d0302f9d67",
    discount: "48",
  },
  {
    heading: "frock gold printed",
    img: "https://i.dummyjson.com/data/products/43/4.jpg",
    path: "/product-detail/65491f402ce326d0302f9d67",
    discount: "80",
  },
];

export const ProdData = [
  {
    id: "1",
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: "2",
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: "3",
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,

    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: "2",
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
];
export const ProdData2 = [
  {
    id: "3",
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,

    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: "1",
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: "2",
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },

  {
    id: "2",
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
];
