/* eslint-disable no-undef */
import notificationService from "../notification-service/notification-service";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import storageService from "../storage-service/storage-service";
import SearchRepository from "../../repositories/search-repository";
import CustomError from "../../exceptions/custom-error";
const BACKGROUND_CLIENT_UPDATE_TASK = "background-update-task";

/**
+ * Verifies conditions before creating a background task.
+ *
+ * @param {string} date - The date for comparison
+ * @param {DeliveryModel} response - The response object containing LastUpdateTime
+ * @param {number} taskId - The ID of the task to be created
+ * @param {string} taskName - The name of the task
+ * @return {Promise<boolean | undefined>} Returns true if conditions are met, otherwise returns early
+ */
async function verifyBeforeCreateBackgroundTask(date, response, taskId, taskName) {
    if (!date && !response.LastUpdateTime) {
        console.info(
            "Background Updates - createBackgroundTask => No fetch response lastUpdateTime and no actual lastUpdateTime to keep",
            BACKGROUND_CLIENT_UPDATE_TASK + taskId
        );
        return;
    }

    if (!date && response.LastUpdateTime) {
        await storageService.storeData(
            BACKGROUND_CLIENT_UPDATE_TASK + taskId,
            response.LastUpdateTime.toString()
        );
        await notificationService.scheduleUpdateNotification(taskName, {});
        console.info(
            "Background Updates - createBackgroundTask => lastUpdateTime updated",
            BACKGROUND_CLIENT_UPDATE_TASK + taskId
        );
        return;
    } else if (date && !response.LastUpdateTime) {
        console.info(
            "Background Updates - createBackgroundTask => No fetch response lastUpdateTime, keepping actual lastUpdateTime",
            BACKGROUND_CLIENT_UPDATE_TASK + taskId
        );
        return;
    }

    const parsed = Date.parse(date);
    const last = Date.parse(response.LastUpdateTime);

    if (isNaN(parsed) || isNaN(last)) {
        console.warn(
            "Background Updates - createBackgroundTask => Not a number stored or fetched lastUpdateTime",
            BACKGROUND_CLIENT_UPDATE_TASK + taskId
        );
        return;
    }

    if (last <= parsed) {
        return;
    }

    return true;
}

/**
 * Creates a background task for updating delivery details.
 *
 * @param {number} taskId - The ID of the task to be created.
 * @param {string} taskName - The name of the task.
 * @return {void} This function does not return a value.
 */
function createBackgroundTask(taskId, taskName) {
    TaskManager.defineTask(BACKGROUND_CLIENT_UPDATE_TASK + taskId, async () => {
        const repository = new SearchRepository();

        try {
            const date = await storageService.getData(BACKGROUND_CLIENT_UPDATE_TASK + taskId);
            const response = await repository.getDeliveryDetails(taskId);

            if (await verifyBeforeCreateBackgroundTask(date, response, taskId, taskName)) {
                await storageService.storeData(
                    BACKGROUND_CLIENT_UPDATE_TASK + taskId,
                    response.LastUpdateTime.toString()
                );
                await notificationService.scheduleUpdateNotification(taskName, {});
                console.info(
                    "Background Updates - createBackgroundTask => LastUpdateTime updated",
                    BACKGROUND_CLIENT_UPDATE_TASK + taskId
                );
            }
        } catch (error) {
            console.error(error, "Background Updates - createBackgroundTask");
            new CustomError(error.message, error);
        }
    });
}

/**
 * Asynchronously registers a background fetch task with a given ID and time interval.
 *
 * @param {number} taskId - The ID of the task to be created
 * @param {string} taskName - The name of the background fetch task
 * @param {number} [timeInterval=360] - The time interval in seconds for the background fetch task. Defaults to 6 minutes.
 * @return {Promise} A Promise that resolves when the background fetch task is successfully registered.
 */
async function registerBackgroundFetchAsync(taskId, taskName, timeInterval = 1) {
    //? MUDAR TIMEINTERVAL PARA 20 MINUTOS
    let status = TaskManager.isTaskDefined(BACKGROUND_CLIENT_UPDATE_TASK + taskId);

    if (!status) createBackgroundTask(taskId, taskName);
    else
        console.info(
            "Background Updates - registerBackgroundFetchAsync => Background Fetch Update Already Defined",
            BACKGROUND_CLIENT_UPDATE_TASK + taskId
        );

    const regStatus = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_CLIENT_UPDATE_TASK + taskId
    );

    if (!regStatus) {
        console.info(
            "Background Updates - registerBackgroundFetchAsync => Background Fetch Update created sucessfully",
            BACKGROUND_CLIENT_UPDATE_TASK,
            taskId
        );
        return BackgroundFetch.registerTaskAsync(BACKGROUND_CLIENT_UPDATE_TASK + taskId, {
            minimumInterval: timeInterval,
            stopOnTerminate: false,
            startOnBoot: true,
        });
    }

    console.info(
        "Background Updates - registerBackgroundFetchAsync => Background Fetch Update Already Registered ",
        BACKGROUND_CLIENT_UPDATE_TASK + taskId
    );
}

/**
 * Asynchronously removes all tasks related to background updates.
 *
 * @return {Promise} A Promise that resolves when all tasks are successfully removed.
 */
async function removeAllTasks() {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    tasks.forEach(async (e) => {
        if (e.taskName.includes(BACKGROUND_CLIENT_UPDATE_TASK)) {
            await TaskManager.unregisterTaskAsync(e.taskName);
            console.info("Background Updates - removeAllTasks => Task removed", e.taskName);
        }
    });
    // tasks[0].taskName;
}

/**
 * Asynchronously removes a task with the given ID from the TaskManager.
 *
 * @param {number} id - The ID of the task to be removed. Defaults to 0.
 * @return {Promise<void>} A Promise that resolves when the task is successfully removed.
 */
async function removeTaskById(id = 0) {
    if (await TaskManager.isTaskRegisteredAsync(BACKGROUND_CLIENT_UPDATE_TASK + id)) {
        await TaskManager.unregisterTaskAsync(BACKGROUND_CLIENT_UPDATE_TASK + id);
        console.info("Background Updates - removeTaskById => Task removed:", id);
        return;
    }
    console.info("Background Updates - removeTaskById => Task not exist:", id);
}

const backgroundDeliveriesUpdateService = {
    registerBackgroundFetchAsync,
    removeTaskById,
    removeAllTasks,
};
export default backgroundDeliveriesUpdateService;
