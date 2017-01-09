pragma solidity ^0.4.2;
contract ResolverAccessor {
  address resolver;

  function getResolver() returns(address) {
    return resolver;
  }
}
