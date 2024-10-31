export default class AppColors {
    #bgDark;
    #bgMedium;
    #primaryDefault;
    #primaryDark;
    #accentDefault;
    #accentMedium;
    #textLight;
    #textMediumLight;
    #strokeLight;

    constructor() {
        this.#bgDark = "#181B1F";
        this.#bgMedium = "#272A2E";
        this.#primaryDefault = "#0074D9";
        this.#primaryDark = "#173855";
        this.#accentDefault = "#7FDBFF";
        this.#accentMedium = "#1DAAE1";
        this.#textLight = "#FFFFFF";
        this.#textMediumLight = "#858585";
        this.#strokeLight = "#565656";
    }

    get bgDark() {
        return this.#bgDark;
    }

    get bgMedium() {
        return this.#bgMedium;
    }

    get primaryDefault() {
        return this.#primaryDefault;
    }

    get primaryDark() {
        return this.#primaryDark;
    }

    get accentDefault() {
        return this.#accentDefault;
    }

    get accentMedium() {
        return this.#accentMedium;
    }

    get textLight() {
        return this.#textLight;
    }

    get textMediumLight() {
        return this.#textMediumLight;
    }

    get strokeLight() {
        return this.#strokeLight;
    }

    static instance = new this();
}
