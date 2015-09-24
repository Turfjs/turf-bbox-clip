# turf-bbox-clip

Fast clipping of lines and polygons against a bbox


### `turf.bbox-clip(feature, bbox)`

Takes a Feature and a bbox and clips the feature to the bbox using [lineclip](https://github.com/mapbox/lineclip).

### Parameters

| parameter | type              | description                                                                              |
| --------- | ----------------- | ---------------------------------------------------------------------------------------- |
| `feature` | Feature           | feature to clip to the bbox                                                              |
| `bbox`    | Array\.\<number\> | an Array of bounding box coordinates in the form: ```[minLon, minLat, maxLon, maxLat]``` |


### Example

```js
var bbox = [0, 0, 10, 10];
var poly = turf.polygon([[[2, 2], [8, 4], [12, 8], [3, 7], [2, 2]]]);

var result = turf.bboxClip(poly, bbox);

//=result
```


**Returns** `Feature.<Polygon>,Feature.<MultiPolygon>,Feature.<MultiLineString>`, 

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install turf-bbox-clip
```

## Tests

```sh
$ npm test
```


