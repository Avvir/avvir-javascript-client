#!/usr/bin/env node
const Avvir = require("../dist/avvir_api").default;

async function createExampleFile() {
    // Make sure to replace the credentials with your actual username and password using environment variables
    // or directly in this file.
    const username = process.env.AVVIR_CLIENT_USERNAME || "you@example.com";
    const password = process.env.AVVIR_CLIENT_PASSWORD || "yourPassw0rd123";

    // Replace with your project ID
    const projectId = process.env.AVVIR_CLIENT_PROJECT_ID || "your-project-id";

    // Replace with your file
    const url = "https://YOUR-DOMAIN-HERE/samplefile.las"

    const user = await Avvir.api.auth.login(username, password);

    // at this point you can either upload directly to avvir using the storage token
    // or simply post the 3rd-party url to Avvir and Avvir will do ingestion automatically.
    // url should be a signed url valid for at least 30 hours
    const file = new Avvir.ApiCloudFile({url, purposeType: Avvir.ProjectPurposeType.OTHER});
    await Avvir.api.files.createProjectFile({projectId}, file, user);

    // at this point if you go to the upload page for the project, you should see your file listed
    // If you posted a 3rd party url, the url will change after some time once the Avvir system ingests the file.

}

createExampleFile();
