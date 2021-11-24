import pinataSDK from "@pinata/sdk"

const pinata = pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_API_SECRET
);


async function testAuthToPinata(){

    return new Promise((resolve, reject) => {

        pinata.testAuthentication().then((result) => {
            //handle successful authentication here
            resolve(result)
        }).catch((err) => {
            //handle error here
            reject(err)
        });
    })
}

async function pinToIpfs(readableStream){
    console.log("FN CALLED TO PIN")
    return new Promise((resolve, reject) => {
        pinata.pinFileToIPFS(readableStream).then((result) => {
            console.log("RESULT RECEIVED")
            console.log(result)
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

export default {
    testAuthToPinata,
    pinToIpfs,
}