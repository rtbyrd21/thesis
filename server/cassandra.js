
module.exports = function() {

	return{	
		getAllUsers         : 'SELECT * FROM users.entries',
		getUserById         : 'SELECT * FROM users.entries WHERE user_id = ?',
		getEventByTimeRange : "SELECT * FROM users.entries WHERE user_id = ? AND entry_id >= maxTimeuuid(?) AND  entry_id <= minTimeuuid(?)",
		getEligibility      : 'SELECT dateOf(entry_id) FROM users.entries WHERE user_id = ?',
		createEvent         : 'CREATE TABLE entries (user_id uuid, entry_id timeuuid, entries map<varchar, varchar>, PRIMARY KEY(user_id, entry_id));',
		upsertUser          : 'INSERT INTO users.entries(user_id, entry_id, entries) VALUES(?, now(), ?)'
 }

};