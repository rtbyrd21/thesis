
app.factory('eligibility', function($resource){
	return $resource('/eligibility', {id:'@id'})
})