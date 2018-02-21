  // webpack config module.loaders
module.exports = [
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
    test: /\.(woff|woff2|eot|ttf|svg)(\?[\&0-9]+)?$/,
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9sb2FkZXJzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrL2xvYWRlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUNFO0lBQ0UsSUFBQSxFQUFNLFdBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQURGO0VBS0U7SUFDRSxJQUFBLEVBQU0sUUFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBTEY7RUFTRTtJQUNFLElBQUEsRUFBTSx1QkFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBVEY7RUFhRTtJQUNFLElBQUEsRUFBTSwwQ0FEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBYkY7RUFpQkU7SUFDRSxJQUFBLEVBQU0sdURBRFI7SUFFRSxNQUFBLEVBQVE7RUFGVixDQWpCRjtFQXFCRTtJQUNFLElBQUEsRUFBTSw0QkFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBckJGO0VBeUJFO0lBQ0UsSUFBQSxFQUFNLDhCQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0F6QkY7RUE2QkU7SUFDRSxJQUFBLEVBQU0sVUFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBN0JGO0VBaUNFO0lBQ0UsSUFBQSxFQUFNLG1CQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FqQ0Y7RUFxQ0U7SUFDRSxJQUFBLEVBQU0sUUFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBckNGO0VBeUNFO0lBQ0UsSUFBQSxFQUFNLGdCQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0F6Q0YiLCJzb3VyY2VzQ29udGVudCI6WyIjIHdlYnBhY2sgY29uZmlnIG1vZHVsZS5sb2FkZXJzXG5tb2R1bGUuZXhwb3J0cyA9XG4gIFtcbiAgICB7XG4gICAgICB0ZXN0OiAvXFwuY29mZmVlJC9cbiAgICAgIGxvYWRlcjogJ2NvZmZlZS1sb2FkZXInXG4gICAgfVxuICAgIHtcbiAgICAgIHRlc3Q6IC9cXC5jc3MkL1xuICAgICAgbG9hZGVyOiAnc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXInXG4gICAgfVxuICAgIHtcbiAgICAgIHRlc3Q6IC9cXC4oZ2lmfHBuZ3xlb3R8dHRmKT8kL1xuICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcidcbiAgICB9XG4gICAge1xuICAgICAgdGVzdDogL1xcLih3b2ZmfHdvZmYyfGVvdHx0dGZ8c3ZnKShcXD9bXFwmMC05XSspPyQvXG4gICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJ1xuICAgIH1cbiAgICB7XG4gICAgICB0ZXN0OiAvXFwuKHdvZmZ8d29mZjJ8ZW90fHR0ZnxzdmcpKFxcP3Y9WzAtOV1cXC5bMC05XVxcLlswLTldKT8kL1xuICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcidcbiAgICB9XG4gICAge1xuICAgICAgdGVzdDogL2pxdWVyeVxcL3NyY1xcL3NlbGVjdG9yXFwuanMkL1xuICAgICAgbG9hZGVyOiAnYW1kLWRlZmluZS1mYWN0b3J5LXBhdGNoZXItbG9hZGVyJ1xuICAgIH1cbiAgICB7XG4gICAgICB0ZXN0OiAvanF1ZXJ5LXVpXFwvdWlcXC9zZWxlY3RvclxcLmpzJC9cbiAgICAgIGxvYWRlcjogJ2FtZC1kZWZpbmUtZmFjdG9yeS1wYXRjaGVyLWxvYWRlcidcbiAgICB9XG4gICAge1xuICAgICAgdGVzdDogL3BpeGlcXC5qcy9cbiAgICAgIGxvYWRlcjogJ2V4cG9zZT9QSVhJJ1xuICAgIH1cbiAgICB7XG4gICAgICB0ZXN0OiAvcGhhc2VyLXNwbGl0XFwuanMkL1xuICAgICAgbG9hZGVyOiAnZXhwb3NlP1BoYXNlcidcbiAgICB9XG4gICAge1xuICAgICAgdGVzdDogL3AyXFwuanMvXG4gICAgICBsb2FkZXI6ICdleHBvc2U/cDInXG4gICAgfVxuICAgIHtcbiAgICAgIHRlc3Q6IC9tYXNvbnJ5LWxheW91dC8sXG4gICAgICBsb2FkZXI6ICdpbXBvcnRzLWxvYWRlcj9kZWZpbmU9PmZhbHNlJnRoaXM9PndpbmRvdydcbiAgICB9XG4gIF1cbiJdfQ==
