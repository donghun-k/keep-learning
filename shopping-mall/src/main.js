import test from './test.json?raw'; // vite의 기능, 파일의 내용을 string으로 가져옴

async function getProducts() {
  if (process.env.NODE_ENV === 'development') {
    return JSON.parse(test);
  } else {
    const response = await fetch('/products.json');
    return response.json();
  }
}

async function main() {
  const products = await getProducts();
  document.querySelector('#products').innerHTML = products
    .map(
      (product) => `
      <div class="product">
        <img src="${product.images[0]}" alt="${product.name}" />
        <p>${product.name}</p>
        <div class="flex items-center justify-between">
          <span>Price: ${product.regularPrice}</span>
          <div>
            <button type="button" class="bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
            <span class="text-green-800">0</span>
            <button type="button" class="bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

main();
