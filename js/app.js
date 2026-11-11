"use strict";

/* =================================
   MATBAKHNA - التطبيق الرئيسي
================================= */

const STORAGE = {
    cart: "matbakhna_cart",
    users: "matbakhna_users",
    currentUser: "matbakhna_current_user",
    orders: "matbakhna_orders"
};

const products = {
    food: [
        {
            id: 1,
            name: "الكسكس المغربي",
            price: 45,
            image: "https://levanacooks.com/wp-content/uploads/2011/08/F1FB99C5-E3D8-415D-84C1-2C5A8EF48353-180x180.png",
            description: "كسكس بالخضر واللحم."
        },
        {
            id: 2,
            name: "طاجين اللحم",
            price: 55,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx2qjoEGrECKGBfwrLZztOLxf_3Y6aeXAZeBmN0cIBaQ&s=10",
            description: "طاجين مغربي بالتوابل."
        },
        {
            id: 3,
            name: "الدجاج المحمر",
            price: 60,
            image: "https://tse2.mm.bing.net/th/id/OIP.cSMXZHGWCe8Tsf9ft81yXAHaE7?r=0&pid=Api&h=220&P=80",
            description: "دجاج محمر بالطريقة المغربية."
        },
        {
            id: 4,
            name: "الرفيسة",
            price: 45,
            image: "https://tse3.mm.bing.net/th/id/OIP.vjsBsMhwLOfMUSi4Te3UzwHaEO?r=0&pid=Api&h=220&P=0",
            description: "رفيسة بالدجاج والعدس."
        },
        {
            id: 15,
            name: "البسطيلة",
            price: 50,
            image: "https://tse1.mm.bing.net/th/id/OIP.VuFvgsS7OIngajRUdBpqYAHaFj?r=0&pid=Api&h=220&P=0",
            description: "بسطيلة مغربية."
        },
        {
            id: 16,
            name: "وجبة صحية",
            price: 40,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
            description: "وجبة متوازنة."
        }
    ],

    desserts: [
        {
            id: 5,
            name: "كعب الغزال",
            price: 8,
            image: "https://tse2.mm.bing.net/th/id/OIP.CqkSFMWBA_m5s5Py62uflQHaE8?r=0&pid=Api&h=220&P=0",
            description: "حلوى اللوز المغربية."
        },
        {
            id: 6,
            name: "الشباكية",
            price: 5,
            image: "https://tse3.mm.bing.net/th/id/OIP.9ipEQFDD8x2a8d4jVxqeGAHaFj?r=0&pid=Api&h=220&P=0",
            description: "شباكية بالعسل والسمسم."
        },
        {
            id: 7,
            name: "كيك الشوكولاتة",
            price: 30,
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
            description: "كيك منزلي بالشوكولاتة."
        },
        {
            id: 8,
            name: "حلويات عصرية",
            price: 12,
            image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
            description: "حلويات متنوعة."
        }
    ],

    drinks: [
        {
            id: 9,
            name: "Coca-Cola",
            price: 8,
            image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80",
            description: "مشروب غازي."
        },
        {
            id: 10,
            name: "Coca-Cola Zero",
            price: 8,
            image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80",
            description: "مشروب غازي بدون سكر."
        },
        {
            id: 11,
            name: "Fanta",
            price: 8,
            image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=600&auto=format&fit=crop&q=80",
            description: "مشروب بنكهة الفواكه."
        },
        {
            id: 12,
            name: "عصير البرتقال",
            price: 15,
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
            description: "عصير برتقال."
        },
        {
            id: 13,
            name: "عصير الأفوكادو",
            price: 20,
            image: "https://tse3.mm.bing.net/th/id/OIP.K9ZJMGlh40YOhr5p045jawHaJQ?r=0&pid=Api&h=220&P=0",
            description: "أفوكادو بالحليب."
        },
        {
            id: 14,
            name: "أتاي مغربي",
            price: 10,
            image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
            description: "شاي بالنعناع."
        },
        {
            id: 18,
            name: "عصير الموز",
            price: 15,
            image: "https://tse4.mm.bing.net/th/id/OIP.EyoNkG8kODQNhrq1MeAbGQHaFw?r=0&pid=Api&h=220&P=0",
            description: "عصير موز طبيعي."
        }
    ]
};

/* =================================
   أدوات التخزين والتحقق
================================= */

function readStorage(key, fallback = []) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch {
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        alert("تعذر حفظ البيانات في المتصفح.");
        return false;
    }
}

function getCart() {
    const cart = readStorage(STORAGE.cart, []);

    if (!Array.isArray(cart)) return [];

    return cart.filter(item =>
        Number.isInteger(item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        findProduct(item.id)
    );
}

function getUsers() {
    const users = readStorage(STORAGE.users, []);
    return Array.isArray(users) ? users : [];
}

function getOrders() {
    const orders = readStorage(STORAGE.orders, []);
    return Array.isArray(orders) ? orders : [];
}

function findProduct(id) {
    return Object.values(products)
        .flat()
        .find(product => product.id === Number(id));
}

function money(value) {
    return `${Number(value).toFixed(2)} درهم`;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

/* =================================
   القائمة المشتركة
================================= */

function renderLayout() {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");

    if (header) {
        header.innerHTML = `
        <div class="container header-inner">
            <a href="index.html" class="logo">
                MATBAKH<span>NA</span>
            </a>

            <nav>
                <a href="index.html">الرئيسية</a>
                <a href="food.html">المأكولات</a>
                <a href="desserts.html">الحلويات</a>
                <a href="drinks.html">المشروبات</a>
                <a href="cooks.html">الطباخات</a>
                <a href="delivery.html">التوصيل</a>
                <a href="cart.html" class="cart-link">
                    السلة (<span id="cart-count">0</span>)
                </a>
                <a href="login.html">دخول</a>
            </nav>
        </div>`;
    }

    if (footer) {
        footer.innerHTML = `
            <p><strong>MATBAKHNA</strong></p>
            <p>من مطبخ البيت إلى مائدتك.</p>
            <p>منصة تجريبية لربط الطباخات بالزبائن.</p>
            <p>© ${new Date().getFullYear()} MATBAKHNA</p>
        `;
    }
}

/* =================================
   المنتجات
================================= */

function showProducts(category) {
    const container = document.getElementById("products-container");

    if (!container || !products[category]) return;

    container.replaceChildren();

    products[category].forEach(product => {
        const card = document.createElement("article");
        card.className = "card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.src = "https://placehold.co/600x400?text=MATBAKHNA";
        };

        const content = document.createElement("div");
        content.className = "card-content";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = money(product.price);

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "أضف إلى السلة";
        button.addEventListener("click", () => addToCart(product.id));

        content.append(title, description, price, button);
        card.append(image, content);
        container.appendChild(card);
    });
}

/* =================================
   السلة
================================= */

function saveCart(cart) {
    writeStorage(STORAGE.cart, cart);
    updateCartCount();
}

function addToCart(id) {
    const product = findProduct(id);

    if (!product) {
        alert("المنتج غير موجود.");
        return;
    }

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveCart(cart);
    alert("تمت إضافة المنتج إلى السلة.");
}

function updateCartCount() {
    const element = document.getElementById("cart-count");
    if (!element) return;

    const count = getCart().reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    element.textContent = count;
}

function changeQuantity(id, amount) {
    const cart = getCart();
    const item = cart.find(product => product.id === Number(id));

    if (!item) return;

    item.quantity += amount;

    const updated = cart.filter(product => product.quantity > 0);

    saveCart(updated);
    displayCart();
}

function removeItem(id) {
    const cart = getCart().filter(item => item.id !== Number(id));
    saveCart(cart);
    displayCart();
}

function clearCart() {
    saveCart([]);
    displayCart();
}

function displayCart() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!container || !totalElement) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <h3>سلة المشتريات فارغة</h3>
                <p>أضف بعض المنتجات لتظهر هنا.</p>
                <a class="button" href="food.html">تصفح المأكولات</a>
            </div>
        `;

        totalElement.textContent = money(0);
        return;
    }

    container.replaceChildren();

    let total = 0;

    cart.forEach(item => {
        const product = findProduct(item.id);
        if (!product) return;

        total += product.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const title = document.createElement("strong");
        title.textContent = product.name;

        const price = document.createElement("span");
        price.textContent = money(product.price);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.addEventListener("click", () =>
            changeQuantity(item.id, -1)
        );

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.addEventListener("click", () =>
            changeQuantity(item.id, 1)
        );

        const remove = document.createElement("button");
        remove.className = "button button-danger";
        remove.textContent = "حذف";
        remove.addEventListener("click", () => removeItem(item.id));

        controls.append(minus, quantity, plus);
        row.append(title, price, controls, remove);

        container.appendChild(row);
    });

    totalElement.textContent = money(total);
}

/* =================================
   التسجيل وتسجيل الدخول
================================= */

async function hashPassword(password) {
    if (!crypto.subtle) {
        throw new Error("المتصفح لا يدعم التشفير المطلوب.");
    }

    const data = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (name.length < 2 || password.length < 8) {
        alert("الاسم غير صالح أو كلمة المرور أقل من 8 أحرف.");
        return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
        alert("هذا البريد مسجل مسبقاً.");
        return;
    }

    try {
        const passwordHash = await hashPassword(password);

        users.push({
            id: Date.now(),
            name,
            email,
            passwordHash,
            role
        });

        if (!writeStorage(STORAGE.users, users)) return;

        alert("تم إنشاء الحساب التجريبي.");
        location.href = "login.html";

    } catch (error) {
        alert(error.message);
    }
}

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    try {
        const passwordHash = await hashPassword(password);

        const user = getUsers().find(item =>
            item.email === email &&
            item.passwordHash === passwordHash
        );

        if (!user) {
            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
            return;
        }

        const session = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        writeStorage(STORAGE.currentUser, session);

        alert(`مرحباً ${user.name}`);

        location.href = "index.html";

    } catch (error) {
        alert(error.message);
    }
}

function logoutUser() {
    localStorage.removeItem(STORAGE.currentUser);
    location.href = "index.html";
}

/* =================================
   إرسال الطلب
================================= */

function submitOrder(event) {
    event.preventDefault();

    const cart = getCart();

    if (!cart.length) {
        alert("السلة فارغة.");
        return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (name.length < 2 || address.length < 5) {
        alert("يرجى إدخال الاسم والعنوان بشكل صحيح.");
        return;
    }

    if (!/^[0-9+\s()-]{8,20}$/.test(phone)) {
        alert("رقم الهاتف غير صالح.");
        return;
    }

    const total = cart.reduce((sum, item) => {
        const product = findProduct(item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const orders = getOrders();

    const order = {
        id: Date.now(),
        name,
        phone,
        address,
        products: cart,
        total,
        date: new Date().toISOString(),
        status: "جديد"
    };

    orders.push(order);

    if (!writeStorage(STORAGE.orders, orders)) return;

    clearCart();

    alert("تم تسجيل الطلب محلياً بنجاح.");

    location.href = "index.html";
}

/* =================================
   تشغيل الصفحة
================================= */

document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
    updateCartCount();
    displayCart();

    const page = document.body.dataset.page;

    if (page === "food") showProducts("food");
    if (page === "desserts") showProducts("desserts");
    if (page === "drinks") showProducts("drinks");

    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const orderForm = document.getElementById("order-form");

    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    if (orderForm) {
        orderForm.addEventListener("submit", submitOrder);
    }
});
