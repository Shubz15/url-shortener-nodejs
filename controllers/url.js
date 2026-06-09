const shortid = require("shortid");

const URL=require('../models/url')

async function handleGenerateNewShortURL(req,res){
      const body=req.body;
      if (!body.url) {
    return res.render("home", {
        error: "URL is required",
        urls: await URL.find({}),
    });
}
      const shortID = typeof shortid.generate === 'function' ? shortid.generate() : shortid(8);
      await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user._id,
      });

      return res.render("home",{
            id: shortID
      });

     // return res.json({id:shortID});
}

async function handleGetAnalytics(req,res) {
      const shortId = req.params.shortId || req.params.shortid;

      const result = await URL.findOne({ shortId });

      if (!result) {
    return res.render("analytics", {
        error: "Short URL not found",
    });
}

      return res.json({
            totalClicks: result.visitHistory ? result.visitHistory.length : 0,
            analytics: result.visitHistory || [],
      });
}

async function handleVisitHistory(req, res) {
      const shortId = req.params.shortId || req.params.shortid;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now(), ip: req.ip, userAgent: req.get('User-Agent') } } },
        { new: true }
    );

    if (!entry) return res.status(404).json({ error: 'Short URL not found' });

    let redirectTo = entry.redirectUrl;
    if (!/^https?:\/\//i.test(redirectTo)) {
        redirectTo = `http://${redirectTo}`;
    }

    return res.redirect(redirectTo);
}

module.exports = {
      handleGenerateNewShortURL,
      handleGetAnalytics,
      handleVisitHistory,
};
