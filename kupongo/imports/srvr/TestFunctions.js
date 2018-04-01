/*
*		The purpose of this file is to modularize the initial test functionality to
*		allow for stress testing as well as the easy initial creation of coupons,
*		users, companies, and executives.
*/
var randomWords = require('random-words')

/*
  Title: 				createCompany
	Description: 	Creates a company with a random name along with 5 randomized
								sales tokens that can be used to create sales accounts
	Arguments:		vars - The JSON object that contains variables that this
									function can use in order to create the company document.
									Can Contain:
										name - The company's name
										tokenNumber - The number of tokens available at creation

								callback - The function that will run after the search is complete
	Returns:			Done via callback, it will return two arguments:
                                1) Error Code - Null if no error, otherwise contains error name
                                2) Error Description - A string detailing what went wrong
*/
