
app.factory('user', function($resource){
	return $resource('http://localhost:3030/user', {user_id:'@user_id', entries: '@entries'})
})