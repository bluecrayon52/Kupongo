import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {CouponDB} from './../api/Coupon';
import {UserDB} from './../api/UserDoc';
import {CompanyDB} from './../api/CompanyDoc';
import SalesAccount from './../api/SalesAccount';
import bcrypt from 'bcryptjs';
import { SalesExec } from '../api/UserDoc';
import Customer from './../api/UserDoc';

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
    Title: 				canRedeemCoupon
	Description: 	Checks if the user has permission to redeem this coupon. This means
                that it must be within the redemption date and must exist in the user's collection.
	Arguments:		userID - The _id field attached to this user's document.
								couponID - The _id field of the coupon attempting to be redeemed
								callback - The function that will run after the search is complete
	Returns:			Done via callback:
                                1) Error Message -  A JSON object with code and message components that
                  specify what should go in the meteor.error
                                2) userDoc - The user's document that was being checked to avoid
                  having multiple calls to the same database
                3) couponDoc - The slightly redacted user doc that can be passed
                  back upon redemption
*/
function canRedeemCoupon(userID, couponID, callback){
  let userDoc = null
  let couponDoc = null
  UserDB.find({"_id":userID}).map(function(userRes){
    if(!userRes){
      callback({"code": "Error finding the user", "message": "A user matching that ID was unable to be retrieved"}, null, null)
    }
    else{
      // Check if the coupon is in their collection.
      if(userRes.couponWallet == null || userRes.couponWallet.indexOf(couponID) == -1){
        callback({"code": "Coupon not collected", "message":"The coupon you are attempting to "
        +"redeem has not been collected yet. Please collect the coupon before trying to redeem it."}, null, null)
      }
      // The user has the coupon
      else{
        // Can be collected on the user end. Signal so.
        if(couponDoc != null){
          callback(null, userRes, couponDoc)
        }
        else{
          userDoc = userRes
        }
      }
    }
  })
  CouponDB.find({"_id":couponID}, { "salesID":0, "templateID":0 }).map(function(couponRes){
    if(!couponRes){
      callback({"code":"Coupon not found", "message":"The coupon by that ID does not exist"}, null, null)
    }
    // Check if it it within the redemption window
    else{
      if(couponRes.redeemStartDate > new Date() || couponRes.redeemEndDate < new Date()){
        callback({"code":"Coupon outside of redemption window", "message":"The coupon you are "
        + "trying to collect is not available to be redeemed at this time. Please "
        + "check the date listed by the coupon."}, null, null)
      }
      else{
        // The coupon can be collected
        if(userDoc != null){
          callback(null,userDoc, couponRes)
        }
        else{
          couponDoc = couponRes
        }
      }
    }
  })
}
export {canRedeemCoupon}

/*
    Title: 				couponIsCollectable
	Description: 	Checks whether the user is within the collectable range of the coupon
								specified.
	Arguments:		userID - The _id field attached to this user's document.
								couponID - The _id field of the coupon attempting to be collected
								callback - The function that will run after the search is complete
	Returns:			Done via callback, it will return true if the coupon CAN be collected
                                using the current data. False if it cannot or if there is an error
                                1) Error Message - Null if no error, otherwise contains error message
                                2) Can Be Collected - A boolean that is true if the coupon is able to
                                     be collected. False for any other result.
*/
function couponIsCollectable(userID, couponID, callback){
    // Gets the user's document
    let userDoc = UserDB.find({"_id":userID}).fetch();
  if(userDoc){
    // Get the coupon's information from the _id provided
    let couponDoc = CouponDB.find({"_id":couponID});
    if(couponDoc){
      // Compare the lat/longs to find if it is possible
      if(!isBetween(userDoc.lastLatitude, couponDoc.upperLat, couponDoc.lowerLat) ){
        callback("User not within the latitude boundaries for collection", false)
      }
      else if(!isBetween(userDoc.lastLongitude, couponDoc.eastLong, couponDoc.westLong)){
        callback("User not within the longitude boundaries for collection", false)
      }
      else if(couponDoc.collectStartDate <= new Date() && couponDoc.collectEndDate >= new Date()){
        callback("This coupon is not elligible for collection at this time", false)
      }
      else{
        callback(null, true)
      }
    }
    else{
      callback('Coupon not found', false)
    }
  }
  else{
    callback('User not found', false)
  }
}
export {couponIsCollectable};

/*
    Title: 				getCollectedCoupons
	Description: 	Retrieves the list of coupons that the user has collected in
								their redacted form. Should only be called sparingly
	Arguments:		userID - The _id field attached to this user's document.
								callback - The function that will run after the search is complete
	Returns:			Done via callback, it will return two arguments:
                                1) Error Code - Null if no error, otherwise contains error name
                                2) Error Description or the list of collected coupons
*/
function getCollectedCoupons(userID, callback){
    // Get the user document
    UserDB.find({"_id":userID}, function(userErr, userRes){
        if(userErr){
            callback(userErr, userRes)
        }
        else{
            // Get the coupons that are in their userDoc in redacted form
            CouponDB.find({"_id": { "$in": userRes.couponWallet}},
            { "salesID":0, "templateID":0, "upcCode":0, "qrImage":0 },
            function(couponErr, couponRes){
                if(couponErr){
                    callback(couponErr, couponRes)
                }
                else{
                    // Return the list of coupons
                    callback(null, couponRes)
                }
            })
        }
    })
}
export {getCollectedCoupons};

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
function getRedactedCoupons(userID, thisViewWindow, callback){
    if(thisViewWindow == null){
        UserDB.findOne({"_id":userID}, function(err, userDoc){
            if(err || userDoc == null){
                callback("Problem finding the user described", err)
            }
            else{
                CouponDB.find(
                    // The search parameters
                {"upperLat": {$gt: userDoc.viewWindow.upperLat},
                "lowerLat": {$lt: userDoc.viewWindow.lowerLat},
                "westLong": {$lt: userDoc.viewWindow.westLong},
                "eastLong": {$gt: userDoc.viewWindow.eastLong}},
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
        {"upperLat": {$gt: thisViewWindow.upperLat},
        "lowerLat": {$lt: thisViewWindow.lowerLat},
        "westLong": {$lt: thisViewWindow.westLong},
        "eastLong": {$gt: thisViewWindow.eastLong}},
        // The fields to exclude
        { "salesID":0, "templateID":0, "upcCode":0, "qrImage":0 },
        // The function the complete upon execution
        function(err2, couponDocs){
            if(err2){
                callback("Error finding coupons", err2)
            }
            else{
                UserDB.updateOne({"_id":userID}, {$set:{lastLattitude:latitude, lastLongitude:longitude, viewWindow:thisViewWindow}},
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
    Title: 			  addNewUser
	Description: 	Checks to see if account is already active.
	Arguments:		email - Email of the user
					      companyName - Name of company for user
					      password - Password for user
					      firstName - First name of user
					      lastName - Last name of user
					      phoneNumber - PhoneNumber of user
	Returns:		  Callback if account is already taken, otherwise insert new user
                          data into database
*/
function addNewUser(email, companyName, password, firstName, lastName, phoneNumber) {
    if (UserDB.find({ 'email': email }).count() > 0) {
        //Tell user email already has an account
        callback('Account Exist Error', 'Account taken: This email has already been assigned to an existing account.');
    } else {
        //User is new, so insert information into databse
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        const id = UserDB.insert({ email: email, companyName: companyName, password: hash, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber });
        return UserDB.findOne({_id: id});
    }
}
export {addNewUser};

/*
    Title: 			  validateUser
	Description: 	Checks to see if account is already active and entered information is correct.
	Arguments:		email - Email of the user
					      password - Password for user
	Returns:		  Callback if information is entered incorrectly, otherwise continue with
                          login
*/
function validateUser(email, password, callback){
    let user = UserDB.findOne({email: email});
    const hashedPassword = user.password;
    const res = bcrypt.compareSync(password, hashedPassword);
    if(res === true){
      console.log('[srvr/ServerFunctions]','returning true');
      callback(null, null);
      // Hide password as we pass it to front-end.
      delete user.password;
      return new SalesAccount(user);
    } else {
      callback("Incorrect information', 'Wrong email or password entered.");
    }
}
export {validateUser};

/*
	Title: 			  validateUser
	Description: 	Checks to see if account is already active and entered information is correct.
	Arguments:		email - Email of the user
					      password - Password for user
	Returns:		  Callback if information is entered incorrectly, otherwise continue with
					      login
*/
function validateMobileUser(email, password, callback){
    console.log(email, password);
    let user = UserDB.findOne({email: email});
    console.log(user);
    const hashedPassword = user.password;
    const res = bcrypt.compareSync(password, hashedPassword);
    if(res === true){
      console.log('[srvr/ServerFunctions]','returning true');
      callback(null, null);
      // Hide password as we pass it to front-end.
      delete user.password;
      return user;
    } else {
      callback("Incorrect information', 'Wrong email or password entered.");
    }
}
export {validateMobileUser};


/*
    Title:          addNewMobileUser
    Description:    Checks to see if account is already active and entered information is correct.
    Arguments:      email - Email of the user
                    password - Password for user
                    firstName - First name of user
                    lastName - Last name of user
                    phoneNumber - Phonenumber of user
                    address - Address of user
    Returns:        Callback if account is already taken, otherwise insert new user
                    data into database
*/
function addNewMobileUser(email, password, firstName, lastName, phoneNumber, address){
    if(UserDB.find({'email':email}).count() > 0) {
        //Account is already taken
        callback('Account Exist Error', 'Account taken: This email has already been assigned to an existing account.');
    } else {
        //Account not taken
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, Meteor.bindEnvironment(function (err, hash) {
            UserDB.insert(new Customer({ email: email, password: hash, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, address: address}).toMongoDoc());
        }));
        return true;
        const hash = bcrypt.hashSync(password, saltRounds);
        const id = UserDB.insert({ email: email, password: hash, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, phoneNumber: phoneNumber});
        return UserDB.findOne({_id: id});
    }
}
export {addNewMobileUser};


/*
    Title:          isBetween
    Description:    Checks to see if a number is between two other numbers. Order doesn't matter
    Arguments:      num - The number to check
                    bound1 - A boundary number
                    bound2 - The second boundary number
    Returns:        True if num is between bound1 and bound2, false otherwise
*/
function isBetween(num, bound1, bound2){
  if(num > bound1 && num > bound2){
    return false
  }
  else if(num < bound1 && num < bound2){
    return false
  }
  else{
    return true
  }
}



/*
    Title:          updateUserPassword
    Description:    Updates user password to new password entered.
    Arguments:      email - Email of the user
                    oldPassword - Old password for user
                    newPassword - New password for user
    Returns:        Callback if information does not match up.
*/
function updateUserPassword(email, oldPassword, newPassword) {
    var userId = UserDB.findOne({'email': email})._id;
    var oldHashedPassword = UserDB.findOne({'email': email}).password;
    const res = bcrypt.compareSync(oldPassword, oldHashedPassword);
    if (res === true) {
        console.log('[srvr/ServerFunctions]', 'returning true');
        const saltRounds = 10;
        bcrypt.hash(newPassword, saltRounds, Meteor.bindEnvironment(function (err, hash) {
            UserDB.update({'_id': userId}, {$set: {password: hash}});
        }));
        callback(null, null);
        return true;
    } else {
        callback("Incorrect information', 'Wrong email or password entered.");
    }
}
export {updateUserPassword};

/*
    Title:          setNewPassword
    Description:    Sets fogotten password of user to new password
    Arguments:      email - Email of the user
                    newPassword - New password for user
    Returns:        True when complete.
*/
function setNewPassword(email, newPassword) {
    var userId = UserDB.findOne({'email': email})._id;
    const saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds, Meteor.bindEnvironment(function (err, hash) {
        UserDB.update({'_id': userId}, {$set: {password: hash}});
    }));
    return true;
}
export {setNewPassword};