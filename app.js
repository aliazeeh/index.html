 const form = document.getElementById('productForm');
const productsDiv = document.getElementById('products');
let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts() {
  productsDiv.innerHTML = '';
  products.forEach((product, index) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <span>${product.name} - $${product.price}</span>
      <div>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
    productsDiv.appendChild(div);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value;
  products.push({ name, price, image });
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
  form.reset();
});

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

function editProduct(index) {
  const newName = prompt('Edit product name:', products[index].name);
  const newPrice = prompt('Edit price:', products[index].price);
  const newImage = prompt('Edit image URL:', products[index].image);
  if (newName && newPrice && newImage) {
    products[index] = { name: newName, price: newPrice, image: newImage };
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}

renderProducts();
