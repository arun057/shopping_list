/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Item = {
  schema: true,
  attributes: {
    name: { type: 'string' },
    description: { type: 'text' },
    done: { type: 'boolean', defaultsTo: false },
    done_by: { model: 'User' },
    added_by: { model: 'User' },
    price: { type: 'float' },
    list: { model: 'List', required: true },
    tags: { collection: 'Tag', via: 'items' }
  }
};

module.exports = Item;
