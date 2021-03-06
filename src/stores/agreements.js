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

var storeClient = require('../clients/datastore-client'),
    metricsStore = require('../stores/metrics'),
    logger = require('../logger/logger');

var users = {};

module.exports = {
    put: _put,
    get: _get,
    getOne: _getOne,
    getMetricValue: _getMetricValue
};

function _put(user) {
    if (!users[user]) {
        storeClient.getAgreementById(user).then(function (agreement) {
            users[user] = agreement;
            metricsStore.setUpAvailability(user);
        }, function (err) {
            logger.error(err.toString());
        });
    }
}

function _get() {
    return users;
}

function _getOne(user) {
    return users[user];
}

function _getMetricValue(user, metric) {
    return users[user].terms.metrics[metric].value;
}