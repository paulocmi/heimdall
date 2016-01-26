var app = angular.module('gatewayConnectorTestApp',['ui.router',"formly","formlyBootstrap"]);

// Definindo Rotas
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('OneCard/Authorization', {
        url: '/Onecard/Authorization',
        templateUrl: 'views/OneCardAuthorization.html',
        controller: 'OneCardController'
    })
    .state('TwoCards', {
        url: '/twocards',
        templateUrl: 'views/TwoCards.html',
        controller: 'TwoCardsController'
    })
    .state('CardGiftCard', {
        url: '/cardgiftcard',
        templateUrl: 'views/CardGiftCard.html',
        controller: 'CardGiftCardController'
    })
    .state('BankIssued', {
        url: '/bankissued',
        templateUrl: 'views/BankIssued.html',
        controller: 'BankIssuedController'
    })
    .state('BankIssuedGiftCard', {
        url: '/bankissuedgiftcard',
        templateUrl: 'views/BankIssuedGiftCard.html',
        controller: 'BankIssuedGiftCardController'
    });

    // Utilizando o HTML5 History API
    // $locationProvider.html5Mode(true);
});
