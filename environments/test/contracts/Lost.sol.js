// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[],"name":"getNumbers","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"type":"function"}],
    binary: "606060405260408060106000396000f3606060405260e060020a600035046389f915f68114601a575b005b600460609081526008608052600f60a052601060c0908152601760e052602a6101005290f3",
    unlinked_binary: "606060405260408060106000396000f3606060405260e060020a600035046389f915f68114601a575b005b600460609081526008608052600f60a052601060c0908152601760e052602a6101005290f3",
    address: "0x3dc878210934eb702a71fd5260ae85faa7edce8c",
    generated_with: "2.0.6",
    contract_name: "Lost"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Lost error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Lost error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Lost error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Lost error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Lost = Contract;
  }

})();
