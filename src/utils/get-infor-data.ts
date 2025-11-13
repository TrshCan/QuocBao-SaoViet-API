// import _ from 'lodash';

type GetInfoDataParams<T> = {
  fields?: (keyof T)[];
  object?: T;
};

// export const getInfoData = <T>({
//   fields = [],
//   object = {} as T,
// }: GetInfoDataParams<T>): Partial<T> => {
//   return _.pick(object, fields) as Partial<T>;
// };

export const getInfoData = <T extends object, K extends keyof T>({
  fields = [],
  object = {} as T,
}: GetInfoDataParams<T> & { fields: K[] }): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  for (const key of fields) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
};
