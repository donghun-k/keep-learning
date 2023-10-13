import { findEl } from './utils';
import { getProductEl } from './products';

export const setUpCart = ({ container, onDecreaseClick, onIncreaseClick }) => {
  container.addEventListener('click', (e) => {
    const targetEl = e.target;
    const productEl = findEl(targetEl, '.product');
    const productId = productEl.dataset.productId;

    if (
      targetEl.matches('.btn-decrease') ||
      targetEl.matches('.btn-increase')
    ) {
      if (targetEl.matches('.btn-decrease')) {
        onDecreaseClick({ productId });
      }
      if (targetEl.matches('.btn-increase')) {
        onIncreaseClick({ productId });
      }
    }
  });

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
