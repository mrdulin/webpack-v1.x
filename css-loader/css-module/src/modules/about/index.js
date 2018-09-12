module.exports = {
    path: 'about',
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(0, require('./main').default);
        }, 'about')
    }
}
