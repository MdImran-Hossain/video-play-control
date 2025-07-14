const { log } = require("console")
const fs=require("fs")
const path= require('path');
const event= require('events');
const eventEmitter= new event()

const fechData=()=>{
    //  event emiter ----
    eventEmitter.on("photos", (callback)=>{
  fetch('https://jsonplaceholder.typicode.com/photos').then((res)=>{
       return res.json()
    }).then((data)=>{
       callback(data)
    })

    })
//  ---- event fire
const targertPath= path.join(__dirname, "photos.json")
eventEmitter.emit("photos", (data)=>{

fs.appendFile(targertPath, `\n${JSON.stringify(data)}`, (err)=>{
    if(err){
        log("error from write file", err)
    }
    else{
        log('data load done')
    }
})
})
return targertPath
}
  


module.exports ={fechData}