//yarn add react-native-svg
import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Gift Icon Component
export const GiftIcon = ({ width = 47, height = 60, color = "#F08784" }) => (
  <Svg width={width} height={height} viewBox="0 0 47 60" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.00064 29.3731C1.96982 26.5562 3.05935 23.8425 5.0295 21.829C6.99965 19.8155 9.68901 18.6672 12.5059 18.6367H33.5164C36.3332 18.6672 39.0226 19.8155 40.9927 21.829C42.9629 23.8425 44.0524 26.5562 44.0216 29.3731V47.267C44.0838 53.1315 39.3808 57.9364 33.5164 57.9999H12.5059C9.68901 57.9694 6.99965 56.8211 5.0295 54.8076C3.05935 52.7941 1.96982 50.0804 2.00064 47.2635V29.3731Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.424 8.43271L26.9018 14.2491L27.4936 16.2171L28.334 12.9079C28.6531 11.4827 29.5382 10.2485 30.7858 9.48897C32.0333 8.72947 33.5361 8.50998 34.9488 8.88094C37.8892 9.80242 39.5762 12.8825 38.7692 15.8564C38.4293 17.4054 37.1025 18.5406 35.5196 18.6368H16.0078C12.77 18.4864 10.0618 16.1264 9.47008 12.9395C8.22447 8.39113 10.8055 3.67347 15.3075 2.26964C17.4686 1.70227 19.7676 2.03847 21.6757 3.20093C23.5839 4.36339 24.937 6.25208 25.424 8.43271Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M29.4425 16.6822C29.699 15.6078 29.0361 14.5289 27.9617 14.2724C26.8873 14.0158 25.8084 14.6788 25.5519 15.7532L29.4425 16.6822ZM24.9741 18.1729C24.7175 19.2472 25.3805 20.3262 26.4549 20.5827C27.5293 20.8392 28.6082 20.1763 28.8647 19.1019L24.9741 18.1729ZM25.0115 18.6372C25.0115 17.5327 24.1161 16.6372 23.0115 16.6372C21.9069 16.6372 21.0115 17.5327 21.0115 18.6372H25.0115ZM21.0115 58.0004C21.0115 59.1049 21.9069 60.0004 23.0115 60.0004C24.1161 60.0004 25.0115 59.1049 25.0115 58.0004H21.0115ZM25.5519 15.7532L24.9741 18.1729L28.8647 19.1019L29.4425 16.6822L25.5519 15.7532ZM21.0115 18.6372V58.0004H25.0115V18.6372H21.0115Z"
      fill={color}
    />
  </Svg>
);

// Receive Icon Component
export const ReceiveIcon = ({ width = 46, height = 46, color = "#8B85EF" }) => (
  <Svg width={width} height={height} viewBox="0 0 46 46" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.4539 36.3643C13.4522 39.5269 10.8875 42.0894 7.72495 42.0883C4.56243 42.0872 1.99945 39.5229 2 36.3603C2.00055 33.1978 4.56443 30.6344 7.72695 30.6344C9.24635 30.6344 10.7035 31.2382 11.7776 32.3128C12.8517 33.3875 13.4547 34.8449 13.4539 36.3643V36.3643Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.5459 9.63497C32.5459 6.47206 35.1099 3.90802 38.2728 3.90802C41.4358 3.90802 43.9998 6.47206 43.9998 9.63497C43.9998 12.7979 41.4358 15.3619 38.2728 15.3619C35.1099 15.3619 32.5459 12.7979 32.5459 9.63497H32.5459Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Exchange Icon Component
export const ExchangeIcon = ({ width = 46, height = 53, color = "#00BA88" }) => (
  <Svg width={width} height={height} viewBox="0 0 46 53" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23 51C11.402 51 2 41.598 2 30V17.75C2 15.817 3.567 14.25 5.5 14.25H9C10.933 14.25 12.5 15.817 12.5 17.75V30C12.5 35.799 17.201 40.5 23 40.5C28.799 40.5 33.5 35.799 33.5 30V17.75C33.5 15.817 35.067 14.25 37 14.25H40.5C42.433 14.25 44 15.817 44 17.75V30C44 41.598 34.598 51 23 51V51Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
