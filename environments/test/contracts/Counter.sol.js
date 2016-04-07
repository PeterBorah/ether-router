// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"ping","outputs":[],"type":"function"}],
    binary: "606060405260438060106000396000f3606060405260e060020a600035046306661abd811460245780635c36b18614602c575b005b603960005481565b6022600080546001019055565b6060908152602090f3",
    unlinked_binary: "606060405260438060106000396000f3606060405260e060020a600035046306661abd811460245780635c36b18614602c575b005b603960005481565b6022600080546001019055565b6060908152602090f3",
    address: "0xaa3ab1325d30fbeea4bba1f5351b82243e79aeac",
    generated_with: "2.0.6",
    contract_name: "Counter"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Counter error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Counter error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Counter error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Counter error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Counter = Contract;
  }

})();
