var ace_editor_div, message_box, message_box_dismissable, tc;

tc = require('teacup');

message_box = tc.renderable(function(msg) {
  var lvl;
  lvl = msg.level;
  if (lvl === 'error') {
    lvl = 'danger';
  }
  return tc.div(".alert.alert-" + lvl, function() {
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      tc.span(".glyphicon.glyphicon-" + msg.icon);
    }
    return tc.text(msg.content);
  });
});

message_box_dismissable = tc.renderable(function(msg) {
  var lvl;
  lvl = msg.level;
  if (lvl === 'error') {
    lvl = 'danger';
  }
  return tc.div(".alert-dismissable.alert.alert-" + lvl, function() {
    tc.button('.close', {
      type: 'button',
      'data-dismiss': 'alert',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    return tc.text(msg.content);
  });
});

ace_editor_div = tc.renderable(function() {
  return tc.div('#ace-editor', {
    style: 'position:relative;width:100%;height:24em;'
  });
});

module.exports = {
  message_box: message_box,
  message_box_dismissable: message_box_dismissable,
  ace_editor_div: ace_editor_div
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL21pc2MuanMiLCJzb3VyY2VzIjpbInRlbXBsYXRlcy9taXNjLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFLTCxXQUFBLEdBQWMsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEdBQUQ7QUFDMUIsTUFBQTtFQUFBLEdBQUEsR0FBTSxHQUFHLENBQUM7RUFDVixJQUFHLEdBQUEsS0FBTyxPQUFWO0lBQ0UsR0FBQSxHQUFNLFNBRFI7O1NBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFBLEdBQWdCLEdBQXZCLEVBQThCLFNBQUE7SUFDNUIsRUFBRSxDQUFDLE1BQUgsQ0FBVSxRQUFWLEVBQW9CO01BQUEsSUFBQSxFQUFLLFFBQUw7TUFBZSxhQUFBLEVBQWUsSUFBOUI7S0FBcEIsRUFBd0QsU0FBQTthQUN0RCxFQUFFLENBQUMsR0FBSCxDQUFPLFNBQVA7SUFEc0QsQ0FBeEQ7SUFFQSxJQUFHLEdBQUcsQ0FBQyxJQUFQO01BQ0UsRUFBRSxDQUFDLElBQUgsQ0FBUSx1QkFBQSxHQUF3QixHQUFHLENBQUMsSUFBcEMsRUFERjs7V0FFQSxFQUFFLENBQUMsSUFBSCxDQUFRLEdBQUcsQ0FBQyxPQUFaO0VBTDRCLENBQTlCO0FBSjBCLENBQWQ7O0FBV2QsdUJBQUEsR0FBMEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEdBQUQ7QUFDdEMsTUFBQTtFQUFBLEdBQUEsR0FBTSxHQUFHLENBQUM7RUFDVixJQUFHLEdBQUEsS0FBTyxPQUFWO0lBQ0UsR0FBQSxHQUFNLFNBRFI7O1NBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxpQ0FBQSxHQUFrQyxHQUF6QyxFQUFnRCxTQUFBO0lBQzlDLEVBQUUsQ0FBQyxNQUFILENBQVUsUUFBVixFQUFvQjtNQUFBLElBQUEsRUFBSyxRQUFMO01BQWUsY0FBQSxFQUFlLE9BQTlCO01BQ3BCLGFBQUEsRUFBZSxJQURLO0tBQXBCLEVBQ3FCLFNBQUE7YUFDbkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxTQUFQO0lBRG1CLENBRHJCO1dBR0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFHLENBQUMsT0FBWjtFQUo4QyxDQUFoRDtBQUpzQyxDQUFkOztBQVUxQixjQUFBLEdBQWlCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtTQUM3QixFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0I7SUFBQSxLQUFBLEVBQU0sMkNBQU47R0FBdEI7QUFENkIsQ0FBZDs7QUFHakIsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLFdBQUEsRUFBYSxXQUFiO0VBQ0EsdUJBQUEsRUFBeUIsdUJBRHpCO0VBRUEsY0FBQSxFQUFnQixjQUZoQiIsInNvdXJjZXNDb250ZW50IjpbInRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIE1pc2MgVGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tZXNzYWdlX2JveCA9IHRjLnJlbmRlcmFibGUgKG1zZykgLT5cbiAgbHZsID0gbXNnLmxldmVsXG4gIGlmIGx2bCA9PSAnZXJyb3InXG4gICAgbHZsID0gJ2RhbmdlcidcbiAgdGMuZGl2IFwiLmFsZXJ0LmFsZXJ0LSN7bHZsfVwiLCAtPlxuICAgIHRjLmJ1dHRvbiAnLmNsb3NlJywgdHlwZTonYnV0dG9uJywgJ2FyaWEtaGlkZGVuJzogdHJ1ZSwgLT5cbiAgICAgIHRjLnJhdyAnJnRpbWVzOydcbiAgICBpZiBtc2cuaWNvblxuICAgICAgdGMuc3BhbiBcIi5nbHlwaGljb24uZ2x5cGhpY29uLSN7bXNnLmljb259XCJcbiAgICB0Yy50ZXh0IG1zZy5jb250ZW50XG4gICAgXG5tZXNzYWdlX2JveF9kaXNtaXNzYWJsZSA9IHRjLnJlbmRlcmFibGUgKG1zZykgLT5cbiAgbHZsID0gbXNnLmxldmVsXG4gIGlmIGx2bCA9PSAnZXJyb3InXG4gICAgbHZsID0gJ2RhbmdlcidcbiAgdGMuZGl2IFwiLmFsZXJ0LWRpc21pc3NhYmxlLmFsZXJ0LmFsZXJ0LSN7bHZsfVwiLCAtPlxuICAgIHRjLmJ1dHRvbiAnLmNsb3NlJywgdHlwZTonYnV0dG9uJywgJ2RhdGEtZGlzbWlzcyc6J2FsZXJ0JyxcbiAgICAnYXJpYS1oaWRkZW4nOiB0cnVlLCAtPlxuICAgICAgdGMucmF3ICcmdGltZXM7J1xuICAgIHRjLnRleHQgbXNnLmNvbnRlbnRcblxuYWNlX2VkaXRvcl9kaXYgPSB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gIHRjLmRpdiAnI2FjZS1lZGl0b3InLCBzdHlsZToncG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MjRlbTsnXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG4gIG1lc3NhZ2VfYm94OiBtZXNzYWdlX2JveFxuICBtZXNzYWdlX2JveF9kaXNtaXNzYWJsZTogbWVzc2FnZV9ib3hfZGlzbWlzc2FibGVcbiAgYWNlX2VkaXRvcl9kaXY6IGFjZV9lZGl0b3JfZGl2XG4iXX0=
