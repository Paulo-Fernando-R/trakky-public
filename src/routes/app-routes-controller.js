import authService from "../services/auth-service/auth-service";
import createBackgroundTasksService from "../services/create-background-tasks-service/create-background-tasks-service";

export default class AppRoutesController {
    constructor() {}

    async getAuthData(setIsAppLoading, context) {
        setIsAppLoading(true);
        //authService.removeAuth()
        const authData = await authService.getAuth();
        context.copyFrom(authData);
        setIsAppLoading(false);
    }

    async fetchDeliveries(authStatus) {
        await createBackgroundTasksService.fetchDeliveries(authStatus);
        await createBackgroundTasksService.fetchUpdates(authStatus);
    }
}
