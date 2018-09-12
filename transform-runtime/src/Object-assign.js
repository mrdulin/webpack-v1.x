const a = {};
Object.assign({}, a, { name: 1 });

const { assign } = Object;
const b = {};
assign({}, b, { name: 2 })

// const c = {};
// const assign = Object.assign;
// assign({}, c, {name:3});

const d = {};
Object.assign({}, d, { name: 4 });