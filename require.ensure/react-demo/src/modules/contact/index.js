module.exports = {
    path: 'contact',
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(0, require('./components').default);
        }, 'contact')
    }
}
