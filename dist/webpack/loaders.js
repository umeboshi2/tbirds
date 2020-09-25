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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9sb2FkZXJzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrL2xvYWRlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBQSxRQUFlO0VBQ2I7SUFDRSxJQUFBLEVBQU0sV0FEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBRGE7RUFLYjtJQUNFLElBQUEsRUFBTSxRQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FMYTtFQVNiO0lBQ0UsSUFBQSxFQUFNLHVCQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FUYTtFQWFiO0lBQ0UsSUFBQSxFQUFNLHVEQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FiYTtFQWlCYjtJQUNFLElBQUEsRUFBTSw0QkFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBakJhO0VBcUJiO0lBQ0UsSUFBQSxFQUFNLDhCQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FyQmE7RUF5QmI7SUFDRSxJQUFBLEVBQU0sVUFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBekJhO0VBNkJiO0lBQ0UsSUFBQSxFQUFNLG1CQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0E3QmE7RUFpQ2I7SUFDRSxJQUFBLEVBQU0sUUFEUjtJQUVFLE1BQUEsRUFBUTtFQUZWLENBakNhO0VBcUNiO0lBQ0UsSUFBQSxFQUFNLGdCQURSO0lBRUUsTUFBQSxFQUFRO0VBRlYsQ0FyQ2EiLCJzb3VyY2VzQ29udGVudCI6WyIjIHdlYnBhY2sgY29uZmlnIG1vZHVsZS5sb2FkZXJzXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB0ZXN0OiAvXFwuY29mZmVlJC9cbiAgICBsb2FkZXI6ICdjb2ZmZWUtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvXFwuY3NzJC9cbiAgICBsb2FkZXI6ICdzdHlsZS1sb2FkZXIhY3NzLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL1xcLihnaWZ8cG5nfGVvdHx0dGYpPyQvXG4gICAgbG9hZGVyOiAndXJsLWxvYWRlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL1xcLih3b2ZmfHdvZmYyfGVvdHx0dGZ8c3ZnKShcXD92PVswLTldXFwuWzAtOV1cXC5bMC05XSk/JC9cbiAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvanF1ZXJ5XFwvc3JjXFwvc2VsZWN0b3JcXC5qcyQvXG4gICAgbG9hZGVyOiAnYW1kLWRlZmluZS1mYWN0b3J5LXBhdGNoZXItbG9hZGVyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvanF1ZXJ5LXVpXFwvdWlcXC9zZWxlY3RvclxcLmpzJC9cbiAgICBsb2FkZXI6ICdhbWQtZGVmaW5lLWZhY3RvcnktcGF0Y2hlci1sb2FkZXInXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9waXhpXFwuanMvXG4gICAgbG9hZGVyOiAnZXhwb3NlP1BJWEknXG4gIH1cbiAge1xuICAgIHRlc3Q6IC9waGFzZXItc3BsaXRcXC5qcyQvXG4gICAgbG9hZGVyOiAnZXhwb3NlP1BoYXNlcidcbiAgfVxuICB7XG4gICAgdGVzdDogL3AyXFwuanMvXG4gICAgbG9hZGVyOiAnZXhwb3NlP3AyJ1xuICB9XG4gIHtcbiAgICB0ZXN0OiAvbWFzb25yeS1sYXlvdXQvLFxuICAgIGxvYWRlcjogJ2ltcG9ydHMtbG9hZGVyP2RlZmluZT0+ZmFsc2UmdGhpcz0+d2luZG93J1xuICB9XG5dXG4iXX0=
