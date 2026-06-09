const express=require('express');

const { handleGenerateNewShortURL, handleGetAnalytics, handleVisitHistory } = require("../controllers/url");
const router = express.Router();
const URL = require("../models/url");

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);
router.get('/:shortId', handleVisitHistory);

router.post("/delete/:id", async (req, res) => {
    await URL.findByIdAndDelete(req.params.id);
    return res.redirect("/");
});
module.exports = router;