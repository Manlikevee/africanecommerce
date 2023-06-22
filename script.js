window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 0) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });





  

// Variables
let productsData = []; // Product data
let filteredProducts = []; // Filtered product data
let currentPage = 1; // Current page number
const productsPerPage = 6; // Number of products per page

// Function to filter products based on selected checkboxes
// function filterProducts() {
//   const genderFilters = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(input => input.value);
//   const sizeFilters = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(input => input.value);
//   const qualityFilters = Array.from(document.querySelectorAll('input[name="quality"]:checked')).map(input => input.value);
//   const minPrice = parseInt(document.querySelector('input[name="min-price"]').value);
//   const maxPrice = parseInt(document.querySelector('input[name="max-price"]').value);

//   filteredProducts = productsData.filter(product => {
//     if (genderFilters.length > 0 && !genderFilters.includes(product.dataset.gender)) {
//       return false;
//     }

//     if (sizeFilters.length > 0 && !sizeFilters.includes(product.dataset.size)) {
//       return false;
//     }

//     if (qualityFilters.length > 0 && !qualityFilters.includes(product.dataset.quality)) {
//       return false;
//     }

//     if (!isNaN(minPrice) && product.dataset.price < minPrice) {
//       return false;
//     }

//     if (!isNaN(maxPrice) && product.dataset.price > maxPrice) {
//       return false;
//     }

//     return true;
//   });

//   currentPage = 1;
//   renderProducts();
//   renderPagination();
// }

function filterProducts() {
  const genderFilters = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(input => input.value);
  const sizeFilters = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(input => input.value);
  const qualityFilters = Array.from(document.querySelectorAll('input[name="quality"]:checked')).map(input => input.value);
  const minPrice = parseInt(document.querySelector('input[name="min-price"]').value);
  const maxPrice = parseInt(document.querySelector('input[name="max-price"]').value);

  filteredProducts = productsData.filter(product => {
    if (genderFilters.length > 0 && !genderFilters.some(value => product.dataset.gender.includes(value))) {
      return false;
    }

    if (sizeFilters.length > 0 && !sizeFilters.some(value => product.dataset.size.includes(value))) {
      return false;
    }

    if (qualityFilters.length > 0 && !qualityFilters.some(value => product.dataset.quality.includes(value))) {
      return false;
    }

    if (!isNaN(minPrice) && parseInt(product.dataset.price) < minPrice) {
      return false;
    }

    if (!isNaN(maxPrice) && parseInt(product.dataset.price) > maxPrice) {
      return false;
    }

    return true;
  });

  currentPage = 1;
  renderProducts();
  renderPagination();
}


// Function to render the paginated product cards
function renderProducts() {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  for (let i = startIndex; i < endIndex && i < filteredProducts.length; i++) {
    productContainer.appendChild(filteredProducts[i]);
  }
}

// Function to render the pagination links
function renderPagination() {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (totalPages > 1) {
    const prevButton = createPaginationButton('Prev', currentPage > 1, () => {
      currentPage--;
      renderProducts();
      renderPagination();
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = createPaginationButton(i, currentPage !== i, () => {
        currentPage = i;
        renderProducts();
        renderPagination();
      });
      if (currentPage === i) {
        pageButton.classList.add('active'); // Add 'active' class to the current page button
      }
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = createPaginationButton('Next', currentPage < totalPages, () => {
      currentPage++;
      renderProducts();
      renderPagination();
    });
    paginationContainer.appendChild(nextButton);
  }
}

// Function to create a pagination button
function createPaginationButton(text, isEnabled, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.disabled = !isEnabled;
  button.addEventListener('click', onClick);
  return button;
}

// Function to initialize the product listing
function initializeProductListing() {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      productsData = data.map(product => createProductCard2(product));
      filteredProducts = [...productsData];
      renderProducts();
      renderPagination();
    })
    .catch(error => console.log(error));
}

// Function to create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.dataset.price = product.price;
  card.dataset.gender = product.gender;
  card.dataset.size = product.size;
  card.dataset.quality = product.quality;

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;
  card.appendChild(image);

  const name = document.createElement('h3');
  name.textContent = product.name;
  card.appendChild(name);

  const price = document.createElement('p');
  price.textContent = `$${product.price}`;
  card.appendChild(price);

  return card;
}



function createProductCard2(product){
    // Create div with class "imageblock productimage"
const imageBlock = document.createElement('div');
imageBlock.className = 'imageblock productimage';

// Create img element with src and alt attributes
const image = document.createElement('img');
image.src = product.image;
  image.alt = product.name;

// Append img to imageblock
imageBlock.appendChild(image);

// Create div with class "titleblock productitle"
const titleBlock = document.createElement('div');
titleBlock.className = 'titleblock productitle';
titleBlock.textContent = product.name;

// Create div with class "specs"
const specs = document.createElement('div');
specs.className = 'specs';

// Create first spectvalue div
const spectValue1 = document.createElement('div');
spectValue1.className = 'spectvalue';

// Create spectitle and specval divs inside first spectvalue
const specTitle1 = document.createElement('div');
specTitle1.className = 'spectitle';
specTitle1.textContent = 'Gene:';
const specVal1 = document.createElement('div');
specVal1.className = 'specval productgender';
specVal1.textContent = product.gender;

// Append spectitle and specval to first spectvalue
spectValue1.appendChild(specTitle1);
spectValue1.appendChild(specVal1);

// Create second spectvalue div
const spectValue2 = document.createElement('div');
spectValue2.className = 'spectvalue';

// Create spectitle and specval divs inside second spectvalue
const specTitle2 = document.createElement('div');
specTitle2.className = 'spectitle productage';
specTitle2.textContent = 'Age:';
const specVal2 = document.createElement('div');
specVal2.className = 'specval productagerange';
specVal2.textContent = product.size;

// Append spectitle and specval to second spectvalue
spectValue2.appendChild(specTitle2);
spectValue2.appendChild(specVal2);

// Append spectvalue divs to specs
specs.appendChild(spectValue1);
specs.appendChild(spectValue2);

// Create div with class "cart"
const cart = document.createElement('div');
cart.className = 'cart';

// Create amount div inside cart
const amount = document.createElement('div');
amount.className = 'amount productamount';
amount.textContent = product.price;

// Create cartbox div inside cart
const cartBox = document.createElement('div');
cartBox.className = 'cartbox';

// Create ion-icon element
const icon = document.createElement('ion-icon');
icon.setAttribute('name', 'cart-outline');

// Append icon to cartbox
cartBox.appendChild(icon);

// Append amount and cartbox to cart
cart.appendChild(amount);
cart.appendChild(cartBox);

// Create main container div
const card = document.createElement('div');
card.className = 'productcard';
card.dataset.price = product.price;
card.dataset.gender = product.gender;
card.dataset.size = product.size;
card.dataset.quality = product.quality;
card.appendChild(imageBlock);
card.appendChild(titleBlock);
card.appendChild(specs);
card.appendChild(cart);

return card;

}
// Initialize the product listing
initializeProductListing();



function revealDiv() {
  var element = document.querySelector('.allfeatureslider');
if (element.style.display === 'block') {
  element.style.display = 'none';
} else {
  element.style.display = 'block';
}
}

window.addEventListener('load', function() {
  var element = document.querySelector('.allfeatureslider');
  if (window.innerWidth >= 1000) {
    element.style.display = 'block';
  }
});
