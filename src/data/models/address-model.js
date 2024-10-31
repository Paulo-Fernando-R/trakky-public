//!ESTE MODEL É APENAS PARA ENDEREÇOS DA API DO IBGE
export default class AddressModel {
    #cityIbgeId = 0;
    #cityName = "";
    #ufIbgeId = 0;
    #ufName = "";

    constructor(cityIbgeId, cityName, ufIbgeId, ufName) {
        this.cityIbgeId = cityIbgeId;
        this.cityName = cityName;
        this.ufIbgeId = ufIbgeId;
        this.ufName = ufName;
    }

    get cityIbgeId() {
        return this.#cityIbgeId;
    }

    set cityIbgeId(value) {
        if (typeof value === "number") {
            this.#cityIbgeId = value;
        } else {
            throw new TypeError("cityIbgeId must be a number");
        }
    }

    get cityName() {
        return this.#cityName;
    }

    set cityName(value) {
        if (typeof value === "string") {
            this.#cityName = value;
        } else {
            throw new TypeError("cityName must be a string");
        }
    }

    get ufIbgeId() {
        return this.#ufIbgeId;
    }

    set ufIbgeId(value) {
        if (typeof value === "number") {
            this.#ufIbgeId = value;
        } else {
            throw new TypeError("ufIbgeId must be a number");
        }
    }

    get ufName() {
        return this.#ufName;
    }

    set ufName(value) {
        if (typeof value === "string") {
            this.#ufName = value;
        } else {
            throw new TypeError("ufName must be a string");
        }
    }

    /**
     * Returns a string representation of the City object.
     *
     * @return {string} a string containing the City Ibge Id, City Name, UF Ibge Id, and UF Name
     */
    toString() {
        return `City Ibge Id: ${this.#cityIbgeId}, City Name: ${this.#cityName}, UF Ibge Id: ${
            this.#ufIbgeId
        }, UF Name: ${this.#ufName}`;
    }

    /**
     * Converts a JSON object to an AddressModel instance.
     *
     * @param {object} json - the JSON object to convert
     * @return {AddressModel} the converted AddressModel instance
     */
    static fromJson(json) {
        if (!json) {
            return new AddressModel(-1, "", -1, "");
        }
        const cityIbgeId = json.id ?? -1;
        const cityName = json.nome ?? "";
        const ufIbgeId = json.microrregiao.mesorregiao.UF.id ?? -1;
        const ufName = json.microrregiao.mesorregiao.UF.sigla ?? "";

        return new AddressModel(cityIbgeId, cityName, ufIbgeId, ufName);
    }
}
