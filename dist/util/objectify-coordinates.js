import coordinateFields from './coordinate-fields';

export default function(coords) {
  var newCoords;
  newCoords = {};
  coordinateFields.forEach(function(field) {
    var value;
    value = coords[field];
    return newCoords[field] = value;
  });
  return newCoords;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9vYmplY3RpZnktY29vcmRpbmF0ZXMuanMiLCJzb3VyY2VzIjpbInV0aWwvb2JqZWN0aWZ5LWNvb3JkaW5hdGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFQLE1BQUE7O0FBRUEsT0FBQSxRQUFlLFFBQUEsQ0FBQyxNQUFELENBQUE7QUFDZixNQUFBO0VBQUUsU0FBQSxHQUFZLENBQUE7RUFDWixnQkFBZ0IsQ0FBQyxPQUFqQixDQUF5QixRQUFBLENBQUMsS0FBRCxDQUFBO0FBQzNCLFFBQUE7SUFBSSxLQUFBLEdBQVEsTUFBTSxDQUFDLEtBQUQ7V0FDZCxTQUFTLENBQUMsS0FBRCxDQUFULEdBQW1CO0VBRkksQ0FBekI7QUFHQSxTQUFPO0FBTE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29vcmRpbmF0ZUZpZWxkcyBmcm9tICcuL2Nvb3JkaW5hdGUtZmllbGRzJ1xuXG5leHBvcnQgZGVmYXVsdCAoY29vcmRzKSAtPlxuICBuZXdDb29yZHMgPSB7fVxuICBjb29yZGluYXRlRmllbGRzLmZvckVhY2ggKGZpZWxkKSAtPlxuICAgIHZhbHVlID0gY29vcmRzW2ZpZWxkXVxuICAgIG5ld0Nvb3Jkc1tmaWVsZF0gPSB2YWx1ZVxuICByZXR1cm4gbmV3Q29vcmRzXG4gIFxuICBcbiJdfQ==
