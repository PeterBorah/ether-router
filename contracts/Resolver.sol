import "mocks/TheAnswer.sol";
import "mocks/Multiplier.sol";
import "mocks/Lost.sol";

contract Resolver {
  struct Pointer { address destination; uint outsize; }
  mapping (bytes4 => Pointer) public lookup;

  function Resolver() {
    TheAnswer the_answer = new TheAnswer();
    lookup[bytes4(sha3("getAnswer()"))] = Pointer(address(the_answer), 32);

    Multiplier multiplier = new Multiplier();
    lookup[bytes4(sha3("multiply(uint256,uint256)"))] = Pointer(address(multiplier), 32);

    Lost lost = new Lost();
    lookup[bytes4(sha3("getNumbers()"))] = Pointer(address(lost), 192);
  }
}
