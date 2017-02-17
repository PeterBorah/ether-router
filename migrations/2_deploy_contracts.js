var Migrations = artifacts.require("Migrations.sol");
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
