var Backbone, DbCollection, Marionette,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

DbCollection = (function(superClass) {
  extend(DbCollection, superClass);

  function DbCollection() {
    return DbCollection.__super__.constructor.apply(this, arguments);
  }

  DbCollection.prototype.initialize = function(options) {
    var collectionClass;
    collectionClass = options.collectionClass || Backbone.Collection;
    this.collection = new collectionClass;
    return this.channelName = options.channelName || 'global';
  };

  DbCollection.prototype.radioRequests = function() {
    var name, obj, prefix;
    obj = {};
    name = this.getOption('modelName');
    name = name || 'model';
    prefix = "db:" + name;
    obj[prefix + ":collection"] = 'getCollection';
    obj[prefix + ":new"] = 'newModel';
    obj[prefix + ":add"] = 'addModel';
    obj[prefix + ":update"] = 'updateModel';
    obj[prefix + ":updatePassed"] = 'updatePassedModel';
    obj[prefix + ":get"] = 'getModel';
    obj[prefix + ":modelClass"] = 'getModelClass';
    obj[prefix + ":collectionClass"] = 'getCollectionClass';
    return obj;
  };

  DbCollection.prototype.getCollection = function() {
    return this.collection;
  };

  DbCollection.prototype.newModel = function(attributes) {
    var modelClass;
    attributes = attributes || {};
    modelClass = this.getOption('modelClass');
    return new modelClass(attributes);
  };

  DbCollection.prototype.addModel = function(attributes) {
    var channel, model, name;
    attributes = attributes || {};
    channel = this.getChannel();
    name = this.getOption('modelName');
    model = this.collection.create(attributes);
    model.once('sync', function() {
      return channel.trigger("db:" + name + ":inserted");
    });
    return this.collection.add(model);
  };

  DbCollection.prototype.updatePassedModel = function(model, newAttributes) {
    var channel, name;
    channel = this.getChannel();
    name = this.getOption('modelName');
    model.once('sync', function() {
      return channel.trigger("db:" + name + ":updated");
    });
    model.set(newAttributes);
    return model.save();
  };

  DbCollection.prototype.getModel = function(id) {
    var model;
    model = this.collection.get(id);
    if (model === void 0) {
      return new this.collection.model({
        id: id
      });
    } else {
      return model;
    }
  };

  DbCollection.prototype.getModelClass = function() {
    return this.getOption('modelClass');
  };

  DbCollection.prototype.getCollectionClass = function() {
    return this.getOption('collectionClass');
  };

  return DbCollection;

})(Marionette.Object);

module.exports = DbCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGJjb2xsZWN0aW9uLmpzIiwic291cmNlcyI6WyJkYmNvbGxlY3Rpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0NBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRVA7Ozs7Ozs7eUJBQ0osVUFBQSxHQUFZLFNBQUMsT0FBRDtBQUNWLFFBQUE7SUFBQSxlQUFBLEdBQWtCLE9BQU8sQ0FBQyxlQUFSLElBQTJCLFFBQVEsQ0FBQztJQUN0RCxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUk7V0FDbEIsSUFBQyxDQUFBLFdBQUQsR0FBZSxPQUFPLENBQUMsV0FBUixJQUF1QjtFQUg1Qjs7eUJBSVosYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsR0FBQSxHQUFNO0lBQ04sSUFBQSxHQUFPLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtJQUNQLElBQUEsR0FBTyxJQUFBLElBQVE7SUFDZixNQUFBLEdBQVMsS0FBQSxHQUFNO0lBQ2YsR0FBSSxDQUFHLE1BQUQsR0FBUSxhQUFWLENBQUosR0FBOEI7SUFDOUIsR0FBSSxDQUFHLE1BQUQsR0FBUSxNQUFWLENBQUosR0FBdUI7SUFDdkIsR0FBSSxDQUFHLE1BQUQsR0FBUSxNQUFWLENBQUosR0FBdUI7SUFDdkIsR0FBSSxDQUFHLE1BQUQsR0FBUSxTQUFWLENBQUosR0FBMEI7SUFDMUIsR0FBSSxDQUFHLE1BQUQsR0FBUSxlQUFWLENBQUosR0FBZ0M7SUFDaEMsR0FBSSxDQUFHLE1BQUQsR0FBUSxNQUFWLENBQUosR0FBdUI7SUFDdkIsR0FBSSxDQUFHLE1BQUQsR0FBUSxhQUFWLENBQUosR0FBOEI7SUFDOUIsR0FBSSxDQUFHLE1BQUQsR0FBUSxrQkFBVixDQUFKLEdBQW1DO0FBQ25DLFdBQU87RUFiTTs7eUJBY2YsYUFBQSxHQUFlLFNBQUE7V0FDYixJQUFDLENBQUE7RUFEWTs7eUJBRWYsUUFBQSxHQUFVLFNBQUMsVUFBRDtBQUNSLFFBQUE7SUFBQSxVQUFBLEdBQWEsVUFBQSxJQUFjO0lBQzNCLFVBQUEsR0FBYSxJQUFDLENBQUEsU0FBRCxDQUFXLFlBQVg7V0FDYixJQUFJLFVBQUosQ0FBZSxVQUFmO0VBSFE7O3lCQUlWLFFBQUEsR0FBVSxTQUFDLFVBQUQ7QUFDUixRQUFBO0lBQUEsVUFBQSxHQUFhLFVBQUEsSUFBYztJQUMzQixPQUFBLEdBQVUsSUFBQyxDQUFBLFVBQUQsQ0FBQTtJQUNWLElBQUEsR0FBTyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVg7SUFDUCxLQUFBLEdBQVEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLENBQW1CLFVBQW5CO0lBQ1IsS0FBSyxDQUFDLElBQU4sQ0FBVyxNQUFYLEVBQW1CLFNBQUE7YUFDakIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsS0FBQSxHQUFNLElBQU4sR0FBVyxXQUEzQjtJQURpQixDQUFuQjtXQUVBLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixLQUFoQjtFQVBROzt5QkFRVixpQkFBQSxHQUFtQixTQUFDLEtBQUQsRUFBUSxhQUFSO0FBQ2pCLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLFVBQUQsQ0FBQTtJQUNWLElBQUEsR0FBTyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVg7SUFDUCxLQUFLLENBQUMsSUFBTixDQUFXLE1BQVgsRUFBbUIsU0FBQTthQUNqQixPQUFPLENBQUMsT0FBUixDQUFnQixLQUFBLEdBQU0sSUFBTixHQUFXLFVBQTNCO0lBRGlCLENBQW5CO0lBRUEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxhQUFWO1dBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBQTtFQU5pQjs7eUJBT25CLFFBQUEsR0FBVSxTQUFDLEVBQUQ7QUFDUixRQUFBO0lBQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixFQUFoQjtJQUNSLElBQUcsS0FBQSxLQUFTLE1BQVo7QUFDRSxhQUFPLElBQUksSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFoQixDQUNMO1FBQUEsRUFBQSxFQUFJLEVBQUo7T0FESyxFQURUO0tBQUEsTUFBQTtBQUlFLGFBQU8sTUFKVDs7RUFGUTs7eUJBT1YsYUFBQSxHQUFlLFNBQUE7V0FDYixJQUFDLENBQUEsU0FBRCxDQUFXLFlBQVg7RUFEYTs7eUJBRWYsa0JBQUEsR0FBb0IsU0FBQTtXQUNsQixJQUFDLENBQUEsU0FBRCxDQUFXLGlCQUFYO0VBRGtCOzs7O0dBakRLLFVBQVUsQ0FBQzs7QUFvRHRDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5jbGFzcyBEYkNvbGxlY3Rpb24gZXh0ZW5kcyBNYXJpb25ldHRlLk9iamVjdFxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT5cbiAgICBjb2xsZWN0aW9uQ2xhc3MgPSBvcHRpb25zLmNvbGxlY3Rpb25DbGFzcyBvciBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gICAgQGNvbGxlY3Rpb24gPSBuZXcgY29sbGVjdGlvbkNsYXNzXG4gICAgQGNoYW5uZWxOYW1lID0gb3B0aW9ucy5jaGFubmVsTmFtZSBvciAnZ2xvYmFsJ1xuICByYWRpb1JlcXVlc3RzOiAtPlxuICAgIG9iaiA9IHt9XG4gICAgbmFtZSA9IEBnZXRPcHRpb24gJ21vZGVsTmFtZSdcbiAgICBuYW1lID0gbmFtZSBvciAnbW9kZWwnXG4gICAgcHJlZml4ID0gXCJkYjoje25hbWV9XCJcbiAgICBvYmpbXCIje3ByZWZpeH06Y29sbGVjdGlvblwiXSA9ICdnZXRDb2xsZWN0aW9uJ1xuICAgIG9ialtcIiN7cHJlZml4fTpuZXdcIl0gPSAnbmV3TW9kZWwnXG4gICAgb2JqW1wiI3twcmVmaXh9OmFkZFwiXSA9ICdhZGRNb2RlbCdcbiAgICBvYmpbXCIje3ByZWZpeH06dXBkYXRlXCJdID0gJ3VwZGF0ZU1vZGVsJ1xuICAgIG9ialtcIiN7cHJlZml4fTp1cGRhdGVQYXNzZWRcIl0gPSAndXBkYXRlUGFzc2VkTW9kZWwnXG4gICAgb2JqW1wiI3twcmVmaXh9OmdldFwiXSA9ICdnZXRNb2RlbCdcbiAgICBvYmpbXCIje3ByZWZpeH06bW9kZWxDbGFzc1wiXSA9ICdnZXRNb2RlbENsYXNzJ1xuICAgIG9ialtcIiN7cHJlZml4fTpjb2xsZWN0aW9uQ2xhc3NcIl0gPSAnZ2V0Q29sbGVjdGlvbkNsYXNzJ1xuICAgIHJldHVybiBvYmpcbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICBAY29sbGVjdGlvblxuICBuZXdNb2RlbDogKGF0dHJpYnV0ZXMpIC0+XG4gICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgb3Ige31cbiAgICBtb2RlbENsYXNzID0gQGdldE9wdGlvbiAnbW9kZWxDbGFzcydcbiAgICBuZXcgbW9kZWxDbGFzcyBhdHRyaWJ1dGVzXG4gIGFkZE1vZGVsOiAoYXR0cmlidXRlcykgLT5cbiAgICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcyBvciB7fVxuICAgIGNoYW5uZWwgPSBAZ2V0Q2hhbm5lbCgpXG4gICAgbmFtZSA9IEBnZXRPcHRpb24gJ21vZGVsTmFtZSdcbiAgICBtb2RlbCA9IEBjb2xsZWN0aW9uLmNyZWF0ZSBhdHRyaWJ1dGVzXG4gICAgbW9kZWwub25jZSAnc3luYycsIC0+XG4gICAgICBjaGFubmVsLnRyaWdnZXIgXCJkYjoje25hbWV9Omluc2VydGVkXCJcbiAgICBAY29sbGVjdGlvbi5hZGQgbW9kZWxcbiAgdXBkYXRlUGFzc2VkTW9kZWw6IChtb2RlbCwgbmV3QXR0cmlidXRlcykgLT5cbiAgICBjaGFubmVsID0gQGdldENoYW5uZWwoKVxuICAgIG5hbWUgPSBAZ2V0T3B0aW9uICdtb2RlbE5hbWUnXG4gICAgbW9kZWwub25jZSAnc3luYycsIC0+XG4gICAgICBjaGFubmVsLnRyaWdnZXIgXCJkYjoje25hbWV9OnVwZGF0ZWRcIlxuICAgIG1vZGVsLnNldCBuZXdBdHRyaWJ1dGVzXG4gICAgbW9kZWwuc2F2ZSgpXG4gIGdldE1vZGVsOiAoaWQpIC0+XG4gICAgbW9kZWwgPSBAY29sbGVjdGlvbi5nZXQgaWRcbiAgICBpZiBtb2RlbCBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBuZXcgQGNvbGxlY3Rpb24ubW9kZWxcbiAgICAgICAgaWQ6IGlkXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIG1vZGVsXG4gIGdldE1vZGVsQ2xhc3M6IC0+XG4gICAgQGdldE9wdGlvbiAnbW9kZWxDbGFzcydcbiAgZ2V0Q29sbGVjdGlvbkNsYXNzOiAtPlxuICAgIEBnZXRPcHRpb24gJ2NvbGxlY3Rpb25DbGFzcydcblxubW9kdWxlLmV4cG9ydHMgPSBEYkNvbGxlY3Rpb25cbiJdfQ==
