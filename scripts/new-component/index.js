const _ = require('lodash');
const fs = require('fs');
const handlebars = require('handlebars');

const prompt = require('../utils/prompt');
const yesNo = require('../utils/yes-no');

const componentsPath = 'src/components/';
const templateDir = 'scripts/new-component/templates/';
const reducersFile = 'src/reducers.js';
const reducersImportComment = '/* new imports go here - do not remove or change this line */';
const reducersUseComment = '/* new reducers go here - do not remove or change this line */';

/* eslint-disable no-console */

function buildFromTemplate(templateName, values, toDirectory, newExtension) {
  const templateFileName = templateDir + templateName;
  const template = fs.readFileSync(templateFileName, 'utf8');
  const result = handlebars.compile(template)(values);
  const newFileName = templateName.replace('.tmpl', _.isString(newExtension) ? newExtension : '.js');
  fs.writeFileSync(`${toDirectory}/${newFileName}`, result);
}

function insertLineIntoFile(fileLocation, lineToGoBefore, lineToInsert) {
  const fileContents = fs.readFileSync(fileLocation, 'utf8');
  const newFileContents = fileContents.replace(lineToGoBefore, `${lineToInsert}\n${lineToGoBefore}`);
  fs.writeFileSync(fileLocation, newFileContents);
}

async function run() {
  const name = await prompt('What is the name for your component? ');
  if (!_.trim(name)) {
    console.error('ERROR: Component name must be provided');
    return;
  }
  const names = {
    directory: _.kebabCase(name),
    component: _.upperFirst(_.camelCase(name)),
    camelCase: _.camelCase(name),
  };

  // create directory
  if (!fs.existsSync(componentsPath)) {
    try {
      fs.mkdirSync(componentsPath);
    } catch (error) {
      console.error(error.message);
      return;
    }
  }
  const dirPath = componentsPath + names.directory;
  try {
    fs.mkdirSync(dirPath);
  } catch (error) {
    console.error(error.message);
    return;
  }

  const hasActions = yesNo(await prompt('Do you want actions? (Y/N) '));
  if (hasActions) {
    buildFromTemplate('actions.tmpl', names, dirPath);
    buildFromTemplate('actions.test.tmpl', names, dirPath);
  }

  if (yesNo(await prompt('Do you want reducers? (Y/N) '))) {
    buildFromTemplate('reducer.tmpl', { ...names, hasActions }, dirPath);
    buildFromTemplate('reducer.test.tmpl', { ...names, hasActions }, dirPath);
    // insert reducer into main reducers
    const importLine = `import ${names.camelCase} from './components/${names.directory}/reducer';`;
    insertLineIntoFile(reducersFile, reducersImportComment, importLine);
    const useLine = `  ${names.camelCase},`;
    insertLineIntoFile(reducersFile, reducersUseComment, useLine);
  }

  const hasCss = yesNo(await prompt('Do you want Sass (css preprocessor) styles? (Y/N) '));
  if (hasCss) {
    buildFromTemplate('index.scss.tmpl', names, dirPath, '');
  }

  // create index.js file and test
  buildFromTemplate('index.tmpl', { ...names, hasActions, hasCss }, dirPath);
  buildFromTemplate('index.test.tmpl', names, dirPath);
}

run();
