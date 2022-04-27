import React from "react";
import { useDeno, useRouter } from "framework/react";

export default function ProductPage() {
  const { pathname } = useRouter();
  const productId = pathname.split("/")[2];
  const getProductById = useDeno(async () => {
    return await (
      await fetch(`http://localhost:3000/product/${productId}`)
    ).json();
  }, 0);

  const productInfo = (
    <div>
      <p>ID: {getProductById.id}</p>
      <p>Name: {getProductById.name}</p>
      <p>Type: {getProductById.type}</p>
    </div>
  );

  return productInfo;
}
