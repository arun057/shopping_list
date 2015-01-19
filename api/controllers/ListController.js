/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ListController = {
  index: function(req, res) {
    User.find().where({ id: req.session.user.id}).populate('lists').populate("shared_lists").exec(function(err, user){
      // do something with err
      user = user[0]; // query returns an array
      res.view({"my_lists": user.lists, "shared_lists": user.shared_lists}) ;
    });
  },
  create: function(req, res) {
    var name = req.param('name');
    var user_id = req.session.user.id;
    List.create({name: name, owner: user_id}).exec(function(err, list){
      if (err) {
        // error
      }
      res.redirect('/lists/' + list.id);
    });
  },
  show: function(req, res) {
    var list_id = req.param('id');
    List.find().where({ id: list_id}).populate('owner').populate('shared_users').populate('items', { sort: 'done ASC created ASC'} ).exec(function(err, list){
      list = list[0];
      res.view({list: list});
    });
  },
  add_item: function(req, res) {
    var list_id = req.param('id');
    var user_id = req.session.user.id;
    var name = req.param('name');
    var description = req.param('description');
    itemPrice.get(name, function(data){
      data = JSON.parse(data);
      var item = {
        name: name,
        list: list_id,
        description: description,
        added_by: user_id,
        price: parseFloat(data["price"]),
        done: false
      };
      Item.create(item).exec(function(err, item){
        res.json(item);
      });
    });
  },
  toggle: function(req, res) {
    var item_id = req.param('id');
    var user_id = req.session.user.id;
    Item.findById(item_id,function(err, item){
      if (item[0].done) {
        // already done, uncheck it.
        Item.update({ id: item_id },{
          done: false,
          done_by: null
        }).exec(callback);
      } else {
        // not done, finish it.
        Item.update({ id: item_id}, {
          done: true,
          done_by: user_id
        }).exec(callback);
      }
      function callback(err, item) {
        res.json(item[0]);
      }
    });
  }
};

module.exports = ListController;
