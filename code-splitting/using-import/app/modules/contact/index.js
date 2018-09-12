module.exports = {
    path: 'contact',
    getComponent(nextState, cb) {
        import('./main').then(component => {
            cb(null, component.default);
        }).catch(err => {
            console.log('Failed to load "about" component', err);
        });

        // require.ensure([], require => {
        //     cb(null, require('./main'));
        // }, 'contact');
    }
};
