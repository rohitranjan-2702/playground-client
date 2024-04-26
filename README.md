# Features
- [x] Monaco editor on frontend
- [x] Terminal using xterm.js that can be used by multiple users at a time
- [x] Multiple resizeable windows
- [x] Code files synced with backend using websockets which is restored on refreshing the page
- [x] Terminal connected with real docker container
- [x] Both client and server are dockerised to avoid vendor locking

## Source Codes:
- Client: https://github.com/rohitranjan-2702/playground-client
- Server: https://github.com/rohitranjan-2702/playground-server

## Tech used
[![App Platorm](https://raw.githubusercontent.com/rohitranjan-2702/playground-client/master/pgclient.png)]()

### Frontend:
- NextJS 
- Typescript
- Socket-io/client
- monaco-editor/react
- xterm.js
- docker

### Backend:
- ExpressJS
- Typescript
- Socket-io
- node-pty
- docker

## Future Improvements:
- [ ] Support nodejs and vite for now
- [ ] multiple editor support
- [ ] add and delete files
- [ ] file-tree improve
- [ ] output window fix 
