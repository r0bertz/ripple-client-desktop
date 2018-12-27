/**
 * NETWORK
 *
 * The network service is used to communicate with the Ripple network.
 *
 * It encapsulates a RippleAPI instance.
 */

var module = angular.module('network', []);

module.factory('rpNetwork', ['$rootScope', function($scope)
{
  /**
   * Manage network state.
   *
   * This class is intended to manage the connection status to the
   * Ripple network.
   *
   * Note that code in other places *is allowed* to call the Ripple
   * library directly. This is not to be intended to be an abstraction
   * layer on top of an abstraction layer.
   */
  var Network = function() {
    this.connected = false;
    this.api = new RippleAPI(Options.connection);
    this.remote = this.api;
  };

  Network.prototype.connect = async function(serverSettings) {
    serverSettings = serverSettings ? serverSettings : Options.connection;

    this.api = new RippleAPI(serverSettings);
    this.remote = this.api;
    this.api.on('connected', () => {
      console.log('connected');
      var self = this;
      self.connected = true;
      $scope.connected = true;
      $scope.$broadcast('$netConnected');

      if(!$scope.$$phase) {
        $scope.$apply()
      }
    });
    this.api.on('disconnected', (code) => {
      console.log('disconnected, code:', code);
      var self = this;
      self.connected = false;
      $scope.connected = false;
      $scope.$broadcast('$netDisconnected');

      if(!$scope.$$phase) {
        $scope.$apply()
      }
    });

    if (serverSettings && serverSettings.server) {
      await this.api.connect();
    }
  };

  Network.prototype.disconnect = async function() {
    if (this.connected) {
      await this.api.disconnect();
    }
  };

  /**
   * Setup listeners for identity state.
   *
   * This function causes the network object to start listening to
   * changes in the identity state and automatically subscribe to
   * accounts accordingly.
   */
  Network.prototype.listenId = function (id)
  {
    var self = this;
  };

  return new Network();
}]);

