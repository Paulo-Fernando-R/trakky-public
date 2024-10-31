import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import SearchRepository from "../../../repositories/search-repository";
import dateFormatters from "../../../utils/date-formatters";
export default class SearchStartController {

    #repository = new SearchRepository();
    constructor() {}

    /**
     * Validates a code using a regular expression.
     *
     * @param {string} code - The code to be validated.
     * @return {boolean} Returns true if the code is valid, false otherwise.
     */
    validateCode(code = "") {
        const regExp = new RegExp(
            "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
        );

        return regExp.test(code);
    }

    /**
     * A function to search for delivery based on a given code.
     *
     * @param {string} code - The code used to search for delivery.
     * @param {function} setScreenState - A function to set the screen state.
     * @param {function} setItemList - A function to set the list of items.
     * @param {function} setErrorMessage - A function to set an error message.
     * @param {function} setVisible - A function to set the visibility state.
     */
    async searchDelivery(
        code = "",
        setScreenState = () => {},
        setItemList = () => {},
        setErrorMessage = () => {},
        setVisible = () => {}
    ) {
        setScreenState(GenericScreenStateEnum.loading);
        if (!this.validateCode(code)) {
            setScreenState(GenericScreenStateEnum.error);
            setErrorMessage("Código inválido, verifique e tente novamente.");
            setVisible(true);
            return;
        }

        try {
            const response = await this.#repository.getDeliveryByCode(code);
            response.forEach((e)=>{
                e.LastUpdateTime = dateFormatters.toPtBRDateOnly(e.LastUpdateTime);
            })
           
            if (response.length > 0) {
                setItemList(response);
                setScreenState(GenericScreenStateEnum.sucess);
                return;
            }
            setErrorMessage("Entrega nao encontrada, verifique o código e tente novamente.");
            setScreenState(GenericScreenStateEnum.error);
            setVisible(true);
        } catch (error) {
            setErrorMessage(error.message);
            // eslint-disable-next-line no-undef
            console.error( error, "<= SearchStartController - searchDelivery");
            setScreenState(GenericScreenStateEnum.error);
            setVisible(true);
        }
    }
}
