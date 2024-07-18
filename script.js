const items = [
  {
    id: 1,
    name: "Ruiru Thrift",
    price: 1000,
    bought: false,
    onOffer: false,
    image: "Ruiruthrift.png",
  },
  {
    id: 2,
    name: "Nairobi Thrift",
    price: 1200,
    bought: false,
    onOffer: false,
    image: "nairobithrift.png",
  },
  {
    id: 3,
    name: "Thrift Thrift",
    price: 1300,
    bought: false,
    onOffer: false,
    image: "thriftworld.png",
  },
  {
    id: 4,
    name: "Thrift World",
    price: 500,
    bought: false,
    onOffer: false,
    image: "thriftthrift.png",
  },
  {
    id: 5,
    name: "Kags Thrift",
    price: 999,
    bought: false,
    onOffer: true,
    image: "kagsthrift.png",
  },
  {
    id: 6,
    name: "Fine Lable",
    price: 999,
    bought: false,
    onOffer: true,
    image: "finelable.png",
  },
  {
    id: 7,
    name: "Thrift World",
    price: 999,
    bought: false,
    onOffer: true,
    image: "thriftthrift.png",
  },
  {
    id: 8,
    name: "Budget Wear",
    price: 999,
    bought: false,
    onOffer: true,
    image: "budgetwear.png",
  },
];

const cart = [];

function renderItems() {
  const itemsContainer = document.getElementById("highlight-cards");
  const offerContainer = document.getElementById("offer-cards");

  itemsContainer.innerHTML = "";
  offerContainer.innerHTML = "";

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "card";

    // Check if the item is in the cart
    const isInCart = cart.some((cartItem) => cartItem.id === item.id);

    itemDiv.innerHTML = `
      <img src=${item.image} alt="Ruiru Thrift" />
      <p>${item.name}</p>
      <p>KES ${item.price}</p>
      <button class="buy-button" onclick="addToCart(${item.id})" ${
      isInCart ? "disabled" : ""
    }>${isInCart ? "IN CART" : "ADD TO CART"}</button>
    `;

    if (item.onOffer) {
      offerContainer.appendChild(itemDiv);
    } else {
      itemsContainer.appendChild(itemDiv);
    }
  });
}

function addToCart(itemId) {
  const item = items.find((i) => i.id === itemId);
  if (item && !cart.some((cartItem) => cartItem.id === itemId)) {
    cart.push(item);
    renderItems(); // Re-render items to update the button state
    renderCart();
  }
}

function removeFromCart(itemId) {
  const itemIndex = cart.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    renderItems(); // Re-render items to update the button state
    renderCart();
  }
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

function renderCart() {
  const cartContainer = document.getElementById("cart");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartContainer.innerHTML = "";
  cartCount.innerHTML = cart.length;
  cartTotal.innerHTML = `Total: KES ${calculateTotal()}`;

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <p>${item.name}</p>
      <p>KES ${item.price}</p>
      <button class="remove-button" onclick="removeFromCart(${item.id})">REMOVE</button>
    `;
    cartContainer.appendChild(itemDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderItems();
  renderCart();
});
