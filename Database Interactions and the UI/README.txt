-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Homework Six (degeerm)
Author: Miya DeGeer
Date: 10 August 2020
Description: Simple workout tracker. Allows for GET/POST requests.
Works best in Google Chrome.

-+-+-IMPORTANT NOTES-+-+-
JSON OBJECT FORMAT FOR POST REQUESTS
{
    "exercises": [
    {
      "name": "exercise1",
      "reps": 3,
      "weight": 5,
      "lbs": 1,
      "date":"2020-07-20"
    },
    {
      "name": "exercise2",
      "reps": "3",
      "weight": "5",
      "lbs": 0,
      "date":"2018-02-02"
    }
  ]
}
+name: string
+reps: number
+weight: number
+lbs: number (0 for kg, 1 for lbs)
+date: string ("yyyy-mm-dd")

+If a POST request is sent (via the advanced REST client for example),
 and values are inserted into the table that way, you'll need to
 refresh the page to update it. This is not true for the GET request
 (IE, the button on the site), which inserts immediately. 

+If any part of the update form is set to NULL (old value deleted),
 it will default to the existing value in the table. This is to 
 prevent the user from accidentally losing data.

+I spent like.... way too many hours on this assignment please be proud
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
