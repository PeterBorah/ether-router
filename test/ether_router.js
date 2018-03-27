var EtherRouter = artifacts.require("EtherRouter.sol");
var Resolver = artifacts.require("Resolver.sol");
var TheAnswer = artifacts.require("TheAnswer.sol");
var Multiplier = artifacts.require("Multiplier.sol");
var Lost = artifacts.require("Lost.sol");
var SimpleStore = artifacts.require("SimpleStore.sol");
var ResolverAccessor = artifacts.require("ResolverAccessor.sol");
var SenderChecker = artifacts.require("SenderChecker.sol");
var One = artifacts.require("One.sol");
var Two = artifacts.require("Two.sol");
var List = artifacts.require("List.sol");
var Thrower = artifacts.require("Thrower.sol");
var TheNextAnswer = artifacts.require("TheNextAnswer.sol");
var PayableContract = artifacts.require("PayableContract.sol");

contract('EtherRouter', function(accounts) {
  it("should be able to get back a return value", function(done) {
    var resolver, ether_router;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_answer = TheAnswer.at(ether_router.address);
        TheAnswer.deployed().
          then(function(result) { return resolver.register("getAnswer()", result.address, 32); }).
          then(function() { return fake_answer.getAnswer() }).
          then(function() { return fake_answer.getAnswer.call() }).
          then(function(result) {
            assert.equal(result, 42);
            done();
          }).catch(done);
      }).catch(done);
  });

  it("should be able to pass along arguments", function(done) {
    var resolver, ether_router;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_multiplier = Multiplier.at(ether_router.address);
        Multiplier.deployed().
          then(function(result) { return resolver.register("multiply(uint256,uint256)", result.address, 32); }).
          then(function() { return fake_multiplier.multiply.call(7, 3); }).
          then(function(result) {
            assert.equal(result, 21);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should be able to get multiple return values", function(done) {
    var resolver, ether_router;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_lost = Lost.at(ether_router.address);
        Lost.deployed().
          then(function(result) { return resolver.register("getNumbers()", result.address, 192); }).
          then(function() { return fake_lost.getNumbers.call() }).
          then(function(result) {
            assert.equal(result[0], 4);
            assert.equal(result[1], 8);
            assert.equal(result[2], 15);
            assert.equal(result[3], 16);
            assert.equal(result[4], 23);
            assert.equal(result[5], 42);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should be able to store data", function(done) {
    var resolver, ether_router;
    var simpleStore;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_simple_store = SimpleStore.at(ether_router.address);
        SimpleStore.deployed().
          then(function(result) { simpleStore = result; }).
          then(function(result) { return resolver.register("getStored()", simpleStore.address, 32); }).
          then(function(result) { return resolver.register("store(uint256)", simpleStore.address, 0); }).
          then(function() { return fake_simple_store.store(42) }).
          then(function() { return fake_simple_store.getStored.call() }).
          then(function(result) {
            assert.equal(result, 42);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should be able to read data on the contract", function(done) {
    var resolver, ether_router;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_resolver_accessor = ResolverAccessor.at(ether_router.address);
        ResolverAccessor.deployed().
          then(function(result) { return resolver.register("getResolver()", result.address, 32); }).
          then(function() { return fake_resolver_accessor.getResolver.call() }).
          then(function(result) {
            assert.equal(result, resolver.address);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should keep its msg.sender", function(done) {
    var resolver, ether_router;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_sender_checker = SenderChecker.at(ether_router.address);
        SenderChecker.deployed().
          then(function(result) { return resolver.register("checkSender()", result.address, 32); }).
          then(function() { return fake_sender_checker.checkSender.call() }).
          then(function(result) {
            assert.equal(result, accounts[0]);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should allow upgrades that add storage data", function(done) {
    var resolver, ether_router;
    var one;
    var two;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_one = One.at(ether_router.address);
        var fake_two = Two.at(ether_router.address);
        One.deployed().
          then(function(result) { one = result; }).
          then(function() { return Two.deployed(); }).
          then(function(result) { two = result; }).
          then(function() { return resolver.register("setOne(uint256)", one.address, 0) }).
          then(function() { return resolver.register("getOne()", one.address, 32) }).
          then(function() { return resolver.register("setTwo(uint256)", two.address, 0) }).
          then(function() { return resolver.register("getTwo()", two.address, 32) }).
          then(function() { return fake_one.setOne(1) }).
          then(function() { return fake_two.setTwo(2) }).
          then(function() { return fake_one.getOne.call() }).
          then(function(result) {
            assert.equal(result, 1);
          }).
          then(function() { return fake_two.getTwo.call() }).
          then(function(result) {
            assert.equal(result, 2);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should be able to use the fallback contract for unknown signatures", function(done) {
    var resolver, ether_router;
    var theAnswer;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_answer = TheAnswer.at(ether_router.address);
        TheAnswer.deployed().
          then(function(result) { theAnswer = result; }).
          then(function() { return resolver.register("getAnswer()", 0, 0) }).
          then(function() { return resolver.setFallback(theAnswer.address) }).
          then(function() { return fake_answer.getAnswer.call() }).
          then(function(result) {
            assert.equal(result, 42);
            done();
          }).catch(done);
      }).catch(done);
  });

  it("should allow variable-return functions to lookup their return size if possible", function(done) {
    var key = 42;
    var resolver, ether_router;
    var list;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_list = List.at(ether_router.address);
        List.deployed().
          then(function(result) { list = result; }).
          then(function() { return resolver.register("setList(uint256,uint256[])", list.address, 0) }).
          then(function() { return resolver.register("getAll(uint256)", list.address, 0) }).
          then(function() { return resolver.registerLengthFunction("getAll(uint256)", "getReturnSize(uint256)", list.address) }).
          then(function() { return fake_list.setList(key, [0,1,2,3,4,5,6]) }).
          then(function() { return fake_list.getAll.call(key) }).
          then(function(result) {
            assert.equal(result.length, 7);
            assert.equal(result[0], 0);
            assert.equal(result[1], 1);
            assert.equal(result[2], 2);
            assert.equal(result[3], 3);
            assert.equal(result[4], 4);
            assert.equal(result[5], 5);
            assert.equal(result[6], 6);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should propagate errors", function(done) {
    var resolver, ether_router;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_thrower = Thrower.at(ether_router.address);
        Thrower.deployed().
          then(function(result) { return resolver.register("throws()", result.address, 0); }).
          then(function() { return fake_thrower.throws() }).
          then(assert.fail, function(err) { done(); }).
          catch(done);
      }).catch(done);
  });

  it("should be able to pass ether to payable functions", function(done) {
    var resolver, ether_router;
    var payableContract;

    Resolver.new(0).
      then(function(result) { resolver = result }).
      then(function() { return EtherRouter.new(resolver.address); }).
      then(function(result) { ether_router = result }).
      then(function() {return resolver.setRouter(ether_router.address)}).
      then(function() {
        var fake_payable = PayableContract.at(ether_router.address);
        PayableContract.deployed().
          then(function(result) { payableContract = result; }).
          then(function() { return resolver.setFallback(payableContract.address); }).
          then(function() { return fake_payable.payFunction({value: 10}) }).
          then(function() { return fake_payable.sentAmount.call() }).
          then(function(result) {
            assert.equal(result, 10);
            done();
          }).catch(done)
      }).catch(done)
  });
});
