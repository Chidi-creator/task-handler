import { DATE_REGEX, TIME_REGEX } from "@global/constants";
import { ValidationError } from "@managers/error.manager";

export function enumValues<T extends object>(enumObj: T): Array<T[keyof T]> {
  return Object.values(enumObj) as Array<T[keyof T]>;
}


export const parseDate = (date: string): Date | undefined =>{
  if (typeof date !== "string") return undefined;
  if (!DATE_REGEX.test(date)) throw new ValidationError(`${date} must be in format YYYY-MM-DD`) ;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) throw new ValidationError(`${date}is not a valid date`) ;
  return parsedDate;
}
 

export const parseTime = (time: string): Date | undefined => {
  if (typeof time !== "string") return undefined;
  if (!TIME_REGEX.test(time)) {
    throw new ValidationError(`${time} must be in format HH:MM or HH:MM:SS`);
  }

  const [hours, minutes, seconds = 0] = time.split(":").map(Number);

  // Create a Date object for today with that time
  const now = new Date();
  now.setHours(hours, minutes, seconds, 0);

  return now;
};