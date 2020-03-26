/*
 * Overlapping risks layer
 */
// create popups HTML text for each service
function initRisks() {
    riskOverlap = riskOverlap.map(function(s) {
        s.popup = "<b>" + s.lad17cd + "</b><br/><br/>" +
            "At risk of " + getRiskLabels(s.CombinedRisk) + "<br/><br/>" +

            "Individual risks (5 is highest risk; 0 means we don't have the data yet):"
            "<b>Fires:</b> " + s.fires_q + "<br/>" +
            "<b>Flooding:</b> " + s.floods_q + "<br/><br/>" +
            
            "<b>Displacement:</b> " + s.displacement_q + "<br/><br/>" +

            "<b>Loneliness:</b> " + s.lonely_q + "<br/>" +
            "<b>Health deprivation:</b> " + s.health_q + "<br/><br/>" +

            "<b>Digital exclusion:</b> " + s.digital_q + "<br/>";

        return s;
    });
}

// colours for risks
function getRiskColour(d) {
    return d == "LonelyHealth" ? "#7fc97f" :
           d == "FloodsHealth" ? "#beaed4" :
           d == "FiresFloodsHealth" ? "#fdc086" :
           d == "FiresHealth" ? "#ffff99" :
           d == "HealthDigital" ? "#386cb0" :
           d == "FiresHealthDisplacement" ? "#f0027f" :
           d == "FloodsHealthDisplacement" ? "#bf5b17" :
           d == "HealthDisplacement" ? "#666666" :
                "#ffffff"
}

function getRiskLabels(d) {
    return d == "LonelyHealth" ? "Loneliness and Health deprivation" :
           d == "FloodsHealth" ? "Flooding and Health deprivation" :
           d == "FiresFloodsHealth" ? "Fires, Flooding, and Health deprivation" :
           d == "FiresHealth" ? "Fires and Health deprivation" :
           d == "HealthDigital" ? "Digital exclusion and Health deprivation" :
           d == "FiresHealthDisplacement" ? "Fires, Displacement, and Health deprivation" :
           d == "FloodsHealthDisplacement" ? "Flooding, Displacement, and Health Deprivation" :
           d == "HealthDisplacement" ? "Displacement and Health deprivation" :
                ""
}

// style for risk polygons
function riskStyle(feature) {
    return {
        fillColor: getRiskColour(feature.properties.CombinedRisk),
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.7
    };
}

var riskLayer = L.geoJSON(riskOverlap, {
    style: riskStyle,
    pane: "external",
    
    // add popups
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>" + feature.properties.lad17nm + "</b><br/><br/>" +
            "<b>At risk of:</b> " + getRiskLabels(feature.properties.CombinedRisk) + "<br/><br/>" +

            "<b>Individual risks</b><br/>(5 is highest risk; 1 is lowest risk;<br/>0 means we don't have the data yet):<br/>" +
            "Fires: " + feature.properties.fires_q + "<br/>" +
            "Flooding: " + feature.properties.floods_q + "<br/><br/>" +
            
            "Displacement: " + feature.properties.displacement_q + "<br/><br/>" +

            "Loneliness: " + feature.properties.lonely_q + "<br/>" +
            "Health deprivation: " + feature.properties.health_q + "<br/><br/>" +

            "Digital exclusion: " + feature.properties.digital_q + "<br/>");
      }
});

// legend for risks
var riskLegend = L.control({position: "topright"});

riskLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["FiresFloodsHealth", "FiresHealthDisplacement", "FloodsHealthDisplacement", "FiresHealth", "FloodsHealth", "LonelyHealth", "HealthDisplacement", "HealthDigital"],
        labels = ["Fires, Flooding, and Health deprivation", "Fires, Displacement, and Health deprivation", "Flooding, Displacement, and Health Deprivation", 
                  "Fires and Health deprivation", "Flooding and Health deprivation", "Loneliness and Health deprivation", "Displacement and Health deprivation", "Digital exclusion and Health deprivation"];

    div.innerHTML = "<h4>Local Authorities with multiple risks</h4>";

    // loop through our risk categories and generate a label with a colored square for each
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getRiskColour(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};

// add the legend but hide it to begin with
// $('.legend').hide();

// functions to show and hide the risk layer (including the legend)
function addRiskLayer() {
    riskLayer.addTo(map);
    //$('.legend').show();
    riskLegend.addTo(map);
}

function hideRiskLayer() {
    if (map.hasLayer(riskLayer)) { map.removeLayer(riskLayer); };
    //$('.legend').hide();
    map.removeControl(riskLegend);
}


/*
 * Individual risks layer (generic function)
 */
var singleRiskLayer = null;

function addSingleRiskLayer(risk) {
    singleRiskLayer = L.geoJSON(risk, {
        style: {
            fillColor: "#ff0000",
            weight: 2,
            opacity: 1,
            color: "#ff0000",
            fillOpacity: 0.7
        },
        pane: "external",
        
        // add popups
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.popuptext);
          }
    });

    singleRiskLayer.addTo(map);
}

function hideSingleRiskLayer() {
    if (singleRiskLayer != undefined || singleRiskLayer != null) {
        if (map.hasLayer(singleRiskLayer)) { map.removeLayer(singleRiskLayer); };
    }
}