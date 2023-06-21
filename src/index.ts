type Primitive = string | number | boolean | undefined | null;

type Validator = (value: Primitive) => Primitive;

/**
 * 文字列が入力されているか検証する
 */
export const isString =
  (message: string): Validator =>
  (value) => {
    if (typeof value !== "string") {
      throw new Error(message);
    }
    return value;
  };

/**
 * 何らかの値が入力されているか検証する
 */
export const isRequired =
  (message: string): Validator =>
  (value) => {
    if (value === undefined || value === null || value === "") {
      throw new Error(message);
    }
    return value;
  };

export const pvts = () => {
  const operations: Array<Validator> = [];

  const string = (message: string) => {
    operations.push(isString(message));
    return validators;
  };

  const required = (message: string) => {
    operations.push(isRequired(message));
    return validators;
  };

  const validators = {
    string,
    required,
    test: () => (value?: Primitive) => {
      for (const operation of operations) {
        try {
          operation(value);
        } catch (error) {
          return false;
        }
      }
      return true;
    },
  };

  return validators;
};
