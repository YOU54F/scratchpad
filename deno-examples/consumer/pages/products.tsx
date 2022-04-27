import React from "react";
import { useDeno } from "framework/react";
import PropTypes from "prop-types";

export default function Products() {
  const getProducts = useDeno(async () => {
    return await (await fetch(`http://localhost:3000/products`)).json();
  }, 0);

  return <div>{ProductTable({ products: getProducts })}</div>;
}

const productPropTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired
};

function ProductTableRow(props: any) {
  return (
    <tr>
      <td>{props.product.name}</td>
      <td>{props.product.type}</td>
      <td>
        <a
          className='btn btn-link'
          rel='nav'
          href={"/product/" + props.product.id}
          data-active-className='active'
          data-active-style={{ color: "purple" }}>
          See more!
        </a>
      </td>
    </tr>
  );
}

function ProductTable(props: any) {
  const products = props.products.map((p) => (
    <ProductTableRow key={p.id} product={p} />
  ));
  return (
    <table className='table table-striped table-hover'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th />
        </tr>
      </thead>
      <tbody>{products}</tbody>
    </table>
  );
}
ProductTableRow.propTypes = productPropTypes;

ProductTable.propTypes = {
  products: PropTypes.arrayOf(productPropTypes.product)
};
