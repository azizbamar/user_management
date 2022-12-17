const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/librairie');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


const adminSchema = new mongoose.Schema({
  name :{
    type :String,
  },
  lastname : String,
  email :{
    type :String,
    unique : true
  },
  password :String
  });
const Admin = mongoose.model('Admin', adminSchema);
module.exports =Admin