// NUMBER-INPUT

const input = document.getElementById('input');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');

incrementButton.addEventListener('click', () => {
   input.value = Math.min(parseInt(input.value) + 1, 10);
});

decrementButton.addEventListener('click', () => {
   input.value = Math.max(parseInt(input.value) - 1, 1);
});

// SIZES

const modalSizeElements = document.querySelectorAll('.product__size');
// Добавляем обработчик события клика на каждый элемент
modalSizeElements.forEach(element => {
   element.addEventListener('click', () => {
      modalSizeElements.forEach(otherElement => {
         otherElement.classList.remove('product__size-active');
      });

      element.classList.add('product__size-active');
   });
});

let categoryEl
let subcategoryEl;

async function updateProductInformation() {
   const productsData = await getData();

   const hash = window.location.hash;
   const idFrom = hash.slice(1);

   // думаю product всегда будет находить
   const product = findProductById(productsData, idFrom);

   // МЕНЯЕМ СОДЕРЖИМОЕ ХЛЕБНЫХ КРОШЕК
   const breadCrumbsCategoryEl = document.querySelector('.bread-crumbs__category');
   breadCrumbsCategoryEl.innerHTML = categoryEl.name;
   const breadCrumbsSubCategoryEl = document.querySelector('.bread-crumbs__subcategory');
   breadCrumbsSubCategoryEl.innerHTML = subcategoryEl.name;
   const breadCrumbsProductEl = document.querySelector('.bread-crumbs__product');
   breadCrumbsProductEl.innerHTML = product.name;

   // МЕНЯЕМ ХЕШИ В ХЛЕБНЫХ КРОШКАХ

   switch (categoryEl.name) {
      case "Женщинам":
         breadCrumbsCategoryEl.href = 'index.html#women';
         break;
   }

   switch (subcategoryEl.name) {
      case "Пальто":
         breadCrumbsSubCategoryEl.href = 'index.html#women/coats';
         break;
      case "Куртки":
         breadCrumbsSubCategoryEl.href = 'index.html#women/jackets';
         break;
      case "Костюмы":
         breadCrumbsSubCategoryEl.href = 'index.html#women/costumes';
         break;
   }

   const productTitleEl = document.querySelector('.product__title');
   productTitleEl.innerHTML = product.name;

   const productPriceEl = document.querySelector('.product__priceel');
   productPriceEl.innerHTML = product.price;

   const productDetailsEl = document.querySelector('.product__details');
   productDetailsEl.innerHTML = product.details;

   const sliderItems = document.querySelectorAll('.slider__item');
   const imgUrls = [product.imgUrl1, product.imgUrl2, product.imgUrl3, product.imgUrl4];
   sliderItems.forEach((sliderItem, index) => {
      const imgElement = sliderItem.querySelector('img');
      if (imgElement) {
         imgElement.src = imgUrls[index];
      }
   });
}

updateProductInformation();

const btnEl = document.querySelector('.product__cartbtn');
btnEl.addEventListener('click', () => {
   const hash = window.location.hash;
   const id = hash.slice(1); // берем id

   const amount = input.value;

   let size = ''; // Переменная для хранения выбранного размера
   // Ищем элемент с классом 'modalWindow__size-active'
   for (const element of modalSizeElements) {
      if (element.classList.contains('product__size-active')) {
         size = element.innerHTML; // Получаем текст элемента
         break; // Выходим из цикла, так как нашли выбранный размер
      }
   }

   // получаем из localStorage общий список товаров из корзины, чтобы туда добавить наш товар cartObject
   let cartItems = JSON.parse(localStorage.getItem('cartItems'));

   // Проверяем, есть ли уже продукт с таким 'id' и 'size' в корзине
   const existingItem = cartItems.find(item => item.id == id && item.size == size);
   if (existingItem) {
      // Если такой продукт с этим 'id' и 'size' уже есть в корзине, увеличиваем его количество
      existingItem.amount = parseInt(existingItem.amount, 10) + parseInt(amount, 10);
   } else {
      // Иначе, создаем новую запись в корзине
      cartItems.push({
         id: id,
         size: size,
         amount: amount
      });
   }

   localStorage.setItem('cartItems', JSON.stringify(cartItems));

   updateCartText();
})