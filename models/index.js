module.exports = (mongoose) => {
    return {
        Book: require("./book")(mongoose),
    }
  };
  