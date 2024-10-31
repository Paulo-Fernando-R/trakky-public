import AuthStateEnum from "../../../data/enums/auth-state-enum";
import GenericScreenStateEnum from "../../../data/enums/generic-screen-state-enum";
import AuthModel from "../../../data/models/auth-model";
import authService from "../../../services/auth-service/auth-service";
import { CommonActions } from "@react-navigation/native";
import AuthRepository from "../../../repositories/auth-repository";
import dateFormatters from "../../../utils/date-formatters";
import { UnauthorizedError } from "../../../exceptions/semanthic-errors";
import createBackgroundTasksService from "../../../services/create-background-tasks-service/create-background-tasks-service";
import BackgroundTaskTypeEnum from "../../../data/enums/background-task-type-enum";
import { ToastAndroid } from "react-native";
import onChangeAuthEvent from "../../../events/onChangeAuth";

export default class ProfileWithAuthController {
    #repository;
    constructor() {
        this.#repository = new AuthRepository();
    }

    /**
     * A function to log off the user.
     *
     * @param {AuthModel} context - the authentication context
     * @param {function} setScreenState - a function to set the screen state
     * @param {function} setAuthState - a function to set the authentication state
     * @param {function} setMessage - a function to set a message
     * @param {object} navigation - the navigation object
     * @return {Promise} a promise representing the result of the logoff operation
     */
    async logoff(
        context = new AuthModel(),
        setScreenState = () => {},
        setAuthState = () => {},
        setMessage = () => {},
        navigation
    ) {
        setScreenState(GenericScreenStateEnum.loading);

        const result = await authService.removeAuth();
        if (!result) {
            setScreenState(GenericScreenStateEnum.error);
            setMessage("Erro ao deslogar");
            return;
        }

        const aux = context;
        context.copyFrom(aux);
        aux.authStatus = AuthStateEnum.notAuthenticated;
        onChangeAuthEvent.emmiter(AuthStateEnum.notAuthenticated);
        // eslint-disable-next-line no-undef
        setTimeout(() => {
            setAuthState(AuthStateEnum.notAuthenticated);
            setScreenState(GenericScreenStateEnum.sucess);
            navigation.dispatch((state) =>
                CommonActions.reset({
                    index: 0,
                    routes: state.routes,
                    history: [],
                    key: state.key,
                    routeNames: state.routeNames,
                    stale: state.stale,
                    type: state.type,
                })
            );
            navigation.navigate("Home");
            //navigation.navigate("Home");
        }, 1000);
    }

    /**
     * Async function to get profile data.
     *
     * @param {function} setName - function to set the name
     * @param {function} setEmail - function to set the email
     * @param {function} setBirth - function to set the birth date
     * @param {function} setScreenState - function to set the screen state
     * @param {AuthModel} context - the authentication context
     * @param {function} setAuthState - function to set the authentication state
     * @param {object} navigation - the navigation object
     * @param {function} setMessage - function to set a message
     */
    async getProfileData(
        setName,
        setEmail,
        setBirth,
        setScreenState,
        context,
        setAuthState,
        navigation,
        setMessage
    ) {
        try {
            setScreenState(GenericScreenStateEnum.loading);
            const response = await this.#repository.getProfileData();

            setName(response.name);
            setEmail(response.email);
            setBirth(dateFormatters.toPtBRDateOnly(response.birthDate));
            setScreenState(GenericScreenStateEnum.sucess);

            onChangeAuthEvent.emmiter(AuthStateEnum.authenticated);

        } catch (error) {
            if (error instanceof UnauthorizedError) {
                await this.logoff(context, setScreenState, setAuthState, setMessage, navigation);
            }

            // eslint-disable-next-line no-undef
            console.error(error, "<= ProfileWithAuthController - getProfileData");
            setScreenState(GenericScreenStateEnum.error);
        }
    }

    /**
     * Asynchronously removes all tasks of type deliveryLocation using the createBackgroundTasksService.
     *
     * @return {Promise<void>} A promise that resolves when all tasks are removed.
     */
    async removeTasks() {
        await createBackgroundTasksService.removeAllTasksByType(
            BackgroundTaskTypeEnum.deliveryLocation
        );
        ToastAndroid.show("As atualizações foram pausadas", ToastAndroid.LONG);
    }
}
