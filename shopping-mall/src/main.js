import { setUpProducts } from './products.js';
import { setUpCart } from './cart.js';
import { setUpCounter } from './counter.js';

const main = async () => {
  const { updateCount: updateProductCount, getProductById } =
    await setUpProducts({
      container: document.querySelector('#products'),
      onDecreaseClick,
      onIncreaseClick,
    });

  const {
    addProduct: addProductToCart,
    removeProduct: removeProductFromCart,
    updateCount: updateCartCount,
  } = setUpCart({
    container: document.querySelector('.cart-items'),
    onDecreaseClick,
    onIncreaseClick,
  });

  const { increase, decrease, getTotalCount, getCountByProductId } =
    setUpCounter();

  function onIncreaseClick({ productId }) {
    if (getCountByProductId({ productId }) === 0) {
      const product = getProductById({ productId });
      addProductToCart({ product });
    }
    const count = increase({ productId });
    // updateProductCount({ productId, count });
    // updateCartCount({ productId, count });
    updateTotalCount(getTotalCount());
  }
  function onDecreaseClick({ productId }) {
    if (getCountByProductId({ productId }) === 0) return;
    const count = decrease({ productId });
    // updateProductCount({ productId, count });
    if (getCountByProductId({ productId }) === 0) {
      const product = getProductById({ productId });
      removeProductFromCart({ product });
    } else {
      // updateCartCount({ productId, count });
    }
    updateTotalCount(getTotalCount());
  }

  const updateTotalCount = (totalCount) => {
    document.querySelector('.total_count').textContent = totalCount;
  };

  document.querySelector('.btn-cart').addEventListener('click', () => {
    document.body.classList.add('displaying_cart');
  });

  document.querySelector('.btn-close-cart').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });

  document.querySelector('.cart-dimmed-bg').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });
};

main();
