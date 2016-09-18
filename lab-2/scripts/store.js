"use strict";

(function(namespace) {

	namespace.Store = Store;

	function Store() {
		namespace.Evented.prototype.constructor.call(this);
		this.collections = {};
		this.factories = {
			product: new namespace.ProductFactory()
		};
	}

	Store.prototype = Object.create(namespace.Evented.prototype);

	Store.prototype.create = function(type, data) {
		console.log(`Creating ${type}`);
		if (!this.factories[type]) { throw new Error(`There is no ${type} factory`); }
		this.collections[type] = this.collections[type] || [];
		return new Promise(resolve => {
			this.factories[type].create(data).then(record => {
				console.log(`Created ${type}-record`, record);
				resolve(record);
			});
		}).then((record) => {
			this.collections[type].push(record);
			record.on("remove", () => this.remove(record));
			this.trigger("create", record);
		});
	}

	Store.prototype.remove = function(record) {
		console.log(`Removing record #${record.id}`);
		for (var i = this.collections[record.type].length - 1; i >= 0; i--) {
			if(this.collections[record.type][i] === record) {
				this.collections[record.type].splice(i, 1);
				record.removed = true;
			}
		}
		this.trigger("remove", record);
	}

	Store.prototype.addListeners = function() {
		console.log("Add Listeners");
	}

})(window.Application);