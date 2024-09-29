// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract EventPass {
    struct Event {
        uint256 eventId;
        string name;
        uint256 maxPasses;
        uint256 currentPasses;
        address owner;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => mapping(address => uint256)) public eventPasses;
    uint256 public eventCount = 1;

    event EventCreated(uint256 eventId, string name, uint256 maxPasses);
    event PassPurchased(uint256 eventId, address buyer);
    
    function createEvent(string memory _name, uint256 _maxPasses) public {
        uint256 eventId = eventCount++;
        events[eventId] = Event(eventId, _name, _maxPasses, 0, msg.sender);

        emit EventCreated(eventId, _name, _maxPasses);
    }

    function purchasePass(uint256 _eventId) public {
        Event storage eventInfo = events[_eventId];
        require(eventInfo.currentPasses < eventInfo.maxPasses, "All passes sold out");

        eventPasses[_eventId][msg.sender]++;
        eventInfo.currentPasses++;

        emit PassPurchased(_eventId, msg.sender);
    }

    function getEventInfo(uint256 _eventId) public view returns (Event memory) {
        return events[_eventId];
    }

    function getPassCount(uint256 _eventId, address _owner) public view returns (uint256) {
        return eventPasses[_eventId][_owner];
    }
}