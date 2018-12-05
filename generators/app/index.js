'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.green('generator-nuxt-express-serverless')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'What is your app/project name?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'appdescription',
        message: 'Description for your project'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      this.destinationPath('package.json'),
      {
        appname: this.answers.appname,
        appdescription: this.answers.appdescription
      }
    );
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    });
  }
};
