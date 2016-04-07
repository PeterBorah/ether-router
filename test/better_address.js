contract('BetterAddress', function(accounts) {
  it("should be able to get back a return value", function(done) {
    var fake_answer = TheAnswer.at(BetterAddress.deployed().address);

      fake_answer.getAnswer.call().
      then(function(result) {
        assert.equal(result, 42);
        done();
      }).catch(done)
  });

  it("should be able to pass along arguments", function(done) {
    var fake_multiplier = Multiplier.at(BetterAddress.deployed().address);

      fake_multiplier.multiply.call(7, 3).
      then(function(result) {
        assert.equal(result, 21);
        done();
      }).catch(done)
  });

  it("should be able to get multiple return values", function(done) {
    var fake_lost = Lost.at(BetterAddress.deployed().address);

      fake_lost.getNumbers.call().
      then(function(result) {
        assert.equal(result[0], 4);
        assert.equal(result[1], 8);
        assert.equal(result[2], 15);
        assert.equal(result[3], 16);
        assert.equal(result[4], 23);
        assert.equal(result[5], 42);
        done();
      }).catch(done)
  });
});
