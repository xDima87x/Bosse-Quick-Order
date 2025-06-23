import React, { useEffect } from 'react';
import { initLegacy } from './legacy.js';

export default function App() {
  useEffect(() => {
    initLegacy();
  }, []);
  return (
    <div className="container-fluid px-lg-5">
      <header className="text-center my-4">
        <img src="/img/logo.svg" alt="Bosse Getränke" height="60" />
      </header>

      <div className="row justify-content-center">
        <div className="col-12 col-md-11 col-lg-11 col-xxl-10">
          <div className="card shadow-sm p-4">
            <h1 className="h2 fw-semibold mb-4 text-center">Online‑Bestellung</h1>

            <form id="orderForm" className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="customer" className="form-label">Kundennummer</label>
                <input id="customer" name="customer" className="form-control" required />
              </div>

              <table id="productTable" className="table table-striped table-bordered align-middle w-100">
                <thead className="table-light">
                  <tr>
                    <th>Kategorie</th>
                    <th>Produkt</th>
                    <th>Bild</th>
                    <th>Behälter / Volumen</th>
                    <th>SKU</th>
                    <th>Menge</th>
                    <th>Zwischen<br />summe</th>
                  </tr>
                </thead>
                <tbody id="orderBody">
                  <tr>
                    <td><select className="form-select category"></select></td>
                    <td><select className="form-select product" disabled></select></td>
                    <td className="text-center align-middle">
                      <img className="thumb" src="" alt="" height="48" />
                    </td>
                    <td className="volume align-middle">
                      <div className="d-flex gap-1">
                        <select className="form-select form-select-sm container-type">
                          <option value="" disabled selected>Behälter</option>
                          <option value="Flasche">Flasche</option>
                          <option value="Kanister">Kanister</option>
                        </select>
                        <select className="form-select form-select-sm volume-select" disabled>
                          <option value="" disabled selected>Menge</option>
                        </select>
                      </div>
                    </td>
                    <td className="sku align-middle">–</td>
                    <td><input type="number" className="form-control qty" min="0" disabled /></td>
                    <td className="sum text-end align-middle">0,00</td>
                  </tr>
                  <tr>
                    <td><select className="form-select category"></select></td>
                    <td><select className="form-select product" disabled></select></td>
                    <td className="text-center align-middle">
                      <img className="thumb" src="" alt="" height="48" />
                    </td>
                    <td className="volume align-middle">
                      <div className="d-flex gap-1">
                        <select className="form-select form-select-sm container-type">
                          <option value="" disabled selected>Behälter</option>
                          <option value="Flasche">Flasche</option>
                          <option value="Kanister">Kanister</option>
                        </select>
                        <select className="form-select form-select-sm volume-select" disabled>
                          <option value="" disabled selected>Menge</option>
                        </select>
                      </div>
                    </td>
                    <td className="sku align-middle">–</td>
                    <td><input type="number" className="form-control qty" min="0" disabled /></td>
                    <td className="sum text-end align-middle">0,00</td>
                  </tr>
                </tbody>
              </table>

              <button id="addToCart" className="btn btn-primary w-100 mt-2">
                Bestellung senden
              </button>
            </form>

            <pre id="result" className="mt-3 text-success small"></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

