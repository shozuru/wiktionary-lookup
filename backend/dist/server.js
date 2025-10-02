"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wiktionaryRoutes_1 = __importDefault(require("./routes/wiktionaryRoutes"));
const app = (0, express_1.default)();
const PORT = 3010;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Backend server for wiktionary-app is running...');
});
app.use('/', wiktionaryRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server for wiktionary-app running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map