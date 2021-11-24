// import fs from "fs"
// import cardanoCliJs from "./init_cardano.js";
// import constants from "../../constant/constants.js";

function createMintScript(account) {

    // let wallet = cardanoCliJs.wallet(account)
    //
    // let mintScript =  {
    //     keyHash: cardanoCliJs.addressKeyHash(wallet.name),
    //     type: "sig"
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

function getMintScript(account){

    // return {
    //     keyHash: cardanoCliJs.addressKeyHash(cardanoCliJs.wallet(account).name),
    //     type: "sig"
    // }
}

export default {
    createMintScript,
    getMintScript
}