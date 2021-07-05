const typeValidation = (value) => {
  lowerCaseValue = value.toLowerCase();
  switch (lowerCaseValue) {
    case "water":
    case "aerial":
    case "land":
      return true;

    default:
      return false;
  }
};

const typeValidationError =
  "Type can only be in aerial , water and land categories";

module.exports = { typeValidation, typeValidationError };
