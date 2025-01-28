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
    /* We Pass the question here */
    { message: "Enter your URL", name: "URL" },
  ])
  .then((answers) => {
    // We store the user feedback inside url constant
    const url = answers.URL;
    var qr_png = qr.image(url); //we pass the url an an argument to the .image() function which comes from qr
    qr_png.pipe(fs.createWriteStream("new-image.png")); //we use the Node fs package to pipe the new .png file into the file system

    fs.writeFile("text-file.txt", url, "utf8", (err) => {
      //we use the fs package to write a new .txt file into the file system
      if (err) throw err;
      console.log("The file has been saved!", answers.URL);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Means if it was a TTY (teletypewriter) error
      console.log("Prompt could not be rendered in the current terminal.");
    } else {
      console.log("Something else went wrong:", error);
    }
  });
