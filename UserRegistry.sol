pragma solidity ^0.8.0;

contract UserRegistry {
    mapping(address => bool) public registeredUsers;

    event UserRegistered(address indexed user);

    function register() public {
        registeredUsers[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    function login() public view returns (bool) {
        return registeredUsers[msg.sender];
    }
}
