// Copyright 2014-2015 the project authors as listed in the AUTHORS file.
// All rights reserved. Use of this source code is governed by the
// license that can be found in the LICENSE file.

var fs = require('fs');
var path = require('path');

const PAGE_HEIGHT = 100;
const PAGE_WIDTH = 100;

var Server = function() {
}

Server.getDefaults = function() {
  return { 'title': 'Onetime',
           'serverPort': 3000 };
}


Server.getTemplateReplacments = function(request) {
  var config = Server.config;
  var replacements = [{ 'key': '<PAGE_TITLE>', 'value': config.title },
                      { 'key': '<UNIQUE_WINDOW_ID>', 'value': config.title },
                      { 'key': '<TOTP_SECRET>', 'value': Server.decryptConfigValue(config.totp_secret) },
                      { 'key': '<PAGE_WIDTH>', 'value': PAGE_WIDTH },
                      { 'key': '<PAGE_HEIGHT>', 'value': PAGE_HEIGHT }];
  return replacements;
}

var sha = fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'jssha', 'src', 'sha.js')).toString();
var totp = fs.readFileSync(path.join(__dirname, 'totp.js')).toString();
var base32 = fs.readFileSync(path.join(__dirname,'base32.js')).toString();
Server.handleSupportingPages = function(request, response) {
  // the main page requires 2 additional javascript files, serve up the one
  // which was requsted
  var query = request.url
  if (query.indexOf('sha') > -1) {
    response.writeHead(200, {'Content-Type': 'text/javascript'})
    response.end(sha)
    return true;
  } else if (query.indexOf('totp') > -1) {
    response.writeHead(200, {'Content-Type': 'text/javascript'})
    response.end(totp)
    return true;
  } else if (query.indexOf('base32') > -1) {
    response.writeHead(200, {'Content-Type': 'text/javascript'})
    response.end(base32)
    return true;
  }
  return false;
}


if (require.main === module) {
  var path = require('path');
  var microAppFramework = require('micro-app-framework');
  microAppFramework(__dirname, Server);
}

module.exports = Server;
