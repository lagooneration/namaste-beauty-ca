'use client'
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

type ServiceCardProps = {
  serviceName: string;
  price: number;
  discountPercentage?: number;
};

const ServiceCard = ({ serviceName, price, discountPercentage }: ServiceCardProps) => {
  return (
    <>
    <div className="absolute -top-3 left-3 z-10">
    <Image src="/icons/icon1.png" alt="Group" width={70} height={70} />
  </div>
    <StyledWrapper>
      <div className="foodCard">
        {/* <button className="Like">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(190,190,190)" width={25} height={25}>
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </button> */}

        {/* {discountPercentage && (
            <div className="Discount font-mono">{discountPercentage}% OFF</div>
          )} */}

<div className="container">
          <div className="tooltip">
        {discountPercentage && (
          <div className="font-mono text-red-400">{discountPercentage}% OFF</div>
        )}
        </div>
          </div>
        <footer className="priceAndButton">
        <p className="foodTitle">{serviceName}</p>
          <button className="button"><p className="Price">${price}</p></button>
          
        </footer>
      </div>
    </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  .foodCard {
    height: 60px;
    width: 280px;
    border-radius: 12px;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    position: relative;
    outline: 2px solid rgb(48, 48, 48);
    user-select: none;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }

  .Discount {
    position: absolute;
    right: -10px;
    top: -4px;
    font-size: 8px;
    padding: 5px 10px 5px 10px;
    font-weight: 600;
    color: rgb(239, 168, 212);
    background-color: rgb(83, 5, 55);
    border-radius: 0px 15px 0px 15px;
    width: auto;
    height: auto;
    font-style: italic;
    z-index: 10;
    scale: 0.8;
  }

  .tooltip {
   position: absolute;
   top: -30px;
    right: 20px;
    z-index: 1;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: #333;
  }


  .container {
    font-size: 18px;
    color: #333;
    position: relative;
    cursor: pointer;
    display: inline-block;
  }


  .Like {
    border: none;
    align-items: center;
    justify-content: center;
    display: flex;
    position: absolute;
    right: 0%;
    font-size: 15px;
    padding: 8px;
    color: rgb(210, 210, 210);
    background-color: rgb(48, 48, 48);
    border-radius: 0px 20px 0px 15px;
    width: 40px;
    height: 35px;
    cursor: pointer;
  }

  .Like > svg {
    transition: all 0.3s ease;
  }

  .Like:hover > svg {
    fill: rgb(190, 0, 0);
  }

  .Like:focus {
    outline: none;
  }

  .imageContainer {
    padding: 5px;
    height: 60%;
    width: 100%;
    padding-top: 35px;
    border-radius: 15px;
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .imageContainer > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  .foodTitle {
    color: rgb(32, 32, 32);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 200px;
    font-weight: 800;
    padding-top: 0;
  }

  .priceAndButton {
    position: absolute;
    bottom: 0;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
    padding-left: 8px;
  }

  .Price {
    font-weight: 600;
    padding-left: 5px;
    color: rgb(0, 0, 0);
    font-variant-numeric: tabular-nums;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: start;
  }

  .button {
    padding: 0px 12px;
    height: 30px;
    border: none;
    background-color: rgba(116, 219, 160, 0.5);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.4s ease;
    opacity: 100%;
    font-size: 15px;
    padding-top: -8px;
    margin-bottom: 8px;
  }

  .button:hover {
    box-shadow: rgb(116, 219, 160) 0px 0px 15px;
  }

  .button:active {
    transform: scale(0.95);
  }
    
  @keyframes goPopup {
    0% {
      transform: translateY(0) scaleY(0);
      opacity: 0;
    }
    50% {
      transform: translateY(-50%) scaleY(1.2);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%) scaleY(1);
      border-radius: 8px;
      opacity: 1;
      height: 40px;
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-3px);
    }
    60% {
      transform: translateY(-2px);
    }
  }`;

  

export default ServiceCard;
