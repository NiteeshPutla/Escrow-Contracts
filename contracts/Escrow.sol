// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Escrow {
    address public payer;
    address payable public payee;
    address public lawyer;
    uint public amount;

    bool public workDone;


    constructor(
        address _payer,
        address payable _payee,
        uint _amount){
            payer=_payer;
            payee=_payee;
            lawyer=msg.sender;
            amount=_amount;
            workDone=false;
        }

    function deposit()public payable{
        require(msg.sender==payer,"sender not the payer");
        require(address(this).balance<=amount,"cannot send more than escrow amount");
    }
        
    function submitWork()external{
        require(msg.sender==payee,"sender must be the payeee");
        workDone=true;
    }
    function release()public{
        require(msg.sender==lawyer,"only lawyer can release the funds");
        require(address(this).balance==amount,"cannot release funds insufficient amount");
        require(workDone==true,"work is not yet completed");

        payee.transfer(amount);
    }

    function balanceOf()view public returns(uint){
        return address(this).balance;
    }
}