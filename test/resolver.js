contract('Resolver', function(accounts) {
  it("shouldn't allow non-admins to change the fallback function", function(done) {
    var fallback = Resolver.deployed().address;
    var resolver;

    Resolver.new(fallback).
      then(function(new_resolver) { resolver = new_resolver; }).
      then(function() { return resolver.setFallback(accounts[1], {from: accounts[2]}) }).
      then(assert.fail, function(err) { done(); }).
      catch(done);
  });

  it("shouldn't allow non-admins to register functions", function(done) {
    Resolver.new(0).
      then(function(new_resolver) { resolver = new_resolver; }).
      then(function() { return resolver.register("foo", 0, 0, {from: accounts[2]}) }).
      then(assert.fail, function(err) { done(); }).
      catch(done);
  });

  it("shouldn't allow non-admins to register length functions", function(done) {
    Resolver.new(0).
      then(function(new_resolver) { resolver = new_resolver; }).
      then(function() { return resolver.registerLengthFunction("foo", "bar", 0, {from: accounts[2]}) }).
      then(assert.fail, function(err) { done(); }).
      catch(done);
  });

  it("shouldn't allow non-admins to change admin", function(done) {
    Resolver.new(0).
      then(function(new_resolver) { resolver = new_resolver; }).
      then(function() { return resolver.setAdmin(accounts[1], {from: accounts[2]}) }).
      then(assert.fail, function(err) { done(); }).
      catch(done);
  });

  it("should allow the admin to change the admin", function(done) {
    Resolver.new(0).
      then(function(new_resolver) { resolver = new_resolver; }).
      then(function() { return resolver.setAdmin(accounts[1]) }).
      then(function() { return resolver.admin() }).
      then(function(result) {
        assert.equal(result, accounts[1]);
        done();
      }).catch(done);
  });

  it("should allow itself to be replaced by a newer version", function(done) {
    var first_resolver;
    var second_resolver;
    var fake_answer;

    Resolver.new(TheAnswer.address).
      then(function(result) { first_resolver = result; }).
      then(function() { return Resolver.new(TheNextAnswer.address); }).
      then(function(result) { second_resolver = result; }).
      then(function() { return EtherRouter.new(first_resolver.address); }).
      then(function(result) { fake_answer = TheAnswer.at(result.address); }).
      then(function() { return fake_answer.getAnswer() }).
      then(function(result) {
        assert.equal(result, 42);
      }).
      then(function() { return first_resolver.replace(second_resolver.address); }).
      then(function() { return fake_answer.getAnswer() }).
      then(function(result) {
        assert.equal(result, 43);
        done();
      }).catch(done);
  });

  it("should not allow anyone but admin to set a replacement", function(done) {
    var resolver;

    Resolver.new(0).
      then(function(result) { resolver = result; }).
      then(function() { return resolver.replace(accounts[1], {from: accounts[2]}) }).
      then(assert.fail, function(err) { done(); }).
      catch(done);
  });
});
