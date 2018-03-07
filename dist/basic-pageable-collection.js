var Backbone, BasicPageableCollection, MainChannel, PageableCollection, pageSize;

Backbone = require('backbone');

PageableCollection = require('backbone.paginator');

MainChannel = Backbone.Radio.channel('global');

pageSize = MainChannel.request('main:app:get-pagesize');

if (!pageSize) {
  pageSize = 10;
}

BasicPageableCollection = (function() {
  class BasicPageableCollection extends PageableCollection {
    parse(response) {
      var total;
      // FIXME it seems we have to set
      // totalPages and lastPage each time
      total = response.total_count;
      this.state.totalRecords = total;
      this.state.totalPages = Math.ceil(total / this.state.pageSize);
      // we start at page zero
      this.state.lastPage = this.state.totalPages - 1;
      return super.parse(response.items);
    }

  };

  BasicPageableCollection.prototype.queryParams = {
    sort: function() {
      return this.state.sortColumn;
    },
    direction: function() {
      return this.state.sortDirection;
    },
    pageSize: 'limit',
    currentPage: '',
    offset: function() {
      return this.state.currentPage * this.state.pageSize;
    }
  };

  BasicPageableCollection.prototype.state = {
    firstPage: 0,
    currentPage: 0,
    pageSize: parseInt(pageSize),
    sortColumn: 'id',
    sortDirection: 'asc'
  };

  return BasicPageableCollection;

}).call(this);

module.exports = BasicPageableCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbi5qcyIsInNvdXJjZXMiOlsiYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsdUJBQUEsRUFBQSxXQUFBLEVBQUEsa0JBQUEsRUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLG9CQUFSOztBQUVyQixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLFFBQUEsR0FBVyxXQUFXLENBQUMsT0FBWixDQUFvQix1QkFBcEI7O0FBQ1gsSUFBRyxDQUFJLFFBQVA7RUFDRSxRQUFBLEdBQVcsR0FEYjs7O0FBR007RUFBTixNQUFBLHdCQUFBLFFBQXNDLG1CQUF0QztJQWdCRSxLQUFPLENBQUMsUUFBRCxDQUFBO0FBR0wsVUFBQSxLQUFBOzs7TUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDO01BQ2pCLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxHQUFzQjtNQUN0QixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0IsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFBLEdBQVEsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUF6QixFQUZwQjs7TUFJQSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVAsR0FBa0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLEdBQW9CO2tCQVB4QyxDQUFBLEtBUUUsQ0FBTSxRQUFRLENBQUMsS0FBZjtJQVJLOztFQWhCVDs7b0NBQ0UsV0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFFBQUEsQ0FBQSxDQUFBO2FBQ0osSUFBQyxDQUFBLEtBQUssQ0FBQztJQURILENBQU47SUFFQSxTQUFBLEVBQVcsUUFBQSxDQUFBLENBQUE7YUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDO0lBREUsQ0FGWDtJQUlBLFFBQUEsRUFBVSxPQUpWO0lBS0EsV0FBQSxFQUFhLEVBTGI7SUFNQSxNQUFBLEVBQVEsUUFBQSxDQUFBLENBQUE7YUFDTixJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsR0FBcUIsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUR0QjtFQU5SOztvQ0FRRixLQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVcsQ0FBWDtJQUNBLFdBQUEsRUFBYSxDQURiO0lBRUEsUUFBQSxFQUFVLFFBQUEsQ0FBUyxRQUFULENBRlY7SUFHQSxVQUFBLEVBQVksSUFIWjtJQUlBLGFBQUEsRUFBZTtFQUpmOzs7Ozs7QUFlSixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5QYWdlYWJsZUNvbGxlY3Rpb24gPSByZXF1aXJlICdiYWNrYm9uZS5wYWdpbmF0b3InXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5wYWdlU2l6ZSA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmdldC1wYWdlc2l6ZSdcbmlmIG5vdCBwYWdlU2l6ZVxuICBwYWdlU2l6ZSA9IDEwXG4gIFxuY2xhc3MgQmFzaWNQYWdlYWJsZUNvbGxlY3Rpb24gZXh0ZW5kcyBQYWdlYWJsZUNvbGxlY3Rpb25cbiAgcXVlcnlQYXJhbXM6XG4gICAgc29ydDogLT5cbiAgICAgIEBzdGF0ZS5zb3J0Q29sdW1uXG4gICAgZGlyZWN0aW9uOiAtPlxuICAgICAgQHN0YXRlLnNvcnREaXJlY3Rpb25cbiAgICBwYWdlU2l6ZTogJ2xpbWl0J1xuICAgIGN1cnJlbnRQYWdlOiAnJ1xuICAgIG9mZnNldDogLT5cbiAgICAgIEBzdGF0ZS5jdXJyZW50UGFnZSAqIEBzdGF0ZS5wYWdlU2l6ZVxuICBzdGF0ZTpcbiAgICBmaXJzdFBhZ2U6IDBcbiAgICBjdXJyZW50UGFnZTogMFxuICAgIHBhZ2VTaXplOiBwYXJzZUludCBwYWdlU2l6ZVxuICAgIHNvcnRDb2x1bW46ICdpZCdcbiAgICBzb3J0RGlyZWN0aW9uOiAnYXNjJ1xuICBwYXJzZTogKHJlc3BvbnNlKSAtPlxuICAgICMgRklYTUUgaXQgc2VlbXMgd2UgaGF2ZSB0byBzZXRcbiAgICAjIHRvdGFsUGFnZXMgYW5kIGxhc3RQYWdlIGVhY2ggdGltZVxuICAgIHRvdGFsID0gcmVzcG9uc2UudG90YWxfY291bnRcbiAgICBAc3RhdGUudG90YWxSZWNvcmRzID0gdG90YWxcbiAgICBAc3RhdGUudG90YWxQYWdlcyA9IE1hdGguY2VpbCB0b3RhbCAvIEBzdGF0ZS5wYWdlU2l6ZVxuICAgICMgd2Ugc3RhcnQgYXQgcGFnZSB6ZXJvXG4gICAgQHN0YXRlLmxhc3RQYWdlID0gQHN0YXRlLnRvdGFsUGFnZXMgLSAxXG4gICAgc3VwZXIgcmVzcG9uc2UuaXRlbXNcbiAgICBcbm1vZHVsZS5leHBvcnRzID0gQmFzaWNQYWdlYWJsZUNvbGxlY3Rpb25cblxuICBcbiJdfQ==
