import QRCode from 'qrcode';

/**
 * Scan and Go — browser reconstruction of the retail-checkout case study.
 * Vanilla state machine + string-template rendering (no framework needed
 * for six linear screens). Nothing here calls a real network service:
 * OTP, payment and verification are all simulated client-side.
 */

type Screen = 'scan' | 'cart' | 'auth' | 'pay' | 'verify' | 'done';

interface Product {
  id: string;
  name: string;
  price: number;
  barcode: string;
  emoji: string;
}

interface Coupon {
  code: string;
  label: string;
  rule: string;
  minSpend: number;
  discount: (subtotal: number) => number;
}

const PRODUCTS: Product[] = [
  { id: 'butter', name: 'Amul Butter 500g', price: 265, barcode: '8901057812345', emoji: '🧈' },
  { id: 'bread', name: 'Britannia Bread 400g', price: 45, barcode: '8901063412345', emoji: '🍞' },
  { id: 'noodles', name: 'Maggi Noodles 4-pack', price: 96, barcode: '8901058812345', emoji: '🍜' },
  { id: 'toothpaste', name: 'Colgate Strong Teeth 200g', price: 110, barcode: '8901314112345', emoji: '🦷' },
  { id: 'juice', name: 'Tropicana Orange 1L', price: 120, barcode: '8901719112345', emoji: '🧃' },
  { id: 'detergent', name: 'Surf Excel 1kg', price: 210, barcode: '8901030712345', emoji: '🧺' },
];

const COUPONS: Coupon[] = [
  {
    code: 'WELCOME50',
    label: '50% off, up to ₹200',
    rule: 'percentage off · capped',
    minSpend: 0,
    discount: (subtotal) => Math.min(Math.round(subtotal * 0.5 * 10) / 10, 200),
  },
  {
    code: 'FLAT100',
    label: '₹100 off above ₹499',
    rule: 'flat off · minimum spend',
    minSpend: 499,
    discount: (subtotal) => (subtotal >= 499 ? 100 : 0),
  },
  {
    code: 'SAVE150',
    label: '₹150 off above ₹999',
    rule: 'threshold discount',
    minSpend: 999,
    discount: (subtotal) => (subtotal >= 999 ? 150 : 0),
  },
];

const money = (n: number) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

interface State {
  screen: Screen;
  cart: Record<string, number>;
  manualOpen: boolean;
  manualValue: string;
  toast: string | null;
  couponCode: string | null;
  phone: string;
  otpSent: boolean;
  otpValue: string;
  recaptcha: boolean;
  authBusy: boolean;
  paying: boolean;
  orderId: string | null;
  rating: 'bad' | 'neutral' | 'good' | null;
}

const initialState = (): State => ({
  screen: 'scan',
  cart: {},
  manualOpen: false,
  manualValue: '',
  toast: null,
  couponCode: null,
  phone: '',
  otpSent: false,
  otpValue: '',
  recaptcha: false,
  authBusy: false,
  paying: false,
  orderId: null,
  rating: null,
});

const SCREEN_ORDER: Screen[] = ['scan', 'cart', 'auth', 'pay', 'verify', 'done'];

export function mountCheckoutDemo(root: HTMLElement) {
  let s = initialState();
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const cartLines = () =>
    Object.entries(s.cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id)!, qty }));

  const subtotal = () => cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const cartCount = () => Object.values(s.cart).reduce((a, b) => a + b, 0);

  const activeCoupon = () => COUPONS.find((c) => c.code === s.couponCode) ?? null;
  const discount = () => {
    const c = activeCoupon();
    if (!c) return 0;
    const d = c.discount(subtotal());
    return d > 0 ? d : 0;
  };
  const payable = () => Math.max(subtotal() - discount(), 0);

  function set(patch: Partial<State>) {
    s = { ...s, ...patch };
    render();
  }

  function addToCart(id: string) {
    const product = PRODUCTS.find((p) => p.id === id || p.barcode === id);
    if (!product) {
      flashToast(`No product matches that barcode — try one from the shelf.`);
      return;
    }
    s.cart = { ...s.cart, [product.id]: (s.cart[product.id] ?? 0) + 1 };
    flashToast(`✓ scanned — ${product.name}`);
  }

  function flashToast(msg: string) {
    s.toast = msg;
    render();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      s.toast = null;
      render();
    }, 1800);
  }

  function setQty(id: string, qty: number) {
    const next = { ...s.cart };
    if (qty <= 0) delete next[id];
    else next[id] = qty;
    s.cart = next;
    // Coupon may no longer be eligible after edits.
    const c = activeCoupon();
    if (c && subtotal() < c.minSpend) s.couponCode = null;
    render();
  }

  function goto(screen: Screen) {
    s.screen = screen;
    render();
    root.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  function resetAll() {
    s = initialState();
    render();
  }

  function sendOtp() {
    if (!/^\d{10}$/.test(s.phone)) {
      flashToast('Enter a 10-digit phone number.');
      return;
    }
    s.authBusy = true;
    render();
    setTimeout(() => {
      s.authBusy = false;
      s.otpSent = true;
      flashToast('OTP sent (demo code: 1234)');
    }, prefersReducedMotion ? 50 : 700);
  }

  function verifyOtp() {
    if (!s.recaptcha) {
      flashToast("Check “I'm not a robot” first.");
      return;
    }
    if (s.otpValue !== '1234') {
      flashToast('Wrong code — this demo only accepts 1234.');
      return;
    }
    s.authBusy = true;
    render();
    setTimeout(() => {
      s.authBusy = false;
      flashToast('Logged in successfully');
      setTimeout(() => goto('pay'), prefersReducedMotion ? 50 : 600);
    }, prefersReducedMotion ? 50 : 500);
  }

  function pay() {
    s.paying = true;
    render();
    setTimeout(() => {
      s.paying = false;
      s.orderId = `SG${Math.floor(100000 + Math.random() * 900000)}`;
      goto('verify');
    }, prefersReducedMotion ? 80 : 1400);
  }

  // ---- Screen renderers -----------------------------------------------

  function renderScan(): string {
    const shelf = PRODUCTS.map(
      (p) => `
      <button class="dc-shelf-item" data-action="scan" data-id="${p.id}" type="button">
        <span class="dc-shelf-item__emoji" aria-hidden="true">${p.emoji}</span>
        <span class="dc-shelf-item__name">${p.name}</span>
        <span class="dc-shelf-item__price">${money(p.price)}</span>
      </button>`
    ).join('');

    return `
      <div class="dc-scan">
        <p class="dc-store">📍 Dummy Store, Malviya Nagar</p>
        <div class="dc-viewfinder" aria-hidden="true">
          <div class="dc-viewfinder__frame">
            <span class="dc-viewfinder__corner dc-viewfinder__corner--tl"></span>
            <span class="dc-viewfinder__corner dc-viewfinder__corner--tr"></span>
            <span class="dc-viewfinder__corner dc-viewfinder__corner--bl"></span>
            <span class="dc-viewfinder__corner dc-viewfinder__corner--br"></span>
            <span class="dc-viewfinder__line"></span>
          </div>
          <p class="dc-viewfinder__hint">tap a shelf item below to simulate a scan</p>
        </div>

        <div class="dc-shelf">${shelf}</div>

        <button class="dc-manual-toggle" data-action="toggle-manual" type="button">
          ${s.manualOpen ? '▾' : '▸'} having trouble? enter barcode
        </button>
        ${
          s.manualOpen
            ? `<form class="dc-manual" data-action="manual-submit">
                <input
                  class="dc-manual__input"
                  name="barcode"
                  inputmode="numeric"
                  placeholder="e.g. 8901057812345"
                  value="${s.manualValue}"
                  aria-label="Enter barcode manually"
                />
                <button class="dc-btn dc-btn--ghost" type="submit">add</button>
              </form>`
            : ''
        }
      </div>
    `;
  }

  function renderCart(): string {
    const lines = cartLines();
    const rows = lines.length
      ? lines
          .map(
            (l) => `
        <li class="dc-cart-row">
          <span class="dc-cart-row__emoji" aria-hidden="true">${l.product.emoji}</span>
          <span class="dc-cart-row__name">${l.product.name}</span>
          <span class="dc-stepper">
            <button data-action="qty" data-id="${l.product.id}" data-delta="-1" aria-label="Remove one ${l.product.name}" type="button">−</button>
            <span aria-live="polite">${l.qty}</span>
            <button data-action="qty" data-id="${l.product.id}" data-delta="1" aria-label="Add one ${l.product.name}" type="button">+</button>
          </span>
          <span class="dc-cart-row__price">${money(l.product.price * l.qty)}</span>
        </li>`
          )
          .join('')
      : `<li class="dc-cart-empty">Cart's empty — go scan something.</li>`;

    const sub = subtotal();
    const coupons = COUPONS.map((c) => {
      const eligible = sub >= c.minSpend;
      const active = s.couponCode === c.code;
      const need = c.minSpend - sub;
      return `
        <button
          class="dc-coupon ${active ? 'is-active' : ''} ${!eligible ? 'is-disabled' : ''}"
          data-action="coupon"
          data-code="${c.code}"
          type="button"
          ${!eligible ? 'aria-disabled="true"' : ''}
        >
          <span class="dc-coupon__code">${c.code}</span>
          <span class="dc-coupon__label">${c.label}</span>
          <span class="dc-coupon__meta">${
            eligible ? (active ? 'applied ✓' : c.rule) : `add ${money(need)} more to avail this offer`
          }</span>
        </button>`;
    }).join('');

    return `
      <div class="dc-cart">
        <button class="dc-link-back" data-action="go" data-screen="scan" type="button">← add more items</button>
        <h2 class="dc-h2">Your cart</h2>
        <ul class="dc-cart-list">${rows}</ul>

        <h3 class="dc-h3">Coupons</h3>
        <div class="dc-coupons">${coupons}</div>

        <dl class="dc-bill">
          <div><dt>Item total</dt><dd>${money(sub)}</dd></div>
          <div><dt>Discount${activeCoupon() ? ` (${activeCoupon()!.code})` : ''}</dt><dd>−${money(discount())}</dd></div>
          <div class="dc-bill__total"><dt>Payable</dt><dd>${money(payable())}</dd></div>
        </dl>

        <button
          class="dc-btn dc-btn--primary dc-btn--block"
          data-action="go"
          data-screen="auth"
          type="button"
          ${lines.length === 0 ? 'disabled' : ''}
        >
          Proceed to pay →
        </button>
      </div>
    `;
  }

  function renderAuth(): string {
    return `
      <div class="dc-auth">
        <h2 class="dc-h2">Login to continue</h2>
        <p class="dc-muted">Checkout is gated here, not scanning — your cart stays put.</p>

        <form data-action="send-otp">
          <label class="dc-label" for="dc-phone">Phone number</label>
          <input
            class="dc-input"
            id="dc-phone"
            name="phone"
            inputmode="numeric"
            maxlength="10"
            placeholder="10-digit mobile number"
            value="${s.phone}"
            ${s.otpSent ? 'disabled' : ''}
          />
          ${
            !s.otpSent
              ? `<button class="dc-btn dc-btn--primary dc-btn--block" type="submit" ${s.authBusy ? 'disabled' : ''}>
                  ${s.authBusy ? 'Sending…' : 'Send OTP'}
                </button>`
              : ''
          }
        </form>

        ${
          s.otpSent
            ? `
          <form data-action="verify-otp" class="dc-otp-block">
            <label class="dc-label" for="dc-otp">Enter OTP</label>
            <p class="dc-hint">Demo code: <strong>1234</strong> (no SMS actually sent)</p>
            <input
              class="dc-input dc-input--otp"
              id="dc-otp"
              name="otp"
              inputmode="numeric"
              maxlength="4"
              placeholder="••••"
              value="${s.otpValue}"
            />
            <label class="dc-recaptcha">
              <input type="checkbox" name="recaptcha" ${s.recaptcha ? 'checked' : ''} />
              <span>I'm not a robot</span>
            </label>
            <button class="dc-btn dc-btn--primary dc-btn--block" type="submit" ${s.authBusy ? 'disabled' : ''}>
              ${s.authBusy ? 'Verifying…' : 'Verify & continue'}
            </button>
          </form>`
            : ''
        }
      </div>
    `;
  }

  function renderPay(): string {
    return `
      <div class="dc-pay">
        <div class="dc-pay__ribbon">TEST MODE</div>
        <h2 class="dc-h2">Checkout</h2>
        <p class="dc-muted">Reconstructed payment sheet — no real gateway is called, nothing is charged.</p>

        <div class="dc-card">
          <div class="dc-card__bank">DCB Bank · Visa</div>
          <div class="dc-card__number">4111 &nbsp;1111 &nbsp;1111 &nbsp;1111</div>
          <div class="dc-card__row">
            <span>EXP 12/29</span>
            <span>CVV not needed for secured cards</span>
          </div>
        </div>

        <dl class="dc-bill dc-bill--compact">
          <div class="dc-bill__total"><dt>Amount payable</dt><dd>${money(payable())}</dd></div>
        </dl>

        <button class="dc-btn dc-btn--primary dc-btn--block" data-action="pay" type="button" ${s.paying ? 'disabled' : ''}>
          ${s.paying ? 'Confirming payment…' : `Pay ${money(payable())}`}
        </button>
      </div>
    `;
  }

  function renderVerify(): string {
    const items = cartLines();
    return `
      <div class="dc-verify">
        <h2 class="dc-h2">You're verified to leave</h2>
        <p class="dc-muted">Please head towards the exit and show this screen for security checking.</p>
        <div class="dc-qr" id="dc-qr" aria-label="Order QR code"></div>
        <dl class="dc-verify-meta">
          <div><dt>Order ID</dt><dd>${s.orderId}</dd></div>
          <div><dt>Paid</dt><dd>${money(payable())}</dd></div>
          <div><dt>Items</dt><dd>${items.map((l) => `${l.product.emoji} ×${l.qty}`).join('  ')}</dd></div>
        </dl>
        <button class="dc-btn dc-btn--primary dc-btn--block" data-action="go" data-screen="done" type="button">
          I'm at the exit →
        </button>
      </div>
    `;
  }

  function renderDone(): string {
    const ratings: Array<{ key: State['rating']; label: string }> = [
      { key: 'bad', label: '😕 bad' },
      { key: 'neutral', label: '😐 okay' },
      { key: 'good', label: '🙂 good' },
    ];
    return `
      <div class="dc-done">
        <p class="dc-done__check" aria-hidden="true">✓</p>
        <h2 class="dc-h2">You're all set!</h2>
        <p class="dc-muted">Thank you for shopping with us.</p>
        <dl class="dc-verify-meta">
          <div><dt>Order ID</dt><dd>${s.orderId}</dd></div>
        </dl>
        <p class="dc-label-text">how was it?</p>
        <div class="dc-ratings">
          ${ratings
            .map(
              (r) => `
            <button class="dc-rating ${s.rating === r.key ? 'is-active' : ''}" data-action="rate" data-rating="${r.key}" type="button">
              ${r.label}
            </button>`
            )
            .join('')}
        </div>
        <button class="dc-btn dc-btn--ghost dc-btn--block" data-action="restart" type="button">Continue shopping</button>
      </div>
    `;
  }

  function renderScreen(): string {
    switch (s.screen) {
      case 'scan':
        return renderScan();
      case 'cart':
        return renderCart();
      case 'auth':
        return renderAuth();
      case 'pay':
        return renderPay();
      case 'verify':
        return renderVerify();
      case 'done':
        return renderDone();
    }
  }

  function render() {
    const stepIndex = SCREEN_ORDER.indexOf(s.screen);
    const count = cartCount();

    root.innerHTML = `
      <div class="dc-chrome">
        <button class="dc-chrome__restart" data-action="restart" type="button" aria-label="Restart demo">↺</button>
        <div class="dc-dots" role="img" aria-label="Step ${stepIndex + 1} of ${SCREEN_ORDER.length}">
          ${SCREEN_ORDER.map((sc, i) => `<span class="dc-dot ${i <= stepIndex ? 'is-done' : ''}"></span>`).join('')}
        </div>
        ${
          s.screen === 'scan' && count > 0
            ? `<button class="dc-chrome__cart" data-action="go" data-screen="cart" type="button">cart (${count})</button>`
            : `<span class="dc-chrome__spacer"></span>`
        }
      </div>
      <div class="dc-body">${renderScreen()}</div>
      ${s.toast ? `<div class="dc-toast" role="status" aria-live="polite">${s.toast}</div>` : ''}
      ${
        count > 0 && s.screen === 'scan'
          ? `<button class="dc-cartbar" data-action="go" data-screen="cart" type="button">
               view cart (${count}) · ${money(subtotal())} →
             </button>`
          : ''
      }
    `;

    if (s.screen === 'verify' && s.orderId) {
      const qrEl = root.querySelector<HTMLDivElement>('#dc-qr');
      if (qrEl) {
        QRCode.toDataURL(
          `SCANANDGO|order:${s.orderId}|paid:${payable()}`,
          { margin: 1, width: 176, color: { dark: '#121215', light: '#00000000' } }
        )
          .then((url) => {
            qrEl.innerHTML = `<img src="${url}" alt="Order verification QR code" width="176" height="176" />`;
          })
          .catch(() => {
            qrEl.textContent = 'QR unavailable';
          });
      }
    }
  }

  // ---- Event delegation --------------------------------------------------

  root.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-action]');
    if (!target) return;
    const action = target.dataset.action;

    if (action === 'scan') addToCart(target.dataset.id!);
    if (action === 'toggle-manual') set({ manualOpen: !s.manualOpen });
    if (action === 'go') goto(target.dataset.screen as Screen);
    if (action === 'qty') {
      const id = target.dataset.id!;
      const delta = Number(target.dataset.delta);
      setQty(id, (s.cart[id] ?? 0) + delta);
    }
    if (action === 'coupon') {
      const code = target.dataset.code!;
      const c = COUPONS.find((x) => x.code === code)!;
      if (subtotal() < c.minSpend) return;
      set({ couponCode: s.couponCode === code ? null : code });
    }
    if (action === 'pay' && !s.paying) pay();
    if (action === 'restart') resetAll();
    if (action === 'rate') set({ rating: target.dataset.rating as State['rating'] });
  });

  root.addEventListener('submit', (e) => {
    const form = e.target as HTMLElement;
    const action = form.dataset.action;
    e.preventDefault();

    if (action === 'manual-submit') {
      const input = form.querySelector('input')!;
      const val = input.value.trim();
      if (val) addToCart(val);
      set({ manualValue: '', manualOpen: false });
    }
    if (action === 'send-otp') {
      const input = form.querySelector('input')!;
      set({ phone: input.value.trim() });
      sendOtp();
    }
    if (action === 'verify-otp') {
      const otp = (form.querySelector('#dc-otp') as HTMLInputElement).value.trim();
      const recaptcha = (form.querySelector('input[name="recaptcha"]') as HTMLInputElement).checked;
      s.otpValue = otp;
      s.recaptcha = recaptcha;
      verifyOtp();
    }
  });

  root.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.id === 'dc-phone') {
      s.phone = el.value.replace(/\D/g, '').slice(0, 10);
      el.value = s.phone;
    }
    if (el.id === 'dc-otp') {
      s.otpValue = el.value.replace(/\D/g, '').slice(0, 4);
      el.value = s.otpValue;
    }
    if (el.name === 'barcode') s.manualValue = el.value;
  });

  render();
}
