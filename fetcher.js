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

//choosing if file exists whether to overwrite or not using rl and then close after response.
if (fs.existsSync(filePath)) {
  rl.question('File already exists. Overwrite? (Y/N): ', (answer) => {
    //if answer is not Y then send cancel message
    if (answer.toUpperCase() !== 'Y') {
      console.log('Download canceled');
      rl.close();
      return;
    }
    //if response is Y then overwrite file
    downloadFile();
  });
} else {
  //if file does not exist then download and create file in location
  downloadFile();
}