var clip = require('../'),
	test = require('tape'),
	glob = require('glob'),
	fs = require('fs');

var bbox = [-79.0631103515625, 38.74123075381231, -77.2503662109375, 39.69450749856091];

var REGEN = false;


glob(__dirname+'/fixtures/in/*.geojson', function (err, files) {
  files.forEach(function(file) {
    var name = file.split("/").slice(-1)[0].replace(/\.geojson/, "");
    var outfile = file.replace(/\/in\//, "/out/");

    test('clip -- '+name, function (t) {
      var feature = JSON.parse(fs.readFileSync(file));
      var res = clip(feature, bbox);

      if (REGEN) {fs.writeFileSync(outfile, JSON.stringify(res)); }
      t.deepEqual(res, JSON.parse(fs.readFileSync(outfile)));
      t.end();
    });
  });
});