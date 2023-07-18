import { InvalidArgumentError } from "commander";
import moment, { Moment } from "moment";

export function validateIntegerValue(value: string, previous: number): number {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

export function validateDateValue(value: string, previous: Moment): Moment {
  try {
    console.log(value);
    const parsedDate = moment(value);
    if (!parsedDate.isValid()) {
      throw new InvalidArgumentError("Not a valid date");
    }

    return parsedDate;
  } catch (error) {
    throw new InvalidArgumentError("Not a valid date");
  }
}
