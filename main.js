
// update price based on the quantity of item the customer wants to buy


function updatePrice() {
    var input = Number(document.getElementById('quantity').value);
    var currentlist = document.getElementById('product-price').innerHTML.split(" ");
    var current = Number(currentlist[1]);
    var update = String(input*current)
    document.getElementById('product-price').innerHTML = "$ " + update;
}

var items;
var wishs;

function initCart() {
	items = JSON.parse(localStorage.getItem("cartItems")); 
	wishs = JSON.parse(localStorage.getItem("wishItems")); 
	if (items === null) {
		items = {};
		localStorage.setItem("cartItems", JSON.stringify(items));
	}
	if (wishs === null) {
		wishs = {};
		localStorage.setItem("wishItems", JSON.stringify(wishs));
	}
	cartIcon();
}

function countItems() {
	items = JSON.parse(localStorage.getItem("cartItems")); 
	var count = 0;
	for (var i in items) {
	    count += items[i][2];
	}
	return count;
}

function cartIcon() {
	var num = countItems();
	document.getElementById("cart").setAttribute("src", 'cart' + String(num) + '.png');
}

function addCart() {
	selectedS = document.getElementById('size').value;
	selectedC = document.getElementById('color').value;
	if (selectedS === "") {
		alert("Please select the size before adding to cart!");
	}
	else if (selectedC === "") {
		alert("Please select the color before adding to cart!");
	}
	else {
		document.getElementById("add2cart").textContent = "Added!";
		document.getElementById('add2cart').disabled = 'disabled';
		items = JSON.parse(localStorage.getItem("cartItems")); 
			items[document.getElementById('product-name').innerHTML.split(" ")[1] + " " 
			+ document.getElementById('product-name').innerHTML.split(" ")[2]] = 
			[selectedS, selectedC, Number(document.getElementById('quantity').value),
			Number(document.getElementById('product-price').innerHTML.split(" ")[1])];
		localStorage.setItem("cartItems", JSON.stringify(items));
		cartIcon();
	}
}

function addWish() {
	document.getElementById("add2wish").textContent = "Added!";
	document.getElementById('add2wish').disabled = 'disabled';
	wishs = JSON.parse(localStorage.getItem("wishItems")); 
		wishs[document.getElementById('product-name').innerHTML.split(" ")[1] + " " 
		+ document.getElementById('product-name').innerHTML.split(" ")[2]] = 
		[Number(document.getElementById('quantity').value),
		Number(document.getElementById('product-price').innerHTML.split(" ")[1])];
	localStorage.setItem("wishItems", JSON.stringify(wishs));
}

function removeCart(x) {
	document.getElementById(x).textContent = "Removed!";
	document.getElementById(x).disabled = 'disabled';
	items = JSON.parse(localStorage.getItem("cartItems")); 
	num = Number(x[(x.length)-1]);
	count = 0;
	for (var i in items) {
		if (count === num) {
			delete items[i];
		}
		count += 1;
	}
	localStorage.setItem("cartItems", JSON.stringify(items));
	cartIcon();
}

function removeWish(x) {
	document.getElementById(x).textContent = "Removed!";
	document.getElementById(x).disabled = 'disabled';
	wishs = JSON.parse(localStorage.getItem("wishItems")); 
	num = Number(x[(x.length)-1]);
	count = 0;
	for (var i in wishs) {
		if (count === num) {
			delete wishs[i];
		}
		count += 1;
	}
	localStorage.setItem("wishItems", JSON.stringify(wishs));
}

function displayItems() {
	cartIcon();
	items = JSON.parse(localStorage.getItem("cartItems")); 
	var shown = document.getElementById("shopping-cart");
	var count = 0;
	for (var i in items) {
		itemPic= document.createElement("img");
		itemPic.setAttribute("src", findPic(i));
		itemPic.setAttribute("width", "30%");
		itemPic.setAttribute("hspace", "45");
		itemPic.id = "itemp" + String(count);
		itemDes = document.createElement("p");
		itemDes.innerHTML = editTxt(i);
		itemDes.id = "itemd" + String(count); 
		itemBut = document.createElement("button");
		itemBut.innerHTML = "Remove from Cart";
		itemBut.id = "itemr" + String(count);
		itemBut.setAttribute("onclick", "removeCart(itemBut.id)");
		shown.appendChild(itemPic);
		shown.appendChild(itemDes);
		shown.appendChild(itemBut);
		shown.appendChild(document.createElement("p"));
		count += 1;
	}
	displayWishs();
	calculateTotal();
}

function editTxt(x) {
	items = JSON.parse(localStorage.getItem("cartItems")); 
	return String(items[x][2]) + " " + items[x][0] + " " + items[x][1] + " " + x + " -- " + "$ " + items[x][3]; 
}

function findPic(x) {
	if (x === "CAT BACKPACK") {
		return "catpack.jpg";
	}
	else if (x === "DOG BACKPACK") {
		return "dogpack.jpg";
	}
}

function displayWishs() {
	wishs = JSON.parse(localStorage.getItem("wishItems")); 
	var shown = document.getElementById("wishlist");
	var count = 0;
	for (var i in wishs) {
		wishPic= document.createElement("img");
		wishPic.setAttribute("src", findPic(i));
		wishPic.setAttribute("width", "30%");
		wishPic.setAttribute("hspace", "45");
		wishPic.id = "wishp" + String(count);
		wishDes = document.createElement("p");
		wishDes.innerHTML = wishTxt(i);
		wishDes.id = "wishd" + String(count); 
		wishBut = document.createElement("button");
		wishBut.innerHTML = "Remove from Wishlist";
		wishBut.id = "wishr" + String(count);
		wishBut.setAttribute("onclick", "removeWish(wishBut.id)");
		shown.appendChild(wishPic);
		shown.appendChild(wishDes);
		shown.appendChild(wishBut);
		shown.appendChild(document.createElement("p"));
		count += 1;
	}
}

function wishTxt(x) {
	wishs = JSON.parse(localStorage.getItem("wishItems")); 
	return String(wishs[x][0]) + " " + x + " -- " + "$ " + wishs[x][1]; 
}

function calculateTotal() {
	numItems = countItems();
	price = 0;
	items = JSON.parse(localStorage.getItem("cartItems")); 
	for (var i in items) {
		price += items[i][3];
	}
	subTotal = price + 9;

	var shown = document.getElementById("total");
	merch = document.createElement("p");
	merch.innerHTML = "Merchandise (" + String(numItems) + " items): $" + String(price);
	ship = document.createElement("p");
	ship.innerHTML =  "Estimated Shipping: $9";
	tot = document.createElement("p");
	tot.innerHTML =  "Subtotal: $" + String(subTotal);
	shown.appendChild(merch);
	shown.appendChild(ship);
	shown.appendChild(tot);
}