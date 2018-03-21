var message_box;

import tc from 'teacup';

message_box = tc.renderable(function(msg) {
  var lvl;
  lvl = msg.level;
  if (lvl === 'error') {
    lvl = 'danger';
  }
  return tc.div(`.alert.alert-${lvl}`, function() {
    var iclass;
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      if (msg.icon.startsWith('fa-')) {
        iclass = `.fa.${msg.icon}`;
      } else {
        iclass = `.glyphicon.glyphicon-${msg.icon}`;
      }
      tc.span(iclass);
      tc.raw('&nbsp;&nbsp');
    }
    return tc.text(msg.content);
  });
});

export default message_box;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy90ZW1wbGF0ZXMvbWVzc2FnZS1ib3guanMiLCJzb3VyY2VzIjpbInRrbWVzc2FnZXMvdGVtcGxhdGVzL21lc3NhZ2UtYm94LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDMUIsTUFBQTtFQUFBLEdBQUEsR0FBTSxHQUFHLENBQUM7RUFDVixJQUFHLEdBQUEsS0FBTyxPQUFWO0lBQ0UsR0FBQSxHQUFNLFNBRFI7O1NBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFBLGFBQUEsQ0FBQSxDQUFnQixHQUFoQixDQUFBLENBQVAsRUFBOEIsUUFBQSxDQUFBLENBQUE7QUFDNUIsUUFBQTtJQUFBLEVBQUUsQ0FBQyxNQUFILENBQVUsUUFBVixFQUFvQjtNQUFBLElBQUEsRUFBSyxRQUFMO01BQWUsYUFBQSxFQUFlO0lBQTlCLENBQXBCLEVBQXdELFFBQUEsQ0FBQSxDQUFBO2FBQ3RELEVBQUUsQ0FBQyxHQUFILENBQU8sU0FBUDtJQURzRCxDQUF4RDtJQUVBLElBQUcsR0FBRyxDQUFDLElBQVA7TUFDRSxJQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVCxDQUFvQixLQUFwQixDQUFIO1FBQ0UsTUFBQSxHQUFTLENBQUEsSUFBQSxDQUFBLENBQU8sR0FBRyxDQUFDLElBQVgsQ0FBQSxFQURYO09BQUEsTUFBQTtRQUdFLE1BQUEsR0FBUyxDQUFBLHFCQUFBLENBQUEsQ0FBd0IsR0FBRyxDQUFDLElBQTVCLENBQUEsRUFIWDs7TUFJQSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQVI7TUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFORjs7V0FPQSxFQUFFLENBQUMsSUFBSCxDQUFRLEdBQUcsQ0FBQyxPQUFaO0VBVjRCLENBQTlCO0FBSjBCLENBQWQ7O0FBZ0JkLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbm1lc3NhZ2VfYm94ID0gdGMucmVuZGVyYWJsZSAobXNnKSAtPlxuICBsdmwgPSBtc2cubGV2ZWxcbiAgaWYgbHZsID09ICdlcnJvcidcbiAgICBsdmwgPSAnZGFuZ2VyJ1xuICB0Yy5kaXYgXCIuYWxlcnQuYWxlcnQtI3tsdmx9XCIsIC0+XG4gICAgdGMuYnV0dG9uICcuY2xvc2UnLCB0eXBlOididXR0b24nLCAnYXJpYS1oaWRkZW4nOiB0cnVlLCAtPlxuICAgICAgdGMucmF3ICcmdGltZXM7J1xuICAgIGlmIG1zZy5pY29uXG4gICAgICBpZiBtc2cuaWNvbi5zdGFydHNXaXRoICdmYS0nXG4gICAgICAgIGljbGFzcyA9IFwiLmZhLiN7bXNnLmljb259XCJcbiAgICAgIGVsc2VcbiAgICAgICAgaWNsYXNzID0gXCIuZ2x5cGhpY29uLmdseXBoaWNvbi0je21zZy5pY29ufVwiXG4gICAgICB0Yy5zcGFuIGljbGFzc1xuICAgICAgdGMucmF3ICcmbmJzcDsmbmJzcCdcbiAgICB0Yy50ZXh0IG1zZy5jb250ZW50XG4gICAgXG5leHBvcnQgZGVmYXVsdCBtZXNzYWdlX2JveFxuICBcblxuIl19