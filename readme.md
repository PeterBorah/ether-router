## EtherRouter

Allows you to have a contract with a stable address, but fully controllable and upgradeable behavior.

### Disclaimer

This library has NOT been security reviewed, pentested, production-hardened, or used in anger. Do not use for any contract intended to control more than, like, $10. There are definitely bugs, and it WILL lose your money.

### NPM

EtherRouter is available on npm as [`ether-router`](https://www.npmjs.com/package/ether-router), and is compatible with [Truffle's beta NPM integration](http://truffleframework.com/tutorials/package-management).

### Basic Usage

Deploy a `Resolver` contract to the blockchain, and point it to the contracts which define the desired behavior. The functions needed to fully configure a `Resolver` are covered in the next section.

Then, deploy an `EtherRouter` contract, passing the address of the `Resolver` as the constructor argument. This contract will function as if it were a normal Solidity contract that implemented the behavior specified in the `Resolver`, but that behavior can be modified as necessary via changes in the `Router`'s configuration.

### Resolver functions

`Resolver.setFallback(address destination)` sets a contract address as the default destination for calls to the router. This address will receive all calls not otherwise configured, and return the first 32 bytes of the return value, if any. If you need a different return size, or multiple destination addresses, use the following two functions for more fine-grained control.

`Resolver.register(string signature, address destination, uint outsize)` allows you to specify a contract that contains the behavior for a given function signature. It also allows you to specify the expected return size in bytes.

`Resolver.registerLengthFunction(string main_signature, string length_signature, address destination)` is specifically for functions that have a dynamic return size. (For example, a function that returns a `uint[]`.) You will need to specify the signature and contract address of another function that takes the same arguments, and returns the number of 32-byte slots that need to be allocated for the return value.

### Writing compatible contracts

For the most part, `EtherRouter`-compatible contracts are just normal Solidity contracts. There are just a couple necessary modifications. 

- Constructor functions will only fire when the contract is originally added to the blockchain, not when an `EtherRouter` is deployed and linked to the contract. You will therefore likely need to move instance-specific initialization out of your constructors and into other functions.

- If your contracts create other contracts, and you wish the subsidiary contracts to take advantage of the same upgradeability, they will need to deploy `EtherRouter`s and follow the same procedure as the contracts you deploy manually.

- The first storage slot in the contract will be used to store the address of the `Resolver`. Therefore, you will need to start your contracts with the following line:
```
Resolver resolver;
``` 

Additionally, when you upgrade a contract that has already stored data on the blockchain, you will need to be sure not to change the organization of your contract's storage. You can safely add new storage variables, but do not delete or re-order existing ones. It may also be risky to change the version of the Solidity compiler used, as there is no guarantee the storage layout will remain the same. I hope to release tools to more robustly handle data storage in the near future.
