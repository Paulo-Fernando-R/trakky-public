export default class DeliveryAddressModel {
    #cep;
    #uf;
    #city;
    #district;
    #street;
    #number;
    #complement;

    constructor(cep, uf, city, district, street, number, complement) {
        this.#cep = cep;
        this.#uf = uf;
        this.#city = city;
        this.#district = district;
        this.#street = street;
        this.#number = number;
        this.#complement = complement;
    }

    get cep() {
        return this.#cep;
    }

    set cep(value) {
        this.#cep = value;
    }

    get uf() {
        return this.#uf;
    }

    set uf(value) {
        this.#uf = value;
    }

    get city() {
        return this.#city;
    }

    set city(value) {
        this.#city = value;
    }

    get district() {
        return this.#district;
    }

    set district(value) {
        this.#district = value;
    }

    get street() {
        return this.#street;
    }

    set street(value) {
        this.#street = value;
    }

    get number() {
        return this.#number;
    }

    set number(value) {
        this.#number = value;
    }

    get complement() {
        return this.#complement;
    }

    set complement(value) {
        this.#complement = value;
    }

    static fromJson(json) {
        if (!json) {
            return new DeliveryAddressModel("", "", "", "", "", "", "");
        }

        return new DeliveryAddressModel(
            json.cep ?? "",
            json.uf ?? "",
            json.city ?? "",
            json.district ?? "",
            json.street ?? "",
            json.number ?? "",
            json.complement ?? ""
        );
    }

    toString() {
        return `DeliveryAddressModel: ${this.#cep}, ${this.#uf}, ${this.#city}, ${
            this.#district
        }, ${this.#street}, ${this.#number}, ${this.#complement}`;
    }
}
