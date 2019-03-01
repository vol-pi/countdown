const {
    parse
} = require("url");
const {
    createCanvas
} = require('canvas')
const humanizeDuration = require('humanize-duration')

module.exports = (req, res) => {
    const canvas = createCanvas(400, 20)
    const ctx = canvas.getContext('2d')
    const {
        path
    } = parse(req.url, true);
    const cleanPath = path.split('/').pop()
    const ts = (new Date(cleanPath)).getTime();
    const now = Date.now()
    const diff = new Date(ts - now)
    var prefix = ''
    if (ts - now < 0) {
        prefix = '- '
    }
    ctx.font = '12px'
    ctx.fillText(prefix + humanizeDuration(diff), 0, 15)

    if (ts > 0) {
        res.setHeader('content-type', 'image/png');
        res.end(canvas.toBuffer());
    }

    res.end("invalid timestamp");
};