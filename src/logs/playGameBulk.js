const fs = require('fs');
const path = require("path");
const {Web3} = require("web3");
const Conf = require('../config');


let eventPlayGame = async function (instanceContract, startBlock, endBlock) {
    const logs = await instanceContract.getPastEvents('PlayGame',  {fromBlock: startBlock, toBlock: endBlock});
    console.log("PlayGame");
    if (logs.length > 0) {
        for (let index = 0; index < logs.length; index++) {
            console.log(logs[index].returnValues.numberArr.toString())
        }
    }
}

async function listenEvent() {
    try {
        const web3server = new Web3(Conf.Config.FTM_RPC)

        let pathABI = path.join(__dirname, '../abis/RollingGame.json')
        let abi = fs.readFileSync(pathABI, {
            encoding: 'utf-8'
        });
        let loadABI = JSON.parse(abi);

        let rollingGameContract =  new web3server.eth.Contract(loadABI, Conf.Config.ROLLING_GAME_CONTRACT);

        let getBlockCurrent = await web3server.eth.getBlock("latest");
        getBlockCurrent = getBlockCurrent.number.toString();
        let startBlock = Conf.Config.FILTER_FROM_BLOCK;

        console.log({startBlock: startBlock, endBlock: getBlockCurrent})
        await eventPlayGame(rollingGameContract, startBlock, getBlockCurrent);
        console.log(`*** Scan fromBlock: ${startBlock} to endBlock: ${getBlockCurrent} success! ***`)
    } catch (err) {
        console.error(`[logs.playGame] ERROR: ${err}`);
        throw err;
    }
}

async function getLogs() {
    await listenEvent();
}

async function main() {
    console.log("start")
    await getLogs();
    console.log("end.")
}

main();
