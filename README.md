Bosse Quick-Order 🚀



📋 Projektbeschreibung

Bosse Quick-Order ist eine webbasierte Anwendung, die es Kunden ermöglicht, schnell und bequem Getränke aus verschiedenen Kategorien zu bestellen. Dank einer intuitiven Oberfläche mit dynamischer Produktauswahl, automatischer Preisberechnung und responsive Design ist die Anwendung auf Desktop- und Mobilgeräten gleichermaßen nutzbar.

🛠️ Hauptfunktionen

Dynamische Produktauswahl: Filterung und Anzeige von Produkten basierend auf der gewählten Kategorie.

Intelligente Dropdowns: Benutzerfreundliche Auswahl über Select2 mit Suchfunktion und adaptiver Breite.

Behälter- und Volumenauswahl: Unterstützung von Flaschen (0,5 l, 0,75 l, 1 l) und Kanistern (5 l, 10 l).

Mengen- und Preiskalkulation: Automatische Berechnung von Zwischen- und Gesamtpreisen in Echtzeit.

Responsive Gestaltung: Optimale Darstellung auf Desktop, Tablet und Mobilgeräten.

Einfache Bestellübersicht: Anzeige von SKU, Produktbild und Teilsummen.

⚙️ Technischer Stack

Frontend: HTML5, CSS3, JavaScript (ES6+)

UI-Framework: Bootstrap 5

Scripting & AJAX: jQuery

Erweiterte Dropdowns: Select2

Build-Tools: npm, serve

Versionierung: Git

🚀 Installation und Lokale Nutzung

Repository klonen:

git clone https://github.com/xDima87x/bosse-quick-order.git
cd bosse-quick-order

Abhängigkeiten installieren:

npm install

Lokalen Webserver starten (z. B. mit serve):

npx serve

Im Browser öffnen:

http://localhost:3000

Hinweis: Für Entwicklung und Tests wird Node.js (Version ≥ 18) empfohlen. Der eingebaute Node.js-Testrunner ist ab Version 18 verfügbar.

🧪 Tests ausführen

Die API kann mit automatisierten Tests überprüft werden. Diese lassen sich
zu jeder Zeit mit dem Befehl

```
npm test
```

starten. Dabei verwendet der eingebaute Node.js‑Testrunner zusammen mit
Supertest die Endpunkte `/products` und `/order`.

📂 Projektstruktur

bosse-quick-order/
├── index.html         # Hauptseite der Anwendung
├── style.css          # Benutzerdefiniertes CSS mit BOSSE-Corporate-Styles
├── main.js            # JavaScript-Logik für dynamische Funktionen
├── img/               # Verzeichnis für Produktbilder und Logo
├── package.json       # npm-Konfigurationsdatei
└── LICENSE            # Lizenz (MIT)

💡 Geplante Weiterentwicklung

Implementierung einer Backend-Lösung zur persistente Speicherung von Bestellungen

Anbindung an externe Produkt- und Preisdaten-APIs

Erweiterung um Benutzerverwaltung und Authentifizierung

Integration von Zahlungsdienstleistern und Rechnungsstellung

🤝 Mitwirken (Contributing)

Beiträge sind willkommen! Wenn du Fehler findest oder neue Features vorschlagen möchtest:

Fork das Repository.

Erstelle einen Feature-Branch: git checkout -b feature/meine-idee

Commits hinzufügen: git commit -m "Meine coole Änderung"

Push zum Branch: git push origin feature/meine-idee

Erstelle einen Pull Request.

Bitte halte dich an die bestehenden Code-Standards und dokumentiere größere Änderungen.

📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Details findest du in der Datei LICENSE.
