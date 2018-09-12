module.exports = {
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(0, require('./components').default);
        }, 'home')
    }
}
