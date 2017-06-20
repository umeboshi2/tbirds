module.exports = function(fieldlist) {
  var field, i, len, uiobject;
  uiobject = {};
  for (i = 0, len = fieldlist.length; i < len; i++) {
    field = fieldlist[i];
    uiobject[field] = "input[name=\"" + field + "\"]";
  }
  return uiobject;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9tYWtlLWZpZWxkLWlucHV0LXVpLmpzIiwic291cmNlcyI6WyJ1dGlsL21ha2UtZmllbGQtaW5wdXQtdWkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsU0FBRDtBQUNmLE1BQUE7RUFBQSxRQUFBLEdBQVc7QUFDWCxPQUFBLDJDQUFBOztJQUNFLFFBQVMsQ0FBQSxLQUFBLENBQVQsR0FBa0IsZUFBQSxHQUFnQixLQUFoQixHQUFzQjtBQUQxQztBQUVBLFNBQU87QUFKUSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gKGZpZWxkbGlzdCkgLT5cbiAgdWlvYmplY3QgPSB7fVxuICBmb3IgZmllbGQgaW4gZmllbGRsaXN0XG4gICAgdWlvYmplY3RbZmllbGRdID0gXCJpbnB1dFtuYW1lPVxcXCIje2ZpZWxkfVxcXCJdXCJcbiAgcmV0dXJuIHVpb2JqZWN0XG5cbiJdfQ==
