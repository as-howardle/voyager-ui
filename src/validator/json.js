

const JsonValidate = {
  isJSON: (str) => {
    try {
      return (JSON.parse(str) && !!str);
    } catch (e) {
      return false;
    }
  }
};

export default JsonValidate;