type Primitive = string | number | boolean | undefined | null;

/**
 * 引数を検証する
 */
type Validator = (value: Primitive) => boolean;

/**
 * 文字列が入力されているか検証する
 */
export const isString: Validator = (value) => typeof value === "string";

/**
 * 空ではないかどうか検証し、空でなければ true を返す
 */
export const isNotEmpty: Validator = (value) =>
  !(value === undefined || value === null || value === "");

/**
 * 渡された検証関数を実行し、失敗したらエラーを throw する
 */
type ValidateOrThrow = (
  validator: Validator,
  message?: string
) => (value: Primitive) => Primitive;

export const validateOrThrow: ValidateOrThrow =
  (validator, message) => (value) => {
    if (!validator(value)) {
      throw new Error(message ? message : "Invalid value.");
    }
    return value;
  };

export const pvts = () => {
  const operations: Array<ReturnType<ValidateOrThrow>> = [];

  const string = (message?: string) => {
    operations.push(validateOrThrow(isString, message));
    return validators;
  };

  const required = (message?: string) => {
    operations.push(validateOrThrow(isNotEmpty, message));
    return validators;
  };

  const validators = {
    string,
    required,
    create:
      (returnType: "Boolean" | "Message" = "Boolean") =>
      (value?: Primitive) => {
        if (returnType === "Boolean") {
          // すべての検証関数が true を返したら true を返す
          for (const operation of operations) {
            try {
              operation(value);
            } catch (error) {
              return false;
            }
          }
          return true;
        } else {
          // すべての検証関数が true を返したら空文字を返す
          for (const operation of operations) {
            try {
              operation(value);
            } catch (error) {
              if (error instanceof Error) {
                return error.message;
              }
              return error;
            }
          }
          return "";
        }
      },
  };

  return validators;
};
