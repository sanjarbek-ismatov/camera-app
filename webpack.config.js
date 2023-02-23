module.exports = {
  entry: { capture: "./src/js/capture.js", gallery: "./src/js/gallery.js" },
  mode: "production",
  watch: true,
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
  },
};
