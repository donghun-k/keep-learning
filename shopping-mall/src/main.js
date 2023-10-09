import test from './test.json?raw'; // vite의 기능, 파일의 내용을 string으로 가져옴

const getProducts = async () => {
  if (process.env.NODE_ENV === 'development') {
    return JSON.parse(test);
  } else {
    const response = await fetch('/products.json');
    return response.json();
  }
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
  const countMap = {};
  document.querySelector('#products').innerHTML = products
    .map(
      (product, i) => /* html */ `
      <div class="product" data-product-id="${product.id}" data-product-index=${i}>
        <img src="${product.images[0]}" alt="${product.name}" />
        <p>${product.name}</p>
        <div class="flex items-center justify-between">
          <span>Price: ${product.regularPrice}</span>
          <div>
            <button type="button" disabled class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
            <span class="cart-count text-green-800">0</span>
            <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  document.querySelector('#products').addEventListener('click', (e) => {
    const targetEl = e.target;
    const productEl = findEl(targetEl, '.product');
    const productId = productEl.dataset.productId;
    const productIndex = productEl.dataset.productIndex;
    const product = products[productIndex];

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

      const cartCount = Object.values(countMap).reduce(
        (acc, cur) => acc + cur,
        0
      );
      document.querySelector('.total_count').innerHTML = `${cartCount}`;
    }
  });
};

main();
