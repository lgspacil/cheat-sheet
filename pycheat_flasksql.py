## Flask SQL Cheat Sheet 
## IN MYSQL WORKBENCH
------------------
|friends Table   |
-----------------|
|id | first_name |
|-----------------
| 1 | "shane"    |
| 2 | "tim"      |
------------------

"SELECT * FROM friends where id = 1" # the sql query you would run in mysql workbench

| 1 | "shane"    | # returns this

## mySQL in Flask
# option 1 
# drawback of option is that you are hardcoding the id value of 1

query = "SELECT * FROM friends WHERE id = 1"
friends = mysql.query_db(query)

[{id:1, first_name: "shane"}]  # returns this

# option 2
# option 2 moves the id value of 1 outside of the query statement into a dictionary, but we are still hardcoding the value of 1
query = "SELECT * FROM friends WHERE id = :specific_id"
data = {'specific_id': 1}
friends = mysql.query_db(query, data)

[{id:1, first_name: "shane"}]  # returns this

# option 3
# option 3 moves the value of 1 from the dictionary to another variable, but we are still hardcoding the value of 1
friend_id = 1
query = "SELECT * FROM friends WHERE id = :specific_id"
data = {'specific_id': friend_id}
friends = mysql.query_db(query, data)

[{id:1, first_name: "shane"}]  # returns this

# option 4
# option 4 does not hard code the value of 1 for friend_id, it instead pulls the value of friend_id from the 
# route
@app.route('/friends/<friend_id>/edit', methods=['GET']) # the <friend_id> part of the route means that we are creating a variable called friend_id (the part in < >) and it is assigned to the value of whatever the url path is
# so for instance localhost:8000/friends/3/edit would assign the value of 3 to a variable friend_id
def edit(friend_id):
  query = "SELECT * FROM friends WHERE id = :specific_id"
  data = {'specific_id': friend_id}
  friends = mysql.query_db(query, data)

[{id:1, first_name: "shane"}]  # returns this