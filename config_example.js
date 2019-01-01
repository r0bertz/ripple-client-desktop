/**
 * Ripple Admin Console Configuration
 *
 * Copy this file to config.js and edit to suit your preferences.
 */
var Options = {
  // Rippled to connect
  connection: {
    server: 'wss://s1.ripple.com',
    trace: false,
    maxFeeXRP: '0.0002'
  },

  // Number of transactions each page has in balance tab notifications
  transactions_per_page: 50,

  // Number of ledgers ahead of the current ledger index where a tx is valid
  tx_last_ledger: 3,

  // Set max number of rows for orderbook
  orderbook_max_rows: 20,

  gateway_max_limit: 1000000000,

  // Should only be used for development purposes
  persistent_auth: false
};

// Load client-side overrides
if (store.enabled) {
  var settings = JSON.parse(store.get('ripple_settings') || '{}');

  if (settings.connection) {
    if (!settings.connection.server) {
      settings.connection.server = Options.connection.server;
    }
    Options.connection = settings.connection;
  }

  if (settings.max_tx_network_fee) {
    Options.max_tx_network_fee = settings.max_tx_network_fee;
  }
}
