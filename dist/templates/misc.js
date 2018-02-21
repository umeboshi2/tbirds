var ace_editor_div, message_box, message_box_dismissable, tc;

tc = require('teacup');

//#######################################
// Misc Templates
//#######################################
message_box = tc.renderable(function(msg) {
  var lvl;
  lvl = msg.level;
  if (lvl === 'error') {
    lvl = 'danger';
  }
  return tc.div(`.alert.alert-${lvl}`, function() {
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      tc.span(`.glyphicon.glyphicon-${msg.icon}`);
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
  return tc.div(`.alert-dismissable.alert.alert-${lvl}`, function() {
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

//#######################################
module.exports = {
  message_box: message_box,
  message_box_dismissable: message_box_dismissable,
  ace_editor_div: ace_editor_div
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL21pc2MuanMiLCJzb3VyY2VzIjpbInRlbXBsYXRlcy9taXNjLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGNBQUEsRUFBQSxXQUFBLEVBQUEsdUJBQUEsRUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVIsRUFBTDs7Ozs7QUFLQSxXQUFBLEdBQWMsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsR0FBRCxDQUFBO0FBQzFCLE1BQUE7RUFBQSxHQUFBLEdBQU0sR0FBRyxDQUFDO0VBQ1YsSUFBRyxHQUFBLEtBQU8sT0FBVjtJQUNFLEdBQUEsR0FBTSxTQURSOztTQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsR0FBaEIsQ0FBQSxDQUFQLEVBQThCLFFBQUEsQ0FBQSxDQUFBO0lBQzVCLEVBQUUsQ0FBQyxNQUFILENBQVUsUUFBVixFQUFvQjtNQUFBLElBQUEsRUFBSyxRQUFMO01BQWUsYUFBQSxFQUFlO0lBQTlCLENBQXBCLEVBQXdELFFBQUEsQ0FBQSxDQUFBO2FBQ3RELEVBQUUsQ0FBQyxHQUFILENBQU8sU0FBUDtJQURzRCxDQUF4RDtJQUVBLElBQUcsR0FBRyxDQUFDLElBQVA7TUFDRSxFQUFFLENBQUMsSUFBSCxDQUFRLENBQUEscUJBQUEsQ0FBQSxDQUF3QixHQUFHLENBQUMsSUFBNUIsQ0FBQSxDQUFSLEVBREY7O1dBRUEsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFHLENBQUMsT0FBWjtFQUw0QixDQUE5QjtBQUowQixDQUFkOztBQVdkLHVCQUFBLEdBQTBCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEdBQUQsQ0FBQTtBQUN0QyxNQUFBO0VBQUEsR0FBQSxHQUFNLEdBQUcsQ0FBQztFQUNWLElBQUcsR0FBQSxLQUFPLE9BQVY7SUFDRSxHQUFBLEdBQU0sU0FEUjs7U0FFQSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsK0JBQUEsQ0FBQSxDQUFrQyxHQUFsQyxDQUFBLENBQVAsRUFBZ0QsUUFBQSxDQUFBLENBQUE7SUFDOUMsRUFBRSxDQUFDLE1BQUgsQ0FBVSxRQUFWLEVBQW9CO01BQUEsSUFBQSxFQUFLLFFBQUw7TUFBZSxjQUFBLEVBQWUsT0FBOUI7TUFDcEIsYUFBQSxFQUFlO0lBREssQ0FBcEIsRUFDcUIsUUFBQSxDQUFBLENBQUE7YUFDbkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxTQUFQO0lBRG1CLENBRHJCO1dBR0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFHLENBQUMsT0FBWjtFQUo4QyxDQUFoRDtBQUpzQyxDQUFkOztBQVUxQixjQUFBLEdBQWlCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7U0FDN0IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCO0lBQUEsS0FBQSxFQUFNO0VBQU4sQ0FBdEI7QUFENkIsQ0FBZCxFQTFCakI7OztBQTZCQSxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsV0FBQSxFQUFhLFdBQWI7RUFDQSx1QkFBQSxFQUF5Qix1QkFEekI7RUFFQSxjQUFBLEVBQWdCO0FBRmhCIiwic291cmNlc0NvbnRlbnQiOlsidGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgTWlzYyBUZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1lc3NhZ2VfYm94ID0gdGMucmVuZGVyYWJsZSAobXNnKSAtPlxuICBsdmwgPSBtc2cubGV2ZWxcbiAgaWYgbHZsID09ICdlcnJvcidcbiAgICBsdmwgPSAnZGFuZ2VyJ1xuICB0Yy5kaXYgXCIuYWxlcnQuYWxlcnQtI3tsdmx9XCIsIC0+XG4gICAgdGMuYnV0dG9uICcuY2xvc2UnLCB0eXBlOididXR0b24nLCAnYXJpYS1oaWRkZW4nOiB0cnVlLCAtPlxuICAgICAgdGMucmF3ICcmdGltZXM7J1xuICAgIGlmIG1zZy5pY29uXG4gICAgICB0Yy5zcGFuIFwiLmdseXBoaWNvbi5nbHlwaGljb24tI3ttc2cuaWNvbn1cIlxuICAgIHRjLnRleHQgbXNnLmNvbnRlbnRcbiAgICBcbm1lc3NhZ2VfYm94X2Rpc21pc3NhYmxlID0gdGMucmVuZGVyYWJsZSAobXNnKSAtPlxuICBsdmwgPSBtc2cubGV2ZWxcbiAgaWYgbHZsID09ICdlcnJvcidcbiAgICBsdmwgPSAnZGFuZ2VyJ1xuICB0Yy5kaXYgXCIuYWxlcnQtZGlzbWlzc2FibGUuYWxlcnQuYWxlcnQtI3tsdmx9XCIsIC0+XG4gICAgdGMuYnV0dG9uICcuY2xvc2UnLCB0eXBlOididXR0b24nLCAnZGF0YS1kaXNtaXNzJzonYWxlcnQnLFxuICAgICdhcmlhLWhpZGRlbic6IHRydWUsIC0+XG4gICAgICB0Yy5yYXcgJyZ0aW1lczsnXG4gICAgdGMudGV4dCBtc2cuY29udGVudFxuXG5hY2VfZWRpdG9yX2RpdiA9IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgdGMuZGl2ICcjYWNlLWVkaXRvcicsIHN0eWxlOidwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlO2hlaWdodDoyNGVtOydcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm1vZHVsZS5leHBvcnRzID1cbiAgbWVzc2FnZV9ib3g6IG1lc3NhZ2VfYm94XG4gIG1lc3NhZ2VfYm94X2Rpc21pc3NhYmxlOiBtZXNzYWdlX2JveF9kaXNtaXNzYWJsZVxuICBhY2VfZWRpdG9yX2RpdjogYWNlX2VkaXRvcl9kaXZcbiJdfQ==
