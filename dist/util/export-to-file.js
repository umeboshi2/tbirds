// FIXME
// use file-saver instead
// npm install file-saver

//sampleOptions =
//  data: 'bytes'
//  filename: 'file.bin'
//  elId: 'exported-file-anchor'
export default function(options) {
  var a, data, filename, link;
  data = encodeURIComponent(options.data);
  link = `${options.type},${data}`;
  filename = options.filename || "exported";
  a = document.createElement('a');
  a.id = options.elId || 'exported-file-anchor';
  a.href = link;
  a.download = filename;
  a.innerHTML = `Download ${filename}`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  return document.body.removeChild(a);
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9leHBvcnQtdG8tZmlsZS5qcyIsInNvdXJjZXMiOlsidXRpbC9leHBvcnQtdG8tZmlsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBV0EsT0FBQSxRQUFlLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDYixNQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBO0VBQUEsSUFBQSxHQUFPLGtCQUFBLENBQW1CLE9BQU8sQ0FBQyxJQUEzQjtFQUNQLElBQUEsR0FBTyxDQUFBLENBQUEsQ0FBRyxPQUFPLENBQUMsSUFBWCxDQUFnQixDQUFoQixDQUFBLENBQW1CLElBQW5CLENBQUE7RUFDUCxRQUFBLEdBQVcsT0FBTyxDQUFDLFFBQVIsSUFBb0I7RUFDL0IsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCO0VBQ0osQ0FBQyxDQUFDLEVBQUYsR0FBTyxPQUFPLENBQUMsSUFBUixJQUFnQjtFQUN2QixDQUFDLENBQUMsSUFBRixHQUFTO0VBQ1QsQ0FBQyxDQUFDLFFBQUYsR0FBYTtFQUNiLENBQUMsQ0FBQyxTQUFGLEdBQWMsQ0FBQSxTQUFBLENBQUEsQ0FBWSxRQUFaLENBQUE7RUFDZCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQVIsR0FBa0I7RUFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLENBQTFCO0VBQ0EsQ0FBQyxDQUFDLEtBQUYsQ0FBQTtTQUNBLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixDQUExQjtBQVphIiwic291cmNlc0NvbnRlbnQiOlsiIyBGSVhNRVxuIyB1c2UgZmlsZS1zYXZlciBpbnN0ZWFkXG4jIG5wbSBpbnN0YWxsIGZpbGUtc2F2ZXJcblxuXG4jc2FtcGxlT3B0aW9ucyA9XG4jICBkYXRhOiAnYnl0ZXMnXG4jICBmaWxlbmFtZTogJ2ZpbGUuYmluJ1xuIyAgZWxJZDogJ2V4cG9ydGVkLWZpbGUtYW5jaG9yJ1xuICBcbiAgXG5leHBvcnQgZGVmYXVsdCAob3B0aW9ucykgLT5cbiAgZGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmRhdGEpXG4gIGxpbmsgPSBcIiN7b3B0aW9ucy50eXBlfSwje2RhdGF9XCJcbiAgZmlsZW5hbWUgPSBvcHRpb25zLmZpbGVuYW1lIG9yIFwiZXhwb3J0ZWRcIlxuICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnYSdcbiAgYS5pZCA9IG9wdGlvbnMuZWxJZCBvciAnZXhwb3J0ZWQtZmlsZS1hbmNob3InXG4gIGEuaHJlZiA9IGxpbmtcbiAgYS5kb3dubG9hZCA9IGZpbGVuYW1lXG4gIGEuaW5uZXJIVE1MID0gXCJEb3dubG9hZCAje2ZpbGVuYW1lfVwiXG4gIGEuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGFcbiAgYS5jbGljaygpXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQgYVxuICBcblxuXG4iXX0=
