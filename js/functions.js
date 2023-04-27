updateCartTotal(); //calls the update cart total function

document.getElementById("emptycart").addEventListener("click", emptyCart); //click on emptyCart, and the cart will be emptied
var btns = document.getElementsByClassName('addtocart');//the current item selected will be added to the cart
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);}); // passes the clicked element as an argument to the function
}

function addToCart(elem) {

    var sibs = [];//declaring variables for later use
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;

    while(elem = elem.previousSibling) { //loops through all the previous siblings of a given element, assigning each sibling to the elem variable on each iteration
        if (elem.nodeType === 3) continue;
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem); //push the price and product name to the array named 'sibs'
    }

    var product = { //self explanatory lol
        productname : getproductName,
        price : getprice
    };

    var stringProduct = JSON.stringify(product); //converts the product value into a JSON string
    
    if(!sessionStorage.getItem('cart')){ //checks if there is any existing data stored in the browser's session storage under the key 'cart'
        cart.push(stringProduct); //new item to the cart array
        stringCart = JSON.stringify(cart); //convert the entire cart into a JSON string
        sessionStorage.setItem('cart', stringCart); // stores the stringCart in the session storage under the key 'cart'
        addedToCart(getproductName); //product name added to cart
        updateCartTotal(); // the cart total is updated
    }
    else {
       cart = JSON.parse(sessionStorage.getItem('cart')); //retrieving the value of the "cart" key and parsing it from a JSON string to an array of objects
        cart.push(stringProduct);//new item to the cart array
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart); // stores the stringCart in the session storage under the key 'cart'
        addedToCart(getproductName);//product name added to cart
        updateCartTotal();// the cart total is updated
    }
}
function updateCartTotal(){
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) { //retrieves the contents of the user's shopping cart from the browser's session storage and iterates over each item in the cart
        var cart = JSON.parse(sessionStorage.getItem('cart')); //stores the cart value as a JSON string
        items = cart.length; //the cart length determines the number of items in the cart
        for (var i = 0; i < items; i++){ //iterates through the items in the cart array
            var x = JSON.parse(cart[i]); //parses the JSON string back into an object
            price = parseFloat(x.price.split('$')[1]); // extracts the price value from x and converts it to a float
            productname = x.productname; //product name extracted from x
            carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>"; //product name and price are then used to build a table row to the nearest 2 decimal places
            total += price; //total variable is also incremented by the price of each item to calculate the total cost of the cart
        }
        
    }
    document.getElementById("total").innerHTML = total.toFixed(2); //these 3 lines update the HTML content
    document.getElementById("carttable").innerHTML = carttable;
    document.getElementById("itemsquantity").innerHTML = items;
}
function addedToCart(pname) { //takes a product name as a parameter and displays a message to the user indicating that the product has been added to the cart
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message; //sets its innerHTML property to the message string
  if(!alerts.classList.contains("message")){ //If the "alerts" element does not already have the "message" class, it adds it using the classList.add() method
     alerts.classList.add("message");
  }
}
function emptyCart() { //clears the user's shopping cart
    if(sessionStorage.getItem('cart')){ // check if cart exists in session storage
        sessionStorage.removeItem('cart');// If it exists, remove it from session storage
        updateCartTotal(); // Update cart total to zero
      var alerts = document.getElementById("alerts"); // Clear any displayed message in the alerts area
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}