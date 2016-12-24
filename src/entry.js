// Vendor code
var angular = require('angular');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngMessages = require('angular-messages');
var ngUIRouter = require('angular-ui-router');

//app
var app = require('app');

//Configs
var routes = require('configs/routes');
var theme = require('configs/themes');
// Controllers
var MainController = require('controllers/MainController');
var DepotController = require('controllers/DepotController');

// Directives

//Services3
var APIService = require('services/APIService');
var DepotService = require('services/DepotService');
var ItemService = require('services/ItemService');

// Templates

var MainTemplate = require('main.html');
var ToolbarTemplate = require('toolbar.html');
var MenuTemplates = require('menu.html');
var DepotTemplate = require('depot.html');


var materialcss = require('angular-material/angular-material.min.css');
var stylesheetsLess = require('stylesheets.less');
