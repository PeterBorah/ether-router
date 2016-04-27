contract ResolverAccessor {
  address resolver;

  function getResolver() returns(address) {
    return resolver;
  }
}
