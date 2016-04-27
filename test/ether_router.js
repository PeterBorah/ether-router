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
});
