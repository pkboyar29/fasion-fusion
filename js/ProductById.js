function findProductById(productsData, idFrom) {

   for (const category of productsData) {
      for (const subcategory of category.subcategories) {
         const product = subcategory.objects.find(item => item.id == idFrom);
         if (product) {
            categoryEl = category;
            subcategoryEl = subcategory;
            return product; // Вернуть объект товара, если найден
         }
      }
   }

   return null; // Если товар не найден
}
