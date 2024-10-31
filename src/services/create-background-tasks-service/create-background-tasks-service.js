/* eslint-disable no-undef */
import DeliveryRepository from "../../repositories/delivery-repository";
import DeliveryStatusEnum from "../../data/enums/delivery-status-enum";
import backgroundLocationService from "../../services/background-location-service/background-location-service";
import AuthStateEnum from "../../data/enums/auth-state-enum";
import FeedDeliveryRepository from "../../repositories/FeedDeliveryRepository";
import BackgroundTaskTypeEnum from "../../data/enums/background-task-type-enum";
import backgroundDeliveriesUpdateService from "../background-deliveries-update-service/background-deliveries-update-service";

/**
 * Fetches deliveries from the DeliveryRepository if the authentication status is authenticated.
 *
 * @param {AuthStateEnum} authStatus - The authentication status.
 * @return {Promise<void>} - A promise that resolves when the background tasks are created or rejects with an error message.
 */
async function fetchDeliveries(authStatus) {
    const repository = new DeliveryRepository();

    if (authStatus !== AuthStateEnum.authenticated) return;

    try {
        const response = await repository.getDeliveries();
        if (!response || response.length === 0) return;

        //!AQUI É NECESSÁRIO VOLTAR A CONDIÇÃO PARA EM TRANSITO POIS A ATIVIDADE DEVE INICIAR APENAS QUANDO A ENTREGA INICIAR
        //? JÁ REVERIDA AÇÃO DO COMENTÁRIO ACIMA
        const deliveries = response.filter((e) => e.Status === DeliveryStatusEnum.inTransport);
        await removeTasks(response, BackgroundTaskTypeEnum.deliveryLocation);

        if (deliveries.length === 0) return;

        await createBackgroundTasks(deliveries);
    } catch (error) {
        console.error(error, "createBackgroundTasksService - fetchDeliveries");
    }
}

/**
 * Asynchronously creates background tasks for the given deliveries.
 *
 * @param {Array<DeliveryModel>} deliveries - An array of delivery objects.
 * @return {Promise} A promise that resolves when the background tasks are created.
 */
async function createBackgroundTasks(deliveries) {
    const res = await backgroundLocationService.requestLocationPermission();

    if (!res) return;

    deliveries.forEach(async (e) => {
        await backgroundLocationService.registerBackgroundFetchAsync(e.Code, e.DeliveryId);
    });
}

/**
 * Removes all tasks of the specified type.
 *
 * @param {BackgroundTaskTypeEnum} type - The type of tasks to remove.
 * @return {Promise<void>} A promise that resolves when all tasks are removed.
 */
async function removeAllTasksByType(type) {
    
    if (type === BackgroundTaskTypeEnum.deliveryLocation) {
        await backgroundLocationService.removeAllTasks();
        return;
    }
    await backgroundDeliveriesUpdateService.removeAllTasks();
}

/**
 * Removes a task based on the given taskId.
 *
 * @param {DeliveryModel[]} deliveries - The list of deliveries.
 * @param {BackgroundTaskTypeEnum} type - The type of task to remove.
 * @return {Promise} A promise that resolves when the task is removed.
 */
async function removeTasks(deliveries, type) {
    const list = deliveries.filter((e) => e.Status === DeliveryStatusEnum.complete);

    list.forEach(async (e) => {
        if (type === BackgroundTaskTypeEnum.deliveryLocation) {
            await backgroundLocationService.removeTaskById(e.DeliveryId);
            return;
        }
        await backgroundDeliveriesUpdateService.removeTaskById(e.DeliveryId);
    });
}

/**
 * Asynchronously fetches updates for saved deliveries.
 *
 * @param {AuthStateEnum} authStatus - The authentication status.
 * @return {Promise<void>} - A promise that resolves when the updates are fetched or rejects with an error message.
 */
async function fetchUpdates(authStatus) {
    const repository = new FeedDeliveryRepository();

    if (authStatus !== AuthStateEnum.authenticated) return;

    try {
        const response = await repository.getSavedDeliveries();
        if (!response || response.length === 0) return;

        //!AQUI É NECESSÁRIO VOLTAR A CONDIÇÃO PARA EM TRANSITO POIS A ATIVIDADE DEVE INICIAR APENAS QUANDO A ENTREGA INICIAR
        //? JÁ REVERIDA AÇÃO DO COMENTÁRIO ACIMA
        
        const deliveries = response.filter((e) => e.Status === DeliveryStatusEnum.inTransport);
        await removeTasks(response, BackgroundTaskTypeEnum.deliveryUpdate);

        if (deliveries.length === 0) return;
        await createBackgroundUpdates(deliveries);
    } catch (error) {
        console.error(error.message, "at createBackgroundTasksService - fetchUpdates");
    }
}

/**
 * Asynchronously creates background updates for the given deliveries.
 *
 * @param {Array<DeliveryModel>} deliveries - An array of delivery objects.
 * @return {Promise<void>} A promise that resolves when the background updates are created.
 */
async function createBackgroundUpdates(deliveries) {

    deliveries.forEach(async (e) => {
        await backgroundDeliveriesUpdateService.registerBackgroundFetchAsync(
            e.DeliveryId,
            e.Description
        );
    });
}

const createBackgroundTasksService = {
    fetchDeliveries,
    fetchUpdates,
    removeAllTasksByType,
};

export default createBackgroundTasksService;

