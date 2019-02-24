var create_model, get_model, make_dbchannel, make_dbclasses;

import Backbone from 'backbone';

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

export {
  make_dbclasses,
  make_dbchannel
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZGNoYW5uZWwuanMiLCJzb3VyY2VzIjpbImNydWQvYmFzZWNydWRjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFlBQUEsRUFBQSxTQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUVBLFlBQUEsR0FBZSxRQUFBLENBQUMsVUFBRCxFQUFhLE9BQWIsQ0FBQTtBQUNiLE1BQUEsR0FBQSxFQUFBLEtBQUEsRUFBQTtFQUFBLEtBQUEsR0FBUSxVQUFVLENBQUMsTUFBWCxDQUFBO0VBQ1IsS0FBQSxjQUFBOztJQUNFLEtBQUssQ0FBQyxHQUFOLENBQVUsR0FBVixFQUFlLEtBQWY7RUFERjtFQUVBLFVBQVUsQ0FBQyxHQUFYLENBQWUsS0FBZjtTQUNBLFVBQVUsQ0FBQyxJQUFYLENBQUE7QUFMYTs7QUFPZixTQUFBLEdBQVksUUFBQSxDQUFDLFVBQUQsRUFBYSxFQUFiLENBQUE7QUFDVixNQUFBO0VBQUEsS0FBQSxHQUFRLFVBQVUsQ0FBQyxHQUFYLENBQWUsRUFBZjtFQUNSLElBQUcsS0FBQSxLQUFTLE1BQVo7V0FDRSxJQUFJLFVBQVUsQ0FBQyxLQUFmLENBQ0U7TUFBQSxFQUFBLEVBQUk7SUFBSixDQURGLEVBREY7R0FBQSxNQUFBO1dBSUUsTUFKRjs7QUFGVTs7QUFRWixjQUFBLEdBQWlCLFFBQUEsQ0FBQyxPQUFELEVBQVUsR0FBVixDQUFBO0FBQ2YsTUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLGVBQUEsRUFBQTtFQUFBLFVBQUEsR0FBbUI7SUFBTixNQUFBLFFBQUEsUUFBc0IsUUFBUSxDQUFDLE1BQS9CLENBQUE7O3NCQUNYLE9BQUEsR0FBUzs7Ozs7RUFDWCxlQUFBLEdBQXdCO0lBQU4sTUFBQSxhQUFBLFFBQTJCLFFBQVEsQ0FBQyxNQUFwQyxDQUFBOzsyQkFDaEIsS0FBQSxHQUFPOzsyQkFDUCxHQUFBLEdBQUs7Ozs7O0FBQ1AsU0FBTztJQUNMLFVBQUEsRUFBWSxVQURQO0lBRUwsZUFBQSxFQUFpQjtFQUZaO0FBTlE7O0FBVWpCLGNBQUEsR0FBaUIsUUFBQSxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLFVBQW5CLEVBQStCLGVBQS9CLENBQUE7QUFDZixNQUFBO0VBQUEsVUFBQSxHQUFhLElBQUk7RUFDakIsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQVcsV0FBWCxDQUFkLEVBQXVDLFFBQUEsQ0FBQSxDQUFBO1dBQ3JDO0VBRHFDLENBQXZDO0VBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLElBQUEsQ0FBQSxDQUFPLE9BQVAsQ0FBQSxDQUFkLEVBQWdDLFFBQUEsQ0FBQSxDQUFBO1dBQzlCLElBQUk7RUFEMEIsQ0FBaEM7RUFFQSxPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsSUFBQSxDQUFBLENBQU8sT0FBUCxDQUFBLENBQWQsRUFBZ0MsUUFBQSxDQUFDLE9BQUQsQ0FBQTtXQUM5QixZQUFBLENBQWEsVUFBQSxDQUFXLE9BQVgsQ0FBYjtFQUQ4QixDQUFoQztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsQ0FBQSxJQUFBLENBQUEsQ0FBTyxPQUFQLENBQUEsQ0FBZCxFQUFnQyxRQUFBLENBQUMsRUFBRCxDQUFBO1dBQzlCLFNBQUEsQ0FBVSxVQUFWLEVBQXNCLEVBQXRCO0VBRDhCLENBQWhDO0VBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQVcsV0FBWCxDQUFkLEVBQXVDLFFBQUEsQ0FBQSxDQUFBO1dBQ3JDO0VBRHFDLENBQXZDO1NBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQVcsZ0JBQVgsQ0FBZCxFQUE0QyxRQUFBLENBQUEsQ0FBQTtXQUMxQztFQUQwQyxDQUE1QztBQVplOztBQWdCakIsT0FBQTtFQUNFLGNBREY7RUFFRSxjQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuXG5jcmVhdGVfbW9kZWwgPSAoY29sbGVjdGlvbiwgb3B0aW9ucykgLT5cbiAgbW9kZWwgPSBjb2xsZWN0aW9uLmNyZWF0ZSgpXG4gIGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcbiAgICBtb2RlbC5zZXQga2V5LCB2YWx1ZVxuICBjb2xsZWN0aW9uLmFkZCBtb2RlbFxuICBjb2xsZWN0aW9uLnNhdmUoKVxuXG5nZXRfbW9kZWwgPSAoY29sbGVjdGlvbiwgaWQpIC0+XG4gIG1vZGVsID0gY29sbGVjdGlvbi5nZXQgaWRcbiAgaWYgbW9kZWwgaXMgdW5kZWZpbmVkXG4gICAgbmV3IGNvbGxlY3Rpb24ubW9kZWxcbiAgICAgIGlkOiBpZFxuICBlbHNlXG4gICAgbW9kZWxcblxubWFrZV9kYmNsYXNzZXMgPSAob2JqbmFtZSwgdXJsKSAtPlxuICBtb2RlbENsYXNzID0gY2xhc3MgRGJNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gICAgdXJsUm9vdDogdXJsXG4gIGNvbGxlY3Rpb25DbGFzcyA9IGNsYXNzIERiQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gICAgbW9kZWw6IG1vZGVsQ2xhc3NcbiAgICB1cmw6IHVybFxuICByZXR1cm4ge1xuICAgIG1vZGVsQ2xhc3M6IG1vZGVsQ2xhc3NcbiAgICBjb2xsZWN0aW9uQ2xhc3M6IGNvbGxlY3Rpb25DbGFzcyB9XG4gICAgXG5tYWtlX2RiY2hhbm5lbCA9IChjaGFubmVsLCBvYmpuYW1lLCBtb2RlbENsYXNzLCBjb2xsZWN0aW9uQ2xhc3MpIC0+XG4gIGNvbGxlY3Rpb24gPSBuZXcgY29sbGVjdGlvbkNsYXNzXG4gIGNoYW5uZWwucmVwbHkgXCIje29iam5hbWV9LWNvbGxlY3Rpb25cIiwgLT5cbiAgICBjb2xsZWN0aW9uXG4gIGNoYW5uZWwucmVwbHkgXCJuZXctI3tvYmpuYW1lfVwiLCAtPlxuICAgIG5ldyBtb2RlbENsYXNzXG4gIGNoYW5uZWwucmVwbHkgXCJhZGQtI3tvYmpuYW1lfVwiLCAob3B0aW9ucykgLT5cbiAgICBjcmVhdGVfbW9kZWwgY29sbGVjdGlvbiBvcHRpb25zXG4gIGNoYW5uZWwucmVwbHkgXCJnZXQtI3tvYmpuYW1lfVwiLCAoaWQpIC0+XG4gICAgZ2V0X21vZGVsIGNvbGxlY3Rpb24sIGlkXG4gIGNoYW5uZWwucmVwbHkgXCIje29iam5hbWV9LW1vZGVsQ2xhc3NcIiwgLT5cbiAgICBtb2RlbENsYXNzXG4gIGNoYW5uZWwucmVwbHkgXCIje29iam5hbWV9LWNvbGxlY3Rpb25DbGFzc1wiLCAtPlxuICAgIGNvbGxlY3Rpb25DbGFzc1xuICAgIFxuXG5leHBvcnQge1xuICBtYWtlX2RiY2xhc3Nlc1xuICBtYWtlX2RiY2hhbm5lbFxuICB9XG4iXX0=
