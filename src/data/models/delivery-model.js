import DeliveryAddressModel from "./delivery-address-model";
export default class DeliveryModel {
    #deliveryId = 0;
    #courierId = 0;
    #observation = "";
    #description = "";
    #origin = new DeliveryAddressModel();
    #destination = new DeliveryAddressModel();
    #code = "";
    #status = "";
    #lastUpdateTime = new Date();
    #createdAt = new Date();
    #lastLatitude = 0;
    #lastLongitude = 0;
    #lastLocation = new DeliveryAddressModel();

    constructor(
        code,
        courierId,
        createdAt,
        deliveryId,
        description,
        destination,
        lastUpdateTime,
        observation,
        origin,
        status,
        lastLatitude,
        lastLongitude,
        lastLocation
    ) {
        this.#deliveryId = deliveryId;
        this.#courierId = courierId;
        this.#observation = observation;
        this.#description = description;
        this.#origin = origin;
        this.#destination = destination;
        this.#code = code;
        this.#lastUpdateTime = lastUpdateTime;
        this.#createdAt = createdAt;
        this.#status = status;
        this.#lastLatitude = lastLatitude;
        this.#lastLongitude = lastLongitude;
        this.#lastLocation = lastLocation;
    }

    static fromJson(delivery) {
       
        if (!delivery) {
            return new DeliveryModel(
                "",
                -1,
                "",
                -1,
                "",
                DeliveryAddressModel.fromJson(),
                "",
                "",
                DeliveryAddressModel.fromJson(),
                -1,
                "",
                "",
                DeliveryAddressModel.fromJson()
            );
        }

        const deliveryId = delivery.deliveryId
            ? delivery.deliveryId
            : delivery.id_delivery
            ? delivery.id_delivery
            : -1;

        const courierId = delivery.courierId || "";

        const observation = delivery.observation || "";

        const description = delivery.description || "";

        const origin = delivery.origin
            ? DeliveryAddressModel.fromJson(delivery.origin)
            : DeliveryAddressModel.fromJson();

        const destination = delivery.destiny
            ? DeliveryAddressModel.fromJson(delivery.destiny)
            : DeliveryAddressModel.fromJson();

        const code = delivery.code || "";

        const lastUpdateTime = delivery.lastUpdateTime
            ? new Date(delivery.lastUpdateTime)
            : delivery.last_update_time
            ? new Date(delivery.last_update_time)
            : "";

        const createdAt = delivery.createdAt
            ? delivery.createdAt
            : delivery.created_at
            ? delivery.created_at
            : "";

        const status = delivery.status === 0 ? delivery.status : delivery.status ?? -1;

        const lastLatitude = delivery.last_position ? delivery.last_position.latitude : null;
        const lastLongitude = delivery.last_position ? delivery.last_position.longitude : null;

        const lastLocation = delivery.last_position?.address
            ? DeliveryAddressModel.fromJson(delivery.last_position.address)
            : DeliveryAddressModel.fromJson();

           
        return new DeliveryModel(
            code,
            courierId,
            createdAt,
            deliveryId,
            description,
            destination,
            lastUpdateTime,
            observation,
            origin,
            status,
            lastLatitude,
            lastLongitude,
            lastLocation
        );
    }

    get DeliveryId() {
        return this.#deliveryId;
    }

    set DeliveryId(value) {
        this.#deliveryId = value;
    }

    // Getter and set ter for courierId
    get CourierId() {
        return this.#courierId;
    }

    set CourierId(value) {
        this.#courierId = value;
    }

    // Getter and set ter for observation
    get Observation() {
        return this.#observation;
    }

    set Observation(value) {
        this.#observation = value;
    }

    // Getter and set ter for description
    get Description() {
        return this.#description;
    }

    set Description(value) {
        this.#description = value;
    }

    // Getter and set ter for origin
    get Origin() {
        return this.#origin;
    }

    set Origin(value) {
        this.#origin = value;
    }

    // Getter and set ter for destination
    get Destination() {
        return this.#destination;
    }

    set Destination(value) {
        this.#destination = value;
    }

    // Getter and set ter for code
    get Code() {
        return this.#code;
    }

    set Code(value) {
        this.#code = value;
    }

    // Getter and set ter for status
    get Status() {
        return this.#status;
    }

    set Status(value) {
        this.#status = value;
    }

    // Getter and set ter for lastUpdateTime
    get LastUpdateTime() {
        return this.#lastUpdateTime;
    }

    set LastUpdateTime(value) {
        this.#lastUpdateTime = value;
    }

    // Getter and set ter for createdAt
    get CreatedAt() {
        return this.#createdAt;
    }

    set CreatedAt(value) {
        this.#createdAt = value;
    }

    get LastLatitude() {
        return this.#lastLatitude;
    }

    set LastLatitude(value) {
        this.#lastLatitude = value;
    }

    get LastLongitude() {
        return this.#lastLongitude;
    }

    set LastLongitude(value) {
        this.#lastLongitude = value;
    }

    get LastLocation() {
        return this.#lastLocation;
    }

    set LastLocation(value) {
        this.#lastLocation = value;
    }

    toString() {
        return `DeliveryModel {
            deliveryId: ${this.#deliveryId},
            courierId: ${this.#courierId},
            observation: ${this.#observation},
            description: ${this.#description},
            origin: ${this.#origin},
            destination: ${this.#destination},
            code: ${this.#code},
            status: ${this.#status},
            lastUpdateTime: ${this.#lastUpdateTime},
            createdAt: ${this.#createdAt},
            lastLatitude: ${this.#lastLatitude},
            lastLongitude: ${this.#lastLongitude},
            lastLocation: ${this.#lastLocation}
        }`;
    }
}
