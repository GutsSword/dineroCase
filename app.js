const productUrl =
  "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

const products = [];
const favourites = [];

class Product {
  constructor(id, name, url, img, price) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.img = img;
    this.price = price;
  }
}
// apiye istek
const getProducts = async () => {
  const response = await fetch(productUrl);
  const jsonData = await response.json();
  console.log("Apiden veri çekildi.");

  return jsonData;
};

// Önce localstorage kontrolu ve sonra API'den ürünleri çekip diziye aktarıyoz

var storageProducts = localStorage.getItem("storageProduct");

// storage boşşa istek at ve veriyi çekip diziye aktar.
document.addEventListener("DOMContentLoaded", () => {
  if (storageProducts === null) {
    getProducts().then((data) => {
      data.forEach((item) => {
        products.push(
          new Product(item.id, item.name, item.url, item.img, item.price)
        );
      });
      // Listedeki veriyi storageye ekle
      localStorage.setItem("storageProduct", JSON.stringify(products));
      // html e giydir
      renderProducts();
    });
  } else {
    // ürün var ise localstorageden producta aktar ve sayfaya bastır
    var jsonProducts = JSON.parse(storageProducts);
    jsonProducts.forEach((item) => {
      products.push(
        new Product(item.id, item.name, item.url, item.img, item.price)
      );
    });
    console.log("Storage' da product listesi zaten var. İstek yenilenmedi.");
    renderProducts();
  }
});
 //favouritesi localden okuyup tekrar favourite dizine atamamız lazım .
 var storageFavs = localStorage.getItem("storageFavs");
 var jsonFavs = JSON.parse(storageFavs);

 if(jsonFavs !== null){
   jsonFavs.forEach((item) => {
     favourites.push(item);
   });
 }

// diziyi dönerek html kodlarını çoğaltıyoruz
const renderProducts = () => {
  const slider = document.getElementById("slider");
  slider.innerHTML = ""; // önceki içerikleri temizle chat gpt önerisi

  console.log(favourites);  

  products.forEach((product) => {
    //favori listem boş değil
    // string ile cast ettik yoksa değerleri karşılaştıramıyormuş.
    let favouriteState = favourites.includes(String(product.id));
    let favouriteClassName = favouriteState ? "favourite active" : "favourite";
    
    const productHTML = `
      <div class="thumbnail">
        <img src="${product.img}" alt="${product.name}" onclick="openProduct('${product.url}')">
         <div class="${favouriteClassName}" onclick="toggleFavourite(this,'${product.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 20.576 19.483">
            <path
              d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z"
              fill="white"
              stroke="black"
              stroke-width="1"
            />
          </svg>
      </div>
      <div class="product-details" onclick="openProduct('${product.url}')">
        <h2>${product.name}</h2>
        <p>${product.price} TL</p>
      </div>
    </div>
    `;
    slider.insertAdjacentHTML("beforeend", productHTML);
  });
};

const openProduct = (url) => {
  window.open(url, "_blank");
  console.log("openProduct fonksiyonu çalıştı.");
};

// Slider için kaydırma operasyonları
let thumbnails = document.getElementsByClassName("thumbnail");
let slider = document.getElementById("slider");
let buttonRight = document.getElementById("slide-right");
let buttonLeft = document.getElementById("slide-left");

buttonLeft.addEventListener("click", () => {
  slider.scrollLeft -= 220;
});

buttonRight.addEventListener("click", () => {
  slider.scrollLeft += 220;
});

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

var favouriteButton = document.getElementById("favourite");

function toggleFavourite(element, productId) {
  if (!favourites.includes(productId)) {
    favourites.push(productId);
    localStorage.setItem("storageFavs", JSON.stringify(favourites));
   // element.classList.toggle("active");
    console.log("Ürün favorilere eklendi. Id = " + productId);
    renderProducts();
    
  } else {
    let index = favourites.findIndex((id) => id === productId);
    favourites.splice(index, 1);
    localStorage.setItem("storageFavs", JSON.stringify(favourites));
   // element.classList.toggle("active");
    console.log("Ürün favorilerden çıkarıldı. Id = " + productId);
    renderProducts();
  }
}

function ClearStorage() {
  localStorage.clear();
}
document.getElementById("clearStorage").addEventListener("click", ClearStorage);
