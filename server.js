const WebSocket=require("ws");
const http=require("http");
const fs=require("fs");
const path=require("path");
const PORT=process.env.PORT||8080;
const rooms=new Map();

const server=http.createServer((req,res)=>{
  if(req.url==="/"||req.url==="/index.html"){
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
    res.end(fs.readFileSync(path.join(__dirname,"index.html")));
  }else{res.writeHead(404);res.end("Not found");}
});
const wss=new WebSocket.Server({server});

function players(room){
 const s=rooms.get(room)||new Set();
 return [...s].filter(x=>x.readyState===WebSocket.OPEN).map(x=>x.playerName);
}
function broadcast(room,obj){
 const s=rooms.get(room);if(!s)return;
 const data=JSON.stringify(obj);
 for(const ws of s)if(ws.readyState===WebSocket.OPEN)ws.send(data);
}
wss.on("connection",ws=>{
 ws.room=null;ws.playerName="Player";
 ws.on("message",raw=>{
   let m;try{m=JSON.parse(raw.toString())}catch{return}
   if(m.type==="join"){
     const room=String(m.room||"").trim().toUpperCase();
     if(!room)return;
     if(!rooms.has(room))rooms.set(room,new Set());
     const s=rooms.get(room);
     if(s.size>=2){ws.send(JSON.stringify({type:"system",message:"Room already has two players."}));ws.close();return}
     ws.room=room;ws.playerName=String(m.name||"Player").slice(0,24);s.add(ws);
     broadcast(room,{type:"system",message:ws.playerName+" joined the team."});
     broadcast(room,{type:"players",players:players(room)});
     return;
   }
   if(!ws.room)return;
   if(m.type==="chat"){
     const text=String(m.text||"").slice(0,300);
     if(text)broadcast(ws.room,{type:"chat",name:ws.playerName,text});
   }
   if(m.type==="game_state"){
     // The room is the authority for the shared V1 state.
     broadcast(ws.room,{type:"game_state",state:m.state});
   }
 });
 ws.on("close",()=>{
   if(!ws.room||!rooms.has(ws.room))return;
   const s=rooms.get(ws.room);s.delete(ws);
   broadcast(ws.room,{type:"system",message:ws.playerName+" left the team."});
   broadcast(ws.room,{type:"players",players:players(ws.room)});
   if(s.size===0)rooms.delete(ws.room);
 });
});
server.listen(PORT,()=>console.log("Empire Builder multiplayer server listening on "+PORT));
