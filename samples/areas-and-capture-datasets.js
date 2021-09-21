#!/usr/bin/env node
const Avvir = require("../dist/avvir_api").default;

async function printAreasAndCaptureDatasets() {
    // Make sure to replace the credentials with your actual username and password using environment variables
    // or directly in this file.
    const username = process.env.AVVIR_CLIENT_USERNAME || "you@example.com";
    const password = process.env.AVVIR_CLIENT_PASSWORD || "yourPassw0rd123";

    // Replace with your project ID
    const projectId = process.env.AVVIR_CLIENT_PROJECT_ID || "your-project-id";

    const user = await Avvir.api.auth.login(username, password);
    const areas = await Avvir.api.floors.listFloorsForProject(projectId, user);

    for (const area of areas) {
        console.log(`Area: ${area.floorNumber}`);
        console.log(area);

        console.log(`\nCapture Datasets for area ${area.floorNumber}: [\n`)
        const captureDatasets = await Avvir.api.scanDatasets.listScanDatasetsForFloor({projectId, floorId: area.firebaseId}, user);
        for (const dataset of captureDatasets) {
            console.log(dataset);
        }
        console.log("\n]");
    }
}

printAreasAndCaptureDatasets();
