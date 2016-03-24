angular.module("cur_con", [])
	.controller("mainController", [function(){
		var self = this;
		self.cabeceras = ["EUR - Euro", "USD - Dólar estadounidense", "GBP - Libra esterlina"];
		self.aEuro = [
			{
				currency: "EUR - Euro",
				valor: 1
			},
			{
				currency: "USD - Dólar estadounidense",
				valor: 1
			},
			{
				currency: "GBP - Libra esterlina",
				valor: 1
			}
		];

		self.monedas = [
			{
				currency: "EUR - Euro",
				valor: 1
			},
			{
				currency: "USD - Dólar estadounidense",
				valor: 1.2
			},
			{
				currency: "GBP - Libra esterlina",
				valor: 0.71
			}
		];
	}]);

