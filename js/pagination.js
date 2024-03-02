// функция, совершающая fetch запрос и собирать данные для постов
// это асинхронное действие
async function getData() {
   const response = await fetch('js/products1.json');

   // распарсить данные, которые придут в ответе 
   const data = await response.json();
   return data;
}

// главная функция, которая будет запускать основной скрипт
// эта функция тоже асинхронная
// функция paginate нужна просто из-за fetch запроса
async function paginate(hash) {

   clearPagination();

   const allData = await getData();
   let productsData = [];

   switch (hash) {
      case '#women':
         break;
      case '#women/coats':
         console.log('привет');
         productsData = allData[0].subcategories[0].objects;
         break;
      case '#women/jackets':
         productsData = allData[0].subcategories[1].objects;
         break;
      case '#women/costumes':
         productsData = allData[0].subcategories[2].objects;
         break;
      case '':
         break;
   }

   let currentPage = 1; // текущая страница
   let rows = 12; // сколько элементов на странице выводить по умолчанию на одной странице

   // будет отрисовывать данные, которые нам нужны
   // arrData - весь массив с данными
   // rowPerPage - количество элементов на одной странице
   // page - текущая страница
   function displayList(arrData, rowPerPage, page) {
      const productsEl = document.querySelector('.products__row');
      productsEl.innerHTML = ""; // очищаем контейнер

      page--;

      // получаем номер первого элемента в текущей странице
      // либо это можно интерпретировать как количество элементов на текущей странице, учитывая предыдущие страницы?
      const start = rowPerPage * page;

      // берет за основу start
      const end = start + rowPerPage

      // в целом с помощью start и end получаем два номера - start - начальный номер элемента на текущей странице, а end - конечный номер элемента на текущей странице

      // получаем те элементы, которые должны отображаться на данной странице пагинации
      const paginatedData = arrData.slice(start, end);

      paginatedData.forEach((el) => {
         const productEl = document.createElement("div");
         productEl.classList.add("product__element", "col-lg-3", "col-md-4", "col-sm-6", "col-xs-12");

         // Устанавливаем значение атрибута data-id равным id из вашего объекта
         productEl.setAttribute("data-id", el.id);

         // внутри productEl добавить product__img, product__text, product__price

         const imghrefEl = document.createElement("a");
         // el.id
         imghrefEl.href = `product.html#` + el.id;
         imghrefEl.classList.add('product__hrefimg');

         const imgEl = document.createElement("img");
         imgEl.classList.add("product__img");
         imgEl.src = `${el.imgUrl1}`;
         imgEl.alt = "";

         imghrefEl.appendChild(imgEl);

         const textEl = document.createElement("div");
         textEl.classList.add("product__text");
         textEl.innerText = `${el.name}`;

         productEl.appendChild(imghrefEl);
         productEl.appendChild(textEl);

         const priceEl = document.createElement("div");
         priceEl.classList.add("product__price");
         priceEl.innerText = `${el.price}`;

         const carticonEl = document.createElement("img");
         carticonEl.classList.add("product__carticon");
         carticonEl.src = 'img/cart.svg';
         carticonEl.alt = "";

         carticonEl.addEventListener('click', () => {

            const modalWindowEl = document.createElement('div');
            modalWindowEl.classList.add('modalWindow');
            const modalContentEl = document.createElement('div');
            modalContentEl.classList.add('modalWindow__content');
            modalWindowEl.appendChild(modalContentEl);
            const modalTextEl = document.createElement('div');
            modalTextEl.classList.add('modalWindow__text');
            modalTextEl.innerHTML = "Выберите размер товара";

            const modalSizeChooseEl = document.createElement('div');
            modalSizeChooseEl.classList.add('modalWindow__choosesize');
            const modalXS = document.createElement('div');
            const modalS = document.createElement('div');
            const modalM = document.createElement('div');
            const modalL = document.createElement('div');
            const modalXL = document.createElement('div');
            modalXS.classList.add('modalWindow__size', 'modalWindow__size-active');
            modalS.classList.add('modalWindow__size');
            modalM.classList.add('modalWindow__size');
            modalL.classList.add('modalWindow__size');
            modalXL.classList.add('modalWindow__size');
            modalXS.innerHTML = "XS";
            modalS.innerHTML = "S";
            modalM.innerHTML = "M";
            modalL.innerHTML = "L";
            modalXL.innerHTML = "XL";
            modalSizeChooseEl.appendChild(modalXS);
            modalSizeChooseEl.appendChild(modalS);
            modalSizeChooseEl.appendChild(modalM);
            modalSizeChooseEl.appendChild(modalL);
            modalSizeChooseEl.appendChild(modalXL);

            const modalUnderTextEl = document.createElement('div');
            modalUnderTextEl.classList.add('modalWindow__undertext');
            const modalYesBtn = document.createElement('div');
            modalYesBtn.classList.add('modalWindow__yesbtn');
            modalYesBtn.innerHTML = "Да";
            const modalCancelBtn = document.createElement('div');
            modalCancelBtn.classList.add('modalWindow__cancelbtn');
            modalCancelBtn.innerHTML = "Отмена";
            modalContentEl.appendChild(modalTextEl);
            modalContentEl.appendChild(modalSizeChooseEl);
            modalContentEl.appendChild(modalUnderTextEl);
            modalUnderTextEl.appendChild(modalYesBtn);
            modalUnderTextEl.appendChild(modalCancelBtn);
            document.body.appendChild(modalWindowEl);

            // Выбираем все элементы с классом 'modalWindow__size'
            const modalSizeElements = document.querySelectorAll('.modalWindow__size');

            // Добавляем обработчик события клика на каждый элемент
            modalSizeElements.forEach(element => {
               element.addEventListener('click', () => {
                  // Удаляем класс 'modalWindow__size-active' у всех элементов
                  modalSizeElements.forEach(otherElement => {
                     otherElement.classList.remove('modalWindow__size-active');
                  });

                  element.classList.add('modalWindow__size-active');

                  // Предотвращение всплытия события к родительскому элементу (modalWindow)
                  event.stopPropagation();
               });
            });

            modalYesBtn.addEventListener('click', () => {
               const parentProductEl = carticonEl.closest('div.product__element'); // Получаем доступ к родительскому элементу с классом "product__element"
               const productId = parentProductEl.getAttribute('data-id'); // Получаем значение атрибута "data-id" из элемента

               let selectedSize = ''; // Переменная для хранения выбранного размера
               // Ищем элемент с классом 'modalWindow__size-active'
               for (const element of modalSizeElements) {
                  if (element.classList.contains('modalWindow__size-active')) {
                     selectedSize = element.innerHTML; // Получаем текст элемента
                     break; // Выходим из цикла, так как нашли выбранный размер
                  }
               }

               // получаем из localStorage общий список товаров из корзины, чтобы туда добавить наш товар cartObject
               let cartItems = JSON.parse(localStorage.getItem('cartItems'));

               // Проверяем, есть ли уже продукт с таким 'id' и 'size' в корзине
               const existingItem = cartItems.find(item => item.id == productId && item.size == selectedSize);
               if (existingItem) {
                  // Если такой продукт с этим 'id' и 'size' уже есть в корзине, увеличиваем его количество
                  existingItem.amount += 1;
               } else {
                  // Иначе, создаем новую запись в корзине
                  cartItems.push({
                     id: productId,
                     size: selectedSize,
                     amount: 1
                  });
               }

               localStorage.setItem('cartItems', JSON.stringify(cartItems));

               // ТУТ ИЗМЕНИТЬ ЧИСЛО В КОРЗИНЕ ХЕДЕРА ИСХОДЯ ИЗ ОБЩЕГО КОЛИЧЕСТВА ПРОДУКТОВ С УЧЕТОМ ИХ ЖЕ КОЛИЧЕСТВА
               updateCartText();

               modalWindowEl.remove();

               // Предотвращение всплытия события к родительскому элементу (modalWindow)
               event.stopPropagation();
            });

            modalCancelBtn.addEventListener('click', () => {
               modalWindowEl.remove();

               // Предотвращение всплытия события к родительскому элементу (modalWindow)
               event.stopPropagation();
            });

            modalContentEl.addEventListener('click', () => {
               // Предотвращение всплытия события к родительскому элементу (modalWindow)
               event.stopPropagation();
            });

            modalWindowEl.addEventListener('click', () => {
               modalWindowEl.remove();
            });
         });

         const bottomEl = document.createElement("div");
         bottomEl.classList.add("product__bottom");

         bottomEl.appendChild(priceEl);
         bottomEl.appendChild(carticonEl);

         productEl.appendChild(bottomEl);

         // productEl.innerText = `${el.name}`;
         productsEl.appendChild(productEl);
      });
   }

   // будет отрисовывать кнопки пагинации, их количество будет зависеть от количества постов, то есть динамическая пагинация
   function displayPagination(arrData, rowPerPage) {
      const paginationEl = document.querySelector('.pagination');

      // math.ceil округляет в большую сторону
      const pagesCount = Math.ceil(arrData.length / rowPerPage);


      const ulEl = document.createElement("ul");
      ulEl.classList.add("pagination__list");

      for (let i = 0; i < pagesCount; i++) {
         liEl = displayPaginationBtn(i + 1);
         ulEl.appendChild(liEl);
      }
      paginationEl.appendChild(ulEl);
   }

   // функция, которая будет вызываться внутри displayPagination, чтобы отрисовать непосредственно одну кнопку
   function displayPaginationBtn(page) {
      const liEl = document.createElement("li");
      liEl.classList.add("pagination__item");
      liEl.innerText = page;

      // единственное, что я не понял, и без этого ничего не работает
      if (currentPage == page) liEl.classList.add("pagination__item--active");

      liEl.addEventListener('click', () => {
         currentPage = page;
         displayList(productsData, rows, currentPage)

         let currentItemLi = document.querySelector('li.pagination__item--active');
         currentItemLi.classList.remove('pagination__item--active');

         liEl.classList.add('pagination__item--active');

         // Прокручиваем страницу вверх
         window.scrollTo({
            top: 0,
            behavior: 'smooth' // Добавляем плавную анимацию прокрутки
         });
      });

      return liEl;
   }

   displayList(productsData, rows, currentPage);
   displayPagination(productsData, rows);
}

function clearPagination() {
   const paginationEl = document.querySelector('.pagination');
   paginationEl.innerHTML = ""; // очищаем пагинацию
}
