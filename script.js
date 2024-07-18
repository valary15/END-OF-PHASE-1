const originalItems = [
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

// Get the JSON string from localStorage
const itemsFromLocalStorage = localStorage.getItem("items");

// Check if itemsFromLocalStorage is null or undefined
const itemsExistInLocalStorage = itemsFromLocalStorage
  ? JSON.parse(itemsFromLocalStorage)
  : [];

let items;

if (itemsExistInLocalStorage.length) {
  items = itemsExistInLocalStorage;
} else {
  // set items in local storage
  localStorage.setItem("items", JSON.stringify(originalItems));
  items = JSON.parse(localStorage.getItem("items") || []);
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderItems() {
  const itemsContainer = document.getElementById("highlight-cards");
  const offerContainer = document.getElementById("offer-cards");

  if (itemsContainer && offerContainer) {
    itemsContainer.innerHTML = "";
    offerContainer.innerHTML = "";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "card";

      const isInCart = cart.some((cartItem) => cartItem.id === item.id);

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <p class=${item.bought ? "bought" : ""}>${item.name}</p>
        <p class=${item.bought ? "bought" : ""}>KES ${item.price}</p>
        <button class="buy-button" onclick="addToCart(${item.id})" ${
        isInCart || item.bought ? "disabled" : ""
      }>
          ${isInCart ? "IN CART" : item.bought ? "BOUGHT" : "ADD TO CART"}
        </button>
      `;

      if (item.onOffer) {
        offerContainer.appendChild(itemDiv);
      } else {
        itemsContainer.appendChild(itemDiv);
      }
    });
  }
}

function addToCart(itemId) {
  const item = items.find((i) => i.id === itemId);
  if (item && !cart.some((cartItem) => cartItem.id === itemId)) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderItems();
    renderCart();
  }
}

function removeFromCart(itemId) {
  const itemIndex = cart.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderItems();
    renderCart();
  }
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

function renderCart() {
  const cartCount = document.getElementById("cart-count");
  cartCount.innerHTML = cart.length;

  const cartContainer = document.getElementById("cart");
  const cartTotal = document.getElementById("cart-total");

  if (cartContainer && cartTotal) {
    cartContainer.innerHTML = "";
    cartTotal.innerHTML = `Total: KES ${calculateTotal()}`;

    cart.forEach((item) => {
      const itemDiv = document.createElement("tr");
      itemDiv.innerHTML = `
          <td>${item.name}</td>
          <td>KES ${item.price}</td>
          <td>
            <button class="remove-button" onclick="removeFromCart(${item.id})">REMOVE</button>
          </td>
      `;
      cartContainer.appendChild(itemDiv);
    });
  }
}

function checkout() {
  cart.forEach((item) => {
    const itemToUpdate = items.find((i) => i.id === item.id);
    if (itemToUpdate) {
      itemToUpdate.bought = true;
    }
  });

  // Update items in local storage
  localStorage.setItem("items", JSON.stringify(items));

  // Clear the cart after checkout
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  renderItems();
  renderCart();
  alert("Checkout successful!");
}
document.addEventListener("DOMContentLoaded", () => {
  renderItems();
  renderCart();
});

