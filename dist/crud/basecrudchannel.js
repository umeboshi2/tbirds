var Backbone, Marionette, create_model, get_model, make_dbchannel, make_dbclasses;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

create_model = function(collection, options) {
  var key, model, value;
  model = collection.create();
  for (key in options) {
    value = options[key];
    model.set(key, value);
  }
  collection.add(model);
  return collection.save();
};

get_model = function(collection, id) {
  var model;
  model = collection.get(id);
  if (model === void 0) {
    return new collection.model({
      id: id
    });
  } else {
    return model;
  }
};

make_dbclasses = function(objname, url) {
  var DbCollection, DbModel, collectionClass, modelClass;
  modelClass = DbModel = (function() {
    class DbModel extends Backbone.Model {};

    DbModel.prototype.urlRoot = url;

    return DbModel;

  }).call(this);
  collectionClass = DbCollection = (function() {
    class DbCollection extends Backbone.Model {};

    DbCollection.prototype.model = modelClass;

    DbCollection.prototype.url = url;

    return DbCollection;

  }).call(this);
  return {
    modelClass: modelClass,
    collectionClass: collectionClass
  };
};

make_dbchannel = function(channel, objname, modelClass, collectionClass) {
  var collection;
  collection = new collectionClass;
  channel.reply(`${objname}-collection`, function() {
    return collection;
  });
  channel.reply(`new-${objname}`, function() {
    return new modelClass;
  });
  channel.reply(`add-${objname}`, function(options) {
    return create_model(collection(options));
  });
  channel.reply(`get-${objname}`, function(id) {
    return get_model(collection, id);
  });
  channel.reply(`${objname}-modelClass`, function() {
    return modelClass;
  });
  return channel.reply(`${objname}-collectionClass`, function() {
    return collectionClass;
  });
};

module.exports = {
  make_dbclasses: make_dbclasses,
  make_dbchannel: make_dbchannel
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZGNoYW5uZWwuanMiLCJzb3VyY2VzIjpbImNydWQvYmFzZWNydWRjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUEsRUFBQSxVQUFBLEVBQUEsWUFBQSxFQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUE7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRWIsWUFBQSxHQUFlLFFBQUEsQ0FBQyxVQUFELEVBQWEsT0FBYixDQUFBO0FBQ2IsTUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBO0VBQUEsS0FBQSxHQUFRLFVBQVUsQ0FBQyxNQUFYLENBQUE7RUFDUixLQUFBLGNBQUE7O0lBQ0UsS0FBSyxDQUFDLEdBQU4sQ0FBVSxHQUFWLEVBQWUsS0FBZjtFQURGO0VBRUEsVUFBVSxDQUFDLEdBQVgsQ0FBZSxLQUFmO1NBQ0EsVUFBVSxDQUFDLElBQVgsQ0FBQTtBQUxhOztBQU9mLFNBQUEsR0FBWSxRQUFBLENBQUMsVUFBRCxFQUFhLEVBQWIsQ0FBQTtBQUNWLE1BQUE7RUFBQSxLQUFBLEdBQVEsVUFBVSxDQUFDLEdBQVgsQ0FBZSxFQUFmO0VBQ1IsSUFBRyxLQUFBLEtBQVMsTUFBWjtXQUNFLElBQUksVUFBVSxDQUFDLEtBQWYsQ0FDRTtNQUFBLEVBQUEsRUFBSTtJQUFKLENBREYsRUFERjtHQUFBLE1BQUE7V0FJRSxNQUpGOztBQUZVOztBQVFaLGNBQUEsR0FBaUIsUUFBQSxDQUFDLE9BQUQsRUFBVSxHQUFWLENBQUE7QUFDZixNQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsZUFBQSxFQUFBO0VBQUEsVUFBQSxHQUFtQjtJQUFOLE1BQUEsUUFBQSxRQUFzQixRQUFRLENBQUMsTUFBL0IsQ0FBQTs7c0JBQ1gsT0FBQSxHQUFTOzs7OztFQUNYLGVBQUEsR0FBd0I7SUFBTixNQUFBLGFBQUEsUUFBMkIsUUFBUSxDQUFDLE1BQXBDLENBQUE7OzJCQUNoQixLQUFBLEdBQU87OzJCQUNQLEdBQUEsR0FBSzs7Ozs7QUFDUCxTQUFPO0lBQ0wsVUFBQSxFQUFZLFVBRFA7SUFFTCxlQUFBLEVBQWlCO0VBRlo7QUFOUTs7QUFVakIsY0FBQSxHQUFpQixRQUFBLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsVUFBbkIsRUFBK0IsZUFBL0IsQ0FBQTtBQUNmLE1BQUE7RUFBQSxVQUFBLEdBQWEsSUFBSTtFQUNqQixPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsQ0FBQSxDQUFHLE9BQUgsQ0FBVyxXQUFYLENBQWQsRUFBdUMsUUFBQSxDQUFBLENBQUE7V0FDckM7RUFEcUMsQ0FBdkM7RUFFQSxPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsSUFBQSxDQUFBLENBQU8sT0FBUCxDQUFBLENBQWQsRUFBZ0MsUUFBQSxDQUFBLENBQUE7V0FDOUIsSUFBSTtFQUQwQixDQUFoQztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsQ0FBQSxJQUFBLENBQUEsQ0FBTyxPQUFQLENBQUEsQ0FBZCxFQUFnQyxRQUFBLENBQUMsT0FBRCxDQUFBO1dBQzlCLFlBQUEsQ0FBYSxVQUFBLENBQVcsT0FBWCxDQUFiO0VBRDhCLENBQWhDO0VBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLElBQUEsQ0FBQSxDQUFPLE9BQVAsQ0FBQSxDQUFkLEVBQWdDLFFBQUEsQ0FBQyxFQUFELENBQUE7V0FDOUIsU0FBQSxDQUFVLFVBQVYsRUFBc0IsRUFBdEI7RUFEOEIsQ0FBaEM7RUFFQSxPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsQ0FBQSxDQUFHLE9BQUgsQ0FBVyxXQUFYLENBQWQsRUFBdUMsUUFBQSxDQUFBLENBQUE7V0FDckM7RUFEcUMsQ0FBdkM7U0FFQSxPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsQ0FBQSxDQUFHLE9BQUgsQ0FBVyxnQkFBWCxDQUFkLEVBQTRDLFFBQUEsQ0FBQSxDQUFBO1dBQzFDO0VBRDBDLENBQTVDO0FBWmU7O0FBZ0JqQixNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsY0FBQSxFQUFnQixjQUFoQjtFQUNBLGNBQUEsRUFBZ0I7QUFEaEIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbmNyZWF0ZV9tb2RlbCA9IChjb2xsZWN0aW9uLCBvcHRpb25zKSAtPlxuICBtb2RlbCA9IGNvbGxlY3Rpb24uY3JlYXRlKClcbiAgZm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuICAgIG1vZGVsLnNldCBrZXksIHZhbHVlXG4gIGNvbGxlY3Rpb24uYWRkIG1vZGVsXG4gIGNvbGxlY3Rpb24uc2F2ZSgpXG5cbmdldF9tb2RlbCA9IChjb2xsZWN0aW9uLCBpZCkgLT5cbiAgbW9kZWwgPSBjb2xsZWN0aW9uLmdldCBpZFxuICBpZiBtb2RlbCBpcyB1bmRlZmluZWRcbiAgICBuZXcgY29sbGVjdGlvbi5tb2RlbFxuICAgICAgaWQ6IGlkXG4gIGVsc2VcbiAgICBtb2RlbFxuXG5tYWtlX2RiY2xhc3NlcyA9IChvYmpuYW1lLCB1cmwpIC0+XG4gIG1vZGVsQ2xhc3MgPSBjbGFzcyBEYk1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgICB1cmxSb290OiB1cmxcbiAgY29sbGVjdGlvbkNsYXNzID0gY2xhc3MgRGJDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgICBtb2RlbDogbW9kZWxDbGFzc1xuICAgIHVybDogdXJsXG4gIHJldHVybiB7XG4gICAgbW9kZWxDbGFzczogbW9kZWxDbGFzc1xuICAgIGNvbGxlY3Rpb25DbGFzczogY29sbGVjdGlvbkNsYXNzIH1cbiAgICBcbm1ha2VfZGJjaGFubmVsID0gKGNoYW5uZWwsIG9iam5hbWUsIG1vZGVsQ2xhc3MsIGNvbGxlY3Rpb25DbGFzcykgLT5cbiAgY29sbGVjdGlvbiA9IG5ldyBjb2xsZWN0aW9uQ2xhc3NcbiAgY2hhbm5lbC5yZXBseSBcIiN7b2JqbmFtZX0tY29sbGVjdGlvblwiLCAtPlxuICAgIGNvbGxlY3Rpb25cbiAgY2hhbm5lbC5yZXBseSBcIm5ldy0je29iam5hbWV9XCIsIC0+XG4gICAgbmV3IG1vZGVsQ2xhc3NcbiAgY2hhbm5lbC5yZXBseSBcImFkZC0je29iam5hbWV9XCIsIChvcHRpb25zKSAtPlxuICAgIGNyZWF0ZV9tb2RlbCBjb2xsZWN0aW9uIG9wdGlvbnNcbiAgY2hhbm5lbC5yZXBseSBcImdldC0je29iam5hbWV9XCIsIChpZCkgLT5cbiAgICBnZXRfbW9kZWwgY29sbGVjdGlvbiwgaWRcbiAgY2hhbm5lbC5yZXBseSBcIiN7b2JqbmFtZX0tbW9kZWxDbGFzc1wiLCAtPlxuICAgIG1vZGVsQ2xhc3NcbiAgY2hhbm5lbC5yZXBseSBcIiN7b2JqbmFtZX0tY29sbGVjdGlvbkNsYXNzXCIsIC0+XG4gICAgY29sbGVjdGlvbkNsYXNzXG4gICAgXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgbWFrZV9kYmNsYXNzZXM6IG1ha2VfZGJjbGFzc2VzXG4gIG1ha2VfZGJjaGFubmVsOiBtYWtlX2RiY2hhbm5lbFxuIl19
