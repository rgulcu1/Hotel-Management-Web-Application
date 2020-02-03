var hotelController = require('../controllers/hotelController');
var bookingController = require('../controllers/bookingController');
var roomController = require('../controllers/roomController');
var staffController = require('../controllers/staffController');
var restaurantController = require('../controllers/restaurantController');
var customerController = require('../controllers/customerController');
var jobAssignmentController = require('../controllers/jobAssignmentController');
var billController = require('../controllers/billController');

var express = require('express');
var router = express.Router();


router.get('/Porto-Bello', hotelController.showHotelPanel);
router.get('/Latayna-Palm', hotelController.showHotelPanel);
router.get('/Voyage-Bodrum', hotelController.showHotelPanel);

router.get('/Porto-Bello/bookings', bookingController.showBookings);
router.get('/Porto-Bello/bookings/add', bookingController.showAddView);
router.post('/Porto-Bello/bookings/add', bookingController.insertBooking);
router.post('/Porto-Bello/bookings/delete', bookingController.deleteBooking);

router.get('/Porto-Bello/rooms', roomController.showRooms);
router.get('/Porto-Bello/rooms/add', roomController.showAddView);
router.post('/Porto-Bello/rooms/add', roomController.insertRoom);
router.post('/Porto-Bello/rooms/delete', roomController.deleteRoom);

router.get('/Porto-Bello/staffs', staffController.showStaffs);
router.get('/Porto-Bello/staffs/add', staffController.showAddView);
router.post('/Porto-Bello/staffs/add', staffController.insertStaff);
router.post('/Porto-Bello/staffs/delete', staffController.fireStaff);


router.get('/Porto-Bello/restaurants', restaurantController.showRestaurants);
router.get('/Porto-Bello/restaurants/add', restaurantController.showAddView);
router.post('/Porto-Bello/restaurants/add', restaurantController.insertRestaurant);
router.post('/Porto-Bello/restaurants/delete', restaurantController.deleteRestaurant);


router.get('/Porto-Bello/customers', customerController.showCustomers);


router.get('/Porto-Bello/jobAssignments', jobAssignmentController.showAssignments);
router.get('/Porto-Bello/jobAssignments/add', jobAssignmentController.showAddView);
router.post('/Porto-Bello/jobAssignments/add', jobAssignmentController.insertJobAssignment);
router.post('/Porto-Bello/jobAssignments/delete', jobAssignmentController.deleteJobAssignment);


router.get('/Porto-Bello/bills', billController.showBills);
router.get('/Porto-Bello/bills/add', billController.showAddView);
router.post('/Porto-Bello/bills/add', billController.insertBill);
router.post('/Porto-Bello/bills/delete', billController.deleteBill);








router.get('/Latayna-Palm/bookings', bookingController.showBookings);
router.get('/Latayna-Palm/bookings/add', bookingController.showAddView);
router.post('/Latayna-Palm/bookings/add', bookingController.insertBooking);
router.post('/Latayna-Palm/bookings/delete', bookingController.deleteBooking);

router.get('/Latayna-Palm/rooms', roomController.showRooms);
router.get('/Latayna-Palm/rooms/add', roomController.showAddView);
router.post('/Latayna-Palm/rooms/add', roomController.insertRoom);
router.post('/Latayna-Palm/rooms/delete', roomController.deleteRoom);

router.get('/Latayna-Palm/staffs', staffController.showStaffs);
router.get('/Latayna-Palm/staffs/add', staffController.showAddView);
router.post('/Latayna-Palm/staffs/add', staffController.insertStaff);
router.post('/Latayna-Palm/staffs/delete', staffController.fireStaff);


router.get('/Latayna-Palm/restaurants', restaurantController.showRestaurants);
router.get('/Latayna-Palm/restaurants/add', restaurantController.showAddView);
router.post('/Latayna-Palm/restaurants/add', restaurantController.insertRestaurant);
router.post('/Latayna-Palm/restaurants/delete', restaurantController.deleteRestaurant);


router.get('/Latayna-Palm/customers', customerController.showCustomers);


router.get('/Latayna-Palm/jobAssignments', jobAssignmentController.showAssignments);
router.get('/Latayna-Palm/jobAssignments/add', jobAssignmentController.showAddView);
router.post('/Latayna-Palm/jobAssignments/add', jobAssignmentController.insertJobAssignment);
router.post('/Latayna-Palm/jobAssignments/delete', jobAssignmentController.deleteJobAssignment);


router.get('/Latayna-Palm/bills', billController.showBills);
router.get('/Latayna-Palm/bills/add', billController.showAddView);
router.post('/Latayna-Palm/bills/add', billController.insertBill);
router.post('/PLatayna-Palm/bills/delete', billController.deleteBill);







router.get('/Voyage-Bodrum/bookings', bookingController.showBookings);
router.get('/Voyage-Bodrum/bookings/add', bookingController.showAddView);
router.post('/Voyage-Bodrum/bookings/add', bookingController.insertBooking);
router.post('/Voyage-Bodrum/bookings/delete', bookingController.deleteBooking);

router.get('/Voyage-Bodrum/rooms', roomController.showRooms);
router.get('/Voyage-Bodrum/rooms/add', roomController.showAddView);
router.post('/Voyage-Bodrum/rooms/add', roomController.insertRoom);
router.post('/Voyage-Bodrum/rooms/delete', roomController.deleteRoom);

router.get('/Voyage-Bodrum/staffs', staffController.showStaffs);
router.get('/Voyage-Bodrum/staffs/add', staffController.showAddView);
router.post('/Voyage-Bodrum/staffs/add', staffController.insertStaff);
router.post('/Voyage-Bodrum/staffs/delete', staffController.fireStaff);


router.get('/Voyage-Bodrum/restaurants', restaurantController.showRestaurants);
router.get('/Voyage-Bodrum/restaurants/add', restaurantController.showAddView);
router.post('/Voyage-Bodrum/restaurants/add', restaurantController.insertRestaurant);
router.post('/Voyage-Bodrum/restaurants/delete', restaurantController.deleteRestaurant);


router.get('/Voyage-Bodrum/customers', customerController.showCustomers);


router.get('/Voyage-Bodrum/jobAssignments', jobAssignmentController.showAssignments);
router.get('/Voyage-Bodrum/jobAssignments/add', jobAssignmentController.showAddView);
router.post('/Voyage-Bodrum/jobAssignments/add', jobAssignmentController.insertJobAssignment);
router.post('/Voyage-Bodrum/jobAssignments/delete', jobAssignmentController.deleteJobAssignment);


router.get('/Voyage-Bodrum/bills', billController.showBills);
router.get('/Voyage-Bodrum/bills/add', billController.showAddView);
router.post('/Voyage-Bodrum/bills/add', billController.insertBill);
router.post('/Voyage-Bodrum/bills/delete', billController.deleteBill);




module.exports = router;