function updateCartText() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems'));

  const cartCountEl = document.getElementById('cartItemCount');
  cartCountEl.innerText = '';
  const count = cartItems.reduce((total, item) => parseInt(total, 10) + parseInt(item.amount, 10), 0);
  cartCountEl.innerText = count;
}

function enableNoneMode() {
  const productsCardsEl = document.querySelector('.product-cards');
  const firstBlockEl = document.querySelector('.first-block');
  const popularCategoriesEl = document.querySelector('.popular-categories');
  const breadCrumbsEl = document.querySelector('.bread-crumbs');
  productsCardsEl.classList.remove('product-cards__none')
  breadCrumbsEl.classList.remove('bread-crumbs__none');
  firstBlockEl.classList.add('first-block__none');
  popularCategoriesEl.classList.add('popular-categories__none');

  document.querySelector('.subcategories').classList.add('subcategories__none');
  document.querySelector('.bread-crumbs__nestlast').classList.remove('bread-crumbs__nestlast__none');
  document.querySelector('.bread-crumbs__subcategory').classList.remove('bread-crumbs__subcategory__none');
}

function turnoffNoneMode() {
  const productsCardsEl = document.querySelector('.product-cards');
  const firstBlockEl = document.querySelector('.first-block');
  const popularCategoriesEl = document.querySelector('.popular-categories');
  const breadCrumbsEl = document.querySelector('.bread-crumbs');
  productsCardsEl.classList.add('product-cards__none')
  breadCrumbsEl.classList.add('bread-crumbs__none');
  firstBlockEl.classList.remove('first-block__none');
  popularCategoriesEl.classList.remove('popular-categories__none');
}

// ФУНКЦИЯ ОБРАБОТКИ ХЕША

function processHash() {
  const hash = window.location.hash;
  const titleEl = document.querySelector('.product-cards__title');
  const breadCrumbsCategoryEl = document.querySelector('.bread-crumbs__category');
  const breadCrumbsSubCategoryEl = document.querySelector('.bread-crumbs__subcategory');

  switch (hash) {
    case '#women':
      enableNoneMode();
      document.querySelector('.subcategories__title').innerHTML = "Женщинам";
      breadCrumbsCategoryEl.innerHTML = "Женщинам";
      document.title="Вся женская одежда - Fasion Fusion";

      document.querySelector('.subcategories').classList.remove('subcategories__none');
      document.querySelector('.bread-crumbs__nestlast').classList.add('bread-crumbs__nestlast__none');
      document.querySelector('.bread-crumbs__subcategory').classList.add('bread-crumbs__subcategory__none');
      document.querySelector('.product-cards').classList.add('product-cards__none');
      break;
    case '#women/coats':
      enableNoneMode();
      titleEl.innerHTML = "Пальто";
      breadCrumbsCategoryEl.innerHTML = "Женщинам";
      breadCrumbsSubCategoryEl.innerHTML = "Пальто";
      paginate('#women/coats');
      document.title="Женские пальто - Fasion Fusion";
      break;
    case '#women/jackets':
      enableNoneMode();
      titleEl.innerHTML = "Куртки";
      breadCrumbsCategoryEl.innerHTML = "Женщинам";
      breadCrumbsSubCategoryEl.innerHTML = "Куртки";
      paginate('#women/jackets');
      document.title="Женские куртки - Fasion Fusion";
      break;
    case '#women/costumes':
      enableNoneMode();
      titleEl.innerHTML = "Костюмы";
      breadCrumbsCategoryEl.innerHTML = "Женщинам";
      breadCrumbsSubCategoryEl.innerHTML = "Костюмы";
      paginate('#women/costumes');
      document.title="Женские костюмы - Fasion Fusion";
      break;
    case '':
      document.querySelector('.subcategories').classList.add('subcategories__none');
      document.title="Главная страница - Fasion Fusion";
      turnoffNoneMode();
      break;
  }
}

// ОБРАБОТКА ХЕША ПРОИСХОДИТ ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ (НАПРИМЕР ЕСЛИ ПЕРЕХОДИТЬ ИЗ ОДНОГО САЙТА НА ДРУГОЙ) И ПРИ ИЗМЕНЕНИИ ЭТОГО ХЕША
window.addEventListener("hashchange", function () {
  processHash();
});
window.addEventListener("load", function() {
  processHash();
});

// Вызываем функцию при загрузке страницы
window.addEventListener('load', updateCartText);

if (!localStorage.getItem('cartItems')) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}
