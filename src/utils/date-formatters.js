/**
 * Formats a given date into a string representation in the Brazilian Portuguese 
 * date format. If the input date is invalid, an empty string is returned.
 *
 * @param {Date|string|number} date - The date to be formatted.
 * @return {string} The formatted date string in the format "dd/MM/yyyy".
 */
function toPtBRDateOnly(date) {
    try {
        // eslint-disable-next-line no-undef
        const brDate = new Intl.DateTimeFormat("pt-BR", {}).format(new Date(date));
        return brDate;
    } catch (error) {
       // console.warn(error.message + "in dateFormatters => toPtBRDateOnly");
        return "";
    }
}

/**
 * Formats a given date into a string representation in the Brazilian Portuguese 
 * date and time format. If the input date is invalid, an empty string is returned.
 *
 * @param {Date|string|number} date - The date to be formatted.
 * @return {string} The formatted date and time string in the format "dd/MM/yyyy; HH:mm h".
 */
function toPtBRDateTime(date) {
    try {
        const dateObj = new Date(date);
        // eslint-disable-next-line no-undef
        const brDate = new Intl.DateTimeFormat("pt-BR").format(dateObj);
        return (
            brDate +
            "; " +
            dateObj.toLocaleTimeString("pt-BR", {
                hour12: false,
                hour: "numeric",
                minute: "numeric",
                localeMatcher:"best fit",
                timeZone:"America/Sao_Paulo"
            }) +
            " h"
        );
    } catch (error) {
        //console.warn(error.message + "in dateFormatters => toPtBRDateTime");
        return "";
    }
}

/**
 * Converts a date string in the format "dd/mm/yyyy" to the format "yyyy/mm/dd"
 * that is suitable for database storage.
 *
 * @param {string} string - The date string to be converted.
 * @return {string} The converted date string or an empty string if an error occurs.
 */
function toDatabaseDate(string){
    try {
        const parsed = string.split("/").reverse().toString().replaceAll(",", "-");
        return parsed;
    } catch (error) {
        // eslint-disable-next-line no-undef
        console.error(error, "at dateFormatters - toDatabaseDate");
        return "";
    }
}

const dateFormatters = {
    toPtBRDateOnly,
    toPtBRDateTime,
    toDatabaseDate
};

export default dateFormatters;
