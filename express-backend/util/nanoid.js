const customAlphabet = require('nanoid').customAlphabet

const alphabet = "abcdefghijklmnopqrstuvwxyz123456789"

const nanoid = customAlphabet(alphabet,12)

module.exports = nanoid