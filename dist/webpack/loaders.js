  // webpack config module.loaders
export default [
  {
    test: /\.coffee$/,
    loader: 'coffee-loader'
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  },
  {
    test: /\.(gif|png|eot|ttf)?$/,
    loader: 'url-loader'
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  },
  {
    test: /jquery\/src\/selector\.js$/,
    loader: 'amd-define-factory-patcher-loader'
  },
  {
    test: /jquery-ui\/ui\/selector\.js$/,
    loader: 'amd-define-factory-patcher-loader'
  },
  {
    test: /pixi\.js/,
    loader: 'expose?PIXI'
  },
  {
    test: /phaser-split\.js$/,
    loader: 'expose?Phaser'
  },
  {
    test: /p2\.js/,
    loader: 'expose?p2'
  },
  {
    test: /masonry-layout/,
    loader: 'imports-loader?define=>false&this=>window'
  }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9sb2FkZXJzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrL2xvYWRlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUErQjtBQUMvQixPQUFBLFFBQWU7RUFDYjtJQUNFLElBQUEsRUFBTSxXQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FEYTtFQUtiO0lBQ0UsSUFBQSxFQUFNLFFBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQUxhO0VBU2I7SUFDRSxJQUFBLEVBQU0sdUJBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQVRhO0VBYWI7SUFDRSxJQUFBLEVBQU0sdURBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQWJhO0VBaUJiO0lBQ0UsSUFBQSxFQUFNLDRCQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FqQmE7RUFxQmI7SUFDRSxJQUFBLEVBQU0sOEJBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQXJCYTtFQXlCYjtJQUNFLElBQUEsRUFBTSxVQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0F6QmE7RUE2QmI7SUFDRSxJQUFBLEVBQU0sbUJBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQTdCYTtFQWlDYjtJQUNFLElBQUEsRUFBTSxRQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FqQ2E7RUFxQ2I7SUFDRSxJQUFBLEVBQU0sZ0JBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQXJDYSIsInNvdXJjZXNDb250ZW50IjpbIiMgd2VicGFjayBjb25maWcgbW9kdWxlLmxvYWRlcnNcbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHRlc3Q6IC9cXC5jb2ZmZWUkL1xuICAgIGxvYWRlcjogJ2NvZmZlZS1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9cXC5jc3MkL1xuICAgIGxvYWRlcjogJ3N0eWxlLWxvYWRlciFjc3MtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvXFwuKGdpZnxwbmd8ZW90fHR0Zik/JC9cbiAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvXFwuKHdvZmZ8d29mZjJ8ZW90fHR0ZnxzdmcpKFxcP3Y9WzAtOV1cXC5bMC05XVxcLlswLTldKT8kL1xuICAgIGxvYWRlcjogJ3VybC1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9qcXVlcnlcXC9zcmNcXC9zZWxlY3RvclxcLmpzJC9cbiAgICBsb2FkZXI6ICdhbWQtZGVmaW5lLWZhY3RvcnktcGF0Y2hlci1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9qcXVlcnktdWlcXC91aVxcL3NlbGVjdG9yXFwuanMkL1xuICAgIGxvYWRlcjogJ2FtZC1kZWZpbmUtZmFjdG9yeS1wYXRjaGVyLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL3BpeGlcXC5qcy9cbiAgICBsb2FkZXI6ICdleHBvc2U/UElYSSdcbiAgfVxuICB7XG4gICAgdGVzdDogL3BoYXNlci1zcGxpdFxcLmpzJC9cbiAgICBsb2FkZXI6ICdleHBvc2U/UGhhc2VyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvcDJcXC5qcy9cbiAgICBsb2FkZXI6ICdleHBvc2U/cDInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9tYXNvbnJ5LWxheW91dC8sXG4gICAgbG9hZGVyOiAnaW1wb3J0cy1sb2FkZXI/ZGVmaW5lPT5mYWxzZSZ0aGlzPT53aW5kb3cnXG4gIH1cbl1cbiJdfQ==
