// Preview: QuickByte. Filter by category, open a restaurant, add items to the cart. Sample data.
(function () {
  const CATS = ['All', 'Burgers', 'Pizza', 'Desi', 'Desserts'];
  const RESTAURANTS = [ // [name, category, [[item, price in Rs]]]
    ['Burger Lab', 'Burgers', [['Classic stack', 690], ['Cheese melt', 750], ['Fries', 250]]],
    ['Pizza Forno', 'Pizza', [['Margherita', 1100], ['Fajita', 1350], ['Garlic bread', 400]]],
    ['Karahi House', 'Desi', [['Chicken karahi', 1800], ['Naan', 60], ['Raita', 120]]],
    ['Sweet Spot', 'Desserts', [['Brownie', 350], ['Kunafa', 500], ['Ice cream', 300]]],
  ];
  let cat = 'All', open = -1, cart = []; // kept here so the cart survives switching projects

  PREVIEWS.quickbyte = function (el) {
    function draw() {
      const total = cart.reduce((a, b) => a + b, 0).toLocaleString();
      const list = `<div class="qb-cats">${CATS.map((c) => `<button class="qb-cat ${c === cat ? 'on' : ''}" data-act="cat" data-c="${c}">${c}</button>`).join('')}</div>
        <div class="qb-grid">${RESTAURANTS.map((r, i) => (cat === 'All' || r[1] === cat) ? `<button class="qb-card" data-act="open" data-i="${i}"><i></i><b>${r[0]}</b><small>${r[1]}</small></button>` : '').join('')}</div>`;
      const detail = open < 0 ? '' : `<button class="qb-back" data-act="back">&larr; All restaurants</button><h4>${RESTAURANTS[open][0]}</h4>
        ${RESTAURANTS[open][2].map((it, j) => `<div class="qb-item"><div>${it[0]} <span>/ Rs ${it[1]}</span></div><button class="qb-add" data-act="add" data-j="${j}">Add</button></div>`).join('')}`;
      el.innerHTML = `<div class="qb"><div class="qb-top"><b>Quick<span>Byte</span></b><span class="qb-cart">Cart ${cart.length} / Rs ${total}</span></div>
        <div class="qb-body">${open < 0 ? list : detail}</div><p class="qb-note">Sample data. The real listings came from a Django API.</p></div>`;
    }
    el.onclick = (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      if (b.dataset.act === 'cat') cat = b.dataset.c;
      if (b.dataset.act === 'open') open = +b.dataset.i;
      if (b.dataset.act === 'back') open = -1;
      if (b.dataset.act === 'add') cart.push(RESTAURANTS[open][2][+b.dataset.j][1]);
      draw();
    };
    draw();
  };
})();
