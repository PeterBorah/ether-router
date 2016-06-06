// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[],"name":"throws","outputs":[],"type":"function"}],
    binary: "606060405260208060106000396000f3606060405260e060020a6000350463b71e9c238114601a575b005b6018600256",
    unlinked_binary: "606060405260208060106000396000f3606060405260e060020a6000350463b71e9c238114601a575b005b6018600256",
    address: "0x5a27a59c13d546ff7a18b48ace693d60d2f46135",
    generated_with: "2.0.9",
    contract_name: "Thrower"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Thrower error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Thrower error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Thrower error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Thrower error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Thrower = Contract;
  }

})();
