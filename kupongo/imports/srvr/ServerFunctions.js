import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {CouponDB} from './../api/Coupon';
import {UserDB} from './../api/UserDoc';
import {CompanyDB} from './../api/CompanyDoc';
import bcrypt from 'bcryptjs';

/*
	Title: 				validateSalesUser
	Description: 	Checks if the user provided is authorized to make the changes that
								they are requesting. Authorized means that the user in question
								has a valid and claimed token from the company they are claiming
								to represent in the coupon
	Arguments:		userID - The _id field attached to this user's document.
								coupon - The coupon document that can be searched for data
								callback - The function that will run after the search is complete
	Returns:			Done via callback, it will return two arguments:
								1) Error Code - Null if no error, otherwise contains error name
								2) Error Description - A string detailing what went wrong
*/
function validateSalesUser(userID, coupon, callback){
	console.log('[ServerFunctions]: validateSalesUser, title: '+ coupon.title);
	// Get the company document
	const companyDoc = CompanyDB.findOne({'companyName': coupon.companyName});
	if (companyDoc) {
    const userDoc = UserDB.findOne({'_id': userID});
    if (userDoc) {
      if(companyDoc.usedTokens.indexOf(userDoc.authenticationToken) > -1){
        // Add the coupon with the provided information to the database
        callback(null, null)
      }
		} else {
      callback("Create-Coupon-Failure", "The user trying to insert a coupon "+
          "does not exist. Please sign up with a store account and try again")
		}
	} else {
    callback("Create-Coupon-Failure", "The user trying to insert a coupon "+
        "claims to be working with a company missing from our system. Please contact "+
        "us in order to figure out why your company is not listed.")
	}
}
export {validateSalesUser};




/*
	Title: 				getAllCreatedCoupons
	Description: 	Gets all coupons that the user specified has created. First checked to ensure
	Arguments:		salesID - The _id field attached to this sales exec's document.
								callback - The function that will run after the search is complete
	Returns:			Done via callback, it will return two arguments:
								1) Error Code - Null if no error, otherwise contains error name
								2) Error Description or array of coupon documents depending on if an error occurs
*/
function getAllCreatedCoupons(salesID, callback){
	CouponDB.find({"salesID" : salesID}, function(err, couponDocs){
		if(err){
			callback("Problem finding coupons for this user", err)
		}
		else{
			callback(null, couponDocs)
		}
	})
}



/*
	Title: 				getRedactedCoupons
	Description: 	Gets all coupons near the user but only gives the fields necessary for the
								basic display function. The info contained here is not enough to redeem the
								coupon but is enough to show it on a map and give basic info.
	Arguments:		userID - The _id field attached to this user's document.
								callback - The function that will run after the search is complete
	Returns:			Done via callback, it will return two arguments:
								1) Error Code - Null if no error, otherwise contains error name
								2) Error Description or array of coupon documents depending on if an error occurs
*/
function getRedactedCoupons(userID, longitude, latitude, callback){
	if(longitude == null || latitude == null){
		UserDB.findOne({"_id":userID}, function(err, userDoc){
			if(err || userDoc == null){
				callback("Problem finding the user described", err)
			}
			else{
				CouponDB.find(
					// The search parameters
				{"upperLat": {$gt: userDoc.lastLattitude},
				"lowerLat": {$lt: userDoc.lastLattitude},
				"westLong": {$lt: userDoc.lastLongitude},
				"eastLong": {$gt: userDoc.lastLongitude}},
				// The fields to exclude
				{ "salesID":0, "templateID":0, "upcCode":0, "qrImage":0 },
				// The function the complete upon execution
				function(err2, couponDocs){
					if(err2){
						callback("Error finding coupons", err2)
					}
					else{
						callback(null, couponDocs)
					}
				})
			}
		})
	}
	else{
		CouponDB.find(
			// The search parameters
		{"upperLat": {$gt: latitude},
		"lowerLat": {$lt: latitude},
		"westLong": {$lt: longitude},
		"eastLong": {$gt: longitude}},
		// The fields to exclude
		{ "salesID":0, "templateID":0, "upcCode":0, "qrImage":0 },
		// The function the complete upon execution
		function(err2, couponDocs){
			if(err2){
				callback("Error finding coupons", err2)
			}
			else{
				UserDB.updateOne({"_id":userID}, {$set:{lastLattitude:latitude, lastLongitude:longitude}},
				function(err3, res){
					if(err3){
						callback("Failed updating user location", err3)
					}
					else{
						callback(null, couponDocs)
					}
				})
			}
		})
	}
}
export {getRedactedCoupons};

/*
	Title: 			addNewUser
	Description: 	Checks to see if account is already active.
	Arguments:		email - Email of the user
					companyName - Name of company for user
					password - Password for user
					firstName - First name of user
					lastName - Last name of user
					phoneNumber - PhoneNumber of user
	Returns:		Callback if account is already taken, otherwise insert new user
					data into database
*/
function addNewUser(email, companyName, password, firstName, lastName, phoneNumber) {
	if (UserDB.find({ 'email': email }).count() > 0) {
		//Tell user email already has an account
		callback('Account taken: This email has already been assigned to an existing account.');
	} else {
		//User is new, so insert information into databse
		const saltRounds = 10;
		bcrypt.hash(password, saltRounds, Meteor.bindEnvironment(function (err, hash) {
			UserDB.insert({ email: email, companyName: companyName, password: hash, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber });
		}));
		return true;
	}
}
export {addNewUser};

/*
	Title: 			validateUser
	Description: 	Checks to see if account is already active and entered information is correct.
	Arguments:		email - Email of the user
					password - Password for user
	Returns:		Callback if information is entered incorrectly, otherwise continue with
					login
*/
function validateUser(email, password){
	var hashedPassword;
	hashedPassword = UserDB.findOne({'email': email}).password;
	
	bcrypt.compare(password, hashedPassword, function(err, res) {
		if(res == true){
			return true;
		} else {
			callback("Incorrect informatiom: Wrong email or password entered.");
		}
	});
}
export {validateUser};