/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AppColors from "../global-styles/app-colors";
import styles from "./botton-navigation-styles";
import Profile from "../screens/profile/profile";
import { AxiosInterceptor } from "../services/custom-rest-client/axios-interceptor";
import Deliveries from "../screens/deliveries/deliveries";
import AuthContext from "../contexts/auth-context";
import Home from "../screens/home/home";
import Search from "../screens/search/search";
import AddDelivery from "../screens/add-delivery/add-delivery";
import notificationService from "../services/notification-service/notification-service";
import AppRoutesController from "./app-routes-controller";
import EditDelivery from "../screens/edit-delivery/edit-deliveries";

const Tab = createBottomTabNavigator();

export default function AppRoutes({ onLayout }) {
    const controller = new AppRoutesController();
    const [isAppLoading, setIsAppLoading] = useState(false);
    const context = useContext(AuthContext);

    async function getAuthData() {
        await controller.getAuthData(setIsAppLoading, context);
        await controller.fetchDeliveries(context.authStatus);
        await notificationService.requestNotificationPermission();
    }

    useEffect(() => {
        getAuthData();
    }, []);

    if (isAppLoading) {
        return <></>;
    }

    const disable = {
        tabBarItemStyle:styles.inactiveItem
         
     }

    return (
        <NavigationContainer>
            <View onLayout={onLayout} />
            <AxiosInterceptor />
            <Tab.Navigator
                id="1"
                initialRouteName="Home"
                backBehavior="initialRoute"
                detachInactiveScreens={true}
                sceneContainerStyle={{ backgroundColor: AppColors.instance.bgDark }}
                screenOptions={{
                    headerShown: false,
                    tabBarInactiveTintColor: AppColors.instance.textLight,
                    tabBarActiveTintColor: AppColors.instance.primaryDefault,
                    tabBarActiveBackgroundColor: AppColors.instance.bgDark,
                    tabBarInactiveBackgroundColor: AppColors.instance.bgDark,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarItemStyle: styles.tabBarItemStyle,
                    tabBarHideOnKeyboard: true,
                    tabBarVisibilityAnimationConfig: {
                        hide: { animation: "timing", config: { delay: 0, duration: 200 } },
                        show: { animation: "spring", config: { delay: 100, duration: 300 } },
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialIcons
                                name="home-filled"
                                size={focused ? size + 10 : size + 2}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name="search"
                                size={focused ? size + 10 : size + 2}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="MyDeliveries"
                    component={Deliveries}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialIcons
                                name="local-shipping"
                                size={focused ? size + 10 : size + 2}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="NewDelivery"
                    component={AddDelivery}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialIcons
                                name="add-circle"
                                size={focused ? size + 10 : size + 2}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name="person-circle"
                                size={focused ? size + 12 : size + 4}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="EditDelivery"
                    component={EditDelivery}

                    options={disable}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );


}
