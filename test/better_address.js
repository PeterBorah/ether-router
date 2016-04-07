contract('BetterAddress', function(accounts) {
  it("should be able to invoke a function", function(done) {
    var better_address = BetterAddress.deployed();
    var counter = Counter.deployed();

    // Create an interface to BetterAddress that uses the ABI for Counter,
    // so that Counter functions can be invoked through BetterAddress
    var fake_counter = Counter.at(better_address.address);

    better_address.set_destination(counter.address).
      then(function() { return fake_counter.ping() }).
      then(function() { return counter.count.call() }).
      then(function(result) {
        assert.equal(result, 1);
        done();
      }).catch(done)
  });

  it("should be able to get back a return value", function(done) {
    var better_address = BetterAddress.deployed();
    var fake_answer = TheAnswer.at(better_address.address);

    better_address.set_destination(TheAnswer.deployed().address).
      then(function() { return fake_answer.getAnswer.call() }).
      then(function(result) {
        assert.equal(result, 42);
        done();
      }).catch(done)
  });

  it("should be able to pass along arguments", function(done) {
    var better_address = BetterAddress.deployed();
    var multiplier = Multiplier.deployed();

    var fake_multiplier = Multiplier.at(better_address.address);

    better_address.set_destination(Multiplier.deployed().address).
      then(function() { return fake_multiplier.multiply.call(7, 3) }).
      then(function(result) {
        assert.equal(result, 21);
        done();
      }).catch(done)
  });

  xit("should be able to get multiple return values", function(done) {
    var better_address = BetterAddress.deployed();
    var fake_double_answer = TheDoubleAnswer.at(better_address.address);

    better_address.set_destination(TheDoubleAnswer.deployed().address).
      then(function() { return fake_double_answer.getAnswer.call() }).
      then(function(result) {
        assert.equal(result[0], 42);
        assert.equal(result[1], 42);
        done();
      }).catch(done)
  });
});
