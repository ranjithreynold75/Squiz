db.quiz.find({_id:"lZRxc1I_","students.access":"no"},{"students":1,"_id":0})
db.quiz.find({})
db.quiz.update({_id:"lZRxc1I_","students.access":"no","students.regno":"13mse0075"},{$set:{"students.$.access":"yes"}})
db.quiz.aggregate([{$unwind:"$students"},{$match:{"students.access":"no",_id:"lZRxc1I_"}},{$project:{_id:0,students:1}}])