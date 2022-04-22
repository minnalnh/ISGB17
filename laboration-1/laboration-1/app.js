//Laboration 1

var startsida = "index.html";

const fs = 'fs';
const jsDOM = 'js-dom';

async function readHTML(){
    let indexFil = await fs.readFileSync('index.html').toString();
}
