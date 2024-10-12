module.exports = {
  testEnvironment: "jsdom",
  // !
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
