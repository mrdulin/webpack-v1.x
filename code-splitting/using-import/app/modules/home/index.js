module.exports = {
    path: 'home',
    getComponent(nextState, cb) {
        /**
         * import()和require.ensure()都是用来code splitting
         *
         * import()的优点是支持promise，但老旧浏览器可能需要promise的polyfill，
         * 缺点是不支持对分离点生成的chunk.js文件进行命名
         *
         * require.ensure(deps, require, chunkname)的第三个参数可以对分离点生成的chunk.js文件进行命名
         */

        import('./main').then(component => {
            cb(null, component.default);
        }).catch(err => {
            console.log('Failed to load "home" component', err);
        });
    }
};
