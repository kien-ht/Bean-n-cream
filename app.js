// window.onscroll = function() {myFunction()};

// var header = document.getElementById("myHeader");
// var sticky = header.offsetTop;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }
let menu_item = document.getElementsByClassName("menu-item");
menu_item.onclick = function addClass(){
  menu_item.classList.add("cl-green");
}


var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 10000); 
}

let name_alert = document.querySelector(".checkout-name");
let number_alert = document.querySelector(".checkout-number");
let address_alert = document.querySelector(".checkout-address");
let checkout_btn = document.getElementById("checkout-button");

let cash = document.getElementById("cash-pay");
let bank = document.getElementById("bank-pay");
let airpay = document.getElementById("airpay-pay");
let visa = document.getElementById("visa-pay");
let momo = document.getElementById("momo-pay");
let promo = document.getElementById("promo");
let apply = document.getElementById("apply");

apply.addEventListener("click", function applyCoupon(){
  if (! promo.value) {
    alert ("Mã ưu đãi không hợp lệ");
  }
  else {
    alert ("Áp dụng mã ưu đãi thành công");
  }
})

checkout_btn.addEventListener("click", function newWindow(){
  if (cash.checked) {
    alert("Bạn đã đặt hàng thành công");
  }
  else if (bank.checked) {
    window.open ("https://portal.vietcombank.com.vn/Pages/Home.aspx");
  }
  else if (momo.checked) {
    window.open ("https://momo.vn/");
  }
  else if (airpay.checked) {
    window.open ("https://www.airpay.vn/khuyen-mai/");
  }
  else if (visa.checked) {
    window.open ("https://www.visa.com.vn/");
  }
})
checkout_btn.addEventListener("click", function showAlert() {
  if (!name_alert.value) {
    alert("Tên không thể bỏ trống");
  }
  else if (!number_alert.value) {
    alert("Số điện thoại không thể bỏ trống");
  }
  else if (!address_alert.value) {
    alert("Địa chỉ không thể bỏ trống");
  } else {
    alert("Bạn đã đặt hàng thành công");
    location.reload();
  }
});

let cart = [];
function showData() {
  let mainMenu = document.getElementById("main-menu");
  for (let category of fake_data) {
    let html = `
        <div class="out">
            <h1 id="${category.title}" class="item item-menu">${category.title}</h1>
            <div class="flex">`;

    for (let menuItem of category.data) {
      html += `        
                <div class="menu-item">
                    <img class="image" src="${menuItem.image}">
                    <div>
                        <h1 class="name">${menuItem.name}</h1>
                        <h1 class="price">${menuItem.price} đ</h1>
                        <input type="number" class="number" min="1" max="${menuItem.number}" value="1"><br>
                        <h1 class="buy-now hvr-sweep-to-right" onclick="addToCart(event)">MUA NGAY</h1>
                    </div>
                </div>`;
    }

    html += `
                </div>
            </div>
        </div>`;
    mainMenu.innerHTML += html;
  }
}
showData();
function addToCart(event) {
  let info = event.target.parentNode;
  console.log(info);
  let temp = 0;
  for (let key of cart) {
    if (key.name == info.querySelector(".name").innerText) {
      key.number = parseFloat(key.number)+parseFloat(info.querySelector(".number").value);
      console.log(key.number);
      temp = 1;
    }
  }
  if (temp == 0) {
    let item = {
      name: info.querySelector(".name").innerText,
      price: info.querySelector(".price").innerText,
      number: info.querySelector(".number").value
    };
    cart.push(item);
  };
}


// add to Localstage
function showLocal() {
  localStorage.setItem("key_data", JSON.stringify(fake_data));
  let jsondata = localStorage.getItem("key_data");
  let data_out = JSON.parse(jsondata);
  console.log(data_out);
}
showLocal();
function remove_cart(loop) {
  cart.splice(loop, 1);
  showDataCart();

}

function showDataCart() {
  console.log(cart)
  let itemCart = document.querySelector(".item-cart");
  let html = " ";
  let price_number = 0;
  let prices=0;
  let loop = 0;
  for (let key of cart) {
    price_number = key.number * parseFloat(key.price);
    html += `<div class="item">
        <div class="item-name">${key.name}</div>
        <div class="item-number">${key.number}</div>
        <div class="item-price">${price_number} đ</div>
        <span class="remove" onclick="remove_cart(${loop})">X</span>
    </div>`
    loop++;
    prices +=price_number;
  } 
  document.getElementById("price-number").innerText = (prices + parseFloat(document.getElementById("shipping-price").innerText)) + " đ";
  itemCart.innerHTML = html;
}



var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close");

for (i = 0; i < span.length; i++) {
  click = span[i];
  click.onclick = function () {
    modal.style.display = "none";
  };
}

// btn.onclick = function () {
//   modal.style.display = "block";
// };
btn.addEventListener("click", function () {
  modal.style.display = "block";
})

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};