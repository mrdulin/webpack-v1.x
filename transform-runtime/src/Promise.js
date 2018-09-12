const A = () => new Promise((resolve, reject) => setTimeout(() => {
  resolve('webpack');
}, 1000));

A().then(console.log);
