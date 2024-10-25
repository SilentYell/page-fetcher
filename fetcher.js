//importing needle, fs, and readline
const needle = require('needle');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//variables created for pulling url and then filePath next
const url = process.argv[2];
const filePath = process.argv[3];
