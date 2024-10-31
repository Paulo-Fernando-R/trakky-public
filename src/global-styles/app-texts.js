import AppColors from "./app-colors";

export default class AppTexts {
    #head1Bold;
    #paragraph1Regular;
    #paragraph1Bold;
    #subtitle1Regular;
    #head2Bold;
    #head2Regular;
    #paragraph2Regular;

    constructor() {
        this.#head1Bold = {
            fontFamily: "Open-Sans-Hebrew-Bold",
            fontSize: 28, //32,
            letterSpacing: -0.32,
            color: AppColors.instance.textLight,
            lineHeight: 28
        };

        this.#paragraph1Regular = {
            fontFamily: "Open-Sans-Hebrew-Regular",
            letterSpacing: -0.16,
            fontSize: 14, //16,
            lineHeight: 16,
            color: AppColors.instance.textLight,
        };

        this.#paragraph1Bold = {
            fontFamily: "Open-Sans-Hebrew-Bold",
            letterSpacing: -0.16,
            fontSize: 14, //16,
            lineHeight: 14,
            color: AppColors.instance.textLight,
            
        };

        this.#subtitle1Regular = {
            fontFamily: "Open-Sans-Hebrew-Regular",
            fontSize: 12, //12,
            letterSpacing: -0.12,
            lineHeight: 12,
            color: AppColors.instance.textLight,
        },

        this.#head2Bold = {
            fontFamily: "Open-Sans-Hebrew-Bold",
            fontSize: 18,//24,
            letterSpacing: -0.24,
            color: AppColors.instance.textLight,
            lineHeight: 22
        };

        this.#head2Regular = {
            fontFamily: "Open-Sans-Hebrew-Regular",
            fontSize: 18,//24,
            letterSpacing: -0.24,
            color: AppColors.instance.textLight,
        };

        this.#paragraph2Regular = {
            fontFamily: "Open-Sans-Hebrew-Regular",
            fontSize: 12,//14,
            letterSpacing: -0.14,
            lineHeight: 14,
            color: AppColors.instance.textLight,
        };
    }

    get head1Bold() {
        return this.#head1Bold;
    }

    get paragraph1Regular() {
        return this.#paragraph1Regular;
    }

    get paragraph1Bold() {
        return this.#paragraph1Bold;
    }

    get subtitle1Regular() {
        return this.#subtitle1Regular;
    }

    get head2Bold() {
        return this.#head2Bold;
    }

    get head2Regular() {
        return this.#head2Regular;
    }

    get paragraph2Regular() {
        return this.#paragraph2Regular;
    }

    static instance = new this();
}
