"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/MetaMask/eth-simple-keyring#the-keyring-class-protocol
const events_1 = require("events");
const web3_utils_1 = require("web3-utils");
const ethereumjs_util_1 = require("ethereumjs-util");
const keyringType = 'Watch Address';
function sanitizeHex(hex) {
    hex = hex.substring(0, 2) === '0x' ? hex.substring(2) : hex;
    if (hex === '') {
        return '';
    }
    hex = hex.length % 2 !== 0 ? '0' + hex : hex;
    return '0x' + hex;
}
class WatchKeyring extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        this.type = keyringType;
        this.accounts = [];
        this.accountToAdd = '';
        this.setAccountToAdd = (account) => {
            this.accountToAdd = account;
        };
        this.addAccounts = () => __awaiter(this, void 0, void 0, function* () {
            if (!(0, web3_utils_1.isAddress)(this.accountToAdd)) {
                throw new Error("The address you're are trying to import is invalid");
            }
            const prefixedAddress = (0, ethereumjs_util_1.addHexPrefix)(this.accountToAdd);
            if (this.accounts
                .map((x) => x.toLowerCase())
                .includes(prefixedAddress.toLowerCase())) {
                throw new Error("The address you're are trying to import is duplicated");
            }
            this.accounts.push(prefixedAddress);
            return [prefixedAddress];
        });
        this.deserialize(opts);
    }
    serialize() {
        return Promise.resolve({
            accounts: this.accounts,
        });
    }
    deserialize(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (opts.accounts) {
                this.accounts = opts.accounts;
            }
        });
    }
    // pull the transaction current state, then resolve or reject
    signTransaction(address, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: split by protocol(walletconnect, cold wallet, etc)
            throw new Error('Can not sign with watch address');
        });
    }
    signPersonalMessage(address, message) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Can not sign with watch address');
        });
    }
    signTypedData(address, data) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Can not sign with watch address');
        });
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accounts.slice();
        });
    }
    removeAccount(address) {
        if (!this.accounts.map((a) => a.toLowerCase()).includes(address.toLowerCase())) {
            throw new Error(`Address ${address} not found in watch keyring`);
        }
        this.accounts = this.accounts.filter((a) => a.toLowerCase() !== address.toLowerCase());
    }
    _normalize(buf) {
        return sanitizeHex((0, ethereumjs_util_1.bufferToHex)(buf).toString());
    }
}
WatchKeyring.type = keyringType;
exports.default = WatchKeyring;
