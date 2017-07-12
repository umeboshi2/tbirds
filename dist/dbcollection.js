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
    attributes = attributes || {};
    return new this.modelClass(attributes);
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
    var channel;
    channel = this.getChannel();
    model.once('sync', function() {
      return channel.trigger('db:#{name}:updated');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGJjb2xsZWN0aW9uLmpzIiwic291cmNlcyI6WyJkYmNvbGxlY3Rpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0NBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRVA7Ozs7Ozs7eUJBQ0osVUFBQSxHQUFZLFNBQUMsT0FBRDtBQUNWLFFBQUE7SUFBQSxlQUFBLEdBQWtCLE9BQU8sQ0FBQyxlQUFSLElBQTJCLFFBQVEsQ0FBQztJQUN0RCxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUk7V0FDbEIsSUFBQyxDQUFBLFdBQUQsR0FBZSxPQUFPLENBQUMsV0FBUixJQUF1QjtFQUg1Qjs7eUJBSVosYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsR0FBQSxHQUFNO0lBQ04sSUFBQSxHQUFPLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtJQUNQLElBQUEsR0FBTyxJQUFBLElBQVE7SUFDZixNQUFBLEdBQVMsS0FBQSxHQUFNO0lBQ2YsR0FBSSxDQUFHLE1BQUQsR0FBUSxhQUFWLENBQUosR0FBOEI7SUFDOUIsR0FBSSxDQUFHLE1BQUQsR0FBUSxNQUFWLENBQUosR0FBdUI7SUFDdkIsR0FBSSxDQUFHLE1BQUQsR0FBUSxNQUFWLENBQUosR0FBdUI7SUFDdkIsR0FBSSxDQUFHLE1BQUQsR0FBUSxTQUFWLENBQUosR0FBMEI7SUFDMUIsR0FBSSxDQUFHLE1BQUQsR0FBUSxlQUFWLENBQUosR0FBZ0M7SUFDaEMsR0FBSSxDQUFHLE1BQUQsR0FBUSxNQUFWLENBQUosR0FBdUI7SUFDdkIsR0FBSSxDQUFHLE1BQUQsR0FBUSxhQUFWLENBQUosR0FBOEI7SUFDOUIsR0FBSSxDQUFHLE1BQUQsR0FBUSxrQkFBVixDQUFKLEdBQW1DO0FBQ25DLFdBQU87RUFiTTs7eUJBY2YsYUFBQSxHQUFlLFNBQUE7V0FDYixJQUFDLENBQUE7RUFEWTs7eUJBRWYsUUFBQSxHQUFVLFNBQUMsVUFBRDtJQUNSLFVBQUEsR0FBYSxVQUFBLElBQWM7V0FDM0IsSUFBSSxJQUFDLENBQUEsVUFBTCxDQUFnQixVQUFoQjtFQUZROzt5QkFHVixRQUFBLEdBQVUsU0FBQyxVQUFEO0FBQ1IsUUFBQTtJQUFBLFVBQUEsR0FBYSxVQUFBLElBQWM7SUFDM0IsT0FBQSxHQUFVLElBQUMsQ0FBQSxVQUFELENBQUE7SUFDVixJQUFBLEdBQU8sSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO0lBQ1AsS0FBQSxHQUFRLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixDQUFtQixVQUFuQjtJQUNSLEtBQUssQ0FBQyxJQUFOLENBQVcsTUFBWCxFQUFtQixTQUFBO2FBQ2pCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLEtBQUEsR0FBTSxJQUFOLEdBQVcsV0FBM0I7SUFEaUIsQ0FBbkI7V0FFQSxJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0IsS0FBaEI7RUFQUTs7eUJBUVYsaUJBQUEsR0FBbUIsU0FBQyxLQUFELEVBQVEsYUFBUjtBQUNqQixRQUFBO0lBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxVQUFELENBQUE7SUFDVixLQUFLLENBQUMsSUFBTixDQUFXLE1BQVgsRUFBbUIsU0FBQTthQUNqQixPQUFPLENBQUMsT0FBUixDQUFnQixvQkFBaEI7SUFEaUIsQ0FBbkI7SUFFQSxLQUFLLENBQUMsR0FBTixDQUFVLGFBQVY7V0FDQSxLQUFLLENBQUMsSUFBTixDQUFBO0VBTGlCOzt5QkFNbkIsUUFBQSxHQUFVLFNBQUMsRUFBRDtBQUNSLFFBQUE7SUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCLEVBQWhCO0lBQ1IsSUFBRyxLQUFBLEtBQVMsTUFBWjtBQUNFLGFBQU8sSUFBSSxJQUFDLENBQUEsVUFBVSxDQUFDLEtBQWhCLENBQ0w7UUFBQSxFQUFBLEVBQUksRUFBSjtPQURLLEVBRFQ7S0FBQSxNQUFBO0FBSUUsYUFBTyxNQUpUOztFQUZROzt5QkFPVixhQUFBLEdBQWUsU0FBQTtXQUNiLElBQUMsQ0FBQSxTQUFELENBQVcsWUFBWDtFQURhOzt5QkFFZixrQkFBQSxHQUFvQixTQUFBO1dBQ2xCLElBQUMsQ0FBQSxTQUFELENBQVcsaUJBQVg7RUFEa0I7Ozs7R0EvQ0ssVUFBVSxDQUFDOztBQWtEdEMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbmNsYXNzIERiQ29sbGVjdGlvbiBleHRlbmRzIE1hcmlvbmV0dGUuT2JqZWN0XG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuICAgIGNvbGxlY3Rpb25DbGFzcyA9IG9wdGlvbnMuY29sbGVjdGlvbkNsYXNzIG9yIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgICBAY29sbGVjdGlvbiA9IG5ldyBjb2xsZWN0aW9uQ2xhc3NcbiAgICBAY2hhbm5lbE5hbWUgPSBvcHRpb25zLmNoYW5uZWxOYW1lIG9yICdnbG9iYWwnXG4gIHJhZGlvUmVxdWVzdHM6IC0+XG4gICAgb2JqID0ge31cbiAgICBuYW1lID0gQGdldE9wdGlvbiAnbW9kZWxOYW1lJ1xuICAgIG5hbWUgPSBuYW1lIG9yICdtb2RlbCdcbiAgICBwcmVmaXggPSBcImRiOiN7bmFtZX1cIlxuICAgIG9ialtcIiN7cHJlZml4fTpjb2xsZWN0aW9uXCJdID0gJ2dldENvbGxlY3Rpb24nXG4gICAgb2JqW1wiI3twcmVmaXh9Om5ld1wiXSA9ICduZXdNb2RlbCdcbiAgICBvYmpbXCIje3ByZWZpeH06YWRkXCJdID0gJ2FkZE1vZGVsJ1xuICAgIG9ialtcIiN7cHJlZml4fTp1cGRhdGVcIl0gPSAndXBkYXRlTW9kZWwnXG4gICAgb2JqW1wiI3twcmVmaXh9OnVwZGF0ZVBhc3NlZFwiXSA9ICd1cGRhdGVQYXNzZWRNb2RlbCdcbiAgICBvYmpbXCIje3ByZWZpeH06Z2V0XCJdID0gJ2dldE1vZGVsJ1xuICAgIG9ialtcIiN7cHJlZml4fTptb2RlbENsYXNzXCJdID0gJ2dldE1vZGVsQ2xhc3MnXG4gICAgb2JqW1wiI3twcmVmaXh9OmNvbGxlY3Rpb25DbGFzc1wiXSA9ICdnZXRDb2xsZWN0aW9uQ2xhc3MnXG4gICAgcmV0dXJuIG9ialxuICBnZXRDb2xsZWN0aW9uOiAtPlxuICAgIEBjb2xsZWN0aW9uXG4gIG5ld01vZGVsOiAoYXR0cmlidXRlcykgLT5cbiAgICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcyBvciB7fVxuICAgIG5ldyBAbW9kZWxDbGFzcyBhdHRyaWJ1dGVzXG4gIGFkZE1vZGVsOiAoYXR0cmlidXRlcykgLT5cbiAgICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcyBvciB7fVxuICAgIGNoYW5uZWwgPSBAZ2V0Q2hhbm5lbCgpXG4gICAgbmFtZSA9IEBnZXRPcHRpb24gJ21vZGVsTmFtZSdcbiAgICBtb2RlbCA9IEBjb2xsZWN0aW9uLmNyZWF0ZSBhdHRyaWJ1dGVzXG4gICAgbW9kZWwub25jZSAnc3luYycsIC0+XG4gICAgICBjaGFubmVsLnRyaWdnZXIgXCJkYjoje25hbWV9Omluc2VydGVkXCJcbiAgICBAY29sbGVjdGlvbi5hZGQgbW9kZWxcbiAgdXBkYXRlUGFzc2VkTW9kZWw6IChtb2RlbCwgbmV3QXR0cmlidXRlcykgLT5cbiAgICBjaGFubmVsID0gQGdldENoYW5uZWwoKVxuICAgIG1vZGVsLm9uY2UgJ3N5bmMnLCAtPlxuICAgICAgY2hhbm5lbC50cmlnZ2VyICdkYjoje25hbWV9OnVwZGF0ZWQnXG4gICAgbW9kZWwuc2V0IG5ld0F0dHJpYnV0ZXNcbiAgICBtb2RlbC5zYXZlKClcbiAgZ2V0TW9kZWw6IChpZCkgLT5cbiAgICBtb2RlbCA9IEBjb2xsZWN0aW9uLmdldCBpZFxuICAgIGlmIG1vZGVsIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIG5ldyBAY29sbGVjdGlvbi5tb2RlbFxuICAgICAgICBpZDogaWRcbiAgICBlbHNlXG4gICAgICByZXR1cm4gbW9kZWxcbiAgZ2V0TW9kZWxDbGFzczogLT5cbiAgICBAZ2V0T3B0aW9uICdtb2RlbENsYXNzJ1xuICBnZXRDb2xsZWN0aW9uQ2xhc3M6IC0+XG4gICAgQGdldE9wdGlvbiAnY29sbGVjdGlvbkNsYXNzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IERiQ29sbGVjdGlvblxuIl19
