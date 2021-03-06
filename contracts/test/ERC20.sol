pragma solidity =0.5.16;

import '../OxDexERC20.sol';

contract ERC20 is OxDexERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
