// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"ping","outputs":[],"type":"function"}],
    binary: "6060604052604f8060106000396000f36060604052361560275760e060020a600035046306661abd811460355780635c36b18614603d575b60435b600080546001019055565b604560005481565b6043602a565b005b6060908152602090f3",
    unlinked_binary: "6060604052604f8060106000396000f36060604052361560275760e060020a600035046306661abd811460355780635c36b18614603d575b60435b600080546001019055565b604560005481565b6043602a565b005b6060908152602090f3",
    address: "0xbe6eeec1a63a1165076898f8da0f774794959406",
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
