contract('EtherRouter', function(accounts) {
  it("should be able to get back a return value", function(done) {
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_answer = TheAnswer.at(ether_router.address);
        resolver.register("getAnswer()", TheAnswer.deployed().address, 32).
          then(function() { return fake_answer.getAnswer.call() }).
          then(function(result) {
            assert.equal(result, 42);
            done();
          }).catch(done);
      }).catch(done);
  });

  it("should be able to pass along arguments", function(done) {
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_multiplier = Multiplier.at(ether_router.address);
        resolver.register("multiply(uint256,uint256)", Multiplier.deployed().address, 32).
          then(function() { return fake_multiplier.multiply.call(7, 3); }).
          then(function(result) {
            assert.equal(result, 21);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should be able to get multiple return values", function(done) {
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_lost = Lost.at(ether_router.address);
        resolver.register("getNumbers()", Lost.deployed().address, 192).
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
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_simple_store = SimpleStore.at(ether_router.address);
        resolver.register("store(uint256)", SimpleStore.deployed().address, 0).
          then(function() { return resolver.register("getStored()", SimpleStore.deployed().address, 32) }).
          then(function() { return fake_simple_store.store(42) }).
          then(function() { return fake_simple_store.getStored.call() }).
          then(function(result) {
            assert.equal(result, 42);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should be able to read data on the contract", function(done) {
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_resolver_accessor = ResolverAccessor.at(ether_router.address);
        resolver.register("getResolver()", ResolverAccessor.deployed().address, 32).
          then(function() { return fake_resolver_accessor.getResolver.call() }).
          then(function(result) {
            assert.equal(result, resolver.address);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should keep its msg.sender", function(done) {
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_sender_checker = SenderChecker.at(ether_router.address);
        resolver.register("checkSender()", SenderChecker.deployed().address, 32).
          then(function() { return fake_sender_checker.checkSender.call() }).
          then(function(result) {
            assert.equal(result, accounts[0]);
            done();
          }).catch(done)
      }).catch(done)
  });

  it("should allow upgrades that add storage data", function(done) {
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_one = One.at(ether_router.address);
        var fake_two = Two.at(ether_router.address);
        resolver.register("setOne(uint256)", One.deployed().address, 0).
          then(function() { return resolver.register("getOne()", One.deployed().address, 32) }).
          then(function() { return resolver.register("setTwo(uint256)", Two.deployed().address, 0) }).
          then(function() { return resolver.register("getTwo()", Two.deployed().address, 32) }).
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
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_answer = TheAnswer.at(ether_router.address);
        resolver.register("getAnswer()", 0, 0).
          then(function() { return resolver.setFallback(TheAnswer.deployed().address) }).
          then(function() { return fake_answer.getAnswer.call() }).
          then(function(result) {
            assert.equal(result, 42);
            done();
          }).catch(done);
      }).catch(done);
  });

  it("should allow variable-return functions to lookup their return size if possible", function(done) {
    var resolver = Resolver.deployed();
    var key = 42;

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_list = List.at(ether_router.address);
        resolver.register("setList(uint256,uint256[])", List.deployed().address, 0).
          then(function() { return resolver.register("getAll(uint256)", List.deployed().address, 0) }).
          then(function() { return resolver.registerLengthFunction("getAll(uint256)", "getLength(uint256)", List.deployed().address) }).
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
    var resolver = Resolver.deployed();

    EtherRouter.new(resolver.address).
      then(function(ether_router) {
        var fake_thrower = Thrower.at(ether_router.address);
        resolver.register("throws()", Thrower.deployed().address, 0).
          then(function() { return fake_thrower.throws() }).
          then(assert.fail, function(err) { done(); }).
          catch(done);
      }).catch(done);
  });
});
