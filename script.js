const fs = require('fs');
const inquirer = require('inquirer');
const { createSVG } = require('svg-builder');
async function generateLogo() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => /^[a-zA-Z0-9]{1,3}$/.test(input),
    },
    
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for the logo:',
      choices: ['circle', 'triangle', 'square'],
    },
    
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ]);

  const { text, textColor, shape, shapeColor } = userInput;
  const svgOptions = {
    width: 300,
    height: 200,
    viewBox: '0 0 300 200',
  };

  const svg = createSVG(svgOptions)
    .addElement({
      type: 'rect',
      x: 0,
      y: 0,
      width: 300,
      height: 200,
      fill: shapeColor,
    })
    .addElement({
      type: 'text',
      x: 150,
      y: 100,
      text: text,
      fill: textColor,
      'text-anchor': 'middle',
      'font-size': '40',
      'font-family': 'Arial',
    });

  const svgString = svg.toString();
  fs.writeFileSync('logo.svg', svgString);
  console.log('Generated logo.svg');
}

generateLogo();
