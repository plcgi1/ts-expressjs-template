"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});
const Users = mongoose.model("User", UserSchema);
exports.default = Users;
//# sourceMappingURL=users.model.js.map