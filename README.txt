EMPIRE BUILDER V1.0 — FULL TWO-PLAYER BUILD

This build connects the game world to the multiplayer room.

INCLUDED
- $5,000 opening story and 3 starting paths
- Smoothie business, supermarket and company career
- City locations, houses, cars, bank and hospital
- Doctors, nurses, emergency calls and NPC help choices
- Money, reputation, empire levels, missions and achievements
- Weather/day progression and random events
- Save / Continue / Reset
- Two players on different devices
- Real-time typed team chat
- Shared game state: business, money, purchases, location, emergencies and progression are broadcast through the room

RUN THE SERVER
1. Install Node.js on the computer/server that will host the game.
2. Open a terminal in this folder.
3. Run: npm install
4. Run: npm start
5. The server listens on port 8080.

LOCAL TWO-DEVICE TEST
- Put the computer and both phones on the same Wi-Fi.
- On both phones open index.html through a local web server, or host the folder on a web server.
- Enter the computer's LAN address as the WebSocket server, e.g. ws://192.168.1.10:8080
- Both players enter the same room code.

INTERNET TWO-DEVICE PLAY
The server must be deployed to a public server that supports WebSockets.
For a normal HTTPS website, use a secure WebSocket URL such as wss://your-domain.example.
The game is designed so the server can later become authoritative for more advanced synchronized actions.

NOTE
A public multiplayer server cannot be created automatically inside this ZIP. Hosting requires an internet-accessible server.
