import { Gender, NewPatient } from "./types";

const isString = (v: unknown): v is string => {
  return typeof v === "string" || v instanceof String;
};

const isObject = (body: unknown): body is object => {
  if (!body || typeof body !== "object") return false;

  return true;
};

const isDate = (date: string): boolean => {
  if (!date) return false;

  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Failed to parse name");

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Failed to parse date");

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error("Failed to parse ssn");

  // For some reason some of the initial test data has people with malformed ssn's.
  // So we can't check if they are valid.
  // if (ssn.length !== 11) throw new Error("Malformed ssn");

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender)) throw new Error("Failed to parse gender");

  if (gender === Gender.male.toString()) return Gender.male;
  if (gender === Gender.female.toString()) return Gender.female;

  return Gender.other;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Failed to parse occupation");

  return occupation;
};

export const ToNewPatient = (body: unknown): NewPatient => {
  if (
    !body ||
    !isObject(body) ||
    !("name" in body) ||
    !("dateOfBirth" in body) ||
    !("ssn" in body) ||
    !("gender" in body) ||
    !("occupation" in body)
  )
    throw new Error("invalid body in request");

  const newPatient: NewPatient = {
    name: parseName(body.name),
    dateOfBirth: parseDate(body.dateOfBirth),
    ssn: parseSsn(body.ssn),
    gender: parseGender(body.gender),
    occupation: parseOccupation(body.occupation),
  };

  return newPatient;
};
