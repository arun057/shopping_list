var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    shared_lists: { collection: 'List', via: 'shared_users' },
    lists     : { collection: 'List', via: 'owner' },
    purchases : { collection: 'Item', via: 'done_by'},
    items_added : { collection: 'Item', via: 'added_by'}
  }
};

module.exports = User;
