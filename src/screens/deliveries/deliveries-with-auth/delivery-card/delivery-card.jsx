import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import deliveryCardStyles from "./delivery-card-style";
import dateFormatters from "../../../../utils/date-formatters";
import deliveryStatusFormatters from "../../../../utils/delivery-status-formatters";
import stringFormatters from "../../../../utils/string-formatters";

export default function DeliveryCard({ delivery, onPress, onLongPress = () => {} }) {
    const status = deliveryStatusFormatters.format(delivery.Status);
    const date = dateFormatters.toPtBRDateOnly(delivery.LastUpdateTime.toString());
    const title = stringFormatters.toTitlecase(delivery.Description);

    return (
        <TouchableOpacity
            style={deliveryCardStyles.gridItem}
            activeOpacity={0.8}
            onPress={() => onPress(delivery)}
            onLongPress={() => onLongPress(delivery)}
        >
            <View style={deliveryCardStyles.cardImageBox}>
                <FontAwesome5 name="shipping-fast" size={50} color="#1DAAE1" />
            </View>
            <View style={deliveryCardStyles.cardInfoBox}>
                <Text
                    style={deliveryCardStyles.cardTitle}
                    numberOfLines={1}
                    textBreakStrategy="highQuality"
                >
                    {title}
                </Text>
                <Text style={deliveryCardStyles.cardInfo} numberOfLines={2}>
                    Origem: {delivery.Origin.city + "-" + delivery.Origin.uf}
                </Text>
                <Text style={deliveryCardStyles.cardInfo} numberOfLines={2}>
                    Destino: {delivery.Destination.city + "-" + delivery.Destination.uf}
                </Text>
                <Text style={deliveryCardStyles.cardInfo} numberOfLines={1}>
                    {status}
                </Text>
                <Text style={deliveryCardStyles.cardInfo} numberOfLines={1}>
                    {date}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
