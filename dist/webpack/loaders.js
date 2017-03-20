module.exports = [
  {
    test: /\.coffee$/,
    loader: 'coffee-loader'
  }, {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  }, {
    test: /\.(gif|png|eot|ttf)?$/,
    loader: 'url-loader'
  }, {
    test: /\.(woff|woff2|eot|ttf|svg)(\?[\&0-9]+)?$/,
    loader: 'url-loader'
  }, {
    test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  }, {
    test: /jquery\/src\/selector\.js$/,
    loader: 'amd-define-factory-patcher-loader'
  }, {
    test: /jquery-ui\/ui\/selector\.js$/,
    loader: 'amd-define-factory-patcher-loader'
  }, {
    test: /pixi\.js/,
    loader: 'expose?PIXI'
  }, {
    test: /phaser-split\.js$/,
    loader: 'expose?Phaser'
  }, {
    test: /p2\.js/,
    loader: 'expose?p2'
  }, {
    test: /masonry-layout/,
    loader: 'imports-loader?define=>false&this=>window'
  }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay9sb2FkZXJzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrL2xvYWRlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFDRTtJQUNFLElBQUEsRUFBTSxXQURSO0lBRUUsTUFBQSxFQUFRLGVBRlY7R0FERixFQUtFO0lBQ0UsSUFBQSxFQUFNLFFBRFI7SUFFRSxNQUFBLEVBQVEseUJBRlY7R0FMRixFQVNFO0lBQ0UsSUFBQSxFQUFNLHVCQURSO0lBRUUsTUFBQSxFQUFRLFlBRlY7R0FURixFQWFFO0lBQ0UsSUFBQSxFQUFNLDBDQURSO0lBRUUsTUFBQSxFQUFRLFlBRlY7R0FiRixFQWlCRTtJQUNFLElBQUEsRUFBTSx1REFEUjtJQUVFLE1BQUEsRUFBUSxZQUZWO0dBakJGLEVBcUJFO0lBQ0UsSUFBQSxFQUFNLDRCQURSO0lBRUUsTUFBQSxFQUFRLG1DQUZWO0dBckJGLEVBeUJFO0lBQ0UsSUFBQSxFQUFNLDhCQURSO0lBRUUsTUFBQSxFQUFRLG1DQUZWO0dBekJGLEVBNkJFO0lBQ0UsSUFBQSxFQUFNLFVBRFI7SUFFRSxNQUFBLEVBQVEsYUFGVjtHQTdCRixFQWlDRTtJQUNFLElBQUEsRUFBTSxtQkFEUjtJQUVFLE1BQUEsRUFBUSxlQUZWO0dBakNGLEVBcUNFO0lBQ0UsSUFBQSxFQUFNLFFBRFI7SUFFRSxNQUFBLEVBQVEsV0FGVjtHQXJDRixFQXlDRTtJQUNFLElBQUEsRUFBTSxnQkFEUjtJQUVFLE1BQUEsRUFBUSwyQ0FGVjtHQXpDRiIsInNvdXJjZXNDb250ZW50IjpbIiMgd2VicGFjayBjb25maWcgbW9kdWxlLmxvYWRlcnNcbm1vZHVsZS5leHBvcnRzID1cbiAgW1xuICAgIHtcbiAgICAgIHRlc3Q6IC9cXC5jb2ZmZWUkL1xuICAgICAgbG9hZGVyOiAnY29mZmVlLWxvYWRlcidcbiAgICB9XG4gICAge1xuICAgICAgdGVzdDogL1xcLmNzcyQvXG4gICAgICBsb2FkZXI6ICdzdHlsZS1sb2FkZXIhY3NzLWxvYWRlcidcbiAgICB9XG4gICAge1xuICAgICAgdGVzdDogL1xcLihnaWZ8cG5nfGVvdHx0dGYpPyQvXG4gICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJ1xuICAgIH1cbiAgICB7XG4gICAgICB0ZXN0OiAvXFwuKHdvZmZ8d29mZjJ8ZW90fHR0ZnxzdmcpKFxcP1tcXCYwLTldKyk/JC9cbiAgICAgIGxvYWRlcjogJ3VybC1sb2FkZXInXG4gICAgfVxuICAgIHtcbiAgICAgIHRlc3Q6IC9cXC4od29mZnx3b2ZmMnxlb3R8dHRmfHN2ZykoXFw/dj1bMC05XVxcLlswLTldXFwuWzAtOV0pPyQvXG4gICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJ1xuICAgIH1cbiAgICB7XG4gICAgICB0ZXN0OiAvanF1ZXJ5XFwvc3JjXFwvc2VsZWN0b3JcXC5qcyQvXG4gICAgICBsb2FkZXI6ICdhbWQtZGVmaW5lLWZhY3RvcnktcGF0Y2hlci1sb2FkZXInXG4gICAgfVxuICAgIHtcbiAgICAgIHRlc3Q6IC9qcXVlcnktdWlcXC91aVxcL3NlbGVjdG9yXFwuanMkL1xuICAgICAgbG9hZGVyOiAnYW1kLWRlZmluZS1mYWN0b3J5LXBhdGNoZXItbG9hZGVyJ1xuICAgIH1cbiAgICB7XG4gICAgICB0ZXN0OiAvcGl4aVxcLmpzL1xuICAgICAgbG9hZGVyOiAnZXhwb3NlP1BJWEknXG4gICAgfVxuICAgIHtcbiAgICAgIHRlc3Q6IC9waGFzZXItc3BsaXRcXC5qcyQvXG4gICAgICBsb2FkZXI6ICdleHBvc2U/UGhhc2VyJ1xuICAgIH1cbiAgICB7XG4gICAgICB0ZXN0OiAvcDJcXC5qcy9cbiAgICAgIGxvYWRlcjogJ2V4cG9zZT9wMidcbiAgICB9XG4gICAge1xuICAgICAgdGVzdDogL21hc29ucnktbGF5b3V0LyxcbiAgICAgIGxvYWRlcjogJ2ltcG9ydHMtbG9hZGVyP2RlZmluZT0+ZmFsc2UmdGhpcz0+d2luZG93J1xuICAgIH1cbiAgXVxuIl19
