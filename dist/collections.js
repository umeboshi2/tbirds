var Backbone, BaseCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

BaseCollection = (function(superClass) {
  extend(BaseCollection, superClass);

  function BaseCollection() {
    return BaseCollection.__super__.constructor.apply(this, arguments);
  }

  BaseCollection.prototype.parse = function(response) {
    return response.data;
  };

  return BaseCollection;

})(Backbone.Collection);

module.exports = {
  BaseCollection: BaseCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbnMuanMiLCJzb3VyY2VzIjpbImNvbGxlY3Rpb25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHdCQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFHTDs7Ozs7OzsyQkFHSixLQUFBLEdBQU8sU0FBQyxRQUFEO0FBQ0wsV0FBTyxRQUFRLENBQUM7RUFEWDs7OztHQUhvQixRQUFRLENBQUM7O0FBT3RDLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxjQUFBLEVBQWdCLGNBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcblxuXG5jbGFzcyBCYXNlQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgIyB3cmFwIHRoZSBwYXJzaW5nIHRvIHJldHJpZXZlIHRoZVxuICAjICdkYXRhJyBhdHRyaWJ1dGUgZnJvbSB0aGUganNvbiByZXNwb25zZVxuICBwYXJzZTogKHJlc3BvbnNlKSAtPlxuICAgIHJldHVybiByZXNwb25zZS5kYXRhXG5cbiAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJhc2VDb2xsZWN0aW9uOiBCYXNlQ29sbGVjdGlvblxuIl19
