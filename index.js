const {
    parse
} = require("url");
const humanizeDuration = require("humanize-duration");
var shields = require('shields-lightweight');

module.exports = (req, res) => {
    const {
        path
    } = parse(req.url, true);
    const cleanPath = path.split("/").pop();
    const ts = new Date(cleanPath).getTime();
    const now = Date.now();
    const diff = new Date(ts - now);
    var prefix = "";
    if (ts - now < 0) {
        prefix = "- ";
    }

    if (ts > 0) {
        var svg = shields.svg('countdown ', prefix + humanizeDuration(diff), 'red', 'flat');
        res.setHeader("content-type", "image/svg+xml");
        res.end(svg);
    }

    res.end("invalid timestamp");
};