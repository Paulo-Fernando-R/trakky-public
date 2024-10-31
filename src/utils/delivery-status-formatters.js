import DeliveryStatusEnum from "../data/enums/delivery-status-enum";

/**
 * A function that formats the delivery status text based on the status value.
 *
 * @param {DeliveryStatusEnum} status - The status of the delivery.
 * @return {string} The formatted status text.
 */
function format(status) {
    let statusText = "";
    switch (status) {
        case DeliveryStatusEnum.waitingColect:
            statusText = "Aguardando coleta";
            break;
        case DeliveryStatusEnum.inTransport:
            statusText = "Em trânsito";
            break;

        case DeliveryStatusEnum.complete:
            statusText = "Entregue";
            break;
    }

    return statusText;
}

const deliveryStatusFormatters = {
    format,
};

export default deliveryStatusFormatters;
