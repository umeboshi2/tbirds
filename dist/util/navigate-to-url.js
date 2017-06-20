var Backbone;

Backbone = require('backbone');

module.exports = function(url) {
  var r;
  if (url.split('/')[0] === '') {
    return window.location = url;
  } else {
    r = new Backbone.Router;
    return r.navigate(url, {
      trigger: true
    });
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9uYXZpZ2F0ZS10by11cmwuanMiLCJzb3VyY2VzIjpbInV0aWwvbmF2aWdhdGUtdG8tdXJsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLEdBQUQ7QUFDZixNQUFBO0VBQUEsSUFBRyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBZSxDQUFBLENBQUEsQ0FBZixLQUFxQixFQUF4QjtXQUNFLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLElBRHBCO0dBQUEsTUFBQTtJQUdFLENBQUEsR0FBSSxJQUFJLFFBQVEsQ0FBQztXQUNqQixDQUFDLENBQUMsUUFBRixDQUFXLEdBQVgsRUFBZ0I7TUFBQSxPQUFBLEVBQVEsSUFBUjtLQUFoQixFQUpGOztBQURlIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbm1vZHVsZS5leHBvcnRzID0gKHVybCkgLT5cbiAgaWYgdXJsLnNwbGl0KCcvJylbMF0gPT0gJydcbiAgICB3aW5kb3cubG9jYXRpb24gPSB1cmxcbiAgZWxzZVxuICAgIHIgPSBuZXcgQmFja2JvbmUuUm91dGVyXG4gICAgci5uYXZpZ2F0ZSB1cmwsIHRyaWdnZXI6dHJ1ZVxuXG4iXX0=
