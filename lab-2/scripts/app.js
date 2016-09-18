"use strict";

(function(namespace) {

	namespace.Application = Application;

	function Application() {

		// Простейшая ORM
		this.store = new Application.Store;

		// Объект корзины
		this.cart = new Application.Cart;

		// Объект списка товаров
		this.list = new Application.List;

		// Элементы
		this.elForm = $("#form-product");
		this.elProducts = $("#products");
		this.elCart = $("#cart");

		this.addListeners();

	};

	Application.prototype.addListeners = function() {

		// Появился новый товар 
		this.store.on("create", record => this.addProductToList(record));

		// Товар был удален
		this.store.on("remove", record => this.removeProduct(record));

		// Добавление товара aka Отправка формы
		this.elForm.on("submit", e => {
			e.preventDefault();
			const name = $("#product_name").val(),
				  price = $("#product_price").val();
			this.store.create("product", { name, price });
		});

		// Выбор элемента в списке
		this.elProducts.on("click", "[type=checkbox]", e => {
			const checkbox = $(e.target);
			const record = checkbox.parents("tr").data("model");
			if (checkbox.is(":checked")) {
				console.log("Adding to cart", record);
				this.addProductToCart(record);
			} else {
				console.log("Remove from cart", record);
				this.removeProductFromCart(record);
			}
		})

		// Удаление элемента в списке
		this.elProducts.on("click", ".product-list_remove .pseudo-link", e => {
			const link = $(e.target);
			const record = link.parents("tr").data("model");
			record.remove();
		})

		// Удаление элемента в списке корзины
		this.elCart.on("click", ".product-list_remove .pseudo-link", e => {
			const link = $(e.target);
			const record = link.parents("tr").data("model");
			this.removeProductFromCart(record);
			$(`#product-${record.id} [type="checkbox"]`).prop('checked', false);
		})

	}

	Application.prototype.addProductToList = function(record) {
		console.debug("Appending product to DOM");
		const row = $(`
			<tr id="product-${record.id}">
				<td class="product-list_remove"><span class="pseudo-link">✖</span></td>
				<td class="product-list_checkbox"><input type="checkbox" value="product-${record.id}"></td>
				<td class="product-list_name">${record.name}</td>
				<td class="product-list_price">${record.price}</td>
			</tr>
		`);
		row.data("model", record);
		this.elProducts.append(row);
	}

	Application.prototype.removeProduct = function(record) {
		console.debug("Remove product from DOM");
		$(`#product-${record.id}`).remove();
		this.removeProductFromCart(record);
	}

	Application.prototype.addProductToCart = function(record) {
		console.debug("Appending product to cart DOM");
		const row = $(`
			<tr id="cart-${record.id}">
				<td class="product-list_remove"><span class="pseudo-link">✖</span></td>
				<td class="product-list_name">${record.name}</td>
				<td class="product-list_price">${record.price}</td>
			</tr>
		`);
		row.data("model", record);
		this.elCart.append(row);
	}

	Application.prototype.removeProductFromCart = function(record) {
		console.debug("Remove product from cart DOM");
		$(`#cart-${record.id}`).remove();
	}

})(window);
