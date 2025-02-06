Implement the following endpoints using Node/Express for a user entity:
Retrieve the list of all users
Add a new user (The request body should contain name, email, company name and company email)
Retrieve a specific user by ID
Update a specific user by ID
Delete a specific user by ID
In frontend app, call the all users list API and get name, email, company.name and company.email – show loader or loader text while API is loading.
Render the list of users on webpage locally.
You don’t need to connect to a database— store the users in an array in memory. Each user should have a unique ID.
 
 
Sample user object:
{
"id": 1,
"name": "Alan Jones",
"email": "alan.jones@gmail.com",
"company": {
     "name": "Right Solutions",
     "email": "info@rightsolutions.com"
  }
}

### Please refer user.postmancollection file attached.