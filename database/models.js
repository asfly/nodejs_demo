var db = require('./msession');

var model = {};

model.list = function(datababasename){
	mongodb.open(function(err, db) {
		    assert.equal(null, err);
		    db.stats(function(err, stats) {
		        db.collection(datababasename).find().toArray(function(err,items){
		            if(err) console.dir(err);
		            console.log('---------');
		            console.dir(items);
		            console.log('---------');
		            db.close();
		        });
		    });   
		});
	}
}

model.find = function(datababasename,params){
	mongodb.open(function(err, db) {
		    assert.equal(null, err);
		    db.stats(function(err, stats) {
		        db.collection(datababasename).findOne(params}, function(err, item) {
	        	db.close();
				if(err){
					console.log(err);
				}
				else{
					return item;
				}		        
		    });   
		});
	}
};

model.insert = function(datababasename,model){
	mongodb.open(function(err, db) {
		    assert.equal(null, err);
		    db.stats(function(err, stats) {
		        db.collection(datababasename).insert(model);
		        db.close();
		    });   
		});
	}
}
model.remove = function(datababasename,model){
	mongodb.open(function(err, db) {
		    assert.equal(null, err);
		    db.stats(function(err, stats) {
		        db.collection(datababasename).remove(model);
		        db.close();
		    });   
		});
	}
}

module.exports = model;