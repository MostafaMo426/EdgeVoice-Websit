// State Management
let cart = [];
const products = {
  starter: { id: "starter", name: "Edge Voice Starter Kit", price: 149 },
  pro: { id: "pro", name: "Edge Voice Pro Kit", price: 299 },
  enterprise: {
    id: "enterprise",
    name: "Edge Voice Enterprise System",
    price: 799,
  },
};

// Toggle Cart Sidebar
function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  const isOpen = !sidebar.classList.contains("translate-x-full");

  if (isOpen) {
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  } else {
    sidebar.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
  }
}

// Add Item to Cart
function addToCart(productId) {
  const product = products[productId];
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  showToast(`${product.name} added to cart`);

  // Open cart automatically on first add
  if (cart.length === 1 && cart[0].quantity === 1) {
    toggleCart();
  }
}

// Remove Item from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
}

// Update Cart Interface
function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Update Badge
  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.classList.remove("hidden");
    cartCount.classList.add("cart-badge");
  } else {
    cartCount.classList.add("hidden");
  }

  // Update Items List
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="text-gray-400 text-center py-8">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="glass p-4 rounded-xl flex justify-between items-center border border-gray-800">
                <div>
                    <h4 class="font-medium text-white text-sm">${item.name}</h4>
                    <p class="text-blue-400 text-xs mt-1">$${item.price}.00</p>
                </div>
                <div class="flex items-center space-x-3">
                    <button onclick="updateQuantity('${item.id}', -1)" class="text-gray-400 hover:text-white px-2 py-1 bg-slate-800 rounded">-</button>
                    <span class="text-white text-sm">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)" class="text-gray-400 hover:text-white px-2 py-1 bg-slate-800 rounded">+</button>
                </div>
            </div>
        `,
      )
      .join("");
  }

  cartTotal.textContent = `$${totalPrice}.00`;
}

// Checkout Button Function
function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  document.getElementById("checkoutModal").style.display = "flex";
}
// Toggle Pricing Plan (Billing Toggle)
function toggleBilling() {
  const isYearly = document.getElementById("billingToggle").checked;
  const starterPrice = document.getElementById("starterPrice");
  const proPrice = document.getElementById("proPrice");
  const enterprisePrice = document.getElementById("enterprisePrice");

  const starterPeriod = document.getElementById("starterPeriod");
  const proPeriod = document.getElementById("proPeriod");
  const enterprisePeriod = document.getElementById("enterprisePeriod");

  if (isYearly) {
    starterPrice.textContent = "119";
    proPrice.textContent = "239";
    enterprisePrice.textContent = "639";

    starterPeriod.textContent = "/mo (billed yearly)";
    proPeriod.textContent = "/mo (billed yearly)";
    enterprisePeriod.textContent = "/mo (billed yearly)";

    document.getElementById("yearlyLabel").classList.add("text-blue-400");
    document.getElementById("monthlyLabel").classList.remove("text-white");
  } else {
    starterPrice.textContent = "149";
    proPrice.textContent = "299";
    enterprisePrice.textContent = "799";

    starterPeriod.textContent = "/one-time";
    proPeriod.textContent = "/one-time";
    enterprisePeriod.textContent = "/one-time";

    document.getElementById("yearlyLabel").classList.remove("text-blue-400");
    document.getElementById("monthlyLabel").classList.add("text-white");
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

// Toggle FAQ Display
function toggleFaq(element) {
  const paragraph = element.querySelector("p");
  const icon = element.querySelector("i");

  paragraph.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
}

// Toggle Live Chat Widget
function toggleChat() {
  const chat = document.getElementById("chatWidget");
  if (chat.classList.contains("hidden")) {
    chat.classList.remove("hidden");
    setTimeout(() => {
      chat.classList.remove("opacity-0", "translate-y-4");
    }, 50);
  } else {
    chat.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => {
      chat.classList.add("hidden");
    }, 300);
  }
}

// Send Chat Widget Message
function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const messagesContainer = document.getElementById("chatMessages");
  const text = input.value.trim();

  if (!text) return;

  // Append User Message
  messagesContainer.innerHTML += `
        <div class="chat-bubble text-white bg-blue-600/30 ml-auto" style="border-radius: 20px 20px 0 20px;">
            ${text}
        </div>
    `;

  input.value = "";
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Simulate Automatic Assistant Response
  setTimeout(() => {
    messagesContainer.innerHTML += `
            <div class="chat-bubble text-white">
                Thanks for messaging! One of our smart home specialists will respond shortly.
            </div>
        `;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000);
}

// Smooth Scroll Function
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Toast Notifications System
function showToast(message) {
  let toast = document.getElementById("toast");
  let toastMessage = document.getElementById("toastMessage");

  if (!toast) {
    // Create toast element dynamically
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className =
      "fixed bottom-5 right-5 glass px-6 py-3 rounded-xl border border-blue-500/30 text-white z-50 transition-opacity duration-300 opacity-0 flex items-center space-x-3 shadow-lg shadow-blue-500/10";
    toast.style.pointerEvents = "none";

    const icon = document.createElement("i");
    icon.className = "fas fa-info-circle text-blue-400";
    toast.appendChild(icon);

    toastMessage = document.createElement("span");
    toastMessage.id = "toastMessage";
    toastMessage.className = "text-sm font-medium";
    toast.appendChild(toastMessage);

    document.body.appendChild(toast);
  }

  toastMessage.textContent = message;
  toast.classList.remove("opacity-0");

  // Clear existing timeout if any
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }

  window.toastTimeout = setTimeout(() => {
    toast.classList.add("opacity-0");
  }, 3000);
}

// Window Scroll Progress and Navbar Transparency Event
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  const scrollBar = document.getElementById("scrollBar");
  if (scrollBar) {
    scrollBar.style.width = scrolled + "%";
  }

  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (winScroll > 50) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  }
});

// Voice Interaction Simulation
function simulateCommand(type) {
  const result = document.getElementById("simulationResult");
  const text = document.getElementById("simulationText");
  const messages = {
    lights: "Command Received: Dimming all living room lights to 0%...",
    temperature: "Command Received: Thermostat configured to 72°F.",
    movie:
      "Command Received: Launching Movie Scenario (Blinds closing, Lights 20%).",
  };

  if (text) text.textContent = messages[type];
  if (result) result.classList.remove("hidden");
  showToast("Voice Command Processed");
}

// Feature Detail Modal or Notification Trigger
function showFeatureDetail(type) {
  const details = {
    voice: "Edge Voice NLP core processes strings locally at < 50ms latency.",
    rooms:
      "Rooms allocation can be customized directly in the main controller dashboard.",
    ai: "Habitual learning engine logs behaviors to optimize actions sequentially.",
    security: "Hardware-level security prevents external packet inspection.",
  };
  showToast(details[type]);
}

// ==========================================
// Page Elements & Modal Controls
// ==========================================

const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.querySelector(".close-modal");

// Open Checkout Modal
if (checkoutBtn && checkoutModal) {
  checkoutBtn.addEventListener("click", () => {
    checkoutModal.style.display = "flex";
  });
}

// Close Checkout Modal
if (closeModal && checkoutModal) {
  closeModal.addEventListener("click", () => {
    checkoutModal.style.display = "none";
  });
}

// Close Modal on clicking outside the modal box
window.addEventListener("click", (e) => {
  if (checkoutModal && e.target === checkoutModal) {
    checkoutModal.style.display = "none";
  }
});

// API Configuration
const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:")
  ? "http://asmaaelamir-001-site1.site4future.com"
  : "";

// Submit Checkout to API
async function submitCheckoutToAPI(formData) {
  try {
    // Extract form values
    const firstNameEl = formData.querySelector(
      'input[placeholder="first Name"]',
    );
    const lastNameEl = formData.querySelector('input[placeholder="last Name"]');
    const phoneNumberEl = formData.querySelector(
      'input[placeholder="Phone Number"]',
    );
    const emailEl = formData.querySelector('input[placeholder="Email"]');
    const addressEl = formData.querySelector('textarea[placeholder="Address"]');

    const firstName = firstNameEl ? firstNameEl.value : "";
    const lastName = lastNameEl ? lastNameEl.value : "";
    const phoneNumber = phoneNumberEl ? phoneNumberEl.value : "";
    const email = emailEl ? emailEl.value : "";
    const address = addressEl ? addressEl.value : "";

    // Prepare cart items
    const cartItems = cart.map((item) => ({
      itemName: item.name,
      pricePerUnit: item.price,
      quantity: item.quantity,
    }));

    // Prepare checkout payload
    const checkoutPayload = {
      shippingDetails: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
      },
      cartItems: cartItems,
    };

    // Send to API
    const response = await fetch(`${API_BASE_URL}/api/WebSupport/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutPayload),
    });

    let resultMsg = "Order submitted successfully!";
    if (response.ok) {
      try {
        const data = await response.json();
        if (data && data.message) {
          resultMsg = data.message;
        }
      } catch (e) {}
      return { success: true, message: resultMsg };
    } else {
      let errorMsg = "Failed to submit order. Please try again.";
      try {
        const data = await response.json();
        if (data && data.message) {
          errorMsg = data.message;
        }
      } catch (e) {}
      return { success: false, message: errorMsg };
    }
  } catch (error) {
    console.error("Checkout API error:", error);
    return {
      success: false,
      message: "Error submitting order. Please try again.",
    };
  }
}

// Handle Checkout Form Submission
const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const result = await submitCheckoutToAPI(this);
    showToast(result.message);

    if (result.success) {
      this.reset();
      // Show checkout success screen and hide the form wrapper
      const formWrapper = document.getElementById("checkoutFormWrapper");
      const successState = document.getElementById("checkoutSuccessState");
      if (formWrapper) formWrapper.classList.add("hidden");
      if (successState) successState.classList.remove("hidden");

      // Clear cart
      cart = [];
      updateCartUI();
    }
  });
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.style.display = "none";

    // Reset the checkout modal layout after closing transition finishes
    setTimeout(() => {
      const formWrapper = document.getElementById("checkoutFormWrapper");
      const successState = document.getElementById("checkoutSuccessState");
      if (formWrapper) formWrapper.classList.remove("hidden");
      if (successState) successState.classList.add("hidden");

      const form = document.getElementById("checkoutForm");
      if (form) form.reset();
    }, 300);
  }
}

// Submit Contact/Support Form to API
async function submitContactToAPI(firstName, lastName, email, message) {
  try {
    const contactPayload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    };

    const response = await fetch(`${API_BASE_URL}/api/WebSupport/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    let resultMsg = "Thank you! Your message has been sent successfully.";
    if (response.ok) {
      try {
        const data = await response.json();
        if (data && data.message) {
          resultMsg = data.message;
        }
      } catch (e) {}
      return { success: true, message: resultMsg };
    } else {
      let errorMsg = "Failed to send message. Please try again.";
      try {
        const data = await response.json();
        if (data && data.message) {
          errorMsg = data.message;
        }
      } catch (e) {}
      return { success: false, message: errorMsg };
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return {
      success: false,
      message: "Error sending message. Please try again.",
    };
  }
}
