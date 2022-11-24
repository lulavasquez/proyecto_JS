//AÑADIR AL CARRITO

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

//BTN COMPRAR
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

//shop
const shoppingCartItemsContainer =  document.querySelector('.shoppingCartItemsContainer');

function addToCartClicked(event){
    const button = event.target;
    const item = button.closest('.item');
    
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;
    
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage){
    //NO DUPLICAR PRODUCTO
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
    for(let i = 0; i < elementsTitle.length; i++){
        if(elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El producto ya fue agregado al carrito',
                showConfirmButton: false,
                timer: 1500
            })
            ;
            updateShoppingCartTotal();
            return;
        }
    }


    //ADD PRODUCTOS
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${itemImage} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>
</div>`;
shoppingCartRow.innerHTML = shoppingCartContent;
shoppingCartItemsContainer.append(shoppingCartRow);
//BORRAR PRODUCTO DEL CARRITO
shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
//CAMBIAR CANTIDAD DE PRODUCTO
shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

updateShoppingCartTotal()
}

//ACTUALIZACION DEL TOTAL
function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem =>{
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''));
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);

        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(3)}$`;
}
//FUNCION BORRAR PRODUCTO DEL CARRITO
function removeShoppingCartItem(event){
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    Swal.fire({
        title: 'Borrado!',
        icon: 'success',
        text: 'Se elimino el producto de la compra'
    })
    updateShoppingCartTotal();
}
//FUNCION CAMBIAR CANTIDAD
function quantityChanged(event){
    const input = event.target;
    if(input.value <= 0){
        input.value = 1;
    }
    updateShoppingCartTotal();
}
//BTN COMPRAR
function comprarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    Swal.fire('Gracias por su compra')
    updateShoppingCartTotal();
}
//FETCH CLIMA

let api_key = "445089fd51b9c5ead4adc4974b81febe";

navigator.geolocation.getCurrentPosition(showPosition)

function showPosition(position){
    

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    
fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&lang=es&units=metrics&appid="+api_key)
.then(response => response.json())
.then(data => {
    let padre = document.getElementById("contenedor_clima");
    let clima = document.createElement("div");
    clima.innerHTML = `<p class="item_clima">Ciudad: ${data.name}</p>
                        <p class="item_clima">${data.weather[0].description}</p>
                        <p class="item_clima">Temp: ${data.main.temp}°</p>
                        <p class="item_clima">Max: ${data.main.temp_max}°</p>
                        <p class="item_clima">Min: ${data.main.temp_min}°</p>`;

        padre.append(clima);
})
}


