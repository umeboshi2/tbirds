var create_model, get_model, make_dbchannel, make_dbclasses;

import {
  Model
} from 'backbone';

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
  var DbCollection, DbModel, collectionClass, modelClass, obj;
  modelClass = DbModel = (function() {
    class DbModel extends Model {};

    DbModel.prototype.urlRoot = url;

    return DbModel;

  }).call(this);
  collectionClass = DbCollection = (function() {
    class DbCollection extends Model {};

    DbCollection.prototype.model = modelClass;

    DbCollection.prototype.url = url;

    return DbCollection;

  }).call(this);
  if (__DEV__ && DEBUG) {
    console.log("DbModel, DbCollection", DbModel, DbCollection);
  }
  obj = {
    modelClass: modelClass,
    collectionClass: collectionClass
  };
  return obj;
};

make_dbchannel = function(channel, objname, modelClass, collectionClass) {
  var collection;
  collection = new collectionClass();
  channel.reply(`${objname}-collection`, function() {
    return collection;
  });
  channel.reply(`new-${objname}`, function() {
    return new modelClass();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZGNoYW5uZWwuanMiLCJzb3VyY2VzIjpbImNydWQvYmFzZWNydWRjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFlBQUEsRUFBQSxTQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFFQSxZQUFBLEdBQWUsUUFBQSxDQUFDLFVBQUQsRUFBYSxPQUFiLENBQUE7QUFDZixNQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUE7RUFBRSxLQUFBLEdBQVEsVUFBVSxDQUFDLE1BQVgsQ0FBQTtFQUNSLEtBQUEsY0FBQTs7SUFDRSxLQUFLLENBQUMsR0FBTixDQUFVLEdBQVYsRUFBZSxLQUFmO0VBREY7RUFFQSxVQUFVLENBQUMsR0FBWCxDQUFlLEtBQWY7U0FDQSxVQUFVLENBQUMsSUFBWCxDQUFBO0FBTGE7O0FBT2YsU0FBQSxHQUFZLFFBQUEsQ0FBQyxVQUFELEVBQWEsRUFBYixDQUFBO0FBQ1osTUFBQTtFQUFFLEtBQUEsR0FBUSxVQUFVLENBQUMsR0FBWCxDQUFlLEVBQWY7RUFDUixJQUFHLEtBQUEsS0FBUyxNQUFaO1dBQ0UsSUFBSSxVQUFVLENBQUMsS0FBZixDQUNFO01BQUEsRUFBQSxFQUFJO0lBQUosQ0FERixFQURGO0dBQUEsTUFBQTtXQUlFLE1BSkY7O0FBRlU7O0FBUVosY0FBQSxHQUFpQixRQUFBLENBQUMsT0FBRCxFQUFVLEdBQVYsQ0FBQTtBQUNqQixNQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsZUFBQSxFQUFBLFVBQUEsRUFBQTtFQUFFLFVBQUEsR0FBbUI7SUFBTixNQUFBLFFBQUEsUUFBc0IsTUFBdEIsQ0FBQTs7c0JBQ1gsT0FBQSxHQUFTOzs7OztFQUNYLGVBQUEsR0FBd0I7SUFBTixNQUFBLGFBQUEsUUFBMkIsTUFBM0IsQ0FBQTs7MkJBQ2hCLEtBQUEsR0FBTzs7MkJBQ1AsR0FBQSxHQUFLOzs7OztFQUNQLElBQUcsT0FBQSxJQUFZLEtBQWY7SUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLHVCQUFaLEVBQXFDLE9BQXJDLEVBQThDLFlBQTlDLEVBREY7O0VBRUEsR0FBQSxHQUNFO0lBQUEsVUFBQSxFQUFZLFVBQVo7SUFDQSxlQUFBLEVBQWlCO0VBRGpCO0FBRUYsU0FBTztBQVhROztBQVlqQixjQUFBLEdBQWlCLFFBQUEsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixVQUFuQixFQUErQixlQUEvQixDQUFBO0FBQ2pCLE1BQUE7RUFBRSxVQUFBLEdBQWEsSUFBSSxlQUFKLENBQUE7RUFDYixPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsQ0FBQSxDQUFHLE9BQUgsQ0FBQSxXQUFBLENBQWQsRUFBdUMsUUFBQSxDQUFBLENBQUE7V0FDckM7RUFEcUMsQ0FBdkM7RUFFQSxPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsSUFBQSxDQUFBLENBQU8sT0FBUCxDQUFBLENBQWQsRUFBZ0MsUUFBQSxDQUFBLENBQUE7V0FDOUIsSUFBSSxVQUFKLENBQUE7RUFEOEIsQ0FBaEM7RUFFQSxPQUFPLENBQUMsS0FBUixDQUFjLENBQUEsSUFBQSxDQUFBLENBQU8sT0FBUCxDQUFBLENBQWQsRUFBZ0MsUUFBQSxDQUFDLE9BQUQsQ0FBQTtXQUM5QixZQUFBLENBQWEsVUFBQSxDQUFXLE9BQVgsQ0FBYjtFQUQ4QixDQUFoQztFQUVBLE9BQU8sQ0FBQyxLQUFSLENBQWMsQ0FBQSxJQUFBLENBQUEsQ0FBTyxPQUFQLENBQUEsQ0FBZCxFQUFnQyxRQUFBLENBQUMsRUFBRCxDQUFBO1dBQzlCLFNBQUEsQ0FBVSxVQUFWLEVBQXNCLEVBQXRCO0VBRDhCLENBQWhDO0VBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQUEsV0FBQSxDQUFkLEVBQXVDLFFBQUEsQ0FBQSxDQUFBO1dBQ3JDO0VBRHFDLENBQXZDO1NBRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFBLENBQUEsQ0FBRyxPQUFILENBQUEsZ0JBQUEsQ0FBZCxFQUE0QyxRQUFBLENBQUEsQ0FBQTtXQUMxQztFQUQwQyxDQUE1QztBQVplOztBQWdCakIsT0FBQTtFQUNFLGNBREY7RUFFRSxjQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdiYWNrYm9uZSdcblxuY3JlYXRlX21vZGVsID0gKGNvbGxlY3Rpb24sIG9wdGlvbnMpIC0+XG4gIG1vZGVsID0gY29sbGVjdGlvbi5jcmVhdGUoKVxuICBmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG4gICAgbW9kZWwuc2V0IGtleSwgdmFsdWVcbiAgY29sbGVjdGlvbi5hZGQgbW9kZWxcbiAgY29sbGVjdGlvbi5zYXZlKClcblxuZ2V0X21vZGVsID0gKGNvbGxlY3Rpb24sIGlkKSAtPlxuICBtb2RlbCA9IGNvbGxlY3Rpb24uZ2V0IGlkXG4gIGlmIG1vZGVsIGlzIHVuZGVmaW5lZFxuICAgIG5ldyBjb2xsZWN0aW9uLm1vZGVsXG4gICAgICBpZDogaWRcbiAgZWxzZVxuICAgIG1vZGVsXG5cbm1ha2VfZGJjbGFzc2VzID0gKG9iam5hbWUsIHVybCkgLT5cbiAgbW9kZWxDbGFzcyA9IGNsYXNzIERiTW9kZWwgZXh0ZW5kcyBNb2RlbFxuICAgIHVybFJvb3Q6IHVybFxuICBjb2xsZWN0aW9uQ2xhc3MgPSBjbGFzcyBEYkNvbGxlY3Rpb24gZXh0ZW5kcyBNb2RlbFxuICAgIG1vZGVsOiBtb2RlbENsYXNzXG4gICAgdXJsOiB1cmxcbiAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICBjb25zb2xlLmxvZyBcIkRiTW9kZWwsIERiQ29sbGVjdGlvblwiLCBEYk1vZGVsLCBEYkNvbGxlY3Rpb25cbiAgb2JqID1cbiAgICBtb2RlbENsYXNzOiBtb2RlbENsYXNzXG4gICAgY29sbGVjdGlvbkNsYXNzOiBjb2xsZWN0aW9uQ2xhc3NcbiAgcmV0dXJuIG9ialxubWFrZV9kYmNoYW5uZWwgPSAoY2hhbm5lbCwgb2JqbmFtZSwgbW9kZWxDbGFzcywgY29sbGVjdGlvbkNsYXNzKSAtPlxuICBjb2xsZWN0aW9uID0gbmV3IGNvbGxlY3Rpb25DbGFzc1xuICBjaGFubmVsLnJlcGx5IFwiI3tvYmpuYW1lfS1jb2xsZWN0aW9uXCIsIC0+XG4gICAgY29sbGVjdGlvblxuICBjaGFubmVsLnJlcGx5IFwibmV3LSN7b2JqbmFtZX1cIiwgLT5cbiAgICBuZXcgbW9kZWxDbGFzc1xuICBjaGFubmVsLnJlcGx5IFwiYWRkLSN7b2JqbmFtZX1cIiwgKG9wdGlvbnMpIC0+XG4gICAgY3JlYXRlX21vZGVsIGNvbGxlY3Rpb24gb3B0aW9uc1xuICBjaGFubmVsLnJlcGx5IFwiZ2V0LSN7b2JqbmFtZX1cIiwgKGlkKSAtPlxuICAgIGdldF9tb2RlbCBjb2xsZWN0aW9uLCBpZFxuICBjaGFubmVsLnJlcGx5IFwiI3tvYmpuYW1lfS1tb2RlbENsYXNzXCIsIC0+XG4gICAgbW9kZWxDbGFzc1xuICBjaGFubmVsLnJlcGx5IFwiI3tvYmpuYW1lfS1jb2xsZWN0aW9uQ2xhc3NcIiwgLT5cbiAgICBjb2xsZWN0aW9uQ2xhc3NcbiAgICBcblxuZXhwb3J0IHtcbiAgbWFrZV9kYmNsYXNzZXNcbiAgbWFrZV9kYmNoYW5uZWxcbiAgfVxuIl19
