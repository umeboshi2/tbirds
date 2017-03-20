var $, Backbone, BaseLocalStorageCollection, MainChannel, Marionette, MessageChannel, ResourceChannel, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

_ = require('underscore');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

ResourceChannel = Backbone.Radio.channel('resources');

BaseLocalStorageCollection = (function(superClass) {
  extend(BaseLocalStorageCollection, superClass);

  function BaseLocalStorageCollection() {
    return BaseLocalStorageCollection.__super__.constructor.apply(this, arguments);
  }

  BaseLocalStorageCollection.prototype.local_storage_key = null;

  BaseLocalStorageCollection.prototype.initialize = function() {
    this.fetch();
    return this.on('change', this.save, this);
  };

  BaseLocalStorageCollection.prototype.fetch = function() {
    var docs;
    docs = JSON.parse(localStorage.getItem(this.local_storage_key)) || [];
    return this.set(docs);
  };

  BaseLocalStorageCollection.prototype.save = function(collection) {
    return localStorage.setItem(this.local_storage_key, JSON.stringify(this.toJSON()));
  };

  return BaseLocalStorageCollection;

})(Backbone.Collection);

module.exports = {
  BaseLocalStorageCollection: BaseLocalStorageCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNjb2xsZWN0aW9uLmpzIiwic291cmNlcyI6WyJsc2NvbGxlY3Rpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0dBQUE7RUFBQTs7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLENBQUEsR0FBSSxPQUFBLENBQVEsWUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFHYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUNqQixlQUFBLEdBQWtCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixXQUF2Qjs7QUFHWjs7Ozs7Ozt1Q0FDSixpQkFBQSxHQUFtQjs7dUNBQ25CLFVBQUEsR0FBWSxTQUFBO0lBRVYsSUFBQyxDQUFBLEtBQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxFQUFELENBQUksUUFBSixFQUFjLElBQUMsQ0FBQSxJQUFmLEVBQXFCLElBQXJCO0VBSFU7O3VDQUtaLEtBQUEsR0FBTyxTQUFBO0FBRUwsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLFlBQVksQ0FBQyxPQUFiLENBQXFCLElBQUMsQ0FBQSxpQkFBdEIsQ0FBWCxDQUFBLElBQXdEO1dBQy9ELElBQUMsQ0FBQSxHQUFELENBQUssSUFBTDtFQUhLOzt1Q0FNUCxJQUFBLEdBQU0sU0FBQyxVQUFEO1dBRUosWUFBWSxDQUFDLE9BQWIsQ0FBcUIsSUFBQyxDQUFBLGlCQUF0QixFQUF5QyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBZixDQUF6QztFQUZJOzs7O0dBYmlDLFFBQVEsQ0FBQzs7QUFtQmxELE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSwwQkFBQSxFQUE0QiwwQkFBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUnXG5CYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuUmVzb3VyY2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAncmVzb3VyY2VzJ1xuXG5cbmNsYXNzIEJhc2VMb2NhbFN0b3JhZ2VDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBsb2NhbF9zdG9yYWdlX2tleTogbnVsbFxuICBpbml0aWFsaXplOiAoKSAtPlxuICAgICNjb25zb2xlLmxvZyBcImluaXRpYWxpemUgRG9jdW1lbnRDb2xsZWN0aW9uXCJcbiAgICBAZmV0Y2goKVxuICAgIEBvbiAnY2hhbmdlJywgQHNhdmUsIEBcbiAgICBcbiAgZmV0Y2g6ICgpIC0+XG4gICAgI2NvbnNvbGUubG9nICdmZXRjaGluZyBkb2N1bWVudHMnXG4gICAgZG9jcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oQGxvY2FsX3N0b3JhZ2Vfa2V5KSkgfHwgW11cbiAgICBAc2V0IGRvY3NcblxuICAjIEZJWE1FIVxuICBzYXZlOiAoY29sbGVjdGlvbikgLT5cbiAgICAjY29uc29sZS5sb2cgJ3NhdmluZyBkb2N1bWVudHMnXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQGxvY2FsX3N0b3JhZ2Vfa2V5LCBKU09OLnN0cmluZ2lmeShAdG9KU09OKCkpKVxuICAgIFxuICBcbiAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJhc2VMb2NhbFN0b3JhZ2VDb2xsZWN0aW9uOiBCYXNlTG9jYWxTdG9yYWdlQ29sbGVjdGlvblxuICBcblxuIl19
