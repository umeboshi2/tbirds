var BaseLocalStorageCollection;

import {
  Collection
} from 'backbone';

BaseLocalStorageCollection = (function() {
  class BaseLocalStorageCollection extends Collection {
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
    save() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNjb2xsZWN0aW9uLmpzIiwic291cmNlcyI6WyJsc2NvbGxlY3Rpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLFVBQVQ7Q0FBQSxNQUFBOztBQUdNO0VBQU4sTUFBQSwyQkFBQSxRQUF5QyxXQUF6QztJQUVFLFVBQVksQ0FBQSxDQUFBLEVBQUE7O01BRVYsSUFBQyxDQUFBLEtBQUQsQ0FBQTthQUNBLElBQUMsQ0FBQSxFQUFELENBQUksUUFBSixFQUFjLElBQUMsQ0FBQSxJQUFmLEVBQXFCLElBQXJCO0lBSFU7O0lBS1osS0FBTyxDQUFBLENBQUE7QUFDVCxVQUFBLElBQUE7O01BQ0ksSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsSUFBQyxDQUFBLGlCQUF0QixDQUFYLENBQUEsSUFBd0Q7YUFDL0QsSUFBQyxDQUFBLEdBQUQsQ0FBSyxJQUFMO0lBSEssQ0FOVDs7O0lBWUUsSUFBTSxDQUFBLENBQUEsRUFBQTs7YUFFSixZQUFZLENBQUMsT0FBYixDQUFxQixJQUFDLENBQUEsaUJBQXRCLEVBQXlDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFmLENBQXpDO0lBRkk7O0VBYlI7O3VDQUNFLGlCQUFBLEdBQW1COzs7Ozs7QUFrQnJCLE9BQUE7RUFDRSwwQkFERiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICdiYWNrYm9uZSdcblxuXG5jbGFzcyBCYXNlTG9jYWxTdG9yYWdlQ29sbGVjdGlvbiBleHRlbmRzIENvbGxlY3Rpb25cbiAgbG9jYWxfc3RvcmFnZV9rZXk6IG51bGxcbiAgaW5pdGlhbGl6ZTogLT5cbiAgICAjY29uc29sZS5sb2cgXCJpbml0aWFsaXplIERvY3VtZW50Q29sbGVjdGlvblwiXG4gICAgQGZldGNoKClcbiAgICBAb24gJ2NoYW5nZScsIEBzYXZlLCBAXG4gICAgXG4gIGZldGNoOiAtPlxuICAgICNjb25zb2xlLmxvZyAnZmV0Y2hpbmcgZG9jdW1lbnRzJ1xuICAgIGRvY3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEBsb2NhbF9zdG9yYWdlX2tleSkpIHx8IFtdXG4gICAgQHNldCBkb2NzXG5cbiAgIyBGSVhNRSFcbiAgc2F2ZTogLT5cbiAgICAjY29uc29sZS5sb2cgJ3NhdmluZyBkb2N1bWVudHMnXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQGxvY2FsX3N0b3JhZ2Vfa2V5LCBKU09OLnN0cmluZ2lmeShAdG9KU09OKCkpKVxuICAgIFxuICBcbiAgXG5leHBvcnQge1xuICBCYXNlTG9jYWxTdG9yYWdlQ29sbGVjdGlvblxuICB9XG4iXX0=
