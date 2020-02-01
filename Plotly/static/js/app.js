function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            
            var ids = sampledata.samples[0].otu_ids;
            
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
        // Top 10 OTU ids and reverse 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // OTU id's for the plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            
         // Top 10 labels for the plot
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'green'},
                type:"bar",
                orientation: "h",
            };
            // Create data variable
            var data = [trace];
    
            // Layout variable to set plots layout
            var layout = {
                title: "Operational Taxonomic Units",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 20
                }
            };
    
        Plotly.newPlot("bar", data, layout);

            // Bubble chart
            var trace = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // Layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // Creating data variable 
            var data1 = [trace];
    
        // The bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // Get the necessary data
    function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // Filter metadata info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // Select demographic panel to put data
           var demographics = d3.select("#sample-metadata");
            
         // To empty the demographic info panel each time
           demographics.html("");
    
         // Get demographic data for the id and append to the panel
            Object.entries(result).forEach((key) => {   
                demographics.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // To change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // Initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // Read the data 
        d3.json("samples.json").then((data)=> {
            //console.log(data)
    
            // get the id data to the dropdown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // Display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();
