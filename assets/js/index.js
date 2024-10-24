let countProducts = 0;
const basket = document.querySelector(".basket");

// Привязываем события через addEventListener
basket.addEventListener('dragover', allowDrop);
basket.addEventListener('drop', drop);
const basketJson = basket.getBoundingClientRect();

// Разрешить перетаскивание в зону
function allowDrop(event) {
    event.preventDefault();
}


// Упускание элемента
function drop(event) {
    event.preventDefault();
    const targetBlock = event.target.closest(".block"); // Получаем блок, куда перетаскивается
    const draggingItem = document.querySelector(".dragging"); // Перетаскиваемый элемент

    if (draggingItem && draggingItem.parentElement !== targetBlock) {
        targetBlock.appendChild(draggingItem); // Перемещаем элемент
        countProducts++;
        updateBasketPreview();
        togglePayButton();
    }
}

// Пересчет координат, чтобы продукты не вылетазали а пределы корзины
function calc_position(pageX, item) {
    let eventX = pageX;
    const itemRect = item?.getBoundingClientRect();
    if (eventX < basketJson.left + 60) {
        eventX = basketJson.left + 60;
    }
    if (eventX > basketJson.right - itemRect.width - 20) {
        eventX = basketJson.right - itemRect.width - 20;
    }
    return eventX;
}

// Обработчик перемещения элемента
function touchMove(event, clonedElement, offsetX, offsetY) {
    event.preventDefault();
    const touchLocation = event.targetTouches[0];
    const item = event.target;

    item.style.left = `calc(${calc_position(touchLocation.pageX, item)}px - (100vw - ${basketJson.width}px) / 2)`;// расстояние высчитывается с учетом отсутпов в браузерном окне, поскольку верстка адаптивна

    if (clonedElement) {
        clonedElement.style.position = 'absolute';
        clonedElement.style.left = `${touchLocation.pageX - offsetX}px`;
        clonedElement.style.top = `${touchLocation.pageY - offsetY}px`;
    }
}

// Обработчик окончания касания
function touchEnd(event) {
    const targetBlock = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY)?.closest(".block");
    const draggingItem = event.target;

    if (draggingItem && draggingItem.parentElement !== targetBlock && targetBlock) {
        targetBlock.appendChild(draggingItem);
        updateBasketPreview();
        countProducts++;
        togglePayButton();
        navigator.vibrate(200);
    }
}

// Назначаем события для всех перетаскиваемых элементов
document.querySelectorAll('.draggable-item').forEach(item => {
    const productContainer = item.closest('.product-container');
    const label = productContainer.querySelector('.label');
    let clonedElement = null;
    let offsetX = 0, offsetY = 0;

    // Мышь
    item.addEventListener('mouseenter', () => label.classList.toggle("show"));
    item.addEventListener('mouseleave', () => label.classList.remove("show"));
    item.addEventListener('mousedown', () => item.classList.add('dragging'));
    item.addEventListener('mouseup', () => item.classList.remove('dragging'));

   
    item.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging'); 
        if (!label.classList.contains("show"))
            label.classList.add("show")
        else
            label.classList.remove("show")
        clonedElement = item.cloneNode(true);
        document.body.appendChild(clonedElement);
        const rect = item.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

    });
    item.addEventListener('drag', (e) => {
        if (clonedElement) {
            clonedElement.style.position = 'absolute'; // Устанавливаем абсолютное позиционирование со смещением
            clonedElement.style.left = `${e.pageX - offsetX}px`; 
            clonedElement.style.top = `${e.pageY - offsetY}px`; 
        }


    });

    item.addEventListener('dragend', (e) => {
        item.classList.remove('dragging');
        document.body.removeChild(clonedElement);
        clonedElement = null;
        e.target.style.left = `calc(${calc_position(e.clientX, item)}px - (100vw - ${basketJson.width}px) / 2`;// расстояние высчитывается с учетом отсутпов в браузерном окне, поскольку верстка адаптивна
    });

    // Touch события
    item.addEventListener('touchstart', (e) => {
        const touchLocation = e.targetTouches[0];
        const rect = item.getBoundingClientRect();
        offsetX = touchLocation.clientX - rect.left;
        offsetY = touchLocation.clientY - rect.top;
        item.classList.add('dragging');
        clonedElement = item.cloneNode(true);
        document.body.appendChild(clonedElement);
        navigator.vibrate(200);
    });

    item.addEventListener('touchmove', (e) => touchMove(e, clonedElement, offsetX, offsetY));
    item.addEventListener('touchend', (e) => {
        item.classList.remove('dragging');
        document.body.removeChild(clonedElement);
        clonedElement = null;
        touchEnd(e);
    });
});

// Обновление корзины
function updateBasketPreview() {
    const basketList = document.querySelector('#basket-items-list');
    const items = document.querySelectorAll('.basket .draggable-item');

    basketList.innerHTML = ''; // Очищаем список
    items.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = item.alt || 'Item';
        link.href = item.dataset.link;
        listItem.appendChild(link);
        basketList.appendChild(listItem);
    });

    document.querySelector('.basket-preview').classList.toggle('show', items.length > 0);
}

// Переключение отображения кнопки оплаты
function togglePayButton() {
    const payButton = document.querySelector("a#payCard");
    payButton.classList.toggle("show", countProducts > 2);
}
