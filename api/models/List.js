/**
* List.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var List = {
  schema: true,
  attributes: {
    name: { type: 'string' },
    owner: { model: 'User', required: true },
    items: { collection: 'Item', via: 'list' },
    shared_users: { collection: 'User', via: 'shared_lists', dominant: true }
  }
};

module.exports = List;
