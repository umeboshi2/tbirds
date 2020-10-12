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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9sb2FkZXItcnVsZXMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2svbG9hZGVyLXJ1bGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBK0I7QUFDL0IsT0FBQSxRQUFlO0VBQ2I7SUFDRSxJQUFBLEVBQU0sV0FEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0FEYTtFQU1iO0lBQ0UsSUFBQSxFQUFNLFFBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBTmE7RUFXYjtJQUNFLElBQUEsRUFBTSx1QkFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0FYYTtFQWdCYjtJQUNFLElBQUEsRUFBTSx1REFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0FoQmE7RUFxQmI7SUFDRSxJQUFBLEVBQU0sNEJBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBckJhO0VBMEJiO0lBQ0UsSUFBQSxFQUFNLDhCQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQTFCYTtFQStCYjtJQUNFLElBQUEsRUFBTSxVQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQS9CYTtFQW9DYjtJQUNFLElBQUEsRUFBTSxtQkFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0FwQ2E7RUF5Q2I7SUFDRSxJQUFBLEVBQU0sUUFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0F6Q2E7RUE4Q2I7SUFDRSxJQUFBLEVBQU0sZ0JBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBOUNhIiwic291cmNlc0NvbnRlbnQiOlsiIyB3ZWJwYWNrIGNvbmZpZyBtb2R1bGUubG9hZGVyc1xuZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgdGVzdDogL1xcLmNvZmZlZSQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnY29mZmVlLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL1xcLmNzcyQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9cXC4oZ2lmfHBuZ3xlb3R8dHRmKT8kL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ3VybC1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9cXC4od29mZnx3b2ZmMnxlb3R8dHRmfHN2ZykoXFw/dj1bMC05XVxcLlswLTldXFwuWzAtOV0pPyQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL2pxdWVyeVxcL3NyY1xcL3NlbGVjdG9yXFwuanMkL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ2FtZC1kZWZpbmUtZmFjdG9yeS1wYXRjaGVyLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL2pxdWVyeS11aVxcL3VpXFwvc2VsZWN0b3JcXC5qcyQvXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnYW1kLWRlZmluZS1mYWN0b3J5LXBhdGNoZXItbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvcGl4aVxcLmpzL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ2V4cG9zZT9QSVhJJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvcGhhc2VyLXNwbGl0XFwuanMkL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ2V4cG9zZT9QaGFzZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9wMlxcLmpzL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ2V4cG9zZT9wMidcbiAgfVxuICB7XG4gICAgdGVzdDogL21hc29ucnktbGF5b3V0LyxcbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdpbXBvcnRzLWxvYWRlcj9kZWZpbmU9PmZhbHNlJnRoaXM9PndpbmRvdydcbiAgfVxuXVxuIl19
