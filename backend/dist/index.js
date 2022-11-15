"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const app_1 = require("./app");
const PORT = 3003;
app_1.app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
