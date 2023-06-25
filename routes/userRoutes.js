const app = require('express');
const router = app.Router();
const {register, registerValidation, login, loginValidation, google, forgotPassword, resetPassword, changePassword, educationDetail, currentUser, deleteEducation, editAbout, jobDetail, deleteJob, searchUser, notificationUser, markAsReadNotification, removeNotification, markAsAllReadNotification, removeAllNotifications} = require('../controllers/userControllers');
const auth = require('../utils/auth');

router.post('/register',registerValidation, register);
router.post('/login-user', loginValidation, login);
router.post('/google', google);
router.post('/forgot-user-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);
router.post('/education/:id', auth, educationDetail);
router.get('/current-user/:id', currentUser);
router.post('/delete-education/:userId/:educationId', auth, deleteEducation);
router.post('/set-about/:id', auth, editAbout);
router.post('/job-detail/:id', auth, jobDetail);
router.post('/delete-job/:userId/:jobId', auth, deleteJob);
router.get('/search', searchUser);
router.get('/all-user-notification/:userId', notificationUser);
router.post('/mark-as-read-notification/:userId', auth, markAsReadNotification);
router.post('/remove-notification/:userId', auth, removeNotification);
router.post('/mark-as-all-read-notification/:userId', auth, markAsAllReadNotification);
router.post('/remove-all-notification/:userId', auth, removeAllNotifications);

module.exports = router;