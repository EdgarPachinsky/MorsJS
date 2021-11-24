import bip39 from "bip39"

let createMnemonic = () => {
    return bip39.generateMnemonic()
}

let toEntropy = (mnemonic) => {
    return bip39.mnemonicToEntropy(mnemonic)
}

export default {
    createMnemonic,
    toEntropy
}