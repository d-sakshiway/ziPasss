/* const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; 
const web3 = new Web3(window.ethereum);

async function connectWallet() {
  await window.ethereum.enable();
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
}

async function createEvent() {
  const eventName = document.getElementById("eventName").value;
  const maxPasses = document.getElementById("maxPasses").value;

  const contract = new web3.eth.Contract(abi, contractAddress);
  const result = await contract.methods.createEvent(eventName, maxPasses).send({ from: accounts[0] });
  console.log(result);
  const eventId = result.events.EventCreated.returnValues.eventId;
  const eventInfo = await contract.methods.getEventInfo(eventId).call();
  document.getElementById("eventInfo").innerHTML = `Event Name: ${eventInfo.name}<br>Max Passes: ${eventInfo.maxPasses}<br>Current Passes: ${eventInfo.currentPasses}`;

}

async function purchasePass() {
  const eventId = document.getElementById("eventId").value;

  const contract = new web3.eth.Contract(abi, contractAddress);
  const result = await contract.methods.purchasePass(eventId).send({ from: accounts[0] });
  console.log(result);
}

async function getEventInfo() {
  const eventId = document.getElementById("eventId").value;

  const contract = new web3.eth.Contract(abi, contractAddress);
  const result = await contract.methods.getEventInfo(eventId).call();
  document.getElementById("eventInfo").innerHTML = `Event Name: ${result.name}<br>Max Passes: ${result.maxPasses}<br>Current Passes: ${result.currentPasses}`;
}

async function getPassCount() {
  const eventId = document.getElementById("eventId").value;
  const owner = accounts[0];

  const contract = new web3.eth.Contract(abi, contractAddress);
  const result = await contract.methods.getPassCount(eventId, owner).call();
  document.getElementById("passCount").innerHTML = `Your Pass Count: ${result}`;
}

document.getElementById("createEvent").addEventListener("click", createEvent);
document.getElementById("purchasePass").addEventListener("click", purchasePass);
document.getElementById("eventId").addEventListener("change", getEventInfo);
document.getElementById("eventId").addEventListener("change", getPassCount);

connectWallet();

*/

const Web3 = require('web3');
const contractAbi = require('./myevent.json'); // Replace with your ABI

const web3 = new Web3('https://neoxt4scan.ngd.network/'); // Replace with your Neox node URL

const contractAddress = '0xe59cA23D13461EA3814457c8E4ACD00Db9f977c2'; // Replace with your contract address

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Create an event
async function createEvent(eventName, maxPasses) {
  const result = await contract.methods.createEvent(eventName, maxPasses).send({ from: '0xYourWalletAddress' }); // Replace with your wallet address
  console.log('Event created:', result);
}

// Purchase a pass
async function purchasePass(eventId) {
  const result = await contract.methods.purchasePass(eventId).send({ from: '0xYourWalletAddress' }); // Replace with your wallet address
  console.log('Pass purchased:', result);
}

// Get event information
async function getEventInfo(eventId) {
  const result = await contract.methods.getEventInfo(eventId).call();
  console.log('Event information:', result);
}

// Get pass count
async function getPassCount(eventId, owner) {
  const result = await contract.methods.getPassCount(eventId, owner).call();
  console.log('Pass count:', result);
}

// Example usage
createEvent('My Event', 100);
purchasePass(1);
getEventInfo(1);
getPassCount(1, '0xYourWalletAddress'); // Replace with your wallet address