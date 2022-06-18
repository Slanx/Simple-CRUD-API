import { v4, validate } from 'uuid';

export const createId = (): string => {
  return v4();
};

export const validateId = (id: string): boolean => {
  return validate(id);
};
