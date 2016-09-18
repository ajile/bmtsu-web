"use strict";

(function(namespace) {

	namespace.ProductModel = ProductModel;

	function ProductModel(data) {
		namespace.Evented.prototype.constructor.call(this);
		this.type = ProductModel.type;
		this.removed = false;

		this.id = data.id;
		this.name = data.name;
		this.price = data.price;
	}

	ProductModel.prototype = Object.create(namespace.Evented.prototype);

	ProductModel.type = "product";

	ProductModel.prototype.remove = function() {
		this.trigger("remove");
	};

})(window.Application);
