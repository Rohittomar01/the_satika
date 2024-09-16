import React, { useState, useEffect } from "react";
import { getData } from "../../Services/ServerServices";
import NavBar from "../Common_Components/NavBar";
import Carousel from "../Components/Home/Carousel/Carousel";
import CategoryCards from "../Components/Home/Category_cards/CategoryCards";
import TrendingProducts from "../Common_Components/TrendingProducts";
import GallerySlider from "../Components/Home/GallerySlider";
import Testimonials from "../Components/Home/Testimonials";
import Footer from "../Common_Components/Footer";
import Footer_02 from "../Common_Components/Footer_02";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const OPTIONS = { axis: "y", loop: true };
  const SLIDES = [
    {
      id: 1,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
    },
    {
      id: 2,
      image:
        "https://cdn.pixabay.com/photo/2024/04/13/02/52/indian-8693086_1280.jpg",
    },
    {
      id: 3,
      image:
        "https://cdn.pixabay.com/photo/2024/06/24/06/11/ai-generated-8849214_1280.jpg",
    },
    {
      id: 4,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
    },
    {
      id: 5,
      image:
        "https://cdn.pixabay.com/photo/2019/09/20/13/10/indian-women-4491672_1280.jpg",
    },
  ];

  const reviews = [
    {
      id: 1,
      rating: 5,
      date: "30/06/24",
      location: "Taneira T.Nagar Chennai",
      review:
        "We had an excellent shopping experience in Pondy bazar Taneira showroom. Wide range of collection, excellent customer service.... ...",
      reviewer: "Bharathi N.",
    },
    {
      id: 2,
      rating: 4,
      date: "15/07/24",
      location: "Taneira Koramangala Bangalore",
      review:
        "Great collection and the staff were very helpful and courteous. Highly recommend this place for traditional wear.",
      reviewer: "Anitha K.",
    },
    {
      id: 2,
      rating: 4,
      date: "15/07/24",
      location: "Taneira Koramangala Bangalore",
      review:
        "Great collection and the staff were very helpful and courteous. Highly recommend this place for traditional wear.",
      reviewer: "Anitha K.",
    },
    {
      id: 2,
      rating: 4,
      date: "15/07/24",
      location: "Taneira Koramangala Bangalore",
      review:
        "Great collection and the staff were very helpful and courteous. Highly recommend this place for traditional wear.",
      reviewer: "Anitha K.",
    },
    // Add more reviews as needed
  ];

  const fetchTrendingProducts = async () => {
    try {
      const result = await getData(`product/fetch-Trendingproducts`);
      setTrendingProducts(result.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Carousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ padding: "0px 20px" }}>
          <CategoryCards />
        </div>
        <div style={{ padding: "0px 20px" }}>
          <TrendingProducts
            data={trendingProducts}
            heading="Trending Products"
            buttonDisplay="block"
          />
        </div>
        <div style={{ padding: "0px 20px" }}>
          <GallerySlider />
        </div>
        <div style={{ padding: "0px 30px" }}>
          <Testimonials reviews={reviews} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
