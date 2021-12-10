export function kebabCase(text: string): string {
    if (text) {
        return text.replace(/\s+/g, "-").toLowerCase();
    } else {
        return "";
    }
}

export default kebabCase;
