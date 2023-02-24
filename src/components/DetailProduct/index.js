import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../apis';
import { Carousel } from '@mantine/carousel';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Image } from '@mantine/core';
import { getDiscountPrice } from '../../utils';
import { toast, ToastContainer } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const DetailProduct = ({ detailId, slideIndex, setSlideIndex }) => {
  const { error, isLoading, data } = useQuery(['products'], fetchProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  const detailProduct = data.find((product) => product.id === detailId);

  const handleButtonBuy = () => {
    toast.success(`Sucessfully buy ${detailProduct.name}`, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  };

  const handleButtonAddToCart = () => {
    toast.success(`Sucessfully add ${detailProduct.name} to cart`, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  };

  return (
    <div className="p-4 rounded-lg shadow-lg">
      <section className="gap-8 product-details sm:flex">
        <div className="p-1 overflow-hidden border-2 rounded-lg shadow-md border-slate-200">
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
          <div className="flex justify-center w-16 gap-2 mx-auto">
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
                <strong className="text-xs text-white">
                  {detailProduct.off}
                </strong>
              </div>
            </div>
          )}

          <strong className="text-lg">{detailProduct.name}</strong>
          <div className="flex items-center gap-2">
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
              <p className="text-3xl font-semibold text-red-500">
                ${getDiscountPrice(detailProduct)}
              </p>
            )}
          </div>
          <div className="w-full border-b-2 border-gray-300"></div>
          <div className="flex gap-4 mt-4">
            <Button
              color="warning"
              variant="contained"
              onClick={handleButtonAddToCart}
              startIcon={<AddShoppingCartIcon />}
            >
              Add To Cart
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleButtonBuy}
              startIcon={<ShoppingBasketIcon />}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DetailProduct;
