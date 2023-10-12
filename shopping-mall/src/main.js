import { get } from 'mobx';
import test from './test.json?raw'; // vite의 기능, 파일의 내용을 string으로 가져옴

const getProducts = async () => {
  if (process.env.NODE_ENV === 'development') {
    return JSON.parse(test);
  } else {
    const response = await fetch('/products.json');
    return response.json();
  }
};

const getProductHTML = (product, cartCount = 0) => {
  return /* html */ `
  <div class="product" data-product-id="${product.id}">
    <img src="${product.images[0]}" alt="${product.name}" />
    <p>${product.name}</p>
    <div class="flex items-center justify-between">
      <span>Price: ${product.regularPrice}</span>
      <div>
        <button type="button" disabled class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
        <span class="cart-count text-green-800">${cartCount}</span>
        <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
      </div>
    </div>
  </div>
`;
};

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
  const products = await getProducts();
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });
  const countMap = {};
  document.querySelector('#products').innerHTML = products
    .map((product) => getProductHTML(product))
    .join('');

  document.querySelector('#products').addEventListener('click', (e) => {
    const targetEl = e.target;
    const productEl = findEl(targetEl, '.product');
    const productId = productEl.dataset.productId;
    const product = productMap[productId];

    if (
      targetEl.matches('.btn-decrease') ||
      targetEl.matches('.btn-increase')
    ) {
      if (countMap[productId] === undefined) {
        countMap[productId] = 0;
      }
      if (targetEl.matches('.btn-decrease')) {
        if (countMap[productId] === 0) {
          return;
        }
        countMap[productId] -= 1;
      }
      if (targetEl.matches('.btn-increase')) {
        countMap[productId] += 1;
      }

      const btnDecreaseEl = productEl.querySelector('.btn-decrease');

      if (countMap[productId] === 0) {
        btnDecreaseEl.setAttribute('disabled', true);
      } else {
        btnDecreaseEl.removeAttribute('disabled');
      }

      const cartCountEl = productEl.querySelector('.cart-count');
      cartCountEl.textContent = countMap[productId];

      const productsIds = Object.keys(countMap);

      document.querySelector('.cart-items').innerHTML = productsIds
        .map((productId) => {
          const productInCart = productMap[productId];
          return getProductHTML(productInCart, countMap[productId]);
        })
        .join('');

      document.querySelector('.total_count').innerHTML = Object.values(
        countMap
      ).reduce((acc, cur) => acc + cur, 0);
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
