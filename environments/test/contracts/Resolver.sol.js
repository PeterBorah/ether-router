// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_fallback","type":"address"}],"name":"setFallback","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"fallback","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"sig","type":"bytes4"}],"name":"lookup","outputs":[{"name":"destination","type":"address"},{"name":"outsize","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes4"}],"name":"pointers","outputs":[{"name":"destination","type":"address"},{"name":"outsize","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"signature","type":"string"},{"name":"destination","type":"address"},{"name":"outsize","type":"uint256"}],"name":"register","outputs":[],"type":"function"}],
    binary: "6060604052610218806100126000396000f3606060405260e060020a600035046332b12eac8114610047578063552079dc1461006d5780636f68e8d21461007f578063b5d7ccc3146100bb578063d393c871146100e5575b005b6001805473ffffffffffffffffffffffffffffffffffffffff1916600435179055610045565b6101d1600154600160a060020a031681565b6101db6004356000818152602081905260408120548190600160a060020a03168114156101f7575050600154600160a060020a03166020610213565b600060208190526004358152604090208054600191909101546101db91600160a060020a03169082565b60206004803580820135601f81018490049093026080908101604052606084815261004594602493919291840191819083828082843750949650509335935050604435915050604060405190810160405280838152602001828152602001506000600050600085604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050604051809103902060e060020a80910402815260200190815260200160002060005060008201518160000160006101000a815481600160a060020a030219169083021790555060208201518160010160005055905050505050565b6060908152602090f35b600160a060020a03919091166060908152608091909152604090f35b5060409020805460019190910154600160a060020a0391909116905b91509156",
    unlinked_binary: "6060604052610218806100126000396000f3606060405260e060020a600035046332b12eac8114610047578063552079dc1461006d5780636f68e8d21461007f578063b5d7ccc3146100bb578063d393c871146100e5575b005b6001805473ffffffffffffffffffffffffffffffffffffffff1916600435179055610045565b6101d1600154600160a060020a031681565b6101db6004356000818152602081905260408120548190600160a060020a03168114156101f7575050600154600160a060020a03166020610213565b600060208190526004358152604090208054600191909101546101db91600160a060020a03169082565b60206004803580820135601f81018490049093026080908101604052606084815261004594602493919291840191819083828082843750949650509335935050604435915050604060405190810160405280838152602001828152602001506000600050600085604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050604051809103902060e060020a80910402815260200190815260200160002060005060008201518160000160006101000a815481600160a060020a030219169083021790555060208201518160010160005055905050505050565b6060908152602090f35b600160a060020a03919091166060908152608091909152604090f35b5060409020805460019190910154600160a060020a0391909116905b91509156",
    address: "0x9ab1b1e9d32afde37720c4374a28ae3982542033",
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
