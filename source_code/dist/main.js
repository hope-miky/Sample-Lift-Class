var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var LiftStatus;
(function (LiftStatus) {
    LiftStatus[LiftStatus["moving"] = 0] = "moving";
    LiftStatus[LiftStatus["stoped"] = 1] = "stoped";
    LiftStatus[LiftStatus["broken"] = 2] = "broken";
    LiftStatus[LiftStatus["maintainance"] = 3] = "maintainance";
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
            return filtered_lift.status;
        }
        catch (err) {
            console.error("Error finding lift status: " + err);
            return null;
        }
    };
    MainBuilding.prototype.addLift = function (value) {
        this._lifts.push(value);
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
console.log("location of lift 2 is  = " + test.checkStatus(2));
