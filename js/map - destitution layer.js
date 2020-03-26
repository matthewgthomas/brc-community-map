/*
 * Destitution layer
 */
// colours for destitution
function getDestitutionColour(d) {
    return d == 1 ? "#F7FBFF" :
           d == 2 ? "#E1EDF8" :
           d == 3 ? "#CBDFF1" :
           d == 4 ? "#ACD0E6" :
           d == 5 ? "#83BADB" :
           d == 6 ? "#5AA1CF" :
           d == 7 ? "#3987C0" :
           d == 8 ? "#1D6AAF" :
           d == 9 ? "#084D96" :
                    "#08306B"
}

// style for destitution polygons
function destitutionStyle(feature) {
    return {
        fillColor: getDestitutionColour(feature.properties.destitute),
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.7
    };
}

function destitutionMigrantStyle(feature) {
    return {
        fillColor: getDestitutionColour(feature.properties.migrant),
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.7
    };
}

var destitutionLayer = L.geoJSON(destitution, {
    style: destitutionStyle,
    pane: "external"
});

var destitutionMigrantLayer = L.geoJSON(destitution, {
    style: destitutionMigrantStyle,
    pane: "external"
});

// legend for destitution
var destitutionLegend = L.control({position: "topright"});

destitutionLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        labels = [];

    div.innerHTML = "<h4>Destitution index</h4>" +
                    "Destitution within local authorities,<br/>" +
                    "from the <a href='https://www.jrf.org.uk/report/destitution-uk-2018' target='_blank'>Destitution in the UK 2018 report</a>.<br/><br/>" +
                    "1 = lowest; 10 = highest destitution<br/>";

    // loop through our destitution intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getDestitutionColour(grades[i] + 1) + '"></i> ' +
            grades[i] + '<br>';
    }

    return div;
};

// add the legend but hide it to begin with
//$('.legend').hide();

// functions to show and hide the destitution layer (including the legend)
function addDestitutionLayer() {
    destitutionLayer.addTo(map);
    //$('.legend').show();
    destitutionLegend.addTo(map);
}

function hideDestitutionLayer() {
    if (map.hasLayer(destitutionLayer)) { map.removeLayer(destitutionLayer); };
    //$('.legend').hide();
    map.removeControl(destitutionLegend);
}

function addDestitutionMigrantsLayer() {
    destitutionMigrantLayer.addTo(map);
    //$('.legend').show();
    destitutionLegend.addTo(map);
}

function hideDestitutionMigrantsLayer() {
    if (map.hasLayer(destitutionMigrantLayer)) { map.removeLayer(destitutionMigrantLayer); };
    //$('.legend').hide();
    map.removeControl(destitutionLegend);
}
