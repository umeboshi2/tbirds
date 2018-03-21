var BuildEnvironment, scssLoaderRule;

BuildEnvironment = process.env.NODE_ENV || 'development';

scssLoaderRule = {
  test: /\.scss$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['node_modules/compass-mixins/lib',
    'node_modules/bootstrap/scss']
      }
    }
  ]
};

export default scssLoaderRule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9ydWxlcy9zY3NzLWxvYWRlci5qcyIsInNvdXJjZXMiOlsid2VicGFjay9ydWxlcy9zY3NzLWxvYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxnQkFBQSxFQUFBOztBQUFBLGdCQUFBLEdBQW1CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBWixJQUF3Qjs7QUFFM0MsY0FBQSxHQUNFO0VBQUEsSUFBQSxFQUFNLFNBQU47RUFDQSxHQUFBLEVBQUs7SUFDSDtNQUNFLE1BQUEsRUFBUTtJQURWLENBREc7SUFHRDtNQUNBLE1BQUEsRUFBUTtJQURSLENBSEM7SUFLRDtNQUNBLE1BQUEsRUFBUSxhQURSO01BRUEsT0FBQSxFQUNFO1FBQUEsWUFBQSxFQUFjLENBQ1osaUNBRFk7SUFFWiw2QkFGWTtNQUFkO0lBSEYsQ0FMQzs7QUFETDs7QUFnQkYsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiQnVpbGRFbnZpcm9ubWVudCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIG9yICdkZXZlbG9wbWVudCdcblxuc2Nzc0xvYWRlclJ1bGUgPVxuICB0ZXN0OiAvXFwuc2NzcyQvXG4gIHVzZTogW1xuICAgIHtcbiAgICAgIGxvYWRlcjogJ3N0eWxlLWxvYWRlcidcbiAgICB9LHtcbiAgICAgIGxvYWRlcjogJ2Nzcy1sb2FkZXInXG4gICAgfSx7XG4gICAgICBsb2FkZXI6ICdzYXNzLWxvYWRlcidcbiAgICAgIG9wdGlvbnM6XG4gICAgICAgIGluY2x1ZGVQYXRoczogW1xuICAgICAgICAgICdub2RlX21vZHVsZXMvY29tcGFzcy1taXhpbnMvbGliJ1xuICAgICAgICAgICdub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MnXG4gICAgICAgICAgXVxuICAgIH1cbiAgXVxuXG5leHBvcnQgZGVmYXVsdCBzY3NzTG9hZGVyUnVsZVxuIl19
