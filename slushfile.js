'use strict';

var gulp        = require('gulp');
var inquirer    = require('inquirer');
var runSequence = require('run-sequence');
var shell       = require('shelljs');
var request     = require('request');
var fs          = require('fs');
var moment      = require('moment');
var s           = require('underscore.string');
var pkg         = require('./package.json');

function getGraphicName() {
	return [moment().format('YYYY-MM-DD'), s.slugify(shell.pwd().split('/').slice(-1)[0])].join('_');
}

function initGitRepo() {
	shell.exec('git init');
	shell.exec('git add .');
	shell.exec('git commit -m "first commit"');
}

function pushGitRepo() {
	shell.exec('git push -u origin master');
}

gulp.task('copy-templates-directory', function(done) {

	// make user feel at ease
	console.log('*** Scaffolding app. Take a deep breath. ***');

	gulp.src(__dirname + '/templates/**', {dot: true})
		.pipe(gulp.dest('./'))
		.on('finish', function() {

			// unzip node modules
			shell.exec('unzip -q node_modules.zip');
			shell.exec('rm -rf node_modules.zip');

			// add correct year to LICENSE
			shell.sed('-i', '||YEAR||', new Date().getFullYear(), 'LICENSE');

			// add correct graphic name to README
			shell.sed('-i', /APPNAME/g, getGraphicName(), 'README.md');

			// add webpack
			inquirer.prompt([
				{
					type: 'confirm',
					name: 'webpack',
					message: 'Add webpack?',
					default: false
				}
			], function(answers) {

				var files = [
					'gulp-tasks/js-webpack.js',
					'src/js/main-webpack.js',
					'src/html/partials/base/base-js-webpack.hbs'
				];

				if (answers.webpack) {

					files.forEach(function(f) {
						shell.mv('-f', f, f.replace('-webpack', ''));
					});

				} else {

					shell.rm('-f', files);

				}

				done();
			});

		});
});

gulp.task('add-to-git-repo', function(done) {

	var hasHub = shell.which('hub');
	var choices = ['None', 'Bitbucket'];
	if (hasHub) {
		choices.push('GitHub');
	}

	inquirer.prompt([
		{
			type: 'list',
			name: 'git',
			message: 'Add ' + getGraphicName() + ' to git repository?',
			choices: choices
		}
	], function(answers) {

		switch (answers.git) {

			case 'None':
				done();
			break;
			case 'Bitbucket':
				inquirer.prompt([
					{
						type: 'input',
						name: 'username',
						message: 'Enter your Bitbucket username'
					}
				], function(innerAnswers) {

					initGitRepo();
					shell.exec('curl -X POST -v -u ' + innerAnswers.username + ' -H "Content-Type: application/json" https://api.bitbucket.org/2.0/repositories/bostonglobe/' + getGraphicName() + ' -d \'{"scm": "git", "is_private": "true" }\'');

					shell.exec('git remote add origin https://' + innerAnswers.username + '@bitbucket.org/bostonglobe/' + getGraphicName() + '.git');
					pushGitRepo();
					done();
				});

			break;
			case 'GitHub':
				initGitRepo();
				shell.exec('hub create BostonGlobe/' + getGraphicName() + ' -p');
				pushGitRepo();
				done();
			break;
		}

	});
});

gulp.task('setup-ssh', function(done) {
	inquirer.prompt([
		// {
		// 	type: 'input',
		// 	name: 'username',
		// 	message: 'Enter your shell username'
		// },
		{
			type: 'input',
			name: 'path',
			message: 'Enter the path to your app [year]/[month]/[graphic-name]'
		}],
		function(answers) {
			// var username = "'" + answers.username + "'";
			// shell.exec('echo "module.exports = ||USERNAME||;" >> username.js');
			// shell.sed('-i', '||USERNAME||', username, 'username.js');
			shell.sed('-i', '||PATH-TO-APP||', answers.path, 'config.js');
			done();
		});
});

gulp.task('check-for-updates', function(done) {

	var latestVersion = shell.exec('npm view slush-globeapp version', {silent:true}).output.split('\n')[0];

	var installedVersion = pkg.version;

	if (latestVersion !== installedVersion) {

		console.log('Your version of slush-globeapp is outdated. Please update and try again.');
		shell.exit(1);

	} else{

		done();
	}

});

gulp.task('default', function(done) {

	runSequence(
		'check-for-updates',
		'copy-templates-directory',
		// 'add-to-git-repo',
		'setup-ssh',
		done
	);
});
