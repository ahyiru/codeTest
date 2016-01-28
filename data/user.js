var mongoose=require("mongoose");
var config=require('./config');

var testSchema = new mongoose.Schema({
	name:String,
	//email: {type:String,unique:true,lowercase:true},
	//password: {type:String,select:false},
	pwd:String,
	status:String,
	authorize:Boolean
});

var testCon=mongoose.createConnection('mongodb://localhost/test');
mongoose.connection.on('error',function(err) {
  console.log('Error:Could not connect to datatables. Did you forget to run `mongod`?'.red);
});

var Test=testCon.model('tests',testSchema);

module.exports = Test;


