export default function(fieldlist) {
  var field, i, len, uiobject;
  uiobject = {};
  for (i = 0, len = fieldlist.length; i < len; i++) {
    field = fieldlist[i];
    uiobject[field] = `input[name=\"${field}\"]`;
  }
  return uiobject;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9tYWtlLWZpZWxkLWlucHV0LXVpLmpzIiwic291cmNlcyI6WyJ1dGlsL21ha2UtZmllbGQtaW5wdXQtdWkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQUEsUUFBZSxRQUFBLENBQUMsU0FBRCxDQUFBO0FBQ2YsTUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQTtFQUFFLFFBQUEsR0FBVyxDQUFBO0VBQ1gsS0FBQSwyQ0FBQTs7SUFDRSxRQUFRLENBQUMsS0FBRCxDQUFSLEdBQWtCLENBQUEsYUFBQSxDQUFBLENBQWdCLEtBQWhCLENBQUEsR0FBQTtFQURwQjtBQUVBLFNBQU87QUFKTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IChmaWVsZGxpc3QpIC0+XG4gIHVpb2JqZWN0ID0ge31cbiAgZm9yIGZpZWxkIGluIGZpZWxkbGlzdFxuICAgIHVpb2JqZWN0W2ZpZWxkXSA9IFwiaW5wdXRbbmFtZT1cXFwiI3tmaWVsZH1cXFwiXVwiXG4gIHJldHVybiB1aW9iamVjdFxuXG4iXX0=
