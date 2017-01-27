var app = require('app');

app
    .config(['$mdThemingProvider', function ($mdThemingProvider) {

        var customOrangeMap = $mdThemingProvider.extendPalette('blue', {
            '500': 'B3286B',

            'contrastDefaultColor': 'light'

        });

        $mdThemingProvider.definePalette('myCustom', customOrangeMap);

        $mdThemingProvider.theme('default')
            .primaryPalette('myCustom',{
                'default' : '500'
            }).accentPalette('grey',{
            'default' : '200'
        });

    }]);