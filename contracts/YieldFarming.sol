// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./YieldFarmingToken.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./abdk-libraries-solidity/ABDKMathQuad.sol";

contract YieldFarming is Ownable {
    using SafeERC20 for YieldFarmingToken;
    using ABDKMathQuad for bytes16;

    YieldFarmingToken immutable private token;

    bytes16 private immutable oneDay;
    bytes16 private interestRate;
    bytes16 private multiplier;
    uint public tokenomicsTimestamp;

    constructor(string memory _tokenName, string memory _tokenSymbol, bytes16 _interestRate, bytes16 _multiplier){
        oneDay = ABDKMathQuad.fromUInt(1 days);
        updateTokenomics(_interestRate, _multiplier);
        token = new YieldFarmingToken(_tokenName, _tokenSymbol);
    }

    function updateTokenomics(bytes16 _newInterestRate, bytes16 _newMultiplier) public onlyOwner{
        interestRate = _newInterestRate;
        multiplier = _newMultiplier;
        tokenomicsTimestamp = block.timestamp;
    }

    function deposit() payable public{
        token.mint(_msgSender(),
            multiplier.mul(ABDKMathQuad.fromUInt(msg.value))
            .div(
                ABDKMathQuad.fromUInt(1)
                .add(interestRate)
                .pow(
                    ABDKMathQuad.fromUInt(block.timestamp - tokenomicsTimestamp)
                    .div(oneDay)
                )
            )
            .toUInt()
        );
    }
}