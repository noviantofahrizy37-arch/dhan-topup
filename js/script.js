/* ===================================================
   Dhan store — Auth System & Application Logic
   Uses localStorage for client-side persistence
   =================================================== */

// =========================================
// CONSTANTS
// =========================================
const STORAGE_KEYS = {
  USERS: 'dhan_users',
  SESSION: 'dhan_session',
  TRANSACTIONS: 'dhan_transactions',
};

const DEFAULT_AVATAR = 'data:image/svg+xml,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#1F1B19"/>
    <circle cx="50" cy="38" r="20" fill="#464646"/>
    <ellipse cx="50" cy="80" rx="30" ry="20" fill="#464646"/>
  </svg>
`);

// =========================================
// STORAGE HELPERS
// =========================================
const Storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch { return false; }
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};

// =========================================
// AUTH MODULE
// =========================================
const Auth = {
  /** Return all registered users */
  getUsers() {
    return Storage.get(STORAGE_KEYS.USERS, []);
  },

  /** Return current logged-in session or null */
  getSession() {
    return Storage.get(STORAGE_KEYS.SESSION, null);
  },

  /** Check if user is logged in */
  isLoggedIn() {
    return !!this.getSession();
  },

  /**
   * Register a new user
   * @returns {object} { ok: bool, message: string }
   */
  register({ username, email, password }) {
    const users = this.getUsers();

    if (!username || !email || !password) {
      return { ok: false, message: 'Semua kolom wajib diisi.' };
    }

    if (username.length < 3) {
      return { ok: false, message: 'Username minimal 3 karakter.' };
    }

    if (password.length < 6) {
      return { ok: false, message: 'Password minimal 6 karakter.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, message: 'Format email tidak valid.' };
    }

    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { ok: false, message: 'Username sudah digunakan.' };
    }

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'Email sudah terdaftar.' };
    }

    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: this._hash(password),
      avatar: DEFAULT_AVATAR,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    Storage.set(STORAGE_KEYS.USERS, users);
    return { ok: true, message: 'Akun berhasil dibuat!', user: newUser };
  },

  /**
   * Login with username/email and password
   * @returns {object} { ok: bool, message: string }
   */
  login({ identifier, password }) {
    const users = this.getUsers();

    const user = users.find(u =>
      u.username.toLowerCase() === identifier.toLowerCase() ||
      u.email.toLowerCase() === identifier.toLowerCase()
    );

    if (!user) {
      return { ok: false, message: 'Username atau email tidak ditemukan.' };
    }

    if (user.password !== this._hash(password)) {
      return { ok: false, message: 'Password salah.' };
    }

    const session = {
      userId: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      loginAt: new Date().toISOString(),
    };

    Storage.set(STORAGE_KEYS.SESSION, session);
    return { ok: true, message: 'Login berhasil!', session };
  },

  /** Logout current user */
  logout() {
    Storage.remove(STORAGE_KEYS.SESSION);
    window.location.href = 'index.html';
  },

  /** Update user avatar in users array and session */
  updateAvatar(base64) {
    const session = this.getSession();
    if (!session) return false;

    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === session.userId);
    if (idx === -1) return false;

    users[idx].avatar = base64;
    Storage.set(STORAGE_KEYS.USERS, users);

    session.avatar = base64;
    Storage.set(STORAGE_KEYS.SESSION, session);
    return true;
  },

  /** Get fresh user object from storage */
  getUser(userId) {
    return this.getUsers().find(u => u.id === userId) || null;
  },

  /** Simple non-secure hash (client-side demo only) */
  _hash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString(16);
  }
};

// =========================================
// TRANSACTION MODULE
// =========================================
const Transactions = {
  getAll() {
    return Storage.get(STORAGE_KEYS.TRANSACTIONS, []);
  },

  getByUser(userId) {
    return this.getAll().filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  add({ userId, game, gameId, product, amount, unit, price, paymentMethod }) {
    const all = this.getAll();
    const trx = {
      id: 'TRX' + Date.now(),
      userId,
      game,
      gameId,
      product,
      amount,
      unit,
      price,
      paymentMethod,
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    all.push(trx);
    Storage.set(STORAGE_KEYS.TRANSACTIONS, all);
    return trx;
  },

  formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  }
};

// =========================================
// NAVBAR RENDERER
// =========================================
function renderNavbar(activePage) {
  const session = Auth.getSession();
  const isLoggedIn = !!session;

  const gameLinks = [
    { href: 'mlbb.html',        img: 'assets/images/mlbbicon.jpeg',        label: 'MLBB' },
    { href: 'freefire.html',    img: 'assets/images/freefireicon.jpeg',    label: 'Free Fire' },
    { href: 'pubg.html',        img: 'assets/images/pubgicon.jpeg',        label: 'PUBG' },
    { href: 'valorant.html',    img: 'assets/images/valoranticon.jpeg',    label: 'Valorant' },
    { href: 'fcmobile.html',    img: 'assets/images/fcmobileicon.jpeg',    label: 'FC Mobile' },
    { href: 'bloodstrike.html', img: 'assets/images/bloodstrikeicon.jpeg', label: 'Blood Strike' },
  ];

  const navLinks = gameLinks.map(g => `
    <a href="${g.href}" class="nav-item ${activePage === g.href ? 'active' : ''}">
      <img src="${g.img}" alt="${g.label}">
      <span>${g.label}</span>
    </a>
  `).join('');

  const authSection = isLoggedIn
    ? `<a href="profile.html" class="navbar-user">
         <img src="${session.avatar || DEFAULT_AVATAR}" alt="avatar" class="navbar-avatar" id="nav-avatar">
         <span class="navbar-username">${session.username}</span>
       </a>`
    : `<a href="login.html" class="btn btn-secondary" style="height:36px; font-size:13px;">Masuk</a>
       <a href="register.html" class="btn btn-primary" style="height:36px; font-size:13px;">Daftar</a>`;

  const html = `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="navbar-logo">
          <img src="assets/images/logos.jpeg" alt="Logo Dhan store">
          <span class="navbar-logo-text">Dhan store</span>
        </a>
        <div class="navbar-nav" id="navbar-nav">
          ${navLinks}
        </div>
        <div class="navbar-actions">
          ${authSection}
          <div class="hamburger" id="hamburger" onclick="toggleNav()" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
  `;
  return html;
}

function toggleNav() {
  const nav = document.getElementById('navbar-nav');
  if (nav) nav.classList.toggle('open');
}

// =========================================
// MARQUEE BUILDER
// =========================================
function buildMarquee() {
  const games = [
    { img: 'assets/images/mlbbicon.jpeg',            label: 'Mobile Legends: Bang Bang' },
    { img: 'assets/images/freefireicon.jpeg',        label: 'Free Fire' },
    { img: 'assets/images/pubgicon.jpeg',            label: 'PUBG Mobile' },
    { img: 'assets/images/valoranticon.jpeg',        label: 'Valorant' },
    { img: 'assets/images/fcmobileicon.jpeg',        label: 'FC Mobile' },
    { img: 'assets/images/bloodstrikeicon.jpeg',     label: 'Blood Strike' },
    { img: 'assets/images/aovicon.jpeg',            label: 'Arena of Valor' },
    { img: 'assets/images/apexlegendicon.jpeg',     label: 'Apex Legends' },
    { img: 'assets/images/astralguardiansicon.jpeg',label: 'Astral Guardians' },
    { img: 'assets/images/callofdutyicon.jpeg',     label: 'Call of Duty Mobile' },
    { img: 'assets/images/deltaforceicon.jpeg',     label: 'Delta Force' },
    { img: 'assets/images/genshinimpacticon.jpeg',  label: 'Genshin Impact' },
    { img: 'assets/images/honkaiicon.jpeg',         label: 'Honkai: Star Rail' },
    { img: 'assets/images/lolicon.jpeg',            label: 'League of Legends' },
    { img: 'assets/images/marvelrivalsicon.jpeg',   label: 'Marvel Rivals' },
    { img: 'assets/images/mcggicon.jpeg',           label: 'Magic Chess' },
    { img: 'assets/images/pointblankicon.jpeg',     label: 'Point Blank' },
    { img: 'assets/images/robloxicon.jpeg',         label: 'Roblox' },
  ];

  const itemHtml = games.map(g => `
    <div class="marquee-item">
      <img src="${g.img}" alt="${g.label}" class="marquee-item-icon">
      <span class="marquee-item-text">${g.label}</span>
    </div>
    <div class="marquee-separator">◆</div>
  `).join('');

  // Duplicate for seamless loop
  return itemHtml + itemHtml;
}

// =========================================
// TOAST NOTIFICATIONS
// =========================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// =========================================
// GAME PAGE HELPERS
// =========================================
function requireAuth() {
  if (!Auth.isLoggedIn()) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
    return false;
  }
  return true;
}

function buildGamePage(config) {
  // Inject navbar
  document.getElementById('navbar-placeholder').innerHTML = renderNavbar(config.pageId);

  // Build products
  const productsHtml = config.products.map((p, i) => `
    <div class="product-card" data-index="${i}" onclick="selectProduct(${i})">
      <span class="product-amount">${p.amount.toLocaleString('id-ID')}</span>
      <span class="product-unit">${config.unit}</span>
      <span class="product-price">${Transactions.formatCurrency(p.price)}</span>
      ${p.bonus ? `<span class="product-bonus">+${p.bonus} Bonus</span>` : ''}
    </div>
  `).join('');

  document.getElementById('product-grid').innerHTML = productsHtml;

  // Build payment methods
  const payments = [
    { id: 'dana',     label: 'Dana',       img: 'assets/images/pymentdana.png' },
    { id: 'gopay',    label: 'GoPay',      img: 'assets/images/pymentgopay.png' },
    { id: 'ovo',      label: 'OVO',        img: 'assets/images/pymentovo.png' },
    { id: 'qris',     label: 'QRIS',       img: 'assets/images/pymentqris.png' },
    { id: 'shopeepay',label: 'ShopeePay',  img: 'assets/images/pymentshopee.png' },
  ];

  const paymentsHtml = payments.map(p => `
    <div class="payment-card" data-payment="${p.id}" onclick="selectPayment('${p.id}', '${p.label}')">
      <img src="${p.img}" alt="${p.label}" class="payment-icon">
      <span class="payment-name">${p.label}</span>
    </div>
  `).join('');

  document.getElementById('payment-grid').innerHTML = paymentsHtml;

  // Store config globally
  window._gameConfig = config;
  window._selectedProduct = null;
  window._selectedPayment = null;

  updateOrderSummary();
}

function selectProduct(index) {
  document.querySelectorAll('.product-card').forEach(el => el.classList.remove('selected'));
  document.querySelector(`.product-card[data-index="${index}"]`).classList.add('selected');
  window._selectedProduct = window._gameConfig.products[index];
  updateOrderSummary();
}

function selectPayment(id, label) {
  document.querySelectorAll('.payment-card').forEach(el => el.classList.remove('selected'));
  document.querySelector(`.payment-card[data-payment="${id}"]`).classList.add('selected');
  window._selectedPayment = { id, label };
  updateOrderSummary();
}

function updateOrderSummary() {
  const p = window._selectedProduct;
  const pay = window._selectedPayment;
  const gameId = document.getElementById('game-user-id')?.value?.trim() || '-';

  document.getElementById('order-game').textContent    = window._gameConfig?.gameName || '-';
  document.getElementById('order-userid').textContent  = gameId || '-';
  document.getElementById('order-product').textContent = p ? `${p.amount.toLocaleString('id-ID')} ${window._gameConfig.unit}` : '-';
  document.getElementById('order-payment').textContent = pay ? pay.label : '-';
  document.getElementById('order-price').textContent   = p ? Transactions.formatCurrency(p.price) : '-';

  const canBuy = p && pay && gameId && gameId !== '-';
  document.getElementById('btn-buy').disabled = !canBuy;
}

function handleBuy() {
  if (!requireAuth()) return;

  const gameId = document.getElementById('game-user-id')?.value?.trim();
  const p = window._selectedProduct;
  const pay = window._selectedPayment;

  if (!p || !pay || !gameId) {
    showToast('Lengkapi semua pilihan terlebih dahulu.', 'error');
    return;
  }

  const session = Auth.getSession();

  Transactions.add({
    userId:        session.userId,
    game:          window._gameConfig.gameName,
    gameId:        gameId,
    product:       `${p.amount.toLocaleString('id-ID')} ${window._gameConfig.unit}`,
    amount:        p.amount,
    unit:          window._gameConfig.unit,
    price:         p.price,
    paymentMethod: pay.label,
  });

  showToast(`Top-up ${window._gameConfig.gameName} berhasil! 🎉`, 'success');

  // Reset
  document.querySelectorAll('.product-card').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.payment-card').forEach(el => el.classList.remove('selected'));
  document.getElementById('game-user-id').value = '';
  window._selectedProduct = null;
  window._selectedPayment = null;
  updateOrderSummary();
}

// =========================================
// REDIRECT HELPERS
// =========================================
function redirectIfLoggedIn() {
  if (Auth.isLoggedIn()) {
    const params = new URLSearchParams(window.location.search);
    window.location.href = params.get('redirect') || 'index.html';
  }
}

function redirectIfNotLoggedIn() {
  if (!Auth.isLoggedIn()) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
  }
}

// =========================================
// SLIDER (Homepage)
// =========================================
function initSlider() {
  const track = document.getElementById('slider-track');
  const dots  = document.querySelectorAll('.dot');
  if (!track) return;

  let current = 0;
  const total = track.children.length;

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Auto slide
  let timer = setInterval(() => goTo(current + 1), 4500);

  window.sliderNext = () => { clearInterval(timer); goTo(current + 1); timer = setInterval(() => goTo(current + 1), 4500); };
  window.sliderPrev = () => { clearInterval(timer); goTo(current - 1); timer = setInterval(() => goTo(current + 1), 4500); };
  window.sliderGoTo = (n) => { clearInterval(timer); goTo(n); timer = setInterval(() => goTo(current + 1), 4500); };

  goTo(0);
}

// =========================================
// DOM READY
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  // Inject marquee if placeholder exists
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    marqueeTrack.innerHTML = buildMarquee();
  }

  // Attach game-user-id change listener
  const gameUserId = document.getElementById('game-user-id');
  if (gameUserId) {
    gameUserId.addEventListener('input', updateOrderSummary);
  }
});
