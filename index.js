var lineclip = require('lineclip'),
  fc = require('turf-featurecollection')


module.exports = function(feature, bbox) {
  var geom = feature;
  if (feature.geometry) {
    geom = feature.geometry;
  }

  if (geom.type == "LineString") {
    var clipped = lineclip(geom.coordinates, bbox);

    return buildFeature("MultiLineString", clipped, feature.properties);
  } if (geom.type == "MultiLineString") {
    var lines = [];
    geom.coordinates.forEach(function(line) {
      lineclip(line, bbox).forEach(function(result) {
        lines.push(result);
      });
    });

    return buildFeature("MultiLineString", lines, feature.properties);
  } else if (geom.type == "Polygon") {
    var rings = clipPolygon(geom.coordinates, bbox);

    return buildFeature("Polygon", rings, feature.properties);
  } else if (geom.type == "MultiPolygon") {
    var rings = geom.coordinates.map(function(polygon) {
      return clipPolygon(polygon, bbox);
    }); 

    return buildFeature("MultiPolygon", rings, feature.properties);
  } else {

  }
};


function clipPolygon(rings, bbox) {
  var out_rings = [];
  rings.forEach(function(ring) {
    var clipped = lineclip.polygon(ring, bbox);
    if (clipped.length > 0) {
      if (clipped[0][0] !== clipped[clipped.length - 1][0] || clipped[0][1] !== clipped[clipped.length - 1][1]) {
        clipped.push(clipped[0]);
      }
      out_rings.push(clipped);
    }
  });
  return out_rings;
}

function buildFeature(type, lines, properties) {
  return {
    "type": "Feature",
    "properties": properties || {},
    "geometry": {
      "type": type,
      "coordinates": lines.slice()
    }
  }
}