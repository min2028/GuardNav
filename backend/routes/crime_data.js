var express = require('express');
var router = express.Router();
import CrimeModel from "../models/CrimeModel";


/* GET crime data. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* Add crime data */
router.post('/', function (req, res, next) {
    const crime = new CrimeModel(req.body);

    crime.save((err, crime) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(crime);
    });
});

module.exports = router;
