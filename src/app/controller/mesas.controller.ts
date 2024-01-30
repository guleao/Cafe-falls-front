import * as angular from 'angular';

class MesasController {
  mesas: any[];

  constructor(MesaService: any) {
    this.mesas = MesaService.getMesas();
  }
}

angular
  .module('app')
  .controller('MesaController', function ($scope, MesaService) {
    $scope.mesas = MesaService.getMesas();
  });
