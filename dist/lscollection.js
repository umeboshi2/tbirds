var BaseLocalStorageCollection, MainChannel, MessageChannel, ResourceChannel;

import $ from 'jquery';

import _ from 'underscore';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

ResourceChannel = Backbone.Radio.channel('resources');

BaseLocalStorageCollection = (function() {
  class BaseLocalStorageCollection extends Backbone.Collection {
    initialize() {
      //console.log "initialize DocumentCollection"
      this.fetch();
      return this.on('change', this.save, this);
    }

    fetch() {
      var docs;
      //console.log 'fetching documents'
      docs = JSON.parse(localStorage.getItem(this.local_storage_key)) || [];
      return this.set(docs);
    }

    // FIXME!
    save(collection) {
      //console.log 'saving documents'
      return localStorage.setItem(this.local_storage_key, JSON.stringify(this.toJSON()));
    }

  };

  BaseLocalStorageCollection.prototype.local_storage_key = null;

  return BaseLocalStorageCollection;

}).call(this);

export {
  BaseLocalStorageCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNjb2xsZWN0aW9uLmpzIiwic291cmNlcyI6WyJsc2NvbGxlY3Rpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsMEJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBQ2pCLGVBQUEsR0FBa0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFdBQXZCOztBQUdaO0VBQU4sTUFBQSwyQkFBQSxRQUF5QyxRQUFRLENBQUMsV0FBbEQ7SUFFRSxVQUFZLENBQUEsQ0FBQSxFQUFBOztNQUVWLElBQUMsQ0FBQSxLQUFELENBQUE7YUFDQSxJQUFDLENBQUEsRUFBRCxDQUFJLFFBQUosRUFBYyxJQUFDLENBQUEsSUFBZixFQUFxQixJQUFyQjtJQUhVOztJQUtaLEtBQU8sQ0FBQSxDQUFBO0FBRUwsVUFBQSxJQUFBOztNQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLFlBQVksQ0FBQyxPQUFiLENBQXFCLElBQUMsQ0FBQSxpQkFBdEIsQ0FBWCxDQUFBLElBQXdEO2FBQy9ELElBQUMsQ0FBQSxHQUFELENBQUssSUFBTDtJQUhLLENBTlA7OztJQVlBLElBQU0sQ0FBQyxVQUFELENBQUEsRUFBQTs7YUFFSixZQUFZLENBQUMsT0FBYixDQUFxQixJQUFDLENBQUEsaUJBQXRCLEVBQXlDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFmLENBQXpDO0lBRkk7O0VBYlI7O3VDQUNFLGlCQUFBLEdBQW1COzs7Ozs7QUFrQnJCLE9BQUE7RUFDRSwwQkFERiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblJlc291cmNlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ3Jlc291cmNlcydcblxuXG5jbGFzcyBCYXNlTG9jYWxTdG9yYWdlQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbG9jYWxfc3RvcmFnZV9rZXk6IG51bGxcbiAgaW5pdGlhbGl6ZTogKCkgLT5cbiAgICAjY29uc29sZS5sb2cgXCJpbml0aWFsaXplIERvY3VtZW50Q29sbGVjdGlvblwiXG4gICAgQGZldGNoKClcbiAgICBAb24gJ2NoYW5nZScsIEBzYXZlLCBAXG4gICAgXG4gIGZldGNoOiAoKSAtPlxuICAgICNjb25zb2xlLmxvZyAnZmV0Y2hpbmcgZG9jdW1lbnRzJ1xuICAgIGRvY3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEBsb2NhbF9zdG9yYWdlX2tleSkpIHx8IFtdXG4gICAgQHNldCBkb2NzXG5cbiAgIyBGSVhNRSFcbiAgc2F2ZTogKGNvbGxlY3Rpb24pIC0+XG4gICAgI2NvbnNvbGUubG9nICdzYXZpbmcgZG9jdW1lbnRzJ1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEBsb2NhbF9zdG9yYWdlX2tleSwgSlNPTi5zdHJpbmdpZnkoQHRvSlNPTigpKSlcbiAgICBcbiAgXG4gIFxuZXhwb3J0IHtcbiAgQmFzZUxvY2FsU3RvcmFnZUNvbGxlY3Rpb25cbiAgfSAgXG5cbiJdfQ==