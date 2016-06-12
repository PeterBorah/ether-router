// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"inputs":[{"name":"_resolver","type":"address"}],"type":"constructor"}],
    binary: "606060405260405160208061017a83395060806040525160008054600160a060020a03199081168317909155600180549091163317905550610135806100456000396000f36060604052361561000b575b610000600080547f6f68e8d20000000000000000000000000000000000000000000000000000000060609081527fffffffff00000000000000000000000000000000000000000000000000000000833516606452829182918291829173ffffffffffffffffffffffffffffffffffffffff90911690636f68e8d29060849060809060248187876161da5a03f11561000257505060408051805160208201519282015160609290920151909750919550935091505073ffffffffffffffffffffffffffffffffffffffff8216851461010a57806040515260043603600460405160040137602060405136604051856127105a03f494506020604051510292505b366000604051378260405136604051876127105a03f494506001851461012f57610002565b82604051f3",
    unlinked_binary: "606060405260405160208061017a83395060806040525160008054600160a060020a03199081168317909155600180549091163317905550610135806100456000396000f36060604052361561000b575b610000600080547f6f68e8d20000000000000000000000000000000000000000000000000000000060609081527fffffffff00000000000000000000000000000000000000000000000000000000833516606452829182918291829173ffffffffffffffffffffffffffffffffffffffff90911690636f68e8d29060849060809060248187876161da5a03f11561000257505060408051805160208201519282015160609290920151909750919550935091505073ffffffffffffffffffffffffffffffffffffffff8216851461010a57806040515260043603600460405160040137602060405136604051856127105a03f494506020604051510292505b366000604051378260405136604051876127105a03f494506001851461012f57610002565b82604051f3",
    address: "0xbad7fc7392426ef022b6ebc16e068e45665109a7",
    generated_with: "2.0.9",
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
      throw new Error("EtherRouter error: Please call load() first before calling at().");
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
