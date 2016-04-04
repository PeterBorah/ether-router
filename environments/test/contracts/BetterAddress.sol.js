// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[],"name":"get_destination","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_destination","type":"address"}],"name":"set_destination","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"destination","outputs":[{"name":"","type":"address"}],"type":"function"}],
    binary: "606060405260b28060106000396000f36060604052361560315760e060020a60003504630877e5e581146066578063319dbe4414607d578063b269681d1460a1575b609f60008054600160a060020a03169036906060376040366040510152602060405136604051600085620f4240f16020604051f35b6000545b600160a060020a03166060908152602090f35b6000805473ffffffffffffffffffffffffffffffffffffffff19166004351790555b005b606a600054600160a060020a03168156",
    unlinked_binary: "606060405260b28060106000396000f36060604052361560315760e060020a60003504630877e5e581146066578063319dbe4414607d578063b269681d1460a1575b609f60008054600160a060020a03169036906060376040366040510152602060405136604051600085620f4240f16020604051f35b6000545b600160a060020a03166060908152602090f35b6000805473ffffffffffffffffffffffffffffffffffffffff19166004351790555b005b606a600054600160a060020a03168156",
    address: "0xdb15e2470a8b32e01d8a7d48527d331ae699ee80",
    generated_with: "2.0.6",
    contract_name: "BetterAddress"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("BetterAddress error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("BetterAddress error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("BetterAddress error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("BetterAddress error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.BetterAddress = Contract;
  }

})();
