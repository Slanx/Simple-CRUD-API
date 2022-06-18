import { IBodySettings } from '../interfaces';

export const validateJSON = async (body: any, bodySettings: IBodySettings) => {
  try {
    if (!(typeof body === 'object')) {
      throw new Error('Invalid type');
    }
    if (!(Object.keys(body).length <= Object.keys(bodySettings).length)) {
      throw new Error('Invalid type');
    }

    const valideFields = Object.entries(bodySettings);

    valideFields.forEach((item) => {
      if (item[1].required) {
        if (!Object.keys(body).includes(item[0])) throw new Error('Invalid type');
      }
      if (item[1].number) {
        if (typeof body[item[0]] !== 'number') throw new Error('Invalid type');
      } else if (item[1].string) {
        if (!(typeof body[item[0]] !== 'string')) throw new Error('Invalid type');
      } else if (item[1].array) {
        if (Array.isArray(body[item[0]])) {
          if (body[item[0]].length !== 0) {
            body[item[0]].forEach((elem: string) => {
              if (typeof elem !== item[1].array) throw new Error('Invalid type');
            });
          }
        } else {
          throw new Error('Invalid type');
        }
      }
    });
    return true;
  } catch (e) {
    return false;
  }
};

(async () =>
  console.log(
    await validateJSON(
      { username: 'john', age: 25, hobbies: ['string'] },
      {
        username: { required: false, string: true },
        age: { required: false, number: true },
        hobbies: { required: false, array: 'string' },
      }
    )
  ))();
