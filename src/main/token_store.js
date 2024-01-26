const Store = require('electron-store');

class TokenStore extends Store {
	constructor (settings) {
		super(settings);
	}

	saveToken(name, token) {
		this.set('token', [name, token]);
		return this;
	}

	getToken() {
		return this.get('token') || [];
	}
}

exports.TokenStore = TokenStore;



