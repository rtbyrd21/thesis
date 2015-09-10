
app.factory('entry', function($resource){
	return $resource('/entry', {user_id:'@user_id', start:'@start', end: '@end'})
})