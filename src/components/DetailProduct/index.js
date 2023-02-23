import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../apis';
import { Carousel } from '@mantine/carousel';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Image } from '@mantine/core';
import { getDiscountPrice } from '../../utils';

const DetailProduct = ({ detailId }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const { error, isLoading, data } = useQuery(['products'], fetchProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  const detailProduct = data.find((product) => product.id === detailId);

  return (
    <div className="rounded-lg shadow-lg p-4">
      <section className="product-details sm:flex gap-8">
        <div className="border-2 border-slate-200 p-1 overflow-hidden rounded-lg shadow-md">
          <div className="relative">
            <Carousel
              sx={{ maxWidth: 350 }}
              mx="auto"
              height={300}
              onSlideChange={(index) => setSlideIndex(index)}
              initialSlide={slideIndex}
              className="relative"
            >
              {detailProduct.images.map((image, index) => (
                <Carousel.Slide key={`img-${index}`}>
                  <Image src={image} alt={`img-${index}`} />
                </Carousel.Slide>
              ))}
            </Carousel>
            <p className="absolute bottom-0 right-4">
              {slideIndex + 1}/{detailProduct.images.length}
            </p>
          </div>
          <div className="flex w-16 mx-auto justify-center gap-2">
            {detailProduct.images.map((image, index) => (
              <img
                className={`border rounded-lg ${
                  slideIndex === index ? 'border-green-400' : 'border-gray-200'
                }`}
                src={image}
                alt={`img-${index}`}
                key={`img-${index}`}
                onClick={() => setSlideIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 sm:mt-0">
          {detailProduct.off && (
            <div className="flex gap-2">
              <strong className="text-red-500">SALE</strong>
              <div
                className="w-[70px] h-[30px] bg-red-500 flex 
 justify-center items-center"
              >
                <strong className="text-white text-xs">
                  {detailProduct.off}
                </strong>
              </div>
            </div>
          )}

          <strong className="text-lg">{detailProduct.name}</strong>
          <div className="flex gap-2 items-center">
            <Rating name="read-only" value={detailProduct.rating} readOnly />
            <p className="text-gray-400">
              ({detailProduct.reviewCount} reviews)
            </p>
          </div>

          <div className="flex gap-2">
            <p
              className={`text-black font-semibold text-2xl ${
                detailProduct.off && 'line-through'
              }`}
            >
              {detailProduct.price}
            </p>
            {detailProduct.off && (
              <p className="text-red-500 font-semibold text-3xl">
                ${getDiscountPrice(detailProduct)}
              </p>
            )}
          </div>
          <div className="border-b-2 border-gray-300 w-full"></div>
          <div className="flex gap-4 mt-4">
            <Button color="warning" variant="contained">
              Add To Cart
            </Button>
            <Button variant="contained" color="success">
              Buy Now
            </Button>
          </div>
        </div>
      </section>
      <section className="product-all-info"></section>
    </div>
  );
};

export default DetailProduct;
