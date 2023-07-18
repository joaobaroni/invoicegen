import Configstore from "configstore";

/**
 * Represents a property in preferences with a value and key.
 */
interface PreferencesProperty<Type> {
  value: Type | null;
  key: string;
}

/**
 * Represents the Preferences class.
 */
export class Preferences {
  private config: Configstore = new Configstore("invoicegen", {
    firstRun: true,
    invoiceNumber: 0,
    name: "Your Name",
    generationDay: 5,
  });

  private _firstRun: PreferencesProperty<boolean> = {
    key: "firstRun",
    value: null,
  };

  private _invoiceNumber: PreferencesProperty<number> = {
    key: "invoiceNumber",
    value: null,
  };

  private _name: PreferencesProperty<string> = {
    key: "name",
    value: null,
  };

  private _generationDay: PreferencesProperty<number> = {
    key: "generationDay",
    value: null,
  };

  private getPropertyValue<Type>(property: PreferencesProperty<Type>): Type {
    if (property.value === null) {
      const currentValue = this.config.get(property.key);
      property.value = currentValue;
    }
    return property.value!;
  }

  set generationDay(value: number) {
    this.config.set(this._generationDay.key, value);
    this._generationDay.value = value;
  }

  set name(value: string) {
    this.config.set(this._name.key, value);
    this._name.value = value;
  }

  set invoiceNumber(value: number) {
    this.config.set(this._invoiceNumber.key, value);
    this._invoiceNumber.value = value;
  }

  set firstRun(value: boolean) {
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
