async function getData() {
   const response = await fetch('js/products1.json');

   // распарсить данные, которые придут в ответе 
   const data = await response.json();
   return data;
}

function deleteCartItem(productId, productSize) {
   const cartItems = JSON.parse(localStorage.getItem('cartItems'));

   // Найдите индекс элемента, который нужно удалить
   const itemIndex = cartItems.findIndex(item => item.id == productId && item.size == productSize);

   if (itemIndex != -1) {
      // Удалите элемент из массива
      cartItems.splice(itemIndex, 1);

      // Сохраните обновленный массив обратно в localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // если удалили все из корзины
      if (localStorage.getItem('cartItems') == '[]') {
         const cartGoShop = document.querySelector('.cart__goshop');
         cartGoShop.classList.remove('cart__goshop-none');      
      }
   }

   updateCartText();
   calculateSummary();
   displayCart();
}

function deleteAll() {
   localStorage.setItem('cartItems', JSON.stringify([]));

   updateCartText();
   calculateSummary();
   displayCart();
}

async function calculateSummary() {
   const productsData = await getData();

   const cartItems = JSON.parse(localStorage.getItem('cartItems'));

   // const cartItemCounts = {};
   // cartItems.forEach(item => {
   //    cartItemCounts[item.id] = item.amount;
   // });

   let totalSum = 0;

   cartItems.forEach(cartItem => {
      // const { id, amount } = cartItem;
      let product = findProductById(productsData, cartItem.id);

      if (product) {
         const price = Number(product.price.replace('₽', '').trim());
         totalSum += price * cartItem.amount;
      }
   });

   const cartSummaryEl = document.querySelector('.cart__summary');
   cartSummaryEl.textContent = `Суммарная стоимость: ${totalSum}₽`;
}

// ПОСЛЕ УДАЛЕНИЯ ОДНОГО ЭЛЕМЕНТА ТАКЖЕ БУДЕТ ВЫЗЫВАТЬСЯ displayCart
async function displayCart() {
   if (localStorage.getItem('cartItems') != '[]') {
      const cartGoShop = document.querySelector('.cart__goshop');
      cartGoShop.classList.add('cart__goshop-none');      
   }

   const productsData = await getData();
   const cartItems = JSON.parse(localStorage.getItem('cartItems'));

   const cartContent = document.querySelector('.cart__content');
   cartContent.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов

   cartItems.forEach((cartItem) => {

      // Найдите продукт в productsData по его id
      const product = findProductById(productsData, cartItem.id);

      if (product) {
         const cartItemEl = document.createElement('div');
         cartItemEl.classList.add('cart__item', 'col-lg-4', 'col-sm-6', 'col-xs-12');

         const imgHrefEl = document.createElement('a');
         imgHrefEl.href=`product.html#` + product.id;
         imgHrefEl.classList.add('cart__hrefimg');

         const imgEl = document.createElement('img');
         imgEl.src = product.imgUrl1;
         imgEl.alt = '';
         imgEl.classList.add('cart__item-img');

         imgHrefEl.appendChild(imgEl);

         const deleteEl = document.createElement('div');
         deleteEl.classList.add('cart__item-delete');
         cartItemEl.appendChild(deleteEl);

         deleteEl.addEventListener('click', () => {

            const modalWindowEl = document.createElement('div');
            modalWindowEl.classList.add('modalWindow');
            const modalContentEl = document.createElement('div');
            modalContentEl.classList.add('modalWindow__content');
            modalWindowEl.appendChild(modalContentEl);
            const modalTextEl = document.createElement('div');
            modalTextEl.classList.add('modalWindow__text');
            modalTextEl.innerHTML = "Удалить товар из корзины?";
            const modalUnderTextEl = document.createElement('div');
            modalUnderTextEl.classList.add('modalWindow__undertext');
            const modalYesBtn = document.createElement('div');
            modalYesBtn.classList.add('modalWindow__yesbtn');
            modalYesBtn.innerHTML = "Да";
            const modalCancelBtn = document.createElement('div');
            modalCancelBtn.classList.add('modalWindow__cancelbtn');
            modalCancelBtn.innerHTML = "Отмена";
            modalContentEl.appendChild(modalTextEl);
            modalContentEl.appendChild(modalUnderTextEl);
            modalUnderTextEl.appendChild(modalYesBtn);
            modalUnderTextEl.appendChild(modalCancelBtn);
            document.body.appendChild(modalWindowEl);

            modalYesBtn.addEventListener('click', () => {
               deleteCartItem(cartItem.id, cartItem.size);
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

         const imgDeleteEl = document.createElement('img');
         imgDeleteEl.src = `img/delete.svg`;
         imgDeleteEl.alt = '';
         deleteEl.appendChild(imgDeleteEl);

         const itemTitle = document.createElement('div');
         itemTitle.classList.add('cart__item-title');
         itemTitle.innerHTML = product.name;

         const itemSize = document.createElement('div');
         itemSize.classList.add('cart__item-size');
         itemSize.innerHTML = "Размер: " + cartItem.size;

         const itemPrice = document.createElement('div');
         itemPrice.classList.add('cart__item-price');
         itemPrice.innerHTML = product.price;

         const numberInput = document.createElement('div');
         numberInput.classList.add('cart__number-input', 'number-input');
         const inp = document.createElement('input');
         inp.setAttribute('readonly', true);
         inp.setAttribute('type', 'text');
         inp.setAttribute('value', cartItem.amount);
         inp.setAttribute('min', '1');
         inp.setAttribute('max', '10');
         numberInput.appendChild(inp);
         const numberPanel = document.createElement('div');
         numberPanel.classList.add('number-input__panel');
         numberInput.appendChild(numberPanel);
         const numberIncrement = document.createElement('img');
         numberIncrement.classList.add('increment');
         numberIncrement.src = `img/up.svg`;
         numberIncrement.alt = '';

         numberIncrement.addEventListener('click', () => {
            // inp.value = Math.min(parseInt(inp.value) + 1, 50);
            inp.value = parseInt(inp.value) + 1;

            updateCart(cartItem.id, cartItem.size, parseInt(inp.value));
            updateCartText();
            calculateSummary();
         })

         numberPanel.appendChild(numberIncrement);
         const numberDecrement = document.createElement('img');
         numberDecrement.classList.add('decrement');
         numberDecrement.src = `img/down.svg`;
         numberDecrement.alt = '';

         numberDecrement.addEventListener('click', () => {
            inp.value = Math.max(parseInt(inp.value) - 1, 1);

            updateCart(cartItem.id, cartItem.size, parseInt(inp.value));
            updateCartText();
            calculateSummary();
         })

         numberPanel.appendChild(numberDecrement);

         // Добавьте все элементы в cartItemEl
         cartItemEl.appendChild(imgHrefEl);

         const itemCartLeft = document.createElement('div');
         itemCartLeft.classList.add('cart__item-left');
         itemCartLeft.appendChild(itemTitle);
         itemCartLeft.appendChild(itemSize);
         itemCartLeft.appendChild(itemPrice);

         const itemUnderimg = document.createElement('div');
         itemUnderimg.classList.add('cart__item-underimg');
         itemUnderimg.appendChild(itemCartLeft);
         itemUnderimg.appendChild(numberInput);
         cartItemEl.appendChild(itemUnderimg);

         // Добавьте cartItemElement в контейнер .cart__content
         cartContent.appendChild(cartItemEl);
      }
   });


}

function updateCart(productId, productSize, newAmount) {
   const cartItems = JSON.parse(localStorage.getItem('cartItems'));

   cartItems.forEach(item => {
      if (item.id == productId && item.size == productSize) {
         item.amount = newAmount;
      }
   });

   localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


const deleteAllEl = document.querySelector('.cart__deleteall');

deleteAllEl.addEventListener('click', () => {
   const modalWindowEl = document.createElement('div');
   modalWindowEl.classList.add('modalWindow');
   const modalContentEl = document.createElement('div');
   modalContentEl.classList.add('modalWindow__content');
   modalWindowEl.appendChild(modalContentEl);
   const modalTextEl = document.createElement('div');
   modalTextEl.classList.add('modalWindow__text');
   modalTextEl.innerHTML = "Очистить всю корзину?";
   const modalUnderTextEl = document.createElement('div');
   modalUnderTextEl.classList.add('modalWindow__undertext');
   const modalYesBtn = document.createElement('div');
   modalYesBtn.classList.add('modalWindow__yesbtn');
   modalYesBtn.innerHTML = "Да";
   const modalCancelBtn = document.createElement('div');
   modalCancelBtn.classList.add('modalWindow__cancelbtn');
   modalCancelBtn.innerHTML = "Отмена";
   modalContentEl.appendChild(modalTextEl);
   modalContentEl.appendChild(modalUnderTextEl);
   modalUnderTextEl.appendChild(modalYesBtn);
   modalUnderTextEl.appendChild(modalCancelBtn);
   document.body.appendChild(modalWindowEl);

   modalYesBtn.addEventListener('click', () => {
      deleteAll();
      modalWindowEl.remove();

      const cartGoShop = document.querySelector('.cart__goshop');
      cartGoShop.classList.remove('cart__goshop-none');   

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
})

if (localStorage.getItem('cartItems') == '[]') {
   const cartGoShop = document.querySelector('.cart__goshop');
   cartGoShop.classList.remove('cart__goshop-none');      
}

calculateSummary();
displayCart();
