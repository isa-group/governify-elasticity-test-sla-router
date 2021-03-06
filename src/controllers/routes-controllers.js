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

var logger = require('../logger/logger'),
    routesStore = require('../stores/routes');

module.exports = {
    getRoutingTable: _getRoutingTable,
    getAssignementTable: _getAssignementTable
};

function _getAssignementTable(req, res) {
    logger.controllers("New request to get AssignementTable");
    try {
        res.json(routesStore.getAssignementTable());
    } catch (e) {
        logger.error(e.toString());
        res.status(500).json(new Error(500, e.toString()));
    }
}

function _getRoutingTable(req, res) {
    logger.controllers("New request to get RoutingTable");
    try {
        res.json(routesStore.getRoutingTable());
    } catch (e) {
        logger.error(e.toString());
        res.status(500).json(new Error(500, e.toString()));
    }
}