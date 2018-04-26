import tc from 'teacup';

//export default (size='5x') ->
//  return tc.renderable
export default tc.renderable(function(size = '5x') {
  return tc.span(`.fa-stack.fa-${size}`, function() {
    tc.i(".fa.fa-image.fa-stack-1x");
    return tc.i(".fa.fa-ban.fa-stack-2x.text-danger");
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL25vLWltYWdlLXNwYW4uanMiLCJzb3VyY2VzIjpbInRlbXBsYXRlcy9uby1pbWFnZS1zcGFuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVAsTUFBQSxTQUFBOzs7O0FBSUEsT0FBQSxRQUFlLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLE9BQUssSUFBTixDQUFBO1NBQzNCLEVBQUUsQ0FBQyxJQUFILENBQVEsQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsSUFBaEIsQ0FBQSxDQUFSLEVBQWdDLFFBQUEsQ0FBQSxDQUFBO0lBQzlCLEVBQUUsQ0FBQyxDQUFILENBQUssMEJBQUw7V0FDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLG9DQUFMO0VBRjhCLENBQWhDO0FBRDJCLENBQWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG4jZXhwb3J0IGRlZmF1bHQgKHNpemU9JzV4JykgLT5cbiMgIHJldHVybiB0Yy5yZW5kZXJhYmxlXG5leHBvcnQgZGVmYXVsdCB0Yy5yZW5kZXJhYmxlIChzaXplPSc1eCcpIC0+XG4gIHRjLnNwYW4gXCIuZmEtc3RhY2suZmEtI3tzaXplfVwiLCAtPlxuICAgIHRjLmkgXCIuZmEuZmEtaW1hZ2UuZmEtc3RhY2stMXhcIlxuICAgIHRjLmkgXCIuZmEuZmEtYmFuLmZhLXN0YWNrLTJ4LnRleHQtZGFuZ2VyXCJcbiAgICBcbiJdfQ==
