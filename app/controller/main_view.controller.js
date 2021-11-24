import constants from "../constant/constants.js";

export default {
    index: async (req, res) => {
        res.sendFile(`${constants.ROOT_VIEW_DIR}/welcome.html`);
    },
}