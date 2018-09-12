import $ from 'jquery';
import 'chosen-js/chosen.jquery';
//如果不设置imports-loader的this=>window, this是undefined
console.log(this);

window.onload = () => {
    console.log('es6 demo init');
     $('.chosen-select').chosen();
}
