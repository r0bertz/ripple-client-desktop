'use strict';

const BN = require('bn.js');
const extend = require('extend');
const {encode, decode} = require('ripple-address-codec');

const Base = {};

extend(Base, {
  VER_NONE: 1,
  VER_NODE_PUBLIC: 28,
  VER_NODE_PRIVATE: 32,
  VER_ACCOUNT_ID: 0,
  VER_ACCOUNT_PUBLIC: 35,
  VER_ACCOUNT_PRIVATE: 34,
  VER_FAMILY_GENERATOR: 41,
  VER_FAMILY_SEED: 33,
  VER_ED25519_SEED: [0x01, 0xE1, 0x4B]
});

// --> input: big-endian array of bytes.
// <-- string at least as long as input.
Base.encode = function(input, alphabet) {
  return encode(input, {alphabet});
};

// --> input: String
// <-- array of bytes or undefined.
Base.decode = function(input, alphabet) {
  if (typeof input !== 'string') {
    return undefined;
  }
  try {
    return decode(input, {alphabet});
  } catch (e) {
    return undefined;
  }
};

// --> input: Array
// <-- String
Base.encode_check = function(version, input, alphabet) {
  return encode(input, {version, alphabet});
};

// --> input : String
// <-- NaN || BN
Base.decode_check = function(version, input, alphabet) {
  try {
    const decoded = decode(input, {version, alphabet});
    return new BN(decoded);
  } catch (e) {
    return NaN;
  }
};

exports.Base = Base;
