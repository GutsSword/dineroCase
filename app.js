const productUrl =
  "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

const products = [];

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

  return jsonData;
};

// API'den ürünleri çekip diziye aktarıyoz
getProducts().then((data) => {
  data.forEach((item) => {
    products.push(
      new Product(item.id, item.name, item.url, item.img, item.price)
    );
  });

  renderProducts(); // DOM'a yerleştir
});

// diziyi dönerek html kodlarını çoğaltıyoruz
const renderProducts = () => {
  const slider = document.getElementById("slider");
  slider.innerHTML = ""; // önceki içerikleri temizle AI babanın önerisi

  products.forEach((product) => {
    const productHTML = `
      <div class="thumbnail" onclick="openProduct('${product.url}')" >
        <img src="${product.img}" alt="${product.name}">
        <div class="product-details">
          <h2>${product.name}</h2>
          <p>${product.price} TL</p>
        </div>
      </div>
    `;
    slider.insertAdjacentHTML("beforeend", productHTML);
  });
};

const openProduct = (url) => {
  window.open(url, '_blank');
  console.log("openProduct fonskiyonu çalıştı.");
}


// Slider için kaydırma operasyonları
let thumbnails = document.getElementsByClassName("thumbnail");
let slider = document.getElementById("slider");
let buttonRight = document.getElementById("slide-right");
let buttonLeft = document.getElementById("slide-left");
let sliderWidth = slider.getBoundingClientRect(); 

buttonLeft.addEventListener("click", () => {
  slider.scrollLeft -= 210;
});

buttonRight.addEventListener("click", () => {
  slider.scrollLeft += 210;
});

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
