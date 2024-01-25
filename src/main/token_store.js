const Store = require('electron-store');

class TokenStore extends Store {
	constructor (settings) {
		super(settings);
	}

	saveToken(name, token) {
		console.log(name, token);
		this.set('token', [name, token]);
		return this;
	}

	getToken() {
		console.log(this.get('token'));
		return this.get('token') || [];
	}
}

exports.TokenStore = TokenStore;



