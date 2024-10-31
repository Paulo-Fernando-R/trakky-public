import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tabBarStyle: {
        zIndex: Number.MAX_SAFE_INTEGER,
        height: 68,
        elevation: 10,
        shadowOpacity: 1,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowRadius: 10,
        overflow: "visible",
        marginTop: -5,

        borderTopWidth: 5,
        borderTopColor: "rgba(21, 22, 23, 0.90)",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
    },
    tabBarItemStyle: { paddingBottom: 10 },
    inactiveItem:{
        display: "none"
    }
});

export default styles;
