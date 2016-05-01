// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_one","type":"uint256"}],"name":"setOne","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_two","type":"uint256"}],"name":"setTwo","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"getOne","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getTwo","outputs":[{"name":"","type":"uint256"}],"type":"function"}],
    binary: "606060405260688060106000396000f3606060405260e060020a600035046377f255668114603857806391ce8e04146042578063ab5ed15014604c578063ee784123146055575b005b6004356001556036565b6004356002556036565b605e6001545b90565b605e6002546052565b6060908152602090f3",
    unlinked_binary: "606060405260688060106000396000f3606060405260e060020a600035046377f255668114603857806391ce8e04146042578063ab5ed15014604c578063ee784123146055575b005b6004356001556036565b6004356002556036565b605e6001545b90565b605e6002546052565b6060908152602090f3",
    address: "0x9153fa7515bab1dfa886f15e67db8eff4e3f1805",
    generated_with: "2.0.6",
    contract_name: "Two"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Two error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Two error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Two error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Two error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Two = Contract;
  }

})();
