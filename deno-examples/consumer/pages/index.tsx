import React from "react";
export default function Home() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        <li>
          <a
            rel='nav'
            href='/error'
            data-active-className='active'
            data-active-style={{ color: "purple" }}>
            Error Page
          </a>
        </li>
        <li>
          <a
            rel='nav'
            href='/products'
            data-active-className='active'
            data-active-style={{ color: "purple" }}>
            Get all Products
          </a>
        </li>
      </ul>
    </div>
  );
}
