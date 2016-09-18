"use strict";

(function(namespace) {

	namespace.ProductFactory = ProductFactory;

	function ProductFactory() {}

	ProductFactory.lastID = 0;

	ProductFactory.prototype.pk = function(data) {
		return ++ProductFactory.lastID;
	};

	ProductFactory.prototype.create = function(data) {
		data.id = this.pk();
		return new Promise(resolve => {
			resolve(new namespace.ProductModel(data));
		});
	};

})(window.Application);