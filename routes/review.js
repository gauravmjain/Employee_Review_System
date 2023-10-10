const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review_controller');

router.get('/employees-list',reviewController.employee_list);
router.get('/performance',reviewController.setReviews);
router.post('/assign-review',reviewController.assignReview);
router.post('/send-review',reviewController.receiveReview);
router.get('/all-reviews',reviewController.allReviews);
router.post('/update-name',reviewController.updateName);


module.exports = router;