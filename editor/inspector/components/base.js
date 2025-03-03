// This is the basic template for component editing
const { updatePropByDump, disconnectGroup } = require('../utils/prop');

exports.template = `
<div class="component-container">
</div>
`;

exports.$ = {
    componentContainer: '.component-container',
};

exports.update = function(dump) {
    updatePropByDump(this, dump, ['name', 'enabled']);
};

exports.close = function() {
    disconnectGroup(this);
};
