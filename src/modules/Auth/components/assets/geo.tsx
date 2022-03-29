import * as React from 'react';

const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={40}
    height={40}
    {...props}
  >
    <defs>
      <path id="a" d="M0 0h250.072v250H0Z" />
    </defs>
    <clipPath id="b">
      <use
        height="100%"
        width="100%"
        style={{
          overflow: 'visible'
        }}
        xlinkHref="#a"
        overflow="visible"
      />
    </clipPath>
    <path
      transform="matrix(1.0237 0 0 1.024 -.023 0)"
      style={{
        fill: '#008033'
      }}
      d="M30.327 0H219.72c16.735 0 30.303 15.377 30.303 34.345v181.31c0 18.968-13.567 34.345-30.304 34.345H30.326C13.59 250 .022 234.623.022 215.655V34.345C.022 15.377 13.59 0 30.327 0"
      clipPath="url(#b)"
    />
    <path
      transform="matrix(1.0237 0 0 1.024 -.023 0)"
      style={{
        fill: '#fff'
      }}
      d="M187.924 47.813c-4.48-.05-8.96 1.46-12.496 4.21a20.184 20.184 0 0 0-7.16 11.07c-12.838 52.868-47.466 75.53-81.5 87.408-34.034 11.88-64.938 10.47-64.938 10.47a16.67 16.67 0 0 0-1 0H.013c-.03 15.353 0 18.784 0 40H20.83v-.03c2.643.117 38.55 1.473 79.125-12.69 38.778-13.534 83.136-43.445 102.657-100.437 32.34.107 47.417 0 47.417 0 .05-18.882.072-19.493-.022-40 0 0-37.76.25-62.084 0z"
      clipPath="url(#b)"
    />
  </svg>
);

export default SvgComponent;
