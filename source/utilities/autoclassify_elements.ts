import * as fs from 'fs';
import * as csv from 'fast-csv';


const masterFormatKeywordsKeys = ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5"];

export default class AutoClassifier {
    masterformatKeywords: any[];
    masterformatKeywordsByCode: any;
    columnsWeCareAbout: any[];
    plannedBuildingElements: any[];
    hackResources: any;
    weightsByKeyword: any;
    pbeTsvFilename: string;

    constructor(floorTsvFilename) {
        this.pbeTsvFilename = floorTsvFilename;
        this.masterformatKeywords = [];
        this.columnsWeCareAbout = [];
        this.plannedBuildingElements = [];
        this.masterformatKeywordsByCode = {};
        this.weightsByKeyword = {}
        this.hackResources = {
            masterformatKeywords: __dirname + '/../../resources/masterformat-keywords-short.csv',
            columnsWeCareAbout: __dirname + '/../../resources/default-properties.csv',
            plannedBuildingElements: __dirname + '/../../resources/project-elements-data-nulled-masterformat.csv',
        }
    }

    private makeMasterformatsByCode = () => {
        this.masterformatKeywords.forEach( (row) => {
            this.masterformatKeywordsByCode[row['Code']] = row;
        });
    }

    async initialize() {

            await this.loadCsvFile(
                this.hackResources.masterformatKeywords,
                this.masterformatKeywords
            );
            await this.loadCsvFile(
                this.hackResources.columnsWeCareAbout,
                this.columnsWeCareAbout
            );
            await this.loadCsvFile(
                this.hackResources.plannedBuildingElements,
                this.plannedBuildingElements
            );

            this.makeMasterformatsByCode();
            this.makeWeightsByKeyword();
    }


    async loadCsvFile(filename, target) {
        return new Promise ((resolve, reject) => {
            fs.createReadStream(filename)
                .pipe(csv.parse({headers: true}))
                .on('error', error => console.error(error))
                .on('data', row => {
                    target.push(row);
                    // console.log(row);
                })
                .on('end', (rowCount: number) => {
                    // console.log(`Parsed ${rowCount} rows`);
                    resolve(rowCount);
                });
        });
    }

    calculateScore(weights) {
        let score = 0;
        weights.forEach ( (curr) => {
            score += parseFloat(curr.weight);
        })
        return score / masterFormatKeywordsKeys.length;
    };

    findColumnValueInKeywords(searchString) {
        let potentialMatches = {}
        for (let keyword in this.weightsByKeyword) {
            if (searchString.indexOf(keyword) > -1) {
                // potentialMatches.push(this.weightsByKeyword[keyword])
                potentialMatches[keyword] = this.weightsByKeyword[keyword]
            }
        }
        return Object.values(potentialMatches);
    };

    makeWeightsByKeyword() {
        let COLUMN_MAP = {
            'Keyword 1': 'Weight 1',
            'Keyword 2': 'Weight 2',
            'Keyword 3': 'Weight 3',
            'Keyword 4': 'Weight 4',
            'Keyword 5': 'Weight 5'
        }

        this.masterformatKeywords.forEach( (row) => {
            for (let [k,v] of Object.entries(COLUMN_MAP)) {
                if (row[k] != "") {
                    if (this.weightsByKeyword.hasOwnProperty(row[k])) {
                        this.weightsByKeyword[row[k]][row['Code']] = parseInt(row[v]);
                    } else {
                        this.weightsByKeyword[row[k]] = {}
                        this.weightsByKeyword[row[k]][row['Code']] = parseInt(row[v]);
                    }
                }
            }
        });
    }


    selectWinningMasterformat(potentialMatches) {
        let i = 0, n = potentialMatches.length;
        let masterformats = {}
        while (i < n) {
            let curr = Object.keys(potentialMatches[i]);
            curr.forEach(masterformat => {
                if (masterformats.hasOwnProperty(masterformat)) {
                    masterformats[masterformat] = masterformats[masterformat] + potentialMatches[i][masterformat];
                } else {
                    masterformats[masterformat] = potentialMatches[i][masterformat]
                }
            })
            i++;
        };
        let max_so_far = 0;
        let current_biggest;
        for (let masterformat in masterformats) {
            if (masterformats[masterformat] > max_so_far) {
                current_biggest = masterformat
                max_so_far = masterformats[masterformat]
            }
        };
        return current_biggest;
    };

    writeToTsv() {
        let headings = Object.keys(this.plannedBuildingElements[0]).join('\t');

        let rows = this.plannedBuildingElements.reduce((acc, curr) => {
            return acc.concat([Object.values(curr).join('\t')]);
        },[]).join('\n');
        let output = `${headings}\n${rows}`
        fs.writeFileSync(this.pbeTsvFilename, output);
        return output
    }

    autoClassify() {
        // Project Elements Data == just the basic "PBE" information
        this.plannedBuildingElements = this.plannedBuildingElements.map((pbe) => {
            // const matchingCodes = [];
            // For Every Row in the "PBE", look at each of the columns called "default properties"
            let matchingCodes = this.columnsWeCareAbout.map((column) => {
                const elementPropertyValue = pbe[column['Property Name']];
                if (elementPropertyValue) {
                    // elementPropertyValue.toLowerCase();
                    // console.log(elementPropertyValue)
                    // console.log(this.findColumnValueInKeywords(elementPropertyValue))
                    // matchingCodes.concat(this.findColumnValueInKeywords(elementPropertyValue));
                    return this.findColumnValueInKeywords(elementPropertyValue);
                }
            }, this);
            // pick best matching code for the PBE (i.e., highest score)
            matchingCodes = matchingCodes.filter( (code) => {
                return code != undefined;
            })
            // let matchingCodesOutput = matchingCodes.reduce( (acc, curr) => {
            //     curr.forEach((d) => acc.concat(d))
            // },[])
            let matchingCodesDone = matchingCodes.reduce( (prev, curr) => prev.concat(curr), []);
            pbe.masterformatCode = this.selectWinningMasterformat(matchingCodesDone);
            return pbe;
        }, this);
        return this.writeToTsv();
    }
}
