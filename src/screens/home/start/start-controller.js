import FeedDeliveryRepository from "../../../repositories/FeedDeliveryRepository";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import ListSwitchEnum from "../../../data/enums/list-switch-enum";
export default class StartController {
    #repository = new FeedDeliveryRepository();
    constructor() {}

    async getDeliveries(setScreenState, setFeedItens, listRef, listType) {
        try {
            setScreenState(GenericScreenStateEnum.loading);
            const response = await this.#repository.getSavedDeliveries();
            setFeedItens(response);
            //listRef.current = response.filter((e) => e.Status === listType);
           
            switch (listType) {
                case ListSwitchEnum.inTransport:
                    listRef.current = response.filter((e) => e.Status <= ListSwitchEnum.complete);
                    break;

                case ListSwitchEnum.complete:
                    listRef.current = response.filter((e) => e.Status > ListSwitchEnum.complete);
                    break;
            }
            setScreenState(GenericScreenStateEnum.sucess);
        } catch (error) {
            // eslint-disable-next-line no-undef
            setFeedItens([]);
            listRef.current = [];
            // eslint-disable-next-line no-undef
            console.error(error, "<= StartController - getDeliveries");
            setScreenState(GenericScreenStateEnum.error);
        }
    }

    handleListType(type, setListType, listRef, feedItens) {
        
        switch (type) {
            case ListSwitchEnum.inTransport:
                listRef.current = feedItens.filter((e) => e.Status <= ListSwitchEnum.complete);
                break;

            case ListSwitchEnum.complete:
                listRef.current = feedItens.filter((e) => e.Status > ListSwitchEnum.complete);
                break;
        }
       
        setListType(type);
    }
}
