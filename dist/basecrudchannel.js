var Backbone, Marionette, create_model, get_model, make_dbchannel, make_dbclasses, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

ref = require('./apputil'), create_model = ref.create_model, get_model = ref.get_model;

make_dbclasses = function(objname, url) {
  var DbCollection, DbModel, collectionClass, modelClass;
  modelClass = DbModel = (function(superClass) {
    extend(DbModel, superClass);

    function DbModel() {
      return DbModel.__super__.constructor.apply(this, arguments);
    }

    DbModel.prototype.urlRoot = url;

    return DbModel;

  })(Backbone.Model);
  collectionClass = DbCollection = (function(superClass) {
    extend(DbCollection, superClass);

    function DbCollection() {
      return DbCollection.__super__.constructor.apply(this, arguments);
    }

    DbCollection.prototype.model = modelClass;

    DbCollection.prototype.url = url;

    return DbCollection;

  })(Backbone.Model);
  return {
    modelClass: modelClass,
    collectionClass: collectionClass
  };
};

make_dbchannel = function(channel, objname, modelClass, collectionClass) {
  var collection;
  collection = new collectionClass;
  channel.reply(objname + "-collection", function() {
    return collection;
  });
  channel.reply("new-" + objname, function() {
    return new modelClass;
  });
  channel.reply("add-" + objname, function(options) {
    return create_model(collection(options));
  });
  channel.reply("get-" + objname, function(id) {
    return get_model(collection, id);
  });
  channel.reply(objname + "-modelClass", function() {
    return modelClass;
  });
  return channel.reply(objname + "-collectionClass", function() {
    return collectionClass;
  });
};

module.exports = {
  make_dbclasses: make_dbclasses,
  make_dbchannel: make_dbchannel
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWNydWRjaGFubmVsLmpzIiwic291cmNlcyI6WyJiYXNlY3J1ZGNoYW5uZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0ZBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRWIsTUFDZ0IsT0FBQSxDQUFRLFdBQVIsQ0FEaEIsRUFBRSwrQkFBRixFQUNFOztBQUVGLGNBQUEsR0FBaUIsU0FBQyxPQUFELEVBQVUsR0FBVjtBQUNmLE1BQUE7RUFBQSxVQUFBLEdBQW1COzs7Ozs7O3NCQUNqQixPQUFBLEdBQVM7Ozs7S0FEd0IsUUFBUSxDQUFDO0VBRTVDLGVBQUEsR0FBd0I7Ozs7Ozs7MkJBQ3RCLEtBQUEsR0FBTzs7MkJBQ1AsR0FBQSxHQUFLOzs7O0tBRnNDLFFBQVEsQ0FBQztBQUd0RCxTQUFPO0lBQ0wsVUFBQSxFQUFZLFVBRFA7SUFFTCxlQUFBLEVBQWlCLGVBRlo7O0FBTlE7O0FBVWpCLGNBQUEsR0FBaUIsU0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixVQUFuQixFQUErQixlQUEvQjtBQUNmLE1BQUE7RUFBQSxVQUFBLEdBQWEsSUFBSTtFQUNqQixPQUFPLENBQUMsS0FBUixDQUFpQixPQUFELEdBQVMsYUFBekIsRUFBdUMsU0FBQTtXQUNyQztFQURxQyxDQUF2QztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBQSxHQUFPLE9BQXJCLEVBQWdDLFNBQUE7V0FDOUIsSUFBSTtFQUQwQixDQUFoQztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBQSxHQUFPLE9BQXJCLEVBQWdDLFNBQUMsT0FBRDtXQUM5QixZQUFBLENBQWEsVUFBQSxDQUFXLE9BQVgsQ0FBYjtFQUQ4QixDQUFoQztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBQSxHQUFPLE9BQXJCLEVBQWdDLFNBQUMsRUFBRDtXQUM5QixTQUFBLENBQVUsVUFBVixFQUFzQixFQUF0QjtFQUQ4QixDQUFoQztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWlCLE9BQUQsR0FBUyxhQUF6QixFQUF1QyxTQUFBO1dBQ3JDO0VBRHFDLENBQXZDO1NBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBaUIsT0FBRCxHQUFTLGtCQUF6QixFQUE0QyxTQUFBO1dBQzFDO0VBRDBDLENBQTVDO0FBWmU7O0FBZ0JqQixNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsY0FBQSxFQUFnQixjQUFoQjtFQUNBLGNBQUEsRUFBZ0IsY0FEaEIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbnsgY3JlYXRlX21vZGVsXG4gIGdldF9tb2RlbCB9ID0gcmVxdWlyZSAnLi9hcHB1dGlsJ1xuXG5tYWtlX2RiY2xhc3NlcyA9IChvYmpuYW1lLCB1cmwpIC0+XG4gIG1vZGVsQ2xhc3MgPSBjbGFzcyBEYk1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgICB1cmxSb290OiB1cmxcbiAgY29sbGVjdGlvbkNsYXNzID0gY2xhc3MgRGJDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgICBtb2RlbDogbW9kZWxDbGFzc1xuICAgIHVybDogdXJsXG4gIHJldHVybiB7XG4gICAgbW9kZWxDbGFzczogbW9kZWxDbGFzc1xuICAgIGNvbGxlY3Rpb25DbGFzczogY29sbGVjdGlvbkNsYXNzIH1cbiAgICBcbm1ha2VfZGJjaGFubmVsID0gKGNoYW5uZWwsIG9iam5hbWUsIG1vZGVsQ2xhc3MsIGNvbGxlY3Rpb25DbGFzcykgLT5cbiAgY29sbGVjdGlvbiA9IG5ldyBjb2xsZWN0aW9uQ2xhc3NcbiAgY2hhbm5lbC5yZXBseSBcIiN7b2JqbmFtZX0tY29sbGVjdGlvblwiLCAtPlxuICAgIGNvbGxlY3Rpb25cbiAgY2hhbm5lbC5yZXBseSBcIm5ldy0je29iam5hbWV9XCIsIC0+XG4gICAgbmV3IG1vZGVsQ2xhc3NcbiAgY2hhbm5lbC5yZXBseSBcImFkZC0je29iam5hbWV9XCIsIChvcHRpb25zKSAtPlxuICAgIGNyZWF0ZV9tb2RlbCBjb2xsZWN0aW9uIG9wdGlvbnNcbiAgY2hhbm5lbC5yZXBseSBcImdldC0je29iam5hbWV9XCIsIChpZCkgLT5cbiAgICBnZXRfbW9kZWwgY29sbGVjdGlvbiwgaWRcbiAgY2hhbm5lbC5yZXBseSBcIiN7b2JqbmFtZX0tbW9kZWxDbGFzc1wiLCAtPlxuICAgIG1vZGVsQ2xhc3NcbiAgY2hhbm5lbC5yZXBseSBcIiN7b2JqbmFtZX0tY29sbGVjdGlvbkNsYXNzXCIsIC0+XG4gICAgY29sbGVjdGlvbkNsYXNzXG4gICAgXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgbWFrZV9kYmNsYXNzZXM6IG1ha2VfZGJjbGFzc2VzXG4gIG1ha2VfZGJjaGFubmVsOiBtYWtlX2RiY2hhbm5lbFxuIl19
