var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var LiftStatus;
(function (LiftStatus) {
    LiftStatus["moving"] = "moving";
    LiftStatus["stoped"] = "stoped";
    LiftStatus["broken"] = "broken";
    LiftStatus["maintainance"] = "maintainance";
})(LiftStatus || (LiftStatus = {}));
var MainBuilding = /** @class */ (function () {
    // const name: string;
    function MainBuilding(num_lift, kwards) {
        this._lifts = [];
        this._num_lifts = num_lift;
        this._generateLifts();
    }
    Object.defineProperty(MainBuilding.prototype, "lifts", {
        get: function () {
            return this._lifts;
        },
        enumerable: false,
        configurable: true
    });
    MainBuilding.prototype.checkStatus = function (lift_id) {
        try {
            var filtered_lift = this._lifts.filter(function (lift) { return lift.id === lift_id; })[0];
            console.log(filtered_lift.current_location);
            return filtered_lift.status;
        }
        catch (err) {
            console.error("Error finding lift status: " + err);
            return null;
        }
    };
    MainBuilding.prototype.findLift = function (lift_id) {
        try {
            // const filtered_lift: ILift = this._lifts.filter((lift) => lift.id === lift_id)[0]
            var idx = this._lifts.findIndex(function (lift) { return lift.id === lift_id; });
            return idx;
        }
        catch (err) {
            console.error("Error finding lift status: " + err);
            return -1;
        }
    };
    MainBuilding.prototype.addLift = function (value) {
        this._lifts.push(value);
    };
    // function* move = (from: number, to: number) => {
    // }
    MainBuilding.prototype.move = function (from, to, idx) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(from != to)) return [3 /*break*/, 2];
                    if (from - to > 0) {
                        from--;
                    }
                    else {
                        from++;
                    }
                    console.log("lift status " + this._lifts[idx].status + " on " + from + "th floor");
                    return [4 /*yield*/, from];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    };
    MainBuilding.prototype.call = function (from, lift_id) {
        var _this = this;
        var idx = this.findLift(lift_id);
        var cur_lift = this._lifts[idx];
        var going_to = cur_lift.current_location;
        var delay = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
        console.log("lift " + lift_id + " going from " + from + " to " + going_to);
        var delayedCall = function () { return new Promise(function () { return __awaiter(_this, void 0, void 0, function () {
            var iter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._lifts[idx].status = LiftStatus.moving;
                        iter = this.move(from, going_to, idx);
                        _a.label = 1;
                    case 1:
                        if (!(from != going_to)) return [3 /*break*/, 3];
                        from = iter.next().value;
                        return [4 /*yield*/, delay(1000)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this._lifts[idx].status = LiftStatus.stoped;
                        console.log("lift status " + this._lifts[idx].status + " now at " + this._lifts[idx].current_location);
                        return [2 /*return*/];
                }
            });
        }); }); };
        if (this._lifts[idx].status === LiftStatus.moving) {
            console.error("Lift #" + cur_lift.id + " is already moving");
        }
        else if (from === going_to) {
            console.log('the lif is on the same floor!');
        }
        else {
            delayedCall();
        }
    };
    MainBuilding.prototype._generateLifts = function () {
        var _this = this;
        __spreadArrays(Array(this._num_lifts).keys()).map(function (value) {
            _this.addLift({
                id: value,
                capacity: 4,
                status: LiftStatus.stoped,
                heading_to: null,
                current_location: Math.floor(Math.random() * _this._num_lifts)
            });
        });
        // console.log(this._lifts)
    };
    return MainBuilding;
}());
var test = new MainBuilding(3);
// console.log(`location of lift 2 is  = ${test.checkStatus(1)}`)
test.call(5, 1);
test.call(10, 1);
// console.log('something')
