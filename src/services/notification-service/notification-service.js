import * as Notifications from "expo-notifications";
import AppColors from "../../global-styles/app-colors";

/**
 * Sets the default notification handler for the app.
 *
 * @param {function} handleNotification - the function to handle notifications
 * @return {object} - an object with properties indicating notification behavior
 */
function setNotificationDefaultHandler() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: true,
            //priority: Notifications.AndroidNotificationPriority.MAX,
        }),
    });
}

/**
 * Asynchronously schedules a notification for a delivery update.
 *
 * @param {number} deliveryId - The ID of the delivery
 * @param {object} data - Additional data for the notification
 * @return {Promise<void>} A promise that resolves when the notification is scheduled
 */
async function scheduleUpdateNotification(deliveryId = -1, data = {}) {
    setNotificationDefaultHandler();
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Nova atualização disponível!",
            body: `A entrega ${deliveryId} foi atualizada`,
            color: AppColors.instance.primaryDark,
            launchImageName: "../../../../assets/transluscent-icon.png",
            // badge: deliveryId,
            data: data,

            
        },
        trigger: { seconds: 1 },
        identifier: deliveryId.toString(),

    });
}

/**
 * Requests notification permissions and returns if granted.
 */
async function requestNotificationPermission() {
    const { status } = await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
        },
    });

    // eslint-disable-next-line no-undef
    console.info("notificationService - requestNotificationPermission => NOTIFICATIONS", status);
    return status === "granted";
}

const notificationService = {
    scheduleUpdateNotification,
    requestNotificationPermission,
};
export default notificationService;
