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
var setting = (function (_super) {
    __extends(setting, _super);
    function setting() {
        var _this = _super.call(this) || this;
        _this.skinName = "settingSkin";
        _this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick, _this);
        return _this;
    }
    setting.setting = function () {
        if (setting.Setting == null) {
            setting.Setting = new setting();
            return setting.Setting;
        }
    };
    setting.prototype.onclick = function (e) {
        var SM = SoundMenager.sound();
        if (this.btn_music.selected == true) {
            SM.start();
        }
        else {
            SM.stopsound();
        }
    };
    return setting;
}(eui.Component));
__reflect(setting.prototype, "setting", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=setting.js.map