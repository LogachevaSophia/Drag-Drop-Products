let count_products = 0;
let basket = document.querySelector(".basket")
let basketJson = basket.getBoundingClientRect()

// Разрешить перетаскивание в зону
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    const img = new Image();
    img.src = ''; // Пусть пустое изображение
    // Скрываем "призрака"
    event.dataTransfer.setDragImage(img, 0, 0); F
    // event.dataTransfer.setData("text", event.target.id);
}


// Упускание элемента
function drop(event) {
    event.preventDefault();

    // Проверяем, что элемент перетаскивается между блоками
    const targetBlock = event.target.closest(".block"); // Получаем блок, куда перетаскивается
    const draggingItem = document.querySelector(".dragging"); // Перетаскиваемый элемент

    // Перемещаем только в другой блок
    if (draggingItem && draggingItem.parentElement !== targetBlock) {
        targetBlock.appendChild(draggingItem); // Переместить элемент в новый блок
        count_products++;
        updateBasketPreview();
        if (count_products > 2) {
            document.querySelector("a#payCard").classList.add("show")
        }
    }
}


//Функция пересчета координат, необходимо для того, чтобы продукты гарантировано оставались в корзине и не выходили за ее края
function calc_position(pageX, item) {

    let eventX = pageX
    if ((eventX < basketJson.left + 60)) {
        eventX = basketJson.left + 60;

    }
    if (eventX > basketJson.right - item?.getBoundingClientRect().width - 20) {
        eventX = basketJson.right - item?.getBoundingClientRect().width - 20;
    }
    return eventX;
}

// Обработчик для touchmove
function touchMove(event, clonedElement, offsetX, offsetY) {
    event.preventDefault();
    const touchLocation = event.targetTouches[0]; // Получаем координаты касания
    const item = event.target;

    // Изменяем позицию элемента в реальном времени
    item.style.left = `calc(${calc_position(touchLocation.pageX, item)}px  - (100vw - ${basketJson.width}px) / 2)`
    if (clonedElement) {
        clonedElement.style.position = 'absolute'; // Устанавливаем абсолютное позиционирование
        clonedElement.style.left = `${touchLocation.pageX - offsetX}px`; // Обновляем X с учетом смещения
        clonedElement.style.top = `${touchLocation.pageY - offsetY}px`; // Обновляем Y с учетом смещения
    }
}

// Обработчик для touchend (когда отпустили)
function touchEnd(event) {
    const targetBlock = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY).closest(".block");
    const draggingItem = event.target;

    if (draggingItem && draggingItem.parentElement !== targetBlock && targetBlock) {
        targetBlock.appendChild(draggingItem); // Перемещаем элемент в новый блок
        updateBasketPreview()
        count_products++;
        if (count_products > 2) {
            document.querySelector("a#payCard").classList.add("show");
        }
        navigator.vibrate(200);
    }
}

// Назначаем события для всех перетаскиваемых элементов
const draggableItems = document.querySelectorAll('.draggable-item');
draggableItems.forEach(item => {

    const productContainer = item.closest('.product-container');
    const label = productContainer.querySelector('.label');
    let clonedElement = null;
    let offsetX = 0
    let offsetY = 0
    item.addEventListener('mouseleave', () => {

        label.classList.remove("show")

    });
    item.addEventListener('mousedown', (e) => {
        e.target.classList.add('dragging'); // Устанавливаем класс для увеличения
        if (!label.classList.contains("show"))
            label.classList.add("show")
        else
            label.classList.remove("show")

    });

    item.addEventListener('drag', (e) => {
        if (clonedElement) {
            clonedElement.style.position = 'absolute'; // Устанавливаем абсолютное позиционирование
            clonedElement.style.left = `${e.pageX - offsetX}px`; // Обновляем X с учетом смещения
            clonedElement.style.top = `${e.pageY - offsetY}px`; // Обновляем Y с учетом смещения
        }


    });
    item.addEventListener('mouseup', (e) => {
        e.target.classList.remove('dragging') // Убираем класс для увеличения
        if (!label.classList.contains("show"))
            label.classList.remove("show")
    });
    item.addEventListener('dragstart', (e) => {
        // e.preventDefault()
        e.target.classList.add('dragging'); // Устанавливаем класс для перетаскиваемого элемента
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

    item.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging'); // Убираем класс после перетаскивания


        e.target.style.left = `calc(${calc_position(e.clientX, item)}px - (100vw - ${basketJson.width}px) / 2`
        if (!label.classList.contains("show"))
            label.classList.remove("show")
        if (clonedElement) {
            // Удаляем клонированный элемент
            document.body.removeChild(clonedElement);
            clonedElement = null; // Сбрасываем переменную
        }

    });

    // Добавляем поддержку касаний для мобильных устройств
    item.addEventListener('touchstart', (e) => {
        e.target.classList.add('dragging'); // Устанавливаем класс
        
        if (!label.classList.contains("show"))
            label.classList.add("show")
        else
            label.classList.remove("show")
        clonedElement = item.cloneNode(true);
        document.body.appendChild(clonedElement);
        const rect = item.getBoundingClientRect();
        const touchLocation = event.targetTouches[0]; 
        offsetX = touchLocation.clientX - rect.left;
        offsetY = touchLocation.clientY - rect.top;
        navigator.vibrate(200);
    });

    item.addEventListener('touchmove', (e) => touchMove(e, clonedElement, offsetX, offsetY)); // Обрабатываем перемещение
    item.addEventListener('touchend', (e) => {
        if (label.classList.contains("show"))
            label.classList.remove("show")

        e.target.classList.remove('dragging'); // Убираем класс после перетаскивания
        if (clonedElement) {
            // Удаляем клонированный элемент
            document.body.removeChild(clonedElement);
            clonedElement = null; // Сбрасываем переменную
        }
        touchEnd(e); // Обрабатываем конец перетаскивания
    });
});

function closeoverlay() {
    document.querySelector('.overlay').style.display = 'none';
}
function updateBasketPreview() {
    const basketPreview = document.querySelector('.basket-preview');
    const basketList = document.querySelector('#basket-items-list');
    const items = document.querySelectorAll('.basket .draggable-item');

    basketList.innerHTML = ''; // Очищаем список
    items.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = item.alt
        link.href = item.attributes["data-link"].nodeValue
        listItem.appendChild(link)
        basketList.appendChild(listItem);
    });

    if (items.length > 0) {
        basketPreview.classList.add('show');
    } else {
        basketPreview.classList.remove('show');
    }
}

