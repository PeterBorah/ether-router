module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
  deployer.deploy(Resolver);
  deployer.deploy(EtherRouter);
  deployer.deploy(TheAnswer);
  deployer.deploy(Multiplier);
  deployer.deploy(Lost);
  deployer.deploy(SimpleStore);
  deployer.deploy(ResolverAccessor);
  deployer.deploy(SenderChecker);
  deployer.deploy(One);
  deployer.deploy(List);
  deployer.deploy(Thrower);
  deployer.deploy(Two);
};
