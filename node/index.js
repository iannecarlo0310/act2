import inquirer from 'inquirer';
import generateName from 'sillyname';
import superheroes from 'superheroes';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        type: 'input',
        name: 'valx',
        message: 'What is your name?\n'
    }
  ])
  .then((answers) => {
    const userName = answers.valx;
    const sillyName = generateName();

    const randomIndex = Math.floor(Math.random() * superheroes.length);
    const superHeroName = superheroes[randomIndex];

    console.log('\nHello', userName);
    console.log('your villain name will be', sillyName);
    console.log('and your superhero name will be', superHeroName);

    console.log('\nQR codes are generated');
    console.log('Text file updated');

    function generateQR(text, fileName) {
        const qr_png = qr.image(text, { type: 'png' });
        qr_png.pipe(fs.createWriteStream(fileName));
    }

    generateQR(userName, 'name.png');
    generateQR(sillyName, 'sillyname.png');
    generateQR(superHeroName, 'superheroname.png');

    const logEntry = 'Name: ' + userName + '\nSilly Name: ' + sillyName + '\nSuperhero Name: ' + superHeroName + '\n\n';
    fs.writeFile('myhero.txt', logEntry, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });