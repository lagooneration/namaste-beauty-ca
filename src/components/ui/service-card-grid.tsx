'use client';
import styled from 'styled-components';
import ServiceCard from './service-card';

const ServiceCardGrid = styled.div`
  display: grid;
  gap: 2rem;
  width: 100%;
  padding: 1rem;

  /* Mobile view (1x4) */
  grid-template-columns: 1fr;
  
  /* Web view (2x2) */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
    margin: 0 auto;
  }
`; 