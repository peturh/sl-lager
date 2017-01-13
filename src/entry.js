// Vendor code
var _ = require('underscore');
var angular = require('angular');
var ngMaterial = require('angular-material');
var ngAnimate = require('angular-animate');
var ngMessages = require('angular-messages');
var ngUIRouter = require('angular-ui-router');
var chartjs = require('chart.js');
var moment = require('moment');

//app
var app = require('app');

//Configs
var routes = require('configs/routes');
var theme = require('configs/themes');
// Controllers
var MainController = require('controllers/MainController');
var DepotController = require('controllers/DepotController');
var ItemController = require('controllers/ItemController');
var CategoryController = require('controllers/CategoryController');
var LoginController = require('controllers/LoginController');
var UserController = require('controllers/UserController');
// Directives

var ChartDirective = require('directives/Chart');

//Services
var DepotService = require('services/DepotService');
var ItemService = require('services/ItemService');
var CategoryService = require('services/CategoryService');
var MessageService = require('services/MessageService');
var UserService = require('services/UserService');


// Templates

var MainTemplate = require('main.html');
var ToolbarTemplate = require('toolbar.html');
var MenuTemplates = require('menu.html');
var DepotTemplate = require('depot.html');
var AddItem = require('addItem.html');
var CategoryTemplate = require('category.html');
var ItemTemplate = require('item.html');
var AddDepot = require('addDepot.html');
var AddCategory = require('addCategory.html');
var Login = require('login.html');
var userSettings = require('userSettings.html');
var depotSelection = require('depotSelection.html');

var materialcss = require('angular-material/angular-material.min.css');
var stylesheetsLess = require('stylesheets.less');
