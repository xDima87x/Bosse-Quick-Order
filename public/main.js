// Quick‑Order ohne DataTables: Kategorie‑ und Produkt‑Dropdown -----------------
(async function () {
  const orderBody = document.getElementById('orderBody');
  const result    = document.getElementById('result');
  const addBtn    = document.getElementById('addToCart');
  const customer  = document.getElementById('customer');
  const t = key => window.i18n.t(key);

  // Produktdaten holen
  const products = await (await fetch('/products')).json();

  // Helper: initialise Select2 with consistent cell-wide behaviour
  function initSelect2(select, placeholder = '') {
    const $sel = $(select);

    // Remove previous instance
    if ($sel.hasClass('select2-hidden-accessible')) {
      $sel.select2('destroy');
    }

    $sel.select2({
      width: '100%',              // Container füllt die Zelle
      placeholder,
      dropdownAutoWidth: true,    // Panel passt sich der längsten Option an
      minimumResultsForSearch: 10,
      // Panel orientiert sich am Container, nicht am Body
      dropdownParent: $sel.parent(),
    });
  }

  // Map: Kategorie → Produkt‑Liste
  const byCategory = {};
  for (const p of products) {
    (byCategory[p.category] ??= []).push(p);
  }
  const categories = Object.keys(byCategory);

  // In jeder Zeile die Dropdowns initialisieren
  [...orderBody.rows].forEach(initRow);

  // ------------- Funktionen --------------------------------------------------
  function initRow(row) {
    const imgEl  = row.querySelector('.thumb');
    const volTd  = row.querySelector('.volume');
    const skuTd  = row.querySelector('.sku');
    const catSel = row.querySelector('.category');
    const prodSel = row.querySelector('.product');
    const qtyInp  = row.querySelector('.qty');
    const sumTd   = row.querySelector('.sum');

    const contSel = row.querySelector('.container-type');
    const volSel  = row.querySelector('.volume-select');
    // Populate container-type dropdown (once)
    if (!contSel.options.length) {
      contSel.innerHTML =
        `<option value="" selected disabled>${t('container')}</option>` +
        `<option value="Flasche">${t('bottle')}</option>` +
        `<option value="Kanister">${t('canister')}</option>`;
      initSelect2(contSel, t('placeholder_container'));
    }
    // Reset volume-select
    volSel.disabled = true;
    volSel.innerHTML = `<option value="" selected disabled>${t('amount')}</option>`;
    initSelect2(volSel, t('placeholder_amount'));

    // Hide and disable container/volume selects initially
    contSel.disabled = true;
    contSel.style.display = 'none';
    volSel.disabled  = true;
    volSel.style.display = 'none';

    // Kategorie‑Options nur einmal befüllen
    if (!catSel.options.length) {
      catSel.innerHTML =
        `<option value="" selected disabled>– ${t('th_category')} –</option>` +
        categories.map(c => `<option value="${c}">${c}</option>`).join('');
      initSelect2(catSel, t('placeholder_category'));
    }

    catSel.onchange = () => {
      prodSel.disabled = !catSel.value;
      qtyInp.disabled  = true;
      qtyInp.value = '';
      sumTd.textContent = '0,00';

      prodSel.innerHTML = `<option value="" selected disabled>– ${t('th_product')} –</option>`;
      initSelect2(prodSel, t('placeholder_product'));
      $(prodSel).prop('disabled', !catSel.value);  // Disable if no category yet

      imgEl.src = '';
      imgEl.alt = '';
      skuTd.textContent = '–';

      // Removed container reset to keep container hidden until product selection
      // contSel.value = '';
      // initSelect2(contSel, 'Behälter wählen');
      // volSel.disabled = true;
      // volSel.value = '';
      // initSelect2(volSel, 'Menge wählen');

      if (catSel.value) {
        byCategory[catSel.value].forEach(p => {
          prodSel.insertAdjacentHTML(
            'beforeend',
            `<option value="${p.sku}" data-price="${p.price ?? 0}" data-img="${p.image}" data-sku="${p.sku}">
               ${p.name}
             </option>`,
          );
        });
        initSelect2(prodSel, t('placeholder_product'));
      }

      contSel.onchange = () => {
        volSel.disabled = !contSel.value;
        volSel.innerHTML = `<option value="" selected disabled>${t('amount')}</option>`;
        const vols = contSel.value === 'Flasche'
          ? ['0,5 l','0,75 l','1 l']
          : ['5 l','10 l'];
        vols.forEach(v => {
          volSel.insertAdjacentHTML(
            'beforeend',
            `<option value="${v}">${v}</option>`
          );
        });
        initSelect2(volSel, t('placeholder_amount'));
      };

      // Wenn dies die letzte Zeile ist und der Benutzer eine Kategorie wählt,
      // füge sofort eine neue leere Zeile an (damit immer eine freie Zeile sichtbar bleibt)
      if (row === orderBody.lastElementChild && catSel.value) addEmptyRow();
    };

    prodSel.onchange = () => {
      const opt = prodSel.selectedOptions[0];
      if (!opt || !opt.value) {
        imgEl.src = '';
        imgEl.alt = '';
        skuTd.textContent = '–';
        qtyInp.disabled = true;
        qtyInp.value = '';
        sumTd.textContent = '0,00';

        // Hide container/volume selects when no product selected
        contSel.disabled = true;
        contSel.style.display = 'none';
        volSel.disabled  = true;
        volSel.style.display = 'none';
      } else {
        imgEl.src = opt.dataset.img;
        imgEl.alt = opt.textContent;
        skuTd.textContent = opt.dataset.sku;

        // Show and enable container-type dropdown
        contSel.disabled = false;
        contSel.style.display = '';
        initSelect2(contSel, t('placeholder_container'));

        qtyInp.disabled = false;
      }
    };

    qtyInp.oninput = () => {
      const price = parseFloat(
        prodSel.selectedOptions[0]?.dataset.price || 0,
      );
      const qty = parseInt(qtyInp.value, 10) || 0;
      const sum = price * qty;
      sumTd.textContent = sum ? sum.toFixed(2).replace('.', ',') : '0,00';
    };
  }

  /** Fügt eine komplett leere Zeile ans Tabellen‑Ende an */
  function addEmptyRow() {
    // Blanko-Zeile erzeugen
    const rowHTML = `
      <tr>
        <td><select class="form-select category"></select></td>
        <td><select class="form-select product" disabled></select></td>
        <td class="text-center align-middle">
          <img class="thumb" src="" alt="" height="48">
        </td>
        <td>
          <div class="d-flex gap-1">
            <select class="form-select form-select-sm container-type">
              <option value="" selected disabled>${t('container')}</option>
              <option value="Flasche">${t('bottle')}</option>
              <option value="Kanister">${t('canister')}</option>
            </select>
            <select class="form-select form-select-sm volume-select" disabled>
              <option value="" selected disabled>${t('amount')}</option>
            </select>
          </div>
        </td>
        <td class="sku align-middle">–</td>
        <td><input type="number" class="form-control qty" min="0" disabled></td>
        <td class="sum text-end align-middle">0,00</td>
      </tr>`;
    orderBody.insertAdjacentHTML('beforeend', rowHTML);

    // Neu hinzugefügte Zeile initialisieren
    const newRow = orderBody.lastElementChild;
    initRow(newRow);
  }

  // ------------- Absenden ----------------------------------------------------
  addBtn.addEventListener('click', async () => {
    const custNo = customer.value.trim();
    if (!custNo) {
      alert(t('alert_customer_missing'));
      return;
    }

    const items = [];
    [...orderBody.rows].forEach(r => {
      const sku     = r.querySelector('.product')?.value;
      const qty     = parseInt(r.querySelector('.qty')?.value, 10);
      if (sku && qty > 0) items.push({ mat: sku, qty });
    });
    if (!items.length) {
      alert(t('alert_no_items'));
      return;
    }

    try {
      const res = await fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: custNo, items }),
      });
      if (!res.ok) throw new Error(await res.text());
      result.textContent = t('msg_order_sent');
      result.className = 'text-success mt-2';
    } catch (err) {
      result.textContent = t('msg_error_prefix') + err.message;
      result.className = 'text-danger mt-2';
    }
  });
})();
