// import fs from "fs"
// import cardanoCliJs from "./init_cardano.js";
// import constants from "../../constant/constants.js";

// const { slot } = cardanoCliJs.queryTip()

function createTimeLockMintScript(account) {

    // let wallet = cardanoCliJs.wallet(account)
    //
    // let mintScript =  {
    //     type: "all",
    //     scripts:[
    //         {
    //             slot: slot + (constants.CARDANO_SLOTS_PER_EPOCH * 5),
    //             type: "before"
    //         },
    //         {
    //             keyHash: cardanoCliJs.addressKeyHash(wallet.name),
    //             type: "sig"
    //         }
    //     ]
    // }
    //
    // fs.writeFileSync(
    //     `${constants.ROOT_DIR}/${constants.CARDANO_POLICIES_PATH}/mint-policy-${account}.json`,
    //     JSON.stringify(mintScript, null, 2)
    // )
    // fs.writeFileSync(
    //     `${constants.ROOT_DIR}/${constants.CARDANO_POLICIES_PATH}/mint-policy-id-${account}.txt`,
    //     cardanoCliJs.transactionPolicyid(mintScript)
    // )
}

function getTimeLockMintScript(account){
    // let wallet = cardanoCliJs.wallet(account)
    //
    // return  {
    //     type: "all",
    //     scripts:[
    //         {
    //             type: "before",
    //             slot: slot + (constants.CARDANO_SLOTS_PER_EPOCH * 5),
    //         },
    //         {
    //             type: "sig",
    //             keyHash: cardanoCliJs.addressKeyHash(wallet.name)
    //         }
    //     ]
    // }

}

export default {
    createTimeLockMintScript,
    getTimeLockMintScript
}