import axios from "axios"
import walletRepository from "../../db/repository/wallet.repository.js"
import wallet from "../service/web3_js/wallet.js"
// import cardanoCliJs from "../service/cardano/init_cardano.js";
import constants from "../constant/constants.js";
import mnemonic from "../service/web3_js/mnemonic.js"


import web3_wallet from "../service/web3_js/wallet.js"

export default {

    // save: async (req, res) => {
    //     let user = req.user.user
    //     let message = "Wallet exists"
    //     let status = "error"
    //     let wallet = wallet_utils.getWallet(user._id)
    //
    //     if (!wallet) {
    //         wallet = wallet_utils.createWallet(user._id)
    //         message = "Wallet created"
    //         status = "success"
    //     }
    //
    //     res.send({
    //         status, message, wallet
    //     });
    // },
    //
    // delete: async (req, res) => {
    //     const result = await walletRepository.delete(req.body);
    //     res.send(result);
    // },
    //
    // list: async (req, res) => {
    //     const result = await walletRepository.list();
    //     res.send(result);
    // },
    //
    // getWallet: async (req, res) => {
    //     let user = req.user.user
    //     let wallet = wallet.getWallet(user._id)
    //
    //     res.send(wallet);
    // },
    //
    // deleteWallet: async (req, res) => {
    //     let user = req.user.user
    //     try {
    //         await wallet_utils.deleteWallet(user._id)
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    //
    //     res.send({
    //         status: "success",
    //         message: "Deleted wallet"
    //     });
    // },
    //
    // getBalance: async (req, res) => {
    //     let user = req.user.user
    //     let balance = null
    //     try {
    //         balance = await wallet_utils.getBalance(user._id)
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    //
    //     if (balance?.value?.lovelace)
    //         balance.value.ada = cardanoCliJs.toAda(balance.value.lovelace)
    //
    //     if (balance?.utxo.length > 0) {
    //         for (let i = 0; i < balance.utxo.length; i++) {
    //             balance.utxo[i].ada = cardanoCliJs.toAda(balance.utxo[i].value.lovelace)
    //
    //         }
    //     }
    //
    //     res.send({
    //         status: "success",
    //         message: "Got balance",
    //         balanceInfo: balance
    //     });
    // },
    //
    // sendAda: async (req, res) => {
    //
    //     // 0. get necessary data
    //     let user = req.user.user
    //     let txData = req.body
    //
    //     // 1. get sender and receiver
    //     const sender = cardanoCliJs.wallet(user._id)
    //     const receiver = txData.receiveAddress
    //
    //     console.log(
    //         "Balance of Sender wallet: " +
    //         cardanoCliJs.toAda(sender.balance().value.lovelace) + " ADA"
    //     )
    //
    //     // 2. create transaction info object
    //     const txInfo = {
    //         txIn: cardanoCliJs.queryUtxo(sender.paymentAddr),
    //         txOut: [
    //             {
    //                 address: sender.paymentAddr,
    //                 value: {
    //                     lovelace: sender.balance().value.lovelace
    //                         - cardanoCliJs.toLovelace(txData.amountAda)
    //                 }
    //             },
    //             {
    //                 address: receiver,
    //                 value: {
    //                     lovelace: cardanoCliJs.toLovelace(txData.amountAda)
    //                 }
    //             }
    //         ]
    //     }
    //     // 3. build the transaction
    //     const raw = cardanoCliJs.transactionBuildRaw(txInfo)
    //
    //     // 4. calculate the fee
    //     const fee = cardanoCliJs.transactionCalculateMinFee({
    //         ...txInfo,
    //         txBody: raw,
    //         witnessCount: 1
    //     })
    //
    //     // 5. pay the fee by subtracting it from the sender utxo
    //     txInfo.txOut[0].value.lovelace -= fee
    //
    //     // 6. build the final transaction
    //     const tx = cardanoCliJs.transactionBuildRaw({...txInfo, fee})
    //
    //
    //     // 7. sign the transaction
    //     const txSigned = cardanoCliJs.transactionSign({
    //         txBody: tx,
    //         signingKeys: [sender.payment.skey]
    //     })
    //
    //
    //     // 8. submit the transaction
    //     const txHash = cardanoCliJs.transactionSubmit(txSigned)
    //
    //     res.send({
    //         user, txData, txHash
    //     });
    // },
    //
    // getTxHistory: async (req, res) => {
    //
    //     let user = req.user.user
    //
    //     let wallet = cardanoCliJs.wallet(user._id)
    //
    //     res.send({ uTxoHistory })
    // },

    createWallet: async (req, res) => {
        let user = req.user.user
        let accounts = req.body
        const mnemonicString      = mnemonic.createMnemonic()
        const entropyFromMnemonic = mnemonic.toEntropy(mnemonicString)


        console.log(accounts)
            // let wallet = web3_wallet.createWallet()

            res.send({
                status:"success",
                message:"Wallet created",
                info: {},
                mnemonic:mnemonicString,
            })
        },
};
