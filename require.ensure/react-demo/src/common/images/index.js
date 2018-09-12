const requireWithContext = require.context('./', true, /\.(jpg|png)$/);
requireWithContext.keys().map(file => {
    console.log(file);
    requireWithContext(file);
});