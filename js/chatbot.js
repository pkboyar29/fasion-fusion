const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');
const questions = document.querySelectorAll('.question');


function lol(userMessage) {
   if (userMessage) {
      // Отправляем сообщение пользователя в чат
      appendMessage('user', userMessage);

      // Определяем, какой ответ отправить пользователю (просто пример)
      let botResponse = '';
      switch (userMessage) {
         case 'Привет':
            botResponse = 'Здравствуйте! Я чем-то могу вам помочь?';
            break;
         case 'Каковы условия доставки?':
            botResponse = 'Мы предлагаем бесплатную доставку на заказы свыше 3000 рублей. Доставка занимает обычно 2-5 рабочих дней. Подробности можно найти на странице "Доставка и оплата".';
            break;
         case 'Какие новые товары у вас есть в наличии?':
            botResponse = 'Мы постоянно обновляем наш ассортимент. Чтобы узнать о новых поступлениях, посетите раздел "Новинки" на нашем сайте.';
            break;
         case 'Как вернуть товар, если он не подошел?':
            botResponse = 'Мы принимаем возвраты в течение 14 дней с момента покупки. Подробности о возврате и обмене товаров доступны на странице "Возврат и обмен.';
            break;
         case 'Есть ли у вас акции или скидки на товары?':
            botResponse = 'Да, у нас часто проводятся акции и распродажи. Чтобы узнать о текущих скидках, подпишитесь на нашу рассылку или посетите раздел "Скидки" на сайте.';
            break;
         case 'Как связаться с вашей службой поддержки клиентов?':
            botResponse = 'Вы можете связаться с нами через чат на сайте, по электронной почте hello@ffusion.com или по телефону +8 (999) 999-99-99. Наши операторы готовы помочь вам с любыми вопросами и проблемами';
            break;
         default:
            botResponse = 'Извините, я не могу ответить на этот вопрос. Пожалуйста, задайте другой вопрос.';
      }

      // Отправляем ответ чат-бота
      appendMessage('bot', botResponse);

      // Очищаем поле ввода
      userInput.value = '';
   }
}


sendButton.addEventListener('click', () => {
   const userMessage = userInput.value;

   lol(userMessage);
});

questions.forEach(question => {
   question.addEventListener('click', () => {
      lol(question.innerHTML);
   });
});


function appendMessage(sender, text) {
   const messageElement = document.createElement('div');
   messageElement.classList.add('message', sender);
   messageElement.textContent = `${sender === 'user' ? 'Пользователь' : 'Чат-бот'}: ${text}`;
   chatMessages.appendChild(messageElement);
   chatMessages.scrollTop = chatMessages.scrollHeight; // Прокрутка вниз для просмотра новых сообщений
}
