// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"bytes4"}],"name":"lookup","outputs":[{"name":"destination","type":"address"},{"name":"outsize","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"signature","type":"string"},{"name":"destination","type":"address"},{"name":"outsize","type":"uint256"}],"name":"register","outputs":[],"type":"function"}],
    binary: "6060604052610163806100126000396000f3606060405260e060020a60003504636f68e8d28114610026578063d393c8711461005d575b005b600060208190526004358152604090208054600191909101546101569173ffffffffffffffffffffffffffffffffffffffff169082565b60206004803580820135601f81018490049093026080908101604052606084815261002494602493919291840191819083828082843750949650509335935050604435915050604060405190810160405280838152602001828152602001506000600050600085604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050604051809103902060e060020a80910402815260200190815260200160002060005060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555060208201518160010160005055905050505050565b6060918252608052604090f3",
    unlinked_binary: "6060604052610163806100126000396000f3606060405260e060020a60003504636f68e8d28114610026578063d393c8711461005d575b005b600060208190526004358152604090208054600191909101546101569173ffffffffffffffffffffffffffffffffffffffff169082565b60206004803580820135601f81018490049093026080908101604052606084815261002494602493919291840191819083828082843750949650509335935050604435915050604060405190810160405280838152602001828152602001506000600050600085604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050604051809103902060e060020a80910402815260200190815260200160002060005060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555060208201518160010160005055905050505050565b6060918252608052604090f3",
    address: "0x24de97a7a0c3eb88f622b548d7d15d0d9fb99291",
    generated_with: "2.0.6",
    contract_name: "Resolver"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Resolver error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Resolver error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Resolver error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Resolver error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Resolver = Contract;
  }

})();
