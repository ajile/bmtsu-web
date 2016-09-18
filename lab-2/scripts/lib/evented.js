"use strict";

(function(namespace) {

	namespace.Evented = Evented;

	function Evented() {
		this._listeners = { };
	}

	Evented.prototype.on = function(eventName, fn) {
		this._listeners[eventName] = this._listeners[eventName] || [];
		this._listeners[eventName].push(fn);
	};

	Evented.prototype.trigger = function(...args) {
		this._listeners[args.shift()].forEach(fn => {
			fn.apply(null, args);
		})
	};

})(window.Application);