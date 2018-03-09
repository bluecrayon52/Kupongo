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
