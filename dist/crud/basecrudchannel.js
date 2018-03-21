var create_model, get_model, make_dbchannel, make_dbclasses;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZGNoYW5uZWwuanMiLCJzb3VyY2VzIjpbImNydWQvYmFzZWNydWRjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFlBQUEsRUFBQSxTQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUVBLFlBQUEsR0FBZSxRQUFBLENBQUMsVUFBRCxFQUFhLE9BQWIsQ0FBQTtBQUNiLE1BQUEsR0FBQSxFQUFBLEtBQUEsRUFBQTtFQUFBLEtBQUEsR0FBUSxVQUFVLENBQUMsTUFBWCxDQUFBO0VBQ1IsS0FBQSxjQUFBOztJQUNFLEtBQUssQ0FBQyxHQUFOLENBQVUsR0FBVixFQUFlLEtBQWY7RUFERjtFQUVBLFVBQVUsQ0FBQyxHQUFYLENBQWUsS0FBZjtTQUNBLFVBQVUsQ0FBQyxJQUFYLENBQUE7QUFMYTs7QUFPZixTQUFBLEdBQVksUUFBQSxDQUFDLFVBQUQsRUFBYSxFQUFiLENBQUE7QUFDVixNQUFBO0VBQUEsS0FBQSxHQUFRLFVBQVUsQ0FBQyxHQUFYLENBQWUsRUFBZjtFQUNSLElBQUcsS0FBQSxLQUFTLE1BQVo7V0FDRSxJQUFJLFVBQVUsQ0FBQyxLQUFmLENBQ0U7TUFBQSxFQUFBLEVBQUk7SUFBSixDQURGLEVBREY7R0FBQSxNQUFBO1dBSUUsTUFKRjs7QUFGVTs7QUFRWixjQUFBLEdBQWlCLFFBQUEsQ0FBQyxPQUFELEVBQVUsR0FBVixDQUFBO0FBQ2YsTUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLGVBQUEsRUFBQTtFQUFBLFVBQUEsR0FBbUI7SUFBTixNQUFBLFFBQUEsUUFBc0IsUUFBUSxDQUFDLE1BQS9CLENBQUE7O3NCQUNYLE9BQUEsR0FBUzs7Ozs7RUFDWCxlQUFBLEdBQXdCO0lBQU4sTUFBQSxhQUFBLFFBQTJCLFFBQVEsQ0FBQyxNQUFwQyxDQUFBOzsyQkFDaEIsS0FBQSxHQUFPOzsyQkFDUCxHQUFBLEdBQUs7Ozs7O0FBQ1AsU0FBTztJQUNMLFVBQUEsRUFBWSxVQURQO0lBRUwsZUFBQSxFQUFpQjtFQUZaO0FBTlE7O0FBVWpCLGNBQUEsR0FBaUIsUUFBQSxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLFVBQW5CLEVBQStCLGVBQS9CLENBQUE7QUFDZixNQUFBO0VBQUEsVUFBQSxHQUFhLElBQUk7RUFDakIsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQVcsV0FBWCxDQUFkLEVBQXVDLFFBQUEsQ0FBQSxDQUFBO1dBQ3JDO0VBRHFDLENBQXZDO0VBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLElBQUEsQ0FBQSxDQUFPLE9BQVAsQ0FBQSxDQUFkLEVBQWdDLFFBQUEsQ0FBQSxDQUFBO1dBQzlCLElBQUk7RUFEMEIsQ0FBaEM7RUFFQSxPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsSUFBQSxDQUFBLENBQU8sT0FBUCxDQUFBLENBQWQsRUFBZ0MsUUFBQSxDQUFDLE9BQUQsQ0FBQTtXQUM5QixZQUFBLENBQWEsVUFBQSxDQUFXLE9BQVgsQ0FBYjtFQUQ4QixDQUFoQztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsQ0FBQSxJQUFBLENBQUEsQ0FBTyxPQUFQLENBQUEsQ0FBZCxFQUFnQyxRQUFBLENBQUMsRUFBRCxDQUFBO1dBQzlCLFNBQUEsQ0FBVSxVQUFWLEVBQXNCLEVBQXRCO0VBRDhCLENBQWhDO0VBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQVcsV0FBWCxDQUFkLEVBQXVDLFFBQUEsQ0FBQSxDQUFBO1dBQ3JDO0VBRHFDLENBQXZDO1NBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQVcsZ0JBQVgsQ0FBZCxFQUE0QyxRQUFBLENBQUEsQ0FBQTtXQUMxQztFQUQwQyxDQUE1QztBQVplOztBQWdCakIsT0FBQTtFQUNFLGNBREY7RUFFRSxjQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuY3JlYXRlX21vZGVsID0gKGNvbGxlY3Rpb24sIG9wdGlvbnMpIC0+XG4gIG1vZGVsID0gY29sbGVjdGlvbi5jcmVhdGUoKVxuICBmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG4gICAgbW9kZWwuc2V0IGtleSwgdmFsdWVcbiAgY29sbGVjdGlvbi5hZGQgbW9kZWxcbiAgY29sbGVjdGlvbi5zYXZlKClcblxuZ2V0X21vZGVsID0gKGNvbGxlY3Rpb24sIGlkKSAtPlxuICBtb2RlbCA9IGNvbGxlY3Rpb24uZ2V0IGlkXG4gIGlmIG1vZGVsIGlzIHVuZGVmaW5lZFxuICAgIG5ldyBjb2xsZWN0aW9uLm1vZGVsXG4gICAgICBpZDogaWRcbiAgZWxzZVxuICAgIG1vZGVsXG5cbm1ha2VfZGJjbGFzc2VzID0gKG9iam5hbWUsIHVybCkgLT5cbiAgbW9kZWxDbGFzcyA9IGNsYXNzIERiTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICAgIHVybFJvb3Q6IHVybFxuICBjb2xsZWN0aW9uQ2xhc3MgPSBjbGFzcyBEYkNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICAgIG1vZGVsOiBtb2RlbENsYXNzXG4gICAgdXJsOiB1cmxcbiAgcmV0dXJuIHtcbiAgICBtb2RlbENsYXNzOiBtb2RlbENsYXNzXG4gICAgY29sbGVjdGlvbkNsYXNzOiBjb2xsZWN0aW9uQ2xhc3MgfVxuICAgIFxubWFrZV9kYmNoYW5uZWwgPSAoY2hhbm5lbCwgb2JqbmFtZSwgbW9kZWxDbGFzcywgY29sbGVjdGlvbkNsYXNzKSAtPlxuICBjb2xsZWN0aW9uID0gbmV3IGNvbGxlY3Rpb25DbGFzc1xuICBjaGFubmVsLnJlcGx5IFwiI3tvYmpuYW1lfS1jb2xsZWN0aW9uXCIsIC0+XG4gICAgY29sbGVjdGlvblxuICBjaGFubmVsLnJlcGx5IFwibmV3LSN7b2JqbmFtZX1cIiwgLT5cbiAgICBuZXcgbW9kZWxDbGFzc1xuICBjaGFubmVsLnJlcGx5IFwiYWRkLSN7b2JqbmFtZX1cIiwgKG9wdGlvbnMpIC0+XG4gICAgY3JlYXRlX21vZGVsIGNvbGxlY3Rpb24gb3B0aW9uc1xuICBjaGFubmVsLnJlcGx5IFwiZ2V0LSN7b2JqbmFtZX1cIiwgKGlkKSAtPlxuICAgIGdldF9tb2RlbCBjb2xsZWN0aW9uLCBpZFxuICBjaGFubmVsLnJlcGx5IFwiI3tvYmpuYW1lfS1tb2RlbENsYXNzXCIsIC0+XG4gICAgbW9kZWxDbGFzc1xuICBjaGFubmVsLnJlcGx5IFwiI3tvYmpuYW1lfS1jb2xsZWN0aW9uQ2xhc3NcIiwgLT5cbiAgICBjb2xsZWN0aW9uQ2xhc3NcbiAgICBcblxuZXhwb3J0IHtcbiAgbWFrZV9kYmNsYXNzZXNcbiAgbWFrZV9kYmNoYW5uZWxcbiAgfVxuIl19
