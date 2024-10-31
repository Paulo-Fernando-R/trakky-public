import React from "react";
import styles from "./body-with-itens-styles";
import ListSwitch from "../list-switch/list-switch";
import ListItem from "../../../../../global-components/list-default/list-item";
import { View } from "react-native";

/**
 * A function that renders a list of items with specific details.
 *
 * @param  list - The list of items to render.
 * @param  listType - The type of the list.
 * @param  handleListType - The function to handle list type changes.
 * @param  navigate - The function to navigate to a specific item.
 * @return {JSX.Element} The JSX elements representing the rendered list.
 */
export default function BodyWithItens({ list, listType, handleListType, navigate }) {
    
    return (
        <>
            <ListSwitch handleListType={handleListType} activeOption={listType} />
            <View style={styles.listConatiner}>
                {list.map((item, index) => {
                    return (
                        <ListItem
                            deliveryId={item.DeliveryId}
                            key={index}
                            lasUpdate={item.LastUpdateTime}
                            title={item.Description}
                            navigate={navigate}
                        />
                    );
                })}
            </View>
        </>
    );
}
