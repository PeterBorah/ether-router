// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_one","type":"uint256"}],"name":"setOne","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"getOne","outputs":[{"name":"","type":"uint256"}],"type":"function"}],
    binary: "6060604052603b8060106000396000f3606060405260e060020a600035046377f2556681146024578063ab5ed15014602e575b005b6004356001556022565b6001546060908152602090f3",
    unlinked_binary: "6060604052603b8060106000396000f3606060405260e060020a600035046377f2556681146024578063ab5ed15014602e575b005b6004356001556022565b6001546060908152602090f3",
    address: "0x1dd15e50b249d6ea711d280af144f36b49c7528c",
    generated_with: "2.0.6",
    contract_name: "One"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("One error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("One error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("One error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("One error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.One = Contract;
  }

})();
