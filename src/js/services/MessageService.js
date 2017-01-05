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
        showConfirmMessage: function (message,ev,callback) {
            var confirm = $mdDialog.confirm()
                .title('Confirm')
                .textContent(message)
                .targetEvent(ev)
                .ok('OK!')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                callback(true)

            }, function() {
                callback(false)
            });
        }
    };
}]);
