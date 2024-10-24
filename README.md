# Drag and Drop Shopping Cart
This project demonstrates a drag-and-drop shopping cart system where users can drag items into a basket. The basket reveals a payment button when at least 3 items have been added. The project supports desktop and mobile (touch) interactions, and features custom drag behavior with smooth movement of items across the screen.

## Features
- Drag-and-Drop: Users can drag items from a shelf to the basket.
- Custom Clone Behavior: While dragging, an exact clone of the dragged item follows the cursor, providing a visual representation without the default browser "drag ghost."
- Basket System: Once 3 or more items are added to the basket, the "Pay" button appears, allowing users to proceed to checkout.
- Touch Support: The project supports touch events for mobile users, providing a smooth drag-and-drop experience on phones and tablets.
- Live Basket Preview: As items are dropped into the basket, a live preview updates, showing the added items.
- Vibration Feedback: On mobile devices, the app provides vibration feedback to enhance the user experience during touch interactions.

## Technologies Used
- HTML5: For the structure of the shopping page.
- CSS3: For the styling, including the basket and item layout.
- JavaScript (ES6): For implementing the drag-and-drop functionality and custom behavior for handling drag events.
- Touch Events API: For enabling touch-based interactions.
- Navigator API: For providing mobile vibration feedback on certain interactions.

## How It Works
- Dragging Items:
    - Users can drag items from the shelf into the basket. While dragging, a clone of the item moves with the cursor to give visual feedback.
- Dropping into Basket:
    - When an item is dropped into the basket, the basket preview updates, showing the newly added items.
- Pay Button Logic:
    - Once 3 items have been added to the basket, the "Pay" button appears, allowing the user to proceed to the checkout.
- Touch Support:
    - On mobile, dragging and dropping items works seamlessly via touch gestures. Additionally, mobile devices will vibrate when an item is dragged.

## Usage
### Adding Items to the Basket
#### Desktop:
  - Drag any item by clicking and holding the mouse button.
  - Drop it into the basket area.

#### Mobile:
  - Tap and hold an item to start dragging.
  - Move it into the basket and release your finger to drop it.

### Clearing the Basket
- To clear the basket, simply refresh the page.
- 
# Корзина с Перетаскиванием (Drag and Drop)
Этот проект демонстрирует систему корзины с поддержкой drag-and-drop, где пользователи могут перетаскивать товары с полки в корзину. Кнопка оплаты появляется, когда в корзину добавлено не менее 3 предметов. Проект поддерживает взаимодействие как на десктопе, так и на мобильных устройствах, а также включает кастомное поведение перетаскивания с плавным перемещением элементов по экрану.


## Возможности
- Drag-and-Drop: Пользователи могут перетаскивать товары с полки в корзину.
- Кастомное клонирование: Во время перетаскивания за курсором следует точная копия элемента без использования стандартного "призрака" браузера.
- Корзина: Как только в корзину добавляются 3 или более товаров, появляется кнопка "Оплатить", что позволяет пользователям продолжить к оформлению заказа.
- Поддержка Touch: Проект поддерживает касания на мобильных устройствах, обеспечивая плавное взаимодействие на телефонах и планшетах.
- Превью корзины: При добавлении товаров в корзину, обновляется живое превью с перечнем добавленных товаров.
- Виброотклик: На мобильных устройствах приложение обеспечивает виброотклик для улучшения пользовательского опыта.

## Используемые технологии
- HTML5: Для создания структуры страницы.
- CSS3: Для стилизации корзины и расположения товаров.
- JavaScript (ES6): Для реализации функционала drag-and-drop и кастомного поведения перетаскивания.
- Touch Events API: Для обработки касаний на мобильных устройствах.
- Navigator API: Для предоставления виброотклика на мобильных устройствах.

## Как это работает

- Перетаскивание товаров:
  - Пользователи могут перетаскивать товары с полки в корзину. Во время перетаскивания за курсором следует клон товара.
- Добавление в корзину:
  - Когда товар перемещается в корзину, корзина обновляется, показывая добавленные товары.
- Логика кнопки оплаты:
   - Как только в корзине оказывается 3 или более товаров, появляется кнопка "Оплатить".
- Поддержка Touch:
  - На мобильных устройствах перетаскивание и добавление в корзину работают с помощью касательных жестов. При начале перетаскивания устройство вибрирует.
 
## Использование
### Добавление товаров в корзину

#### На десктопе:
- Нажмите и удерживайте мышью товар, чтобы начать перетаскивание.
- Переместите товар в область корзины и отпустите кнопку мыши.

#### На мобильных устройствах:
- Нажмите и удерживайте товар, чтобы начать перетаскивание.
- Переместите его в корзину и отпустите палец, чтобы добавить.

### Очистка корзины
- Чтобы очистить корзину, просто обновите страницу.
