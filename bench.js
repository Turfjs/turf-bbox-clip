var bboxClip = require('./');
var Benchmark = require('benchmark');
var fs = require('fs');

var linestring = JSON.parse(fs.readFileSync(__dirname + '/test/fixtures/in/linestring.geojson'));
var polygon = JSON.parse(fs.readFileSync(__dirname + '/test/fixtures/in/polygon.geojson'));
var multilinestring = JSON.parse(fs.readFileSync(__dirname + '/test/fixtures/in/multilinestring.geojson'));
var bbox = [-79.0631103515625, 38.74123075381231, -77.2503662109375, 39.69450749856091];

var suite = new Benchmark.Suite('turf-point-on-line');
suite
  .add('turf-bbox-clip#linestring',function () {
    bboxClip(linestring, bbox);
  })
  .add('turf-bbox-clip#polygon',function () {
    bboxClip(polygon, bbox);
  })
  .add('turf-bbox-clip#mulilinestring-simple',function () {
    bboxClip(multilinestring, bbox);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    
  })
  .run();