var Tabs = require('./index.vue');
var Tab = require('./tab.vue');

module.exports = {
    install: function(Vue){
        Vue.component('Tabs', Tabs);
        Vue.component('TabPanel', Tab);
    }
}
