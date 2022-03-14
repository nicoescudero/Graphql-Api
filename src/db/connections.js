const mongoose=require('mongoose');
const {URI_DB_DEV,URI_DB_PRO,NODE_ENV}=process.env
let uri='';
if(NODE_ENV==="development")uri=URI_DB_DEV;
else uri=URI_DB_PRO;

const options={
}

mongoose.connect(uri)
.then(db=>console.log('Started MongoDB'))