/**
 * Converts a given string to title case.
 *
 * @param {string} [str=""] - The string to be converted to title case. If not provided, an empty string is used.
 * @return {string} The converted string to title case. If the input string is empty or falsy, an empty string is returned.
 */
function toTitlecase(str = "") {
    if (!str) {
        return "";
    }

    const parsed = str
        .toLowerCase()
        .split(" ")
        .map((word) => {
            return word.charAt(0).toUpperCase().concat(word.slice(1));
        })
        .join(" ");

    return parsed;
}

function cepToDatabaseFormat(cep) {
    if (!cep) {
        return "";
    }
    return cep.replace("-", "");
}

const stringFormatters = {
    toTitlecase,
    cepToDatabaseFormat,
};

export default stringFormatters;
