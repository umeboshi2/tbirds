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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9sb2FkZXItcnVsZXMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2svbG9hZGVyLXJ1bGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQUEsUUFBZTtFQUNiO0lBQ0UsSUFBQSxFQUFNLFdBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBRGE7RUFNYjtJQUNFLElBQUEsRUFBTSxRQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQU5hO0VBV2I7SUFDRSxJQUFBLEVBQU0sdUJBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBWGE7RUFnQmI7SUFDRSxJQUFBLEVBQU0sdURBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBaEJhO0VBcUJiO0lBQ0UsSUFBQSxFQUFNLDRCQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQXJCYTtFQTBCYjtJQUNFLElBQUEsRUFBTSw4QkFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0ExQmE7RUErQmI7SUFDRSxJQUFBLEVBQU0sVUFEUjtJQUVFLEdBQUEsRUFDRTtNQUFBLE1BQUEsRUFBUTtJQUFSO0VBSEosQ0EvQmE7RUFvQ2I7SUFDRSxJQUFBLEVBQU0sbUJBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBcENhO0VBeUNiO0lBQ0UsSUFBQSxFQUFNLFFBRFI7SUFFRSxHQUFBLEVBQ0U7TUFBQSxNQUFBLEVBQVE7SUFBUjtFQUhKLENBekNhO0VBOENiO0lBQ0UsSUFBQSxFQUFNLGdCQURSO0lBRUUsR0FBQSxFQUNFO01BQUEsTUFBQSxFQUFRO0lBQVI7RUFISixDQTlDYSIsInNvdXJjZXNDb250ZW50IjpbIiMgd2VicGFjayBjb25maWcgbW9kdWxlLmxvYWRlcnNcbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHRlc3Q6IC9cXC5jb2ZmZWUkL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ2NvZmZlZS1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9cXC5jc3MkL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ3N0eWxlLWxvYWRlciFjc3MtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvXFwuKGdpZnxwbmd8ZW90fHR0Zik/JC9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvXFwuKHdvZmZ8d29mZjJ8ZW90fHR0ZnxzdmcpKFxcP3Y9WzAtOV1cXC5bMC05XVxcLlswLTldKT8kL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ3VybC1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9qcXVlcnlcXC9zcmNcXC9zZWxlY3RvclxcLmpzJC9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdhbWQtZGVmaW5lLWZhY3RvcnktcGF0Y2hlci1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9qcXVlcnktdWlcXC91aVxcL3NlbGVjdG9yXFwuanMkL1xuICAgIHVzZTpcbiAgICAgIGxvYWRlcjogJ2FtZC1kZWZpbmUtZmFjdG9yeS1wYXRjaGVyLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL3BpeGlcXC5qcy9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdleHBvc2U/UElYSSdcbiAgfVxuICB7XG4gICAgdGVzdDogL3BoYXNlci1zcGxpdFxcLmpzJC9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdleHBvc2U/UGhhc2VyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvcDJcXC5qcy9cbiAgICB1c2U6XG4gICAgICBsb2FkZXI6ICdleHBvc2U/cDInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9tYXNvbnJ5LWxheW91dC8sXG4gICAgdXNlOlxuICAgICAgbG9hZGVyOiAnaW1wb3J0cy1sb2FkZXI/ZGVmaW5lPT5mYWxzZSZ0aGlzPT53aW5kb3cnXG4gIH1cbl1cbiJdfQ==
