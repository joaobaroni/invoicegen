"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
const configstore_1 = __importDefault(require("configstore"));
/**
 * Represents the Preferences class.
 */
class Preferences {
    constructor() {
        this.config = new configstore_1.default("invoicegen", {
            firstRun: true,
            invoiceNumber: 0,
            name: "Your Name",
            generationDay: 5,
        });
        this._firstRun = {
            key: "firstRun",
            value: null,
        };
        this._invoiceNumber = {
            key: "invoiceNumber",
            value: null,
        };
        this._name = {
            key: "name",
            value: null,
        };
        this._generationDay = {
            key: "generationDay",
            value: null,
        };
    }
    getPropertyValue(property) {
        if (property.value === null) {
            const currentValue = this.config.get(property.key);
            property.value = currentValue;
        }
        return property.value;
    }
    set generationDay(value) {
        this.config.set(this._generationDay.key, value);
        this._generationDay.value = value;
    }
    set name(value) {
        this.config.set(this._name.key, value);
        this._name.value = value;
    }
    set invoiceNumber(value) {
        this.config.set(this._invoiceNumber.key, value);
        this._invoiceNumber.value = value;
    }
    set firstRun(value) {
        this.config.set(this._firstRun.key, value);
        this._firstRun.value = value;
    }
    get generationDay() {
        return this.getPropertyValue(this._generationDay);
    }
    get name() {
        return this.getPropertyValue(this._name);
    }
    get invoiceNumber() {
        return this.getPropertyValue(this._invoiceNumber);
    }
    get firstRun() {
        return this.getPropertyValue(this._firstRun);
    }
}
exports.Preferences = Preferences;
