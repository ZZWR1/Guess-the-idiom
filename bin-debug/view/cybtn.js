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
var cybtn = (function (_super) {
    __extends(cybtn, _super);
    function cybtn() {
        var _this = _super.call(this) || this;
        _this.skinName = "button";
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick, _this);
        return _this;
    }
    // protected childrenCreated(): void {
    // 	super.childrenCreated();//用来对未绑定皮肤的手动调用创建皮肤里的内容到界面
    // 	super.createChildren();//创建完成后底层会调用这个函数，用来覆写作一些初始化处理的（是在组件初始化完成后回调）
    // }
    cybtn.prototype.onclick = function () {
        var a = parseInt(this.text.text);
        var level = levelskin.Shared();
        var x = this.x;
        var y = this.y - 20;
        var e = [x, y];
        level.img = e;
        SceneGameSkin.Shared().InitLevel(a);
    };
    Object.defineProperty(cybtn.prototype, "label", {
        get: function () {
            return parseInt(this.text.text);
        },
        set: function (num) {
            this.text.text = num.toString();
        },
        enumerable: true,
        configurable: true
    });
    return cybtn;
}(eui.Component));
__reflect(cybtn.prototype, "cybtn");
//# sourceMappingURL=cybtn.js.map