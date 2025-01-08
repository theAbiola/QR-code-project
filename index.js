import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

/* What we did in this project
1. We use the inquirer npm package to get user input.
2. We use the qr-image npm package to turn the user entered URL into a QR code image.
3. Then finally, we create a txt file to save the user input using the native fs node module.
*/

inquirer
  .prompt([
    /* Pass your questions in here */
    {message: "Enter your URL", name  : "URL"}
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('input3.png'));

    fs.writeFile('input.txt', url, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!', answers.URL);
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });