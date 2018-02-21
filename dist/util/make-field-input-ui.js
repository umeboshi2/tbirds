module.exports = function(fieldlist) {
  var field, i, len, uiobject;
  uiobject = {};
  for (i = 0, len = fieldlist.length; i < len; i++) {
    field = fieldlist[i];
    uiobject[field] = `input[name="${field}"]`;
  }
  return uiobject;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9tYWtlLWZpZWxkLWlucHV0LXVpLmpzIiwic291cmNlcyI6WyJ1dGlsL21ha2UtZmllbGQtaW5wdXQtdWkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBQUEsQ0FBQyxTQUFELENBQUE7QUFDZixNQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUEsUUFBQSxHQUFXLENBQUE7RUFDWCxLQUFBLDJDQUFBOztJQUNFLFFBQVMsQ0FBQSxLQUFBLENBQVQsR0FBa0IsQ0FBQSxZQUFBLENBQUEsQ0FBZ0IsS0FBaEIsQ0FBc0IsRUFBdEI7RUFEcEI7QUFFQSxTQUFPO0FBSlEiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IChmaWVsZGxpc3QpIC0+XG4gIHVpb2JqZWN0ID0ge31cbiAgZm9yIGZpZWxkIGluIGZpZWxkbGlzdFxuICAgIHVpb2JqZWN0W2ZpZWxkXSA9IFwiaW5wdXRbbmFtZT1cXFwiI3tmaWVsZH1cXFwiXVwiXG4gIHJldHVybiB1aW9iamVjdFxuXG4iXX0=
