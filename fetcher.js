/* eslint-disable func-style */

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
    //if answer is not Y then send cancel message and close
    if (answer.toUpperCase() !== 'Y') {
      console.log('Download canceled');
      rl.close();
      return;
    }
    //if response is Y then overwrite file
    downloadFile();
  });
} else {
  //if file does not exist then call downloadFile function
  downloadFile();
}
//this function handles the downloading of the file
function downloadFile() {
  needle.get(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      rl.close();
      return;
    }

    // Check for a successful status code
    if (response.statusCode !== 200) {
      console.error(`Failed to fetch the URL. Status code: ${response.statusCode}`);
      rl.close();
      return;
    }
    
    //write to the filePath. if error occurs write message to inform
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.log('An error occurred:', err);
        rl.close();
        return;
      }

      //if file writes successfully then log success message
      console.log(`Successfully downloaded ${body.length} bytes to ${filePath}`);
      rl.close();
    });
  });
}