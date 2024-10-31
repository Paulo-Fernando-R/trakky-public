import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Stores data in AsyncStorage.
 *
 * @param {string} key - The key to store the data under.
 * @param {any} value - The data to be stored. It can be of any type.
 * @return {Promise<void>} - A Promise that resolves when the data is successfully stored.
 */
async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        
        console.error("Error occourred in:", this, error);
    }
}

/**
 * Retrieves data from AsyncStorage based on the given key.
 *
 * @param {string} key - The key to retrieve data from AsyncStorage.
 * @return {Promise<string|null>} - A promise that resolves to the retrieved data if successful,
 *                          or null if an error occurred.
 */
async function getData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? value : null;
    } catch (error) {
        
        console.error("Error occourred in:", this, error);
        return null;
    }
}

/**
 * Removes data from AsyncStorage based on the provided key.
 *
 * @param {string} key - The key of the data to be removed.
 * @return {Promise<void>} - A promise that resolves when the data is successfully removed.
 */
async function removeData(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        
        throw new Error(`Error occourred in:, ${this}, ${error}`);
    }
}

const storageService = {
    storeData,
    getData,
    removeData,
};

export default storageService;
