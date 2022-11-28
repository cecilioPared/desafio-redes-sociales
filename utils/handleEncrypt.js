import bcrypt from "bcrypt";

export const encryptPassword = (password) => {
  const salt = process.env.SALT;
  console.log("salt", salt);

  return bcrypt.hashSync(password, salt, null);
};

export const isValidPassword = (password, target) => {
  return bcrypt.compareSync(password, target);
};
