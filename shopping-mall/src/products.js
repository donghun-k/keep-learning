import { findEl } from './utils.js';
import test from './test.json?raw'; // vite의 기능, 파일의 내용을 string으로 가져옴

const getProducts = async () => {
  if (process.env.NODE_ENV === 'development') {
    return JSON.parse(test);
  } else {
    const response = await fetch('/products.json');
    return response.json();
  }
};

export const getProductEl = (product, cartCount = 0) => {
  const productEl = document.createElement('div');
  productEl.classList.add('product');
  productEl.setAttribute('data-product-id', product.id);

  productEl.innerHTML = /* html */ `
  <img src="${product.images[0]}" alt="${product.name}" />
  <p>${product.name}</p>
  <div class="flex items-center justify-between">
    <span>Price: ${product.regularPrice}</span>
    <div>
      <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
      <span class="cart-count text-green-800">${cartCount}</span>
      <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
    </div>
  </div>
`;
  return productEl;
};

export const setUpProducts = async ({
  container,
  onDecreaseClick,
  onIncreaseClick,
}) => {
  const products = await getProducts();
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  products.forEach((product) => {
    const productEl = getProductEl(product);
    container.appendChild(productEl);
  });

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

  const updateCount = ({ productId, count }) => {
    const productEl = container.querySelector(
      `.product[data-product-id="${productId}"]`
    );
    const cartCountEl = productEl.querySelector('.cart-count');
    cartCountEl.textContent = count;
  };

  const getProductById = ({ productId }) => {
    return productMap[productId];
  };

  return { updateCount, getProductById };
};
