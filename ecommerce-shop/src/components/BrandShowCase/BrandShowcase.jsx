// src/components/BrandShowcase.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Brands array'ini tanımlıyoruz
const brands = [
  {
    id: 1,
    name: "Nike",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png",
  },
  {
    id: 2,
    name: "Adidas",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/adidas-logo-png-transparent.png",
  },
  {
    id: 3,
    name: "Puma",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/puma-logo-png-transparent.png",
  },
  {
    id: 4,
    name: "Asics",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/asics-logo-png-transparent.png",
  },
  {
    id: 5,
    name: "New Balance",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/new-balance-2-logo-png-transparent.png",
  },
  {
    id: 6,
    name: "Reebok",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/reebok-logo-png-transparent.png",
  },
  {
    id: 7,
    name: "Converse",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/converse-logo-png-transparent.png",
  },
  {
    id: 8,
    name: "Vans",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/vans-logo-png-transparent.png",
  },
];

const BrandShowcase = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Trusted Brands
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="h-auto flex items-center justify-center"
        >
          {brands.map((brand) => (
            <SwiperSlide
              key={brand.id}
              className="h-auto flex items-center justify-center"
            >
              <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-16 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandShowcase;
