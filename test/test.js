var clip = require('../'),
	test = require('tape'),
	glob = require('glob'),
	fs = require('fs');

var bbox = [-79.0631103515625, 38.74123075381231, -77.2503662109375, 39.69450749856091];

var REGEN = true

test('clip -- linestring', function (t) {
	var feature = JSON.parse(fs.readFileSync(__dirname+"/fixtures/in/linestring.geojson"));

	var res = clip(feature, bbox);
	//console.log(JSON.stringify(res));

  if (REGEN) {fs.writeFileSync(__dirname+"/fixtures/out/linestring.geojson", JSON.stringify(res)); }
  t.deepEqual(res, JSON.parse(fs.readFileSync(__dirname+"/fixtures/out/linestring.geojson")));
	t.end();
});

test('clip -- multilinestring', function (t) {
  var feature = JSON.parse(fs.readFileSync(__dirname+"/fixtures/in/multilinestring.geojson"));

  var res = clip(feature, bbox);
  //console.log(JSON.stringify(res));

  if (REGEN) {fs.writeFileSync(__dirname+"/fixtures/out/multilinestring.geojson", JSON.stringify(res)); }
  t.deepEqual(res, JSON.parse(fs.readFileSync(__dirname+"/fixtures/out/multilinestring.geojson")));
  t.end();

});

test('clip -- polygon', function (t) {
  var feature = JSON.parse(fs.readFileSync(__dirname+"/fixtures/in/polygon.geojson"));

  var res = clip(feature, bbox);
  //console.log(JSON.stringify(res));

  if (REGEN) {fs.writeFileSync(__dirname+"/fixtures/out/polygon.geojson", JSON.stringify(res)); }
  t.deepEqual(res, JSON.parse(fs.readFileSync(__dirname+"/fixtures/out/polygon.geojson")));
  t.end();

});



test('clip -- polygon with crossing hole', function (t) {
  var feature = JSON.parse(fs.readFileSync(__dirname+"/fixtures/in/polygon-crossing-hole.geojson"));

  var res = clip(feature, bbox);
  //console.log(JSON.stringify(res));

  if (REGEN) {fs.writeFileSync(__dirname+"/fixtures/out/polygon-crossing-hole.geojson", JSON.stringify(res)); }
  t.deepEqual(res, JSON.parse(fs.readFileSync(__dirname+"/fixtures/out/polygon-crossing-hole.geojson")));
  t.end();

});