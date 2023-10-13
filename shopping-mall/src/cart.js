import { getProductEl } from './products';

export const setUpCart = ({ container }) => {
  const addProduct = ({ product }) => {
    const productEl = getProductEl(product);
    container.appendChild(productEl);
  };

  const removeProduct = ({ product }) => {
    const productEl = container.querySelector(
      `.product[data-product-id="${product.id}"]`
    );
    productEl.remove();
  };

  const updateCount = ({ productId, count }) => {
    const productEl = container.querySelector(
      `.product[data-product-id="${productId}"]`
    );
    const cartCountEl = productEl.querySelector('.cart-count');
    cartCountEl.textContent = count;
  };

  return {
    addProduct,
    removeProduct,
    updateCount,
  };
};
