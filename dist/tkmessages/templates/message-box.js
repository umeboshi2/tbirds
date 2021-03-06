import tc from 'teacup';

export default tc.renderable(function(msg) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy90ZW1wbGF0ZXMvbWVzc2FnZS1ib3guanMiLCJzb3VyY2VzIjpbInRrbWVzc2FnZXMvdGVtcGxhdGVzL21lc3NhZ2UtYm94LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVAsTUFBQTs7QUFDQSxPQUFBLFFBQWUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsR0FBRCxDQUFBO0FBQzdCLE1BQUE7RUFBRSxHQUFBLEdBQU0sR0FBRyxDQUFDO0VBQ1YsSUFBRyxHQUFBLEtBQU8sT0FBVjtJQUNFLEdBQUEsR0FBTSxTQURSOztTQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsR0FBaEIsQ0FBQSxDQUFQLEVBQThCLFFBQUEsQ0FBQSxDQUFBO0FBQ2hDLFFBQUE7SUFBSSxFQUFFLENBQUMsTUFBSCxDQUFVLFFBQVYsRUFBb0I7TUFBQSxJQUFBLEVBQUssUUFBTDtNQUFlLGFBQUEsRUFBZTtJQUE5QixDQUFwQixFQUF3RCxRQUFBLENBQUEsQ0FBQTthQUN0RCxFQUFFLENBQUMsR0FBSCxDQUFPLFNBQVA7SUFEc0QsQ0FBeEQ7SUFFQSxJQUFHLEdBQUcsQ0FBQyxJQUFQO01BQ0UsSUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVQsQ0FBb0IsS0FBcEIsQ0FBSDtRQUNFLE1BQUEsR0FBUyxDQUFBLElBQUEsQ0FBQSxDQUFPLEdBQUcsQ0FBQyxJQUFYLENBQUEsRUFEWDtPQUFBLE1BQUE7UUFHRSxNQUFBLEdBQVMsQ0FBQSxxQkFBQSxDQUFBLENBQXdCLEdBQUcsQ0FBQyxJQUE1QixDQUFBLEVBSFg7O01BSUEsRUFBRSxDQUFDLElBQUgsQ0FBUSxNQUFSO01BQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBTkY7O1dBT0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFHLENBQUMsT0FBWjtFQVY0QixDQUE5QjtBQUoyQixDQUFkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcbmV4cG9ydCBkZWZhdWx0IHRjLnJlbmRlcmFibGUgKG1zZykgLT5cbiAgbHZsID0gbXNnLmxldmVsXG4gIGlmIGx2bCA9PSAnZXJyb3InXG4gICAgbHZsID0gJ2RhbmdlcidcbiAgdGMuZGl2IFwiLmFsZXJ0LmFsZXJ0LSN7bHZsfVwiLCAtPlxuICAgIHRjLmJ1dHRvbiAnLmNsb3NlJywgdHlwZTonYnV0dG9uJywgJ2FyaWEtaGlkZGVuJzogdHJ1ZSwgLT5cbiAgICAgIHRjLnJhdyAnJnRpbWVzOydcbiAgICBpZiBtc2cuaWNvblxuICAgICAgaWYgbXNnLmljb24uc3RhcnRzV2l0aCAnZmEtJ1xuICAgICAgICBpY2xhc3MgPSBcIi5mYS4je21zZy5pY29ufVwiXG4gICAgICBlbHNlXG4gICAgICAgIGljbGFzcyA9IFwiLmdseXBoaWNvbi5nbHlwaGljb24tI3ttc2cuaWNvbn1cIlxuICAgICAgdGMuc3BhbiBpY2xhc3NcbiAgICAgIHRjLnJhdyAnJm5ic3A7Jm5ic3AnXG4gICAgdGMudGV4dCBtc2cuY29udGVudFxuIl19
