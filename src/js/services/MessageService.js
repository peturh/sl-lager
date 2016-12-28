var app = require('app');

app.service('MessageService', ['$mdToast', '$mdDialog', function ($mdToast, $mdDialog) {
    return {
        showToastMessage: function (message) {
            $mdToast.show(
                $mdToast.simple().textContent(message).position('right').hideDelay(2000)
            );
        },

        showToastError: function (message) {
            $mdToast.show(
                $mdToast.simple().textContent(message).position('right').hideDelay(4000)
            );
        },

        showDialogMessage: function (message, ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .textContent(message)
                    .ok('OK!')
                    .targetEvent(ev)
            );
        },

        /**
         * Think of styling this mdToast differently in future.
         */
        showConfirmMessage: function (message) {
            $mdToast.show(
                $mdToast.simple().textContent(message).position('right').hideDelay(4000)
            );
        }
    };
}]);
