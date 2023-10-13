import { setUpProducts } from './products.js';
import { setUpCart } from './cart.js';
import { setUpCounter } from './counter.js';

const findEl = (startingEl, selector) => {
  let currentEl = startingEl;
  while (currentEl) {
    if (currentEl.matches(selector)) {
      return currentEl;
    }
    currentEl = currentEl.parentElement;
  }
  return null;
};

const main = async () => {
  const { updateCount: updateProductCount, getProductById } =
    await setUpProducts({
      container: document.querySelector('#products'),
    });

  const {
    addProduct,
    removeProduct,
    updateCount: updateCartCount,
  } = setUpCart({
    container: document.querySelector('.cart-items'),
  });

  const { increase, decrease, getTotalCount } = setUpCounter();

  const updateTotalCount = (totalCount) => {
    document.querySelector('.total_count').textContent = totalCount;
  };

  const increaseCount = (productId) => {
    const count = increase({ productId });
    updateProductCount({ productId, count });
    if (count === 1) {
      const product = getProductById({ productId });
      addProduct({ product });
    }
    updateCartCount({ productId, count });
    updateTotalCount(getTotalCount());
  };
  const decreaseCount = (productId) => {
    const count = decrease({ productId });
    updateProductCount({ productId, count });
    if (count === 0) {
      const product = getProductById({ productId });
      removeProduct({ product });
    } else {
      updateCartCount({ productId, count });
    }
    updateTotalCount(getTotalCount());
  };

  document.querySelector('#products').addEventListener('click', (e) => {
    const targetEl = e.target;
    const productEl = findEl(targetEl, '.product');
    const productId = productEl.dataset.productId;

    if (
      targetEl.matches('.btn-decrease') ||
      targetEl.matches('.btn-increase')
    ) {
      if (targetEl.matches('.btn-decrease')) {
        decreaseCount(productId);
      }
      if (targetEl.matches('.btn-increase')) {
        increaseCount(productId);
      }
    }
  });

  document.querySelector('.cart-items').addEventListener('click', (e) => {
    const targetEl = e.target;
    const productEl = findEl(targetEl, '.product');
    const productId = productEl.dataset.productId;

    if (
      targetEl.matches('.btn-decrease') ||
      targetEl.matches('.btn-increase')
    ) {
      if (targetEl.matches('.btn-decrease')) {
        decreaseCount(productId);
      }
      if (targetEl.matches('.btn-increase')) {
        increaseCount(productId);
      }
    }
  });

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
