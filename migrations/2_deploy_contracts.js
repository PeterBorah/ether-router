module.exports = function(deployer) {
  deployer.deploy([
    Resolver,
    TheAnswer,
    Multiplier,
    Lost,
    SimpleStore,
    ResolverAccessor,
    SenderChecker,
    One,
    Two,
    List,
    Thrower,
    TheNextAnswer
  ]);
};
