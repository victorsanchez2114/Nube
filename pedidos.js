document.addEventListener('DOMContentLoaded', function() {
    const stationeryList = document.getElementById('stationery-list');
    const stationeryForm = document.getElementById('stationery-form');
    const stationeryInput = document.getElementById('stationery-input');

    const snacksList = document.getElementById('snacks-list');
    const snacksForm = document.getElementById('snacks-form');
    const snacksInput = document.getElementById('snacks-input');

    const orderDateInput = document.getElementById('order-date');

    // Función para obtener los productos guardados en el almacenamiento local
    function getProducts(category) {
        return JSON.parse(localStorage.getItem(category)) || [];
    }

    // Función para mostrar los productos en la lista
    function renderProducts(category, productList) {
        const products = getProducts(category);
        productList.innerHTML = '';
        products.forEach(function(product, index) {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <span>${product}</span>
                <button class="delete-btn" data-index="${index}" data-category="${category}">Eliminar</button>
            `;
            productList.appendChild(productItem);
        });
    }

    // Mostrar los productos almacenados en el almacenamiento local al cargar la página
    renderProducts('stationery', stationeryList);
    renderProducts('snacks', snacksList);

    // Agregar un nuevo producto
    function addProduct(category, input, productList) {
        const product = input.value.trim();
        if (product !== '') {
            const products = getProducts(category);
            products.push(product);
            localStorage.setItem(category, JSON.stringify(products));
            renderProducts(category, productList);
            input.value = '';
        }
    }

    stationeryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addProduct('stationery', stationeryInput, stationeryList);
    });

    snacksForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addProduct('snacks', snacksInput, snacksList);
    });

    // Eliminar un producto
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            const category = event.target.getAttribute('data-category');
            const products = getProducts(category);
            products.splice(index, 1);
            localStorage.setItem(category, JSON.stringify(products));
            renderProducts(category, category === 'stationery' ? stationeryList : snacksList);
        }
    });

    // Guardar la fecha del pedido en el almacenamiento local
    orderDateInput.addEventListener('change', function() {
        localStorage.setItem('orderDate', orderDateInput.value);
    });

    // Mostrar la fecha del pedido almacenada al cargar la página
    const savedOrderDate = localStorage.getItem('orderDate');
    if (savedOrderDate) {
        orderDateInput.value = savedOrderDate;
    }
});
