var path = require('path');
var express=require('express');
var cors=require('cors');
var logger=require('morgan');
var bodyParser=require('body-parser');

var User=require('./data/user');

var app=express();

app.set('port',process.env.PORT || 18080);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if(app.get('env')==='production'){
  app.use(function(req,res,next) {
    var protocol=req.get('x-forwarded-proto');
    protocol=='https'?next():res.redirect('https://'+req.hostname+req.url);
  });
}
app.use(express.static(path.join(__dirname, './page')));

//获取数据
app.get('/me',function(req,res){
	User.find(function(err,user){
		res.send(user);
	});
});

//添加数据
app.post('/add', function(req,res) {
	var add=req.body;
	console.log(add);
	if (!add) {
	    console.log(add);
	    return;
	}
	var add = new User(add);
	add.save(function(err){
	    if (err){
	      console.log('添加失败！');
	      return res.send(err.message);
	    }
	    console.log('添加成功！');
	    res.send('添加成功！');
	});
});


//更新数据
app.post('/update',function(req,res){
	var edit=req.body;
	if(!edit){
		console.log(edit);
    	return;
	}
	User.update({_id:edit._id},{
		$set:{name:edit.name,pwd:edit.pwd}
	},function(err){
		if(err){
			console.log(err);
	    	return res.send(err.message);
	    }
	    console.log('更新成功！');
	    res.send('更新成功！');
	});
});


//删除数据
app.post('/delete',function(req,res){
	var id=req.body._id;
	if(id){
		User.remove({
			_id:id
		},function(err){
			if(err){
				console.log(err);
				return;
			}
			console.log('删除成功！');
			res.send('删除成功！');
		});
	}
})

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});