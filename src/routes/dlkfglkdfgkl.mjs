


import { v1 } from 'uuid';

console.log(v1());


console.log("sldkflskdflksdf===>" );
const date2 = new Date('1995-12-17T03:24:00');

console.log("sldkflskdflksdf===>" ,date2.toISOString());

let newFileName = date2.toISOString() +"_"+ v1();

console.log("sldkflskdflksdf===>" ,newFileName);


