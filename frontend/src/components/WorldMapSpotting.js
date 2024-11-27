import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import mapData from './world-110m.json'; // Load a suitable map file in GeoJSON format

const WorldMapSpotting = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [tooltipContent, setTooltipContent] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleCountryClick = (geo) => {
        setSelectedCountry(geo.properties.NAME);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>World Map Spotting Game</Typography>
            <Typography variant="subtitle1" gutterBottom>
                Spot a place or country by clicking on the map!
            </Typography>
            
            <ComposableMap
                projectionConfig={{
                    scale: 200,
                    rotate: [-10, 0, 0],
                }}
                style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}
            >
                <Geographies geography={mapData}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Tooltip
                                title={geo.properties.NAME}
                                key={geo.rsmKey}
                                arrow
                                placement="top"
                                onMouseEnter={() => setTooltipContent(geo.properties.NAME)}
                                onMouseLeave={() => setTooltipContent('')}
                            >
                                <Geography
                                    geography={geo}
                                    onClick={() => handleCountryClick(geo)}
                                    style={{
                                        default: { fill: "#D6D6DA", outline: "none" },
                                        hover: { fill: "#4caf50", outline: "none" },
                                        pressed: { fill: "#2e7d32", outline: "none" },
                                    }}
                                />
                            </Tooltip>
                        ))
                    }
                </Geographies>
            </ComposableMap>

            {/* Dialog for Confirming Selection */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>You've Selected a Place!</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        You spotted: <strong>{selectedCountry}</strong>!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default WorldMapSpotting;
