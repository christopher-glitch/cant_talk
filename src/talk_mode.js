let mode = 'can'

const modeChange = () => {
	mode = (mode === 'can')? 'cant' : 'can'
}

const getMode = () => {
	return mode;
}

exports.modeChange = modeChange
exports.getMode = getMode