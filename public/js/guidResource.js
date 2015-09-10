
app.factory('guid', function($resource){
	return $resource('http://localhost:3030/guid', {id:'@id'})
})