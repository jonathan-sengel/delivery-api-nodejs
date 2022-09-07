import { App } from "./app.js";

new App().server.listen(3030, () => {
    console.log('Server is running on: http://localhost:3030/');
})