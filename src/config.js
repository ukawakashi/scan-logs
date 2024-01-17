require('dotenv').config();


let Config = {
    FILTER_FROM_BLOCK: process.env.FILTER_FROM_BLOCK,
    FILTER_TO_BLOCK: process.env.FILTER_TO_BLOCK,
    FTM_RPC: process.env.FTM_RPC,
    ROLLING_GAME_CONTRACT: process.env.ROLLING_GAME_CONTRACT,
};

module.exports.Config = Config;
