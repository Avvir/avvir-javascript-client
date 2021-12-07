import kebabCase from "../converters/kebab_case";

type fileNameParts = {
    projectName?: string,
    floorNumber?: string,
    scanNumber?: number,
    suffix?: string
}

export default function buildFileName(text: string, { projectName, floorNumber, scanNumber, suffix }: fileNameParts = {}) {
    let fileName = "";
    if (text) {
        fileName += text;
    }

    if (projectName) {
        if (text) {
            fileName += "_";
        }
        fileName += `${projectName}`;
    }
    if (floorNumber) {
        fileName += `_floor-${floorNumber}`;
    }
    if (scanNumber) {
        fileName += `_scan-${scanNumber}`;
    }
    if (suffix) {
        fileName += `_${suffix}`;
    }
    // eslint-disable-next-line no-useless-escape
    return kebabCase(fileName.replace(/[\/~+|,]/g, " ").replace(/[[\]'"?^$.#!*<>\\{}`:;%]/g, ""));
}
