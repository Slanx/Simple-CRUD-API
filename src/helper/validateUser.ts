import { IBodySettings } from '../interfaces';

export const validateJSON = async (body: any, bodySettings: IBodySettings) => {
  try {
    if (!(typeof body === 'object')) {
      throw new Error('Invalid type');
    }

    for (const field in body) {
      if (!bodySettings.hasOwnProperty(field)) {
        throw new Error('Invalid type');
      }
    }

    for (const key in bodySettings) {
      const setting = bodySettings[key];
      const valueBody = body[key];

      if (setting.required && valueBody.hasOwnProperty(key)) {
        throw new Error('Invalid type');
      } else if (!valueBody) {
        continue;
      } else if (setting.number && typeof valueBody !== 'number') {
        throw new Error('Invalid type');
      } else if (setting.string && typeof valueBody !== 'string') {
        throw new Error('Invalid type');
      } else if (setting.array) {
        if (Array.isArray(valueBody)) {
          if (valueBody.length !== 0) {
            valueBody.forEach((elem: string) => {
              if (typeof elem !== setting.array) throw new Error('Invalid type');
            });
          }
        } else {
          throw new Error('Invalid type');
        }
      }
    }
    return true;
  } catch (e: any) {
    return false;
  }
};
