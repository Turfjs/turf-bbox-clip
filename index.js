var lineclip = require('lineclip');

/**
 * Takes a {@link Feature} and a bbox and clips the feature to the bbox using [lineclip](https://github.com/mapbox/lineclip).
 *
 * @module turf/bbox-clip
 * @category transformation
 * @param {(Feature<LineString>|Feature<MultiLineString>|Feature<Polygon>|Feature<MultiPolygon>)} feature feature to clip to the bbox
 * @param {Array<number>} bbox an Array of bounding box coordinates in the form: ```[xLow, yLow, xHigh, yHigh]```
 * @return {(Feature<Polygon>|Feature<MultiPolygon>|Feature<MultiLineString>)}
 * @example
 * var bbox = [0, 0, 10, 10];
 * var poly = turf.polygon([[[2, 2], [8, 4], [12, 8], [3, 7], [2, 2]]]);
 *
 * var result = turf.bboxClip(poly, bbox);
 *
 * //=result
 */
module.exports = function(feature, bbox) {
  var geom = feature;
  if (feature.geometry) {
    geom = feature.geometry;
  }

  if (geom.type === 'LineString') {
    return buildFeature('MultiLineString', lineclip(geom.coordinates, bbox), feature.properties);
  } if (geom.type === 'MultiLineString') {
    var lines = [];
    geom.coordinates.forEach(function(line) {
      lineclip(line, bbox).forEach(function(result) {
        lines.push(result);
      });
    });

    return buildFeature('MultiLineString', lines, feature.properties);
  } else if (geom.type === 'Polygon') {
    return buildFeature('Polygon', clipPolygon(geom.coordinates, bbox), feature.properties);
  } else if (geom.type === 'MultiPolygon') {
    return buildFeature('MultiPolygon', geom.coordinates.map(function (polygon) {
      return clipPolygon(polygon, bbox);
    }), feature.properties);
  }
};

function clipPolygon(rings, bbox) {
  var outRings = [];
  rings.forEach(function(ring) {
    var clipped = lineclip.polygon(ring, bbox);
    if (clipped.length > 0) {
      if (clipped[0][0] !== clipped[clipped.length - 1][0] || clipped[0][1] !== clipped[clipped.length - 1][1]) {
        clipped.push(clipped[0]);
      }
      outRings.push(clipped);
    }
  });
  return outRings;
}

function buildFeature (type, lines, properties) {
  return {
    'type': 'Feature',
    'properties': properties || {},
    'geometry': {
      'type': type,
      'coordinates': lines.slice()
    }
  };
}
