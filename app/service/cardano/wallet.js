import fs from "fs"
import constants from "../../constant/constants.js";
// import cardanoCliJs from "./init_cardano.js"


function createWallet(account){
    // const payment = cardanoCliJs.addressKeyGen(account);
    // const stake = cardanoCliJs.stakeAddressKeyGen(account);
    // cardanoCliJs.stakeAddressBuild(account);
    // cardanoCliJs.addressBuild(account, {
    //     paymentVkey: payment.vkey,
    //     stakeVkey: stake.vkey,
    // });
    // return cardanoCliJs.wallet(account);
}

function getWallet(account){
    // let existingWallet = null;
    //
    // try {
    //     existingWallet = cardanoCliJs.wallet(account)
    // }catch (e){
    //     console.log(e.message)
    // }
    //
    // return existingWallet
}

async function deleteWallet(account){
    // let dir = `${constants.ROOT_DIR}/priv/wallet/${account}`
    // fs.rmdirSync(dir,{recursive:true})
}

async function getBalance(account){
    // let wallet = cardanoCliJs.wallet(account)
    //
    // if(wallet)
    //     return wallet.balance()
    //
    // return {}
}

export default {
    createWallet,
    getWallet,
    deleteWallet,
    getBalance
}