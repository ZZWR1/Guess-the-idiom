var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneBg = (function (_super) {
    __extends(SceneBg, _super);
    function SceneBg() {
        var _this = _super.call(this) || this;
        _this.skinName = "SceneBgSkin";
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick, _this);
        return _this;
    }
    SceneBg.Shared = function () {
        if (SceneBg.shared == null) {
            SceneBg.shared = new SceneBg();
        }
        return SceneBg.shared;
    };
    SceneBg.prototype.onclick = function (e) {
        this.parent.addChild(levelskin.Shared());
        this.parent.removeChild(this);
    };
    return SceneBg;
}(eui.Component));
__reflect(SceneBg.prototype, "SceneBg");
//# sourceMappingURL=SceneBg.js.map