// eslint-disable-next-line no-unused-vars
import "react-native-gesture-handler";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import appFonts from "./app-fonts";
import AppRoutes from "./src/routes/app-routes";
import AuthContext from "./src/contexts/auth-context";
import AuthModel from "./src/data/models/auth-model";
import { StatusBar } from "expo-status-bar";
//import AppColors from "./src/global-styles/app-colors";
//import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts(appFonts);
    const [authData] = useState(AuthModel.fromJson());

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return <></>;
    }

    return (
        <AuthContext.Provider value={authData}>
            <StatusBar style="light"  translucent={true}/>
            {/* <SafeAreaProvider> */}
                <AppRoutes onLayout={onLayoutRootView} />
            {/* </SafeAreaProvider> */}
        </AuthContext.Provider>
    );
}
