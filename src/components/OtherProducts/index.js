import React from 'react';
import { Carousel } from '@mantine/carousel';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../apis';
import { Image } from '@mantine/core';
import Rating from '@mui/material/Rating';
import { getDiscountPrice } from '../../utils';

const OtherProducts = ({ onClick, detailId }) => {
  const { isLoading, data } = useQuery(['products'], fetchProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter((product) => product.id !== detailId);

  return (
    <div className="mt-8">
      <h5 className="text-2xl font-semibold">Other Products</h5>
      <Carousel
        slideSize="33.333333%"
        loop
        align="start"
        slidesToScroll={3}
        slideGap="md"
        className="mt-4"
      >
        {filteredData.map((product) => (
          <Carousel.Slide
            key={product.id}
            id={product.id}
            size="200px"
            className="cursor-pointer"
            onClick={onClick}
          >
            {product.off && (
              <div className="flex gap-2">
                <strong className="text-red-500">SALE</strong>
                <div
                  className="w-[70px] h-[30px] bg-red-500 flex 
 justify-center items-center"
                >
                  <strong className="text-white text-xs">{product.off}</strong>
                </div>
              </div>
            )}
            <Image src={product.image} alt={product.name} />
            <div className="flex gap-2 items-center">
              <Rating
                name="read-only"
                value={product.rating}
                readOnly
                size="small"
              />
              <p className="text-gray-400 text-xs">
                ({product.reviewCount} reviews)
              </p>
            </div>
            <p className="text-xs">{product.name}</p>
            <div className="flex gap-2">
              <p
                className={`text-black font-semibold text-lg ${
                  product.off && 'line-through'
                }`}
              >
                {product.price}
              </p>
              {product.off && (
                <p className="text-red-500 font-semibold text-xl">
                  ${getDiscountPrice(product)}
                </p>
              )}
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default OtherProducts;
