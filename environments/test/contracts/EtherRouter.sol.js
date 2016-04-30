// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"inputs":[{"name":"_resolver","type":"address"}],"type":"constructor"}],
    binary: "60606040526040516020806100fe83395060806040525160008054600160a060020a0319908116831790915560018054909116331790555060ba806100446000396000f360606040523615600a575b6000600080547f6f68e8d20000000000000000000000000000000000000000000000000000000060609081527fffffffff00000000000000000000000000000000000000000000000000000000833516606452829173ffffffffffffffffffffffffffffffffffffffff1690636f68e8d29060849060409060248187876161da5a03f115600257505060405180516020820151909450923692509037806040513660405185620f4240f481604051f3",
    unlinked_binary: "60606040526040516020806100fe83395060806040525160008054600160a060020a0319908116831790915560018054909116331790555060ba806100446000396000f360606040523615600a575b6000600080547f6f68e8d20000000000000000000000000000000000000000000000000000000060609081527fffffffff00000000000000000000000000000000000000000000000000000000833516606452829173ffffffffffffffffffffffffffffffffffffffff1690636f68e8d29060849060409060248187876161da5a03f115600257505060405180516020820151909450923692509037806040513660405185620f4240f481604051f3",
    address: "0xbad7fc7392426ef022b6ebc16e068e45665109a7",
    generated_with: "2.0.6",
    contract_name: "EtherRouter"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("EtherRouter error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("EtherRouter error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("EtherRouter error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("EtherRouter error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.EtherRouter = Contract;
  }

})();
