/*!
governify-elasticity-test-sla-router 1.0.0, built on: 2017-06-02
Copyright (C) 2017 ISA group
http://www.isa.us.es/
https://github.com/isa-group/governify-elasticity-test-sla-router

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


'use strict';


/**
 * Module dependecies.
 * */

var jsyaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

/*
 * Export functions and Objects
 */
var config = {
    addConfiguration: _addConfiguration
};

module.exports = config;

/*
 * Implement the functions
 */
function _addConfiguration(uri, encoding) {
    var configString = null;

    if (!uri) {
        throw new Error("Parameter URI is required");
    } else {
        configString = fs.readFileSync(path.join(__dirname, uri), encoding);
    }

    var newConfigurations = jsyaml.safeLoad(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];

    for (var c in newConfigurations) {
        this[c] = newConfigurations[c];
    }

    this.deploymentType = process.env.SLA_ROUTER_DEPLOYMENTTYPE || this.deploymentType;
}

/*
 * Setup default config location
 */
config.addConfiguration('config.yaml', 'utf8');