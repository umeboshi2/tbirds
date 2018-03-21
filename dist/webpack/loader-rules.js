  // webpack config module.loaders
export default [
  {
    test: /\.coffee$/,
    use: {
      loader: 'coffee-loader'
    }
  },
  {
    test: /\.css$/,
    use: {
      loader: 'style-loader!css-loader'
    }
  },
  {
    test: /\.(gif|png|eot|ttf)?$/,
    use: {
      loader: 'url-loader'
    }
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)(\?[\&0-9]+)?$/,
    use: {
      loader: 'url-loader'
    }
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: {
      loader: 'url-loader'
    }
  },
  {
    test: /jquery\/src\/selector\.js$/,
    use: {
      loader: 'amd-define-factory-patcher-loader'
    }
  },
  {
    test: /jquery-ui\/ui\/selector\.js$/,
    use: {
      loader: 'amd-define-factory-patcher-loader'
    }
  },
  {
    test: /pixi\.js/,
    use: {
      loader: 'expose?PIXI'
    }
  },
  {
    test: /phaser-split\.js$/,
    use: {
      loader: 'expose?Phaser'
    }
  },
  {
    test: /p2\.js/,
    use: {
      loader: 'expose?p2'
    }
  },
  {
    test: /masonry-layout/,
    use: {
      loader: 'imports-loader?define=>false&this=>window'
    }
  }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9sb2FkZXItcnVsZXMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2svbG9hZGVyLXJ1bGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQUEsUUFBZTtFQUNiO0lBQ0UsSUFBQSxFQUFNLFdBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBRGE7RUFNYjtJQUNFLElBQUEsRUFBTSxRQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQU5hO0VBV2I7SUFDRSxJQUFBLEVBQU0sdUJBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBWGE7RUFnQmI7SUFDRSxJQUFBLEVBQU0sMENBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBaEJhO0VBcUJiO0lBQ0UsSUFBQSxFQUFNLHVEQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQXJCYTtFQTBCYjtJQUNFLElBQUEsRUFBTSw0QkFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0ExQmE7RUErQmI7SUFDRSxJQUFBLEVBQU0sOEJBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBL0JhO0VBb0NiO0lBQ0UsSUFBQSxFQUFNLFVBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBcENhO0VBeUNiO0lBQ0UsSUFBQSxFQUFNLG1CQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQXpDYTtFQThDYjtJQUNFLElBQUEsRUFBTSxRQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQTlDYTtFQW1EYjtJQUNFLElBQUEsRUFBTSxnQkFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0FuRGEiLCJzb3VyY2VzQ29udGVudCI6WyIjIHdlYnBhY2sgY29uZmlnIG1vZHVsZS5sb2FkZXJzXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB0ZXN0OiAvXFwuY29mZmVlJC9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdjb2ZmZWUtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvXFwuY3NzJC9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdzdHlsZS1sb2FkZXIhY3NzLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL1xcLihnaWZ8cG5nfGVvdHx0dGYpPyQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL1xcLih3b2ZmfHdvZmYyfGVvdHx0dGZ8c3ZnKShcXD9bXFwmMC05XSspPyQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL1xcLih3b2ZmfHdvZmYyfGVvdHx0dGZ8c3ZnKShcXD92PVswLTldXFwuWzAtOV1cXC5bMC05XSk/JC9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvanF1ZXJ5XFwvc3JjXFwvc2VsZWN0b3JcXC5qcyQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnYW1kLWRlZmluZS1mYWN0b3J5LXBhdGNoZXItbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvanF1ZXJ5LXVpXFwvdWlcXC9zZWxlY3RvclxcLmpzJC9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdhbWQtZGVmaW5lLWZhY3RvcnktcGF0Y2hlci1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9waXhpXFwuanMvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnZXhwb3NlP1BJWEknXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9waGFzZXItc3BsaXRcXC5qcyQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnZXhwb3NlP1BoYXNlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL3AyXFwuanMvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnZXhwb3NlP3AyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvbWFzb25yeS1sYXlvdXQvLFxuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ2ltcG9ydHMtbG9hZGVyP2RlZmluZT0+ZmFsc2UmdGhpcz0+d2luZG93J1xuICB9XG5dXG4iXX0=
