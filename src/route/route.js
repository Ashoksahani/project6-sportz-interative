const express = require('express');
const router = express.Router();
const Controllers= require("../controller/controller.js")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/country",Controllers.createcountry)
router.get("/country/:countryId",Controllers.getcountryid)
 router.get("/countries",Controllers.getcountry)

module.exports = router;