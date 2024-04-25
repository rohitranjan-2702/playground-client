# TODOs

- [ ] make frontend for code editor using monaco editor
- [ ] make file sync feature to object store

- [x] integrate xterm.js
- [x] ws connection to execute shell commands

- [x] not able to open the desired file path - fixed (had to make the directory first, added a cmd in dockerfile for so)

- [ ] dockerise and deploy to ec2

link: https://docs.google.com/document/d/1H6U4j7HcxfA-81lk4LiUnr4ksJKffyTigPPc8gAlnaM/edit

# Functionalities to implement:

[x] A code editor on frontend
[x] A terminal on frontend
[x] Multiple resizable windows
Multiple file support in monaco editor - build your own tabs
[x] Code files are saved and restored when someone refreshes the page (use backend database to persist user code) - ws connection with conatiner filesystem for now !
[x] Preview window for editor output
[x] A working terminal (can you connect it to a real backend terminal?)
[x] Docker containers (can you containerize user sessions so that multiple users can use your service at once?) - used oops to create multiple terminal sessions for users with socket id as the key
