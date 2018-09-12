module.exports = {
    path: 'about',
    getComponent(nextState, cb) {
        import('./main').then(component => {
            cb(null, component.default);
        }).catch(err => {
            console.log('Failed to load "about" component', err);
        });
    }
};
