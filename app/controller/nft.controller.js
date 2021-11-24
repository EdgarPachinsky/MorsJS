import fs from "fs"
import formidable from "formidable";
import pinataService from "../service/cardano/pinata.js"
import helper from "../service/helper.js";
import NFT_SMC_ADDR from "../service/web3_js/addresses/NFT_SMC_ADDR.js";
import NFT from "../service/web3_js/contracts/NFT.js"
import NFTMarketplace from "../service/web3_js/contracts/NFTMarket.js"
import {web3_http} from "../service/web3_js/init.js";


let sighTransaction = (tx) => {

    return new Promise(async (resolve, reject) => {

        await web3_http.eth.accounts.signTransaction({
            ...tx,
            gas: 3200000
        }, NFT_SMC_ADDR.nft_minter_pKey, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

let getTokenList = (ContractInstanceMethods) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.fetchMarketItems().call((err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}


/**
 *
 * @param ContractInstanceMethods {Object}
 * @param tokenUrl {String}
 * @param minterAddress {String}
 * @param gas {Number}
 * @returns {Promise<unknown>}
 */
let createToken = (
    ContractInstanceMethods,
    tokenUrl,
    minterAddress,
    gas,
) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.createToken(
            tokenUrl
        ).send({
            from: minterAddress,
            gas: gas
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

let getListingPrice = (ContractInstanceMethods) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.getListingPrice().call((err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

/**
 *
 * @param ContractInstanceMethods {Object}
 * @param nft_contract_address {String}
 * @param tokenId {String}
 * @param price {Number}
 * @param tokenOwner {String}
 * @param gas {Number}
 * @param listingPrice {Number}
 * @returns {Promise<unknown>}
 */
let createMarketItem = (
    ContractInstanceMethods,
    nft_contract_address,
    tokenId,
    price,
    tokenOwner,
    gas,
    listingPrice,
) => {

    return new Promise(async (resolve, reject) => {

        console.log(`TRANSFER CALLER FOR TOKEN(${tokenId}) is -> ${NFT_SMC_ADDR.nft_minter}`)
        await ContractInstanceMethods.createMarketItem(
            nft_contract_address, tokenId, price
        ).send({
            from: tokenOwner,
            gas: gas,
            value: listingPrice
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

let getOwner = (ContractInstanceMethods, tokenId) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.ownerOf(tokenId).call((err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

/**
 *
 * @param ContractInstanceMethods {Object}
 * @param addressToCheck {String}
 * @param operator {String}
 * @returns {Promise<unknown>}
 */
let isApproved = (ContractInstanceMethods, addressToCheck, operator) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.isApprovedForAll(addressToCheck, operator).call((err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

let getApprovedAddresses = (ContractInstanceMethods, tokenId) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.getApproved(tokenId).call((err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

let approveAddressForToken = (ContractInstanceMethods, address, tokenId) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.approve(address, tokenId).call((err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

let getTokenURI = (ContractInstanceMethods, tokenId) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.tokenURI(tokenId).call((err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

/**
 *
 * @param ContractInstanceMethods {Object}
 * @param address {String}
 * @returns {Promise<unknown>}
 */
let fetchMyNFTs = (ContractInstanceMethods, address) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.fetchMyNFTs().call({from:address},(err, result) => {

            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

let createSale = (ContractInstanceMethods, nft_contract_address, payAddress, price, itemId) => {

    return new Promise(async (resolve, reject) => {

        await ContractInstanceMethods.createMarketSale(
            nft_contract_address, itemId
        )
            .send({
                from: payAddress,
                value:price,
                gas:3500000,
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export default {

    list: async (req, res) => {

        try {

            const NFTContractInstance = new web3_http.eth.Contract(NFT, NFT_SMC_ADDR.nft_contract_address)
            const NFTMarketplaceContractInstance = await new web3_http.eth.Contract(NFTMarketplace, NFT_SMC_ADDR.nft_market_contract_address)

            const result = await getTokenList(NFTMarketplaceContractInstance.methods)


            let normalizedTokens = []
            for (let item of result) {

                const [ itemId , nftContract , tokenId , seller , owner, wei, sold ] = item;
                const price = web3_http.utils.fromWei(wei,'ether')
                const tokenURL = await getTokenURI(NFTContractInstance.methods, tokenId);

                normalizedTokens.push({
                    itemId , tokenURL , price , sold , tokenId , seller
                })
            }

            res.send({
                status: "success",
                message: "Got NFT list",
                list: normalizedTokens
            })
        } catch (e) {
            return res.send({
                status: "error",
                message: e.message
            })
        }
    },

    create: async (req, res) => {
        let user = helper.getUserFromRequest(req)

        console.log('PARSING FORM')
        const form = formidable({multiples: true});

        try {
            form.parse(req, async (err, fields, files) => {
                if (err)
                    return res.send({
                        status: "error",
                        message: "Form error",
                    })

                let readStream = fs.createReadStream(files.image.path);
                let pinned = await pinataService.pinToIpfs(readStream)
                let imageHashUrl = `https://gateway.pinata.cloud/ipfs/${pinned.IpfsHash}`

                const NFTContractInstance = new web3_http.eth.Contract(NFT, NFT_SMC_ADDR.nft_contract_address)
                const NFTMarketContractInstance = new web3_http.eth.Contract(NFTMarketplace, NFT_SMC_ADDR.nft_market_contract_address)

                let transaction = await createToken(
                    NFTContractInstance.methods,
                    imageHashUrl,
                    NFT_SMC_ADDR.nft_minter,
                    3200000
                )

                console.log("TX")
                console.log(transaction.events)
                let tokenId = transaction.events.Transfer.returnValues.tokenId
                let owner = await getOwner(NFTContractInstance.methods, tokenId)
                let price = web3_http.utils.toWei(fields.price, "ether")
                let listingPrice = await getListingPrice(NFTMarketContractInstance.methods)

                let tokenURI = await getTokenURI(
                    NFTContractInstance.methods,
                    tokenId
                );

                console.log(`OWNER OF TOKEN(${tokenId}) is -> ${owner}`)
                console.log(`TOKEN(${tokenId}) URI is -> ${tokenURI}`)
                console.log(`PRICE OF TOKEN(${tokenId}) is -> ${price} WEI`)
                console.log(`LISTING PRICE OF TOKEN(${tokenId}) is -> ${listingPrice} WEI`)
                console.log(`NAME OF TOKEN -> ${fields.name}`)
                console.log(`DESCRIPTION OF TOKEN -> ${fields.description}`)

                let finalTransaction = {}
                try {
                    finalTransaction = await createMarketItem(
                        NFTMarketContractInstance.methods,
                        NFT_SMC_ADDR.nft_contract_address,
                        tokenId,
                        price,
                        owner,
                        3200000,
                        listingPrice
                    )

                    return res.send({
                        status: "success",
                        message: "NEW NFT CREATED",
                        data: finalTransaction
                    })
                } catch (e) {
                    res.send({
                        status: "error",
                        message: e.message,
                        data: {}
                    })
                }
            })
        } catch (e) {
            res.send({
                status: "error",
                message: e.message,
                data: {}
            })
        }
    },

    buy: async (req, res) => {
        let user = helper.getUserFromRequest(req)

        let address = req.body.address.toLowerCase().toString()
        let itemId = req.body.itemId
        let tokenId = req.body.tokenId
        let price = req.body.price

        // const NFTContractInstance = new  web3_http.eth.Contract(NFT.abi, NFT_SMC_ADDR.nft_contract_address)
        const NFTMarketplaceContractInstance = await new web3_http.eth.Contract(NFTMarketplace, NFT_SMC_ADDR.nft_market_contract_address)
        let priceWei = web3_http.utils.toWei(price, 'ether');

        // const NFTContractInstanceMethods = NFTContractInstance.methods
        // const NFTMarketplaceContractInstanceMethods = NFTMarketplaceContractInstance.methods

        let transaction = await createSale(
            NFTMarketplaceContractInstance.methods,
            NFT_SMC_ADDR.nft_contract_address,
            address,
            priceWei,
            itemId
        )

        console.log(transaction)

        return res.send({
            status:"success",
            message:"transaction done",

        })
    },


    getUserNFTs: async (req, res) => {
        let address = req.body.address

        const NFTContractInstance = new web3_http.eth.Contract(NFT, NFT_SMC_ADDR.nft_contract_address)
        const NFTMarketContractInstance = new web3_http.eth.Contract(NFTMarketplace, NFT_SMC_ADDR.nft_market_contract_address)

        try {
            let result = await fetchMyNFTs(
                NFTMarketContractInstance.methods,
                address
            );

            let normalizedTokens = []
            for (let item of result) {

                const [ itemId , nftContract , tokenId , seller , owner, wei, sold ] = item;
                const price = web3_http.utils.fromWei(wei,'ether')
                const tokenURL = await getTokenURI(NFTContractInstance.methods, tokenId);

                normalizedTokens.push({
                    itemId , tokenURL , price , sold , tokenId , seller
                })
            }

            res.send({
                status: "success",
                message: "Got NFT list",
                list: normalizedTokens
            })

            return res.send({
                status: "success",
                message: "Got list of NFTs",
                data: myNFTs
            })
        }catch (e) {
            return res.send({
                status: "error",
                message: e.message,
                data: {}
            })
        }
    },

    get: async (req, res) => {
        let user = helper.getUserFromRequest(req)
    },



    // save: async (req, res) => {
    //     let user = req.user.user
    //
    //     let imageProcess = {
    //         status: "error",
    //         uploadedToServer: false,
    //         pinToIpfs: false
    //     }
    //
    //     const result = await nftRepository.save(req.body);
    //
    //     const form = formidable({ multiples: true });
    //
    //     form.parse(req, async (err, fields, files) => {
    //
    //         if(err)
    //             return res.send({status:"error",message:err});
    //
    //
    //         try {
    //             let readStream = fs.createReadStream(files.file.path);
    //             let writeStream = fs.createWriteStream(`/var/www/app/nft_assets/${files.file.name}`);
    //             let pinned = await pinataService.pinToIpfs(readStream)
    //
    //             readStream.pipe(writeStream);
    //             readStream.on('end',function(){
    //                 imageProcess.uploadedToServer = true
    //                 fs.unlinkSync(files.file.path);
    //             });
    //
    //
    //             let mintScript = timeLockedMintPolicyService.getTimeLockMintScript(user._id)
    //             let protocolParameters = cardanoCliJs.queryProtocolParameters()
    //             let path = `${constants.ROOT_DIR}/${constants.CARDANO_PROTOCOL_PATH}/protocol.json`
    //
    //             if (!fs.existsSync(path)) {
    //                 fs.writeFileSync(
    //                     path,
    //                     JSON.stringify(protocolParameters, null, 2)
    //                 )
    //             }
    //
    //             // 1. get policy ID
    //             let POLICY_ID = cardanoCliJs.transactionPolicyid(mintScript)
    //
    //             let wallet = cardanoCliJs.wallet(user._id)
    //             let ASSET_NAME = fields.NFT_NAME
    //             let ASSET_DESC = fields.NFT_DESC
    //             let ASSET_AUTHORS = fields.NFT_AUTHORS
    //             let ASSET_ID = `${POLICY_ID}.${ASSET_NAME}`
    //
    //             console.log(ASSET_NAME)
    //             console.log(ASSET_DESC)
    //             console.log(ASSET_DESC)
    //             console.log(ASSET_ID)
    //
    //             const metadata = {
    //                 721: {
    //                     [POLICY_ID]: {
    //                         [ASSET_NAME]: {
    //                             name: ASSET_NAME,
    //                             description: ASSET_DESC,
    //                             image: `ipfs://${pinned.IpfsHash}`,
    //                             type: files.file.type,
    //                             authors:[ASSET_AUTHORS]
    //                         }
    //                     }
    //                 }
    //             }
    //
    //
    //             const tx = {
    //                 txIn: wallet.balance().utxo,
    //                 txOut: [
    //                     {
    //                         address: wallet.paymentAddr,
    //                         value: { ...wallet.balance().value, [ASSET_ID]: 1 }
    //                     }
    //                 ],
    //                 mint: [{
    //                     action: "mint", asset: ASSET_ID, quantity: 1,
    //                     // actions: { type: "mint", quantity: 1, asset: ASSET_ID },
    //                     script: mintScript
    //                 }],
    //                 metadata,
    //                 witnessCount: 2
    //             }
    //
    //             console.log('TX OBJ ' , tx)
    //
    //             const buildTransaction = (tx) => {
    //
    //                 const raw = cardanoCliJs.transactionBuildRaw(tx)
    //                 const fee = cardanoCliJs.transactionCalculateMinFee({
    //                     ...tx,
    //                     txBody: raw
    //                 })
    //
    //                 tx.txOut[0].value.lovelace -= fee
    //
    //                 return cardanoCliJs.transactionBuildRaw({ ...tx, fee })
    //             }
    //
    //
    //             const raw = buildTransaction(tx)
    //
    //             console.log('RAW OBJ ' , raw)
    //
    //             const signTransaction = (wallet, tx) => {
    //
    //                 return cardanoCliJs.transactionSign({
    //                     signingKeys: [wallet.payment.skey, wallet.payment.skey],
    //                     txBody: tx
    //                 })
    //             }
    //
    //             const signed = signTransaction(wallet, raw)
    //
    //             console.log("SIGNED OBJ " , signed)
    //
    //             // 10. Submit transaction
    //             const txHash = cardanoCliJs.transactionSubmit(signed)
    //
    //
    //             console.log(`Transaction success , TX HASH -> ${txHash}`)
    //
    //             // let token = cardanoCliJs.
    //
    //             res.send({
    //                 protocolParameters,
    //                 fields,
    //                 // queryUtxo,
    //                 POLICY_ID,
    //                 // rawTransaction,
    //                 pinned,
    //                 txHash,
    //             })
    //         }catch (e){
    //             console.log(e.message)
    //         }
    //     });
    // },
    //
    // delete: async (req, res) => {
    //     const result = await nftRepository.delete(req.body);
    //     res.send(result);
    // },
    //
    // list: async (req, res) => {
    //     const result = await nftRepository.list();
    //     res.send(result);
    // },
};
