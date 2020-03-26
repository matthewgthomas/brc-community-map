var map = L.map("map", {
    maxZoom: 10,
    minZoom: 5,
    zoomSnap: 0.25,
    zoomControl: false,
    zoomAnimation: false
});

L.control.zoom({ position: 'bottomright' }).addTo(map);

map.fitBounds([  // fit to boundary of UK: https://gist.github.com/UsabilityEtc/6d2059bd4f0181a98d76
    [59.478568831926395, -10.8544921875],
    [49.82380908513249, 2.021484375]
]);

var tiles_url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';  // Open Street Map

L.tileLayer(tiles_url, {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    edgeBufferTiles: 2
}).addTo(map);

var testLayer = L.TileLayer.WMS("http://maps.redcross.org.uk/geoserver/ows", {
    layers: "geonode:brc_rfl_rs_boundaries_2016_v3",
    format: "image/png"
});

testLayer.addTo(map);

