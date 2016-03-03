all:

	# clean files
	cd templates; rm node_modules.zip package.json;

	# make a blank package.json
	cd templates; echo '{"dependencies":{}}' >> package.json

	# npm install modules
	cd templates; sudo npm install --save \
		archieml \
		browser-sync \
		babel-core \
		babel-loader \
		babel-preset-es2015 \
		cheerio \
		del \
		get-json-lite \
		gulp \
		gulp-autoprefixer \
		gulp-callback \
		gulp-changed \
		gulp-clean-css \
		gulp-file-include \
		gulp-hb \
		gulp-imagemin \
		gulp-notify \
		gulp-plumber \
		gulp-rename \
		gulp-replace \
		gulp-smoosher \
		gulp-stylus \
		gulp-util \
		gulp-zip \
		json-loader \
		request \
		require-dir \
		run-sequence \
		shelljs \
		webpack-stream \
		yargs;

	# make node_modules.zip
	cd templates; zip -q -r node_modules.zip node_modules;

	# rm node_modules
	cd templates; sudo rm -rf node_modules;
