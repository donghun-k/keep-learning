import React from 'react';

const ProductCard = ({
  key,
  product: { id, title, category, image, price },
}) => {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
};

export default ProductCard;
