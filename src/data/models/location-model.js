/* eslint-disable no-unused-vars */
export default class LocationModel {
    #timestamp = 0;
    #altitude = 0;
    #heading = 0;
    #altitudeAccuracy = 0;
    #latitude = 0;
    #speed = 0;
    #longitude = 0;
    #accuracy = 0;

    constructor(
        timestamp,
        altitude,
        heading,
        altitudeAccuracy,
        latitude,
        speed,
        longitude,
        accuracy
    ) {
        this.timestamp = timestamp;
        this.altitude = altitude;
        this.heading = heading;
        this.altitudeAccuracy = altitudeAccuracy;
        this.latitude = latitude;
        this.speed = speed;
        this.longitude = longitude;
        this.accuracy = accuracy;
    }

    get timestamp() {
        return this.#timestamp;
    }

    set timestamp(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#timestamp = value;
    }

    get altitude() {
        return this.#altitude;
    }

    set altitude(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#altitude = value;
    }

    get heading() {
        return this.#heading;
    }

    set heading(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#heading = value;
    }

    get altitudeAccuracy() {
        return this.#altitudeAccuracy;
    }

    set altitudeAccuracy(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#altitudeAccuracy = value;
    }

    get latitude() {
        return this.#latitude;
    }

    set latitude(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#latitude = value;
    }

    get speed() {
        return this.#speed;
    }

    set speed(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#speed = value;
    }

    get longitude() {
        return this.#longitude;
    }

    set longitude(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#longitude = value;
    }

    get accuracy() {
        return this.#accuracy;
    }

    set accuracy(value) {
        if (typeof value !== "number") {
            throw new Error("Parameter must be a number");
        }
        this.#accuracy = value;
    }

    toString() {
        return `LocationModel(timestamp=${this.#timestamp}, altitude=${this.#altitude}, heading=${
            this.#heading
        }, altitudeAccuracy=${this.#altitudeAccuracy}, latitude=${this.#latitude}, speed=${
            this.#speed
        }, longitude=${this.#longitude}, accuracy=${this.#accuracy})`;
    }

    static fromJson(obj) {
       
        if (!obj) {
            return new LocationModel(0, 0, 0, 0, 0, 0, 0, 0);
        }
        const json = obj[0];
      
        const timestamp = json.timestamp ?? 0;
        const altitude = json.coords.altitude ?? 0;
        const heading = json.coords.heading ?? 0;
        const altitudeAccuracy = json.coords.altitudeAccuracy ?? 0;
        const latitude = json.coords.latitude ?? 0;
        const speed = json.coords.speed ?? 0;
        const longitude = json.coords.longitude ?? 0;
        const accuracy = json.coords.accuracy ?? 0;

        return new LocationModel(
            timestamp,
            altitude,
            heading,
            altitudeAccuracy,
            latitude,
            speed,
            longitude,
            accuracy
        );
    }
}
