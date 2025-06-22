const translations = {
  de: {
    title: 'Bosse-Bestellung – Demo',
    heading: 'Online‑Bestellung',
    customer_number: 'Kundennummer',
    th_category: 'Kategorie',
    th_product: 'Produkt',
    th_image: 'Bild',
    th_container_volume: 'Behälter / Volumen',
    th_sku: 'SKU',
    th_qty: 'Menge',
    th_subtotal: 'Zwischen<br>summe',
    button_send: 'Bestellung senden',
    placeholder_category: 'Kategorie wählen',
    placeholder_product: 'Produkt wählen',
    container: 'Behälter',
    bottle: 'Flasche',
    canister: 'Kanister',
    amount: 'Menge',
    placeholder_container: 'Behälter wählen',
    placeholder_amount: 'Menge wählen',
    alert_customer_missing: 'Bitte Kundennummer angeben',
    alert_no_items: 'Keine gültigen Positionen',
    msg_order_sent: '✓ Bestellung gesendet',
    msg_error_prefix: 'Fehler: ',
    footer_addr_head: 'ADRESSE',
    footer_open_head: 'ÖFFNUNGSZEITEN',
    footer_certs_head: 'ZERTIFIZIERUNGEN',
    footer_links_head: 'WEITERE LINKS',
    footer_link_start: 'Startseite',
    footer_link_impressum: 'Impressum',
    footer_link_privacy: 'Datenschutz',
    footer_link_contact: 'Kontakt'
  },
  en: {
    title: 'Bosse Order – Demo',
    heading: 'Online Order',
    customer_number: 'Customer Number',
    th_category: 'Category',
    th_product: 'Product',
    th_image: 'Image',
    th_container_volume: 'Container / Volume',
    th_sku: 'SKU',
    th_qty: 'Quantity',
    th_subtotal: 'Sub-total',
    button_send: 'Send Order',
    placeholder_category: 'Select category',
    placeholder_product: 'Select product',
    container: 'Container',
    bottle: 'Bottle',
    canister: 'Canister',
    amount: 'Amount',
    placeholder_container: 'Select container',
    placeholder_amount: 'Select amount',
    alert_customer_missing: 'Please enter customer number',
    alert_no_items: 'No valid items',
    msg_order_sent: '✓ Order sent',
    msg_error_prefix: 'Error: ',
    footer_addr_head: 'ADDRESS',
    footer_open_head: 'OPENING HOURS',
    footer_certs_head: 'CERTIFICATIONS',
    footer_links_head: 'OTHER LINKS',
    footer_link_start: 'Home',
    footer_link_impressum: 'Imprint',
    footer_link_privacy: 'Privacy',
    footer_link_contact: 'Contact'
  },
  fr: {
    title: 'Commande Bosse – Démo',
    heading: 'Commande en ligne',
    customer_number: 'Numéro client',
    th_category: 'Catégorie',
    th_product: 'Produit',
    th_image: 'Image',
    th_container_volume: 'Contenant / Volume',
    th_sku: 'SKU',
    th_qty: 'Quantité',
    th_subtotal: 'Sous-total',
    button_send: 'Envoyer la commande',
    placeholder_category: 'Choisir une catégorie',
    placeholder_product: 'Choisir un produit',
    container: 'Contenant',
    bottle: 'Bouteille',
    canister: 'Bidon',
    amount: 'Quantité',
    placeholder_container: 'Choisir un contenant',
    placeholder_amount: 'Choisir la quantité',
    alert_customer_missing: 'Veuillez saisir le numéro client',
    alert_no_items: 'Aucun article valide',
    msg_order_sent: '✓ Commande envoyée',
    msg_error_prefix: 'Erreur : ',
    footer_addr_head: 'ADRESSE',
    footer_open_head: "HEURES D'OUVERTURE",
    footer_certs_head: 'CERTIFICATIONS',
    footer_links_head: 'AUTRES LIENS',
    footer_link_start: "Page d'accueil",
    footer_link_impressum: 'Mentions légales',
    footer_link_privacy: 'Confidentialité',
    footer_link_contact: 'Contact'
  }
};

window.i18n = {
  lang: 'de',
  setLang(lang) {
    this.lang = lang in translations ? lang : 'de';
    localStorage.setItem('lang', this.lang);
    document.documentElement.lang = this.lang;
    this.apply();
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.lang);
    });
  },
  t(key) {
    return translations[this.lang][key] || key;
  },
  apply() {
    const dict = translations[this.lang];
    document.title = dict.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.placeholder = dict[key];
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('lang') || 'de';
  i18n.setLang(stored);
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      i18n.setLang(btn.dataset.lang);
    });
  });
});
