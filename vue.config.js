module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                  @import "./src/assets/styles/variables.scss";
                  @import "./src/assets/styles/global.scss";
                `
            }
        }
    }
};