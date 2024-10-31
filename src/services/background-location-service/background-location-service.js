/* eslint-disable no-undef */
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as BackgroundFetch from "expo-background-fetch";
import storageService from "../storage-service/storage-service";
import LocationModel from "../../data/models/location-model";
import AppColors from "../../global-styles/app-colors";
import DeliveryRepository from "../../repositories/delivery-repository";
import CustomError from "../../exceptions/custom-error";
import * as Network from "expo-network";
const LOCATION_TASK_NAME = "background-location-task";
const CURRENT_LOCATION_DATA = "currentLocation";
const LAST_UPDATE_DATA = "last-update-data";
const BACKGROUND_FETCH_TASK = "background-fetch";

//? -------------------------------------------INÍCIO DA DEFINIÇÃO DO USO DA LOCALIZAÇÃO EM BACKGROUND-------------------------------------------
/**
 * Verify before defining the background location task.
 *
 * @return {Promise<boolean|undefined>} Returns true if the task is successfully defined or already defined, otherwise void.
 */
async function verifyBeforeDefineBackgoundLocationTask() {
    let status = TaskManager.isTaskDefined(LOCATION_TASK_NAME);

    if (status) {
        console.info(
            "Background location Service - DefineBackgroundLocationTask => Already Defined",
            LOCATION_TASK_NAME
        );
        return;
    }

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
            console.error(
                error,
                "Background location Service - DefineBackgroundLocationTask - TaskManager.defineTask"
            );
            new CustomError(error.message, error);
            return;
        }

        if (data) {
            const { locations } = data;
            await storageService.storeData(CURRENT_LOCATION_DATA, JSON.stringify(locations));
        }
    });

    const regStatus = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);

    if (regStatus) {
        console.info(
            "Background location Service - DefineBackgroundLocationTask => Already Defined",
            LOCATION_TASK_NAME
        );
        return;
    }

    return true;
}

/**
 * Define background location task
 *
 * @return {Promise<void>}
 */
async function defineBackgroundLocationTask() {

    if (!(await verifyBeforeDefineBackgoundLocationTask())) {
        return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        // deferredUpdatesDistance: 100,
        // distanceInterval: 100,
        accuracy: Location.Accuracy.BestForNavigation,
        foregroundService: {
            notificationTitle: "Trakky está em execução",
            notificationBody:
                "O APP funciona em segundo plano para melhorar a precisão das suas entregas.",
            killServiceOnDestroy: false,
            notificationColor: AppColors.instance.primaryDark,
        },
        activityType: Location.ActivityType.AutomotiveNavigation,
        mayShowUserSettingsDialog: true,
        showsBackgroundLocationIndicator: true,
        pausesUpdatesAutomatically: false,
    });
}
//~ -------------------------------------------FIM DA DEFINIÇÃO DO USO DA LOCALIZAÇÃO EM BACKGROUND-------------------------------------------

//? -------------------------------------------INÍCIO DAS OPERAÇÕES DAS TAREFAS DE REQUISIÇÃO EM BACKGROUND-------------------------------------------
/**
 * Verifies conditions before creating a background task.
 *
 * @param {object} json - The JSON data for the task
 * @param {object} last - The last data for comparison
 * @return {Promise<LocationModel | undefined>} The current location if conditions are met, otherwise logs warnings and returns early
 */
async function verifyBeforeCreateBackgroundTask(json, last, taskId) {
    const netState = await Network.getNetworkStateAsync();
    if (!netState.isConnected) {
        console.warn(
            "Background location Service - createBackgroundTask => Network unavailable:",
            BACKGROUND_FETCH_TASK + taskId
        );
        return;
    }

    if (!json) {
        console.warn(
            "Background location Service - createBackgroundTask => Failed to fetch task:",
            BACKGROUND_FETCH_TASK + taskId
        );
        return;
    }

    if (!last) {
        await storageService.storeData(LAST_UPDATE_DATA, json);
    }

    const lastLocation = LocationModel.fromJson(JSON.parse(last));
    const currentLocation = LocationModel.fromJson(JSON.parse(json));

    if (currentLocation.timestamp < lastLocation.timestamp) {
        console.warn(
            "Background location Service - createBackgroundTask => Last update is already uploaded:",
            BACKGROUND_FETCH_TASK + taskId
        );
        return;
    }

    if (!currentLocation.latitude || !currentLocation.longitude) {
        console.warn(
            "Background location Service - createBackgroundTask => Coordinates  ",
            BACKGROUND_FETCH_TASK + taskId
        );
        return;
    }

    return currentLocation;
}

/**
 * Creates a background task with the given taskId. This task retrieves the current location,
 * schedules an update notification, sends coordinates to the backend, and stores location data.
 *
 * @param {string} taskCode - The ID of the task to be created
 * @param {number} taskId - The ID of the task to be created
 * @return {Promise<BackgroundFetch.BackgroundFetchResult || void>} A Promise that resolves when the task is completed
 */
async function createBackgroundTask(taskCode, taskId) {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK + taskId, async () => {
        const json = await storageService.getData(CURRENT_LOCATION_DATA);
        const last = await storageService.getData(LAST_UPDATE_DATA);

        const currentLocation = await verifyBeforeCreateBackgroundTask(json, last, taskId);

        if (!currentLocation) {
            return BackgroundFetch.BackgroundFetchResult.Failed;
        }

        try {
            const repository = new DeliveryRepository();
            const result = await repository.updateDeliveryPosition(currentLocation, taskId);

            if (result) {
                console.info(
                    "Background location Service - createBackgroundTask => BACKGROUND REQUEST STATUS",
                    result,
                    "at Task: ",
                    taskId
                );
                await storageService.storeData(LAST_UPDATE_DATA, json);
            }
        } catch (error) {
            console.error(error, "Background location Service - createBackgroundTask", taskId);
            return BackgroundFetch.BackgroundFetchResult.Failed;
        }
    });
}

/**
 * Asynchronously registers a background fetch task with a given ID and time interval.
 *
 * @param {string} taskCode - The ID of the task to be created
 * @param {string} taskId - The ID of the background fetch task.
 * @param {number} [timeInterval] - The time interval in minutes for the background fetch task. Defaults to 36 minutes.
 * @return {Promise} A Promise that resolves when the background fetch task is successfully registered.
 */
const registerBackgroundFetchAsync = async (taskCode, taskId, timeInterval = 1) => {
    await defineBackgroundLocationTask();

    let status = TaskManager.isTaskDefined(BACKGROUND_FETCH_TASK + taskId);

    if (!status) await createBackgroundTask(taskCode, taskId);
    else
        console.info(
            "Background location Service - registerBackgroundFetchAsync => Background Fetch already Defined",
            BACKGROUND_FETCH_TASK + taskId
        );

    const regStatus = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK + taskId);

    if (!regStatus) {
        console.info(
            "Background location Service - registerBackgroundFetchAsync => Background Fetch Task created sucessfully",
            BACKGROUND_FETCH_TASK,
            taskId
        );
        return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK + taskId, {
            minimumInterval: timeInterval,
            stopOnTerminate: false,
            startOnBoot: true,
        });
    }

    console.info(
        "Background location Service - registerBackgroundFetchAsync => Background Fetch already Registered",
        BACKGROUND_FETCH_TASK + taskId
    );
};
//~ -------------------------------------------FIM DAS OPERAÇÕES DAS TAREFAS DE REQUISIÇÃO EM BACKGROUND-------------------------------------------

//? -------------------------------------------INÍCIO DAS OPERAÇÕES DAS PERMISSÕES E DISPONIBILIDADE DE SERVIÇOS-------------------------------------------
/**
 * Request location permission and start location updates if permission is granted.
 *
 * @return {Promise<boolean>} true if permission is granted and location updates started, false otherwise
 */
const requestLocationPermission = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

    if (foregroundStatus === "granted") {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

        console.info(
            "Background location Service - requestLocationPermission => LOCATION",
            backgroundStatus
        );

        await defineBackgroundLocationTask();
        return backgroundStatus === "granted";
    }
    return false;
};

/**
 * Retrieves the status of the service.
 *
 * @return {Promise<boolean>} The status of the service.
 */
async function getLocationServiceStatus() {
    const response = await Location.hasServicesEnabledAsync();

    return response;
}
//~ -------------------------------------------FIM DAS OPERAÇÕES DAS PERMISSÕES E DISPONIBILIDADE DE SERVIÇOS-------------------------------------------

//? -------------------------------------------INÍCIO DAS OPERAÇÕES DE REMOÇÃO DAS TAREFAS EM BACKGROUND-------------------------------------------
async function removeTaskById(id = 0) {
    await TaskManager.unregisterTaskAsync(BACKGROUND_FETCH_TASK + id);
    console.info("Background location Service - removeTaskById => Task removed", id);
}

async function removeAllTasks() {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    tasks.forEach(async (e) => {
        if (e.taskName.includes(BACKGROUND_FETCH_TASK) || e.taskName.includes(LOCATION_TASK_NAME)) {
            await TaskManager.unregisterTaskAsync(e.taskName);
            console.info(
                "Background location Service - removeAllTasks => Task removed",
                e.taskName
            );
        }
    });
}
//~ -------------------------------------------FIM DAS OPERAÇÕES DE REMOÇÃO DAS TAREFAS EM BACKGROUND-------------------------------------------

//? -------------------------------------------INÍCIO DAS OPERAÇÕES DE LOCALIZAÇÃO REVERSA-------------------------------------------
//TODO ESTÁ FAZENDO REQUIRE CICLE COM DeliveryRepository. REFATORAR.
/**
 * Retrieves the reverse geolocation information based on the provided latitude and longitude.
 *
 * @param {number} latitude - The latitude coordinate for the reverse geolocation.
 * @param {number} longitude - The longitude coordinate for the reverse geolocation.
 * @return {Promise<Location.LocationGeocodedAddress> || undefined} The reverse geolocation response object.
 */
async function getRevereseLocation(latitude, longitude) {
    if (!(await getLocationServiceStatus())) {
        return;
    }
    const response = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
    });

    return response[0];
}
//~ -------------------------------------------FIM DAS OPERAÇÕES DE LOCALIZAÇÃO REVERSA-------------------------------------------

const backgroundLocationService = {
    requestLocationPermission,
    registerBackgroundFetchAsync,
    getLocationServiceStatus,
    removeTaskById,
    getRevereseLocation,
    removeAllTasks,
};

export default backgroundLocationService;
