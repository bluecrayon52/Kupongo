import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {CouponDB} from './../api/Coupon';
import {UserDB} from './../api/UserDoc';
import {CompanyDB} from './../api/CompanyDoc';

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
	// Get the company document
	CompanyDB.findOne({'companyName':coupon.companyName}, function(err, companyDoc){
		// Find who is trying to make the change
		if(!err){
			UserDB.findOne({'_id':userID}, function(error, userDoc){
				// Check if this user exists
				if(!error){
					// Check if the user is authorized to make changes. Authorized means that
					// the user has a valid token from the company document they are claiming
					// to represent.
					if(companyDoc.usedTokens.indexOf(userDoc.authenticationToken) > -1){
						// Add the coupon with the provided information to the database
						callback(null, null)
					}
				}
				else{
					callback("Create-Coupon-Failure", "The user trying to insert a coupon "+
					"does not exist. Please sign up with a store account and try again")
				}
			})
		}
		else{
			callback("Create-Coupon-Failure", "The user trying to insert a coupon "+
			"claims to be working with a company missing from our system. Please contact "+
			"us in order to figure out why your company is not listed.")
		}
	})
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
