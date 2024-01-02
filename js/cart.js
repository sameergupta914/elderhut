let carts = document.querySelectorAll('.cart-btn')

let products = [
    {
        name: 'Frame Folding Walker',
        tag: 'frame-folding-walker',
        price: 349,
        inCart: 0
    },
    {
        name: 'BP Monitor',
        tag: 'bp-monitor',
        price: 1099,
        inCart: 0
    },
    {
        name: 'Hearing aid',
        tag: 'hearing-aids',
        price: 449,
        inCart: 0
    },
    {
        name: 'Seat cushion',
        tag: 'seat-cushion',
        price: 299,
        inCart: 0
    },
    {
        name: 'Walking Stick',
        tag: 'walking-stick',
        price: 599,
        inCart: 0
    },
    {
        name: 'Brand New wheelchair',
        tag: 'wheelchair',
        price: 14999,
        inCart: 0
    },
    {
        name: 'heart rate monitor',
        tag: 'heart-rate-monitor',
        price: 1499,
        inCart: 0
    },
    {
        name: 'wheelchair',
        tag: 'wheelchair',
        price: 17999,
        inCart: 0
    },
    {
        name: 'frame folding walker',
        tag: 'frame-folding-walker',
        price: 699,
        inCart: 0
    },
    {
        name: 'walking stick',
        tag: 'walking-stick',
        price: 599,
        inCart: 0
    },

]

for(let i = 0; i<carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

//whenever page is loaded, cart number is remembered
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart-amount').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');

    
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.cart-amount').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-amount').textContent = 1;

    }

    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
        localStorage.setItem("totalCost", product.price);
    }else{
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="trash-outline"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price},00</div>
            <div class="quantity>
                <ion-icon class="decrease "
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase"
                name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });
        
        productContainer.innerHTML +=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
        `
    
    }
}

onLoadCartNumbers();
displayCart();