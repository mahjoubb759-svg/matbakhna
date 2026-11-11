// بيانات المنتجات
const products = {

    food: [
        {
            id: 1,
            name: "الكسكس المغربي",
            price: 45,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
            description: "كسكس بالخضر واللحم."
        },
        {
            id: 2,
            name: "طاجين اللحم",
            price: 55,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
            description: "طاجين مغربي بالتوابل."
        },
        {
            id: 3,
            name: "الدجاج المحمر",
            price: 60,
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600",
            description: "دجاج محمر بالطريقة المغربية."
        },
        {
            id: 4,
            name: "الرفيسة",
            price: 45,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
            description: "رفيسة بالدجاج والعدس."
        }
    ],

    desserts: [
        {
            id: 5,
            name: "كعب الغزال",
            price: 8,
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
            description: "حلوى اللوز المغربية."
        },
        {
            id: 6,
            name: "الشباكية",
            price: 5,
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600",
            description: "شباكية بالعسل والسمسم."
        },
        {
            id: 7,
            name: "كيك الشوكولاتة",
            price: 30,
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
            description: "كيك منزلي بالشوكولاتة."
        },
        {
            id: 8,
            name: "حلويات عصرية",
            price: 12,
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
            description: "حلويات متنوعة."
        }
    ],

    drinks: [
        {
            id: 9,
            name: "Coca-Cola",
            price: 8,
            image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600",
            description: "مشروب غازي."
        },
        {
            id: 10,
            name: "Fanta",
            price: 8,
            image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600",
            description: "مشروب بنكهة الفواكه."
        },
        {
            id: 11,
            name: "عصير البرتقال",
            price: 15,
            image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600",
            description: "عصير برتقال طازج."
        },
        {
            id: 12,
            name: "عصير الأفوكادو",
            price: 20,
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600",
            description: "أفوكادو بالحليب."
        },
        {
            id: 13,
            name: "أتاي مغربي",
            price: 10,
            image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600",
            description: "شاي بالنعناع."
        },
        {
            id: 14,
            name: "ليمونادة مغربية",
            price: 12,
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=600",
            description: "ليمونادة منعشة."
        }
    ]
};

// عرض المنتجات
function showProducts(category) {

    const container = document.getElementById("products-container");

    if (!container || !products[category]) return;

    container.innerHTML = products[category].map(product => `

        <div class="card">

            <img src="${product.image}" alt="${product.name}"
                 loading="lazy">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    ${product.price} درهم
                </div>

                <button class="add-button"
                    onclick="addToCart(${product.id})">

                    أضف إلى السلة

                </button>

            </div>
        </div>

    `).join("");
}

// السلة
function getCart() {
    return JSON.parse(localStorage.getItem("matbakhna_cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("matbakhna_cart", JSON.stringify(cart));
}

function findProduct(id) {
    return Object.values(products).flat().find(p => p.id === id);
}

function addToCart(id) {

    const product = findProduct(id);

    if (!product) return;

    let cart = getCart();

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);

    alert("تمت إضافة المنتج إلى السلة!");

    updateCartCount();
}

function updateCartCount() {

    const element = document.getElementById("cart-count");

    if (!element) return;

    const count = getCart().reduce(
        (total, item) => total + item.quantity, 0
    );

    element.textContent = count;
}

// عرض السلة
function displayCart() {

    const container = document.getElementById("cart-items");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = "<p>سلة المشتريات فارغة.</p>";
        document.getElementById("total").textContent = "0";
        return;
    }

    let total = 0;

    container.innerHTML = cart.map((item, index) => {

        total += item.price * item.quantity;

        return `
            <div class="cart-item">

                <span>${item.name}</span>

                <span>${item.price} درهم</span>

                <span>الكمية: ${item.quantity}</span>

                <button onclick="removeItem(${index})">❌</button>

            </div>
        `;

    }).join("");

    document.getElementById("total").textContent = total;
}

function removeItem(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    displayCart();
    updateCartCount();
}

function clearCart() {

    localStorage.removeItem("matbakhna_cart");

    displayCart();
    updateCartCount();
}

// التسجيل المحلي
function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("matbakhna_users") || "[]");

    if (users.some(user => user.email === email)) {
        alert("هذا البريد مسجل مسبقاً.");
        return;
    }

    users.push({
        name,
        email,
        password
    });

    localStorage.setItem("matbakhna_users", JSON.stringify(users));

    alert("تم التسجيل محلياً بنجاح!");

    window.location.href = "login.html";
}

// تسجيل الدخول المحلي
function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("matbakhna_users") || "[]");

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
    }

    localStorage.setItem("matbakhna_current_user", JSON.stringify(user));

    alert("مرحباً بك في MATBAKHNA!");

    window.location.href = "index.html";
}

// إرسال الطلب محلياً
function submitOrder(event) {

    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
        alert("السلة فارغة.");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("customer-address").value;

    const orders = JSON.parse(localStorage.getItem("matbakhna_orders") || "[]");

    orders.push({
        id: Date.now(),
        name,
        phone,
        address,
        products: cart,
        date: new Date().toISOString(),
        status: "جديد"
    });

    localStorage.setItem("matbakhna_orders", JSON.stringify(orders));

    clearCart();

    alert("تم حفظ الطلب محلياً بنجاح.");

    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCart();
});
