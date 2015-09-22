var lineclip = require('lineclip'),
  fc = require('turf-featurecollection')


module.exports = function(feature, bbox) {
  var geom = feature;
  if (feature.geometry) {
    geom = feature.geometry;
  }

  if (geom.type == "LineString") {
    var clipped = lineclip(geom.coordinates, bbox);
    return buildMultiLineString(clipped, feature.properties);
  } if (geom.type == "MultiLineString") {
    var lines = [];
    geom.coordinates.forEach(function(line) {
      lineclip(line, bbox).forEach(function(result) {
        lines.push(result);
      });
    });
    return buildMultiLineString(lines, feature.properties);
  } else if (geom.type == "Polygon") {
    var rings = [];
    geom.coordinates.forEach(function(ring) {
      var clipped = lineclip.polygon(ring, bbox);
      if (clipped.length > 0) {
        if (clipped[0][0] !== clipped[clipped.length - 1][0] || clipped[0][1] !== clipped[clipped.length - 1][1]) {
          clipped.push(clipped[0]);
        }
        rings.push(clipped);
      }
    })
  
    return {
      "type": "Feature",
      "properties": feature.properties || {},
      "geometry": {
        "type": "Polygon",
        "coordinates": rings
      }
    }
  } else if (geom.type == "MultiPolygon") {
    
  } else {

  }
};


function buildMultiLineString(lines, properties) {
  return {
    "type": "Feature",
    "properties": properties || {},
    "geometry": {
      "type": "MultiLineString",
      "coordinates": lines.slice()
    }
  }
}