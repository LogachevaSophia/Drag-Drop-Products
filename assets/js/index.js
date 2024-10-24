let count_products = 0;
let basket = document.querySelector(".basket")
let basketJson =basket.getBoundingClientRect() 

// Разрешить перетаскивание в зону
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Начать перетаскивание
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Упускание элемента
function drop(event) {
    event.preventDefault();
    
    // Проверяем, что элемент перетаскивается между блоками
    const targetBlock = event.target.closest(".block"); // Получаем блок, куда перетаскивается
    const draggingItem = document.querySelector(".dragging"); // Перетаскиваемый элемент
    
    // Перемещаем только в другой блок
    console.log(draggingItem)
    if (draggingItem && draggingItem.parentElement !== targetBlock) {
        targetBlock.appendChild(draggingItem); // Переместить элемент в новый блок
        count_products++;
        updateBasketPreview();
        if (count_products > 2){
            document.querySelector("a#payCard").classList.add("show")
        }
    }
}


//Функция пересчета координат, необходимо для того, чтобы продукты гарантировано оставались в корзине и не выходили за ее края
function calc_position(pageX, item){
    
    let eventX = pageX
    
    console.log(item?.getBoundingClientRect().width)
    console.log(pageX)
    console.log(`left = ${basketJson.left}`)
    if ((eventX < basketJson.left + 60)){
        eventX = basketJson.left +60;

    } 
    if (eventX > basketJson.right- item?.getBoundingClientRect().width-20){
        eventX = basketJson.right -item?.getBoundingClientRect().width-20;
    }
    return eventX;
}

// Обработчик для touchmove
function touchMove(event) {
    event.preventDefault();
    const touchLocation = event.targetTouches[0]; // Получаем координаты касания
    const item = event.target;

    // Изменяем позицию элемента в реальном времени
    console.log(touchLocation)
    
    // console.log(eventX)
    // item.style.left = `calc(${eventX}px - (100vw - ${basketJson.width}px) / 2)`;
    item.style.left=`calc(${calc_position(touchLocation.pageX, item)}px  - (100vw - ${basketJson.width}px) / 2)`
    // item.style.top = `${touchLocation.pageY}px`;
}

// Обработчик для touchend (когда отпустили)
function touchEnd(event) {
    const targetBlock = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY).closest(".block");
    const draggingItem = event.target;
    
    if (draggingItem && draggingItem.parentElement !== targetBlock && targetBlock) {
        targetBlock.appendChild(draggingItem); // Перемещаем элемент в новый блок
        count_products++;
        if (count_products > 2) {
            document.querySelector("a#payCard").classList.add("show");
        }
    }
}

// Назначаем события для всех перетаскиваемых элементов
const draggableItems = document.querySelectorAll('.draggable-item');
draggableItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging'); // Устанавливаем класс для перетаскиваемого элемента
    });

    item.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging'); // Убираем класс после перетаскивания
        console.log(e.clientX);
        // e.target.style.left = `calc(${e.clientX}px - 50px)`;
         e.target.style.left=`calc(${calc_position(e.clientX, item)}px - (100vw - ${basketJson.width}px) / 2`
    });

    // Добавляем поддержку касаний для мобильных устройств
    item.addEventListener('touchstart', (e) => {
        e.target.classList.add('dragging'); // Устанавливаем класс
    });

    item.addEventListener('touchmove', touchMove); // Обрабатываем перемещение
    item.addEventListener('touchend', (e) => {
        e.target.classList.remove('dragging'); // Убираем класс после перетаскивания
        touchEnd(e); // Обрабатываем конец перетаскивания
    });
});


function updateBasketPreview() {
    const basketPreview = document.querySelector('.basket-preview');
    const basketList = document.querySelector('#basket-items-list');
    const items = document.querySelectorAll('.basket .draggable-item');
    
    basketList.innerHTML = ''; // Очищаем список
    items.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = item.alt
        link.href = item["data-link"]
        listItem.appendChild(link)
        // listItem.textContent = item.alt; // Показываем название продукта
        basketList.appendChild(listItem);
    });
    
    if (items.length > 0) {
        basketPreview.classList.add('show');
    } else {
        basketPreview.classList.remove('show');
    }
}

