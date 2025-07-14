const fs= require('fs');
const path= require('path');
const event= require('events');
const http= require('http');
const { log } = require('console');
const {fechData} = require('./event')

const server= http.createServer((req, res)=>{
    log(req.url);
    if(req.url == '/'){
        // const dataPath=fechData();
        // const fileStatus=fs.statSync(dataPath);
      
        // fs.readFile(dataPath, "utf-8", (err, data)=>{
        //     if(err){
        //         log('err from read data', err)
        //     }    
        //     res.writeHead(200,{
        //         "content-type":"appication/json",
        //         "content-length": fileStatus.size,
        //         });
        //         res.end(data)
            
        // })

         const targertPath= path.join(__dirname, "public", "index.html")
    const readStrem= fs.createReadStream(targertPath);
    readStrem.on("data", (chunk)=>{
        res.write(chunk);
    });
    readStrem.off("end", ()=>{
        log('data read down')
        res.end()
    })
    readStrem.on("error",(err)=>{
        log("erro from readstem end event", err)
    })
    }
   else if(req.url == "/video"){
    const videoPath= path.join(__dirname, "video", "nineteen.mp4") ;
    const fileStatus= fs.statSync(videoPath);
    const videoSize=fileStatus.size;
  const range=req.headers.range;
   const breackRang = range.replace("bytes=","").split("-");
   const start= parseInt(breackRang[0],10);
   const end= breackRang[1]? parseInt(breackRang[1],10): videoSize-1;
   const chunkSize= end - start + 1;
    // stram crate

    const stream= fs.createReadStream(videoPath, {start, end});
    stream.on("data", (chunk)=>res.write(chunk));
    stream.on('end', ()=> res.end());
    stream.on('error', (err)=> log(err));
    log(chunkSize)
}
})
server.listen(4000, ()=>{
    log(`server running on http://localhost:4000`)
})