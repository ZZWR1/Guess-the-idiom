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
var levelskin = (function (_super) {
    __extends(levelskin, _super);
    function levelskin() {
        var _this = _super.call(this) || this;
        _this.sel_level = 0;
        _this.LevelIcons = [];
        _this.skinName = "levelskinSkin";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        return _this;
    }
    levelskin.Shared = function (num) {
        if (levelskin.shared == null) {
            levelskin.shared = new levelskin();
        }
        return levelskin.shared;
    };
    levelskin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var row = 20;
        var col = 10;
        var spanx = 720 / col; //计算行x间隔,每个片段总共20个关卡
        var spany = 1136 / row; //计算列y间隔
        var group = new eui.Group(); //地图背景
        group.width = 720;
        group.height = (spany * 400); //算出最大尺寸
        //填充背景
        for (var i_1 = 0; i_1 <= (group.height / 1138); i_1++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i_1 * 1138;
            img.touchEnabled = false;
            this.level_group.addChildAt(img, 0);
        }
        var milestone = LevelDataManager.Shared().Milestone;
        // 以正弦曲线绘制关卡图标的路径
        for (var i = 0; i < 400; i++) {
            var icon = new cybtn();
            icon.label = i + 1;
            icon.y = spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + this.level_group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - spany;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            //保存到一个列表中
            this.LevelIcons.push(icon);
        }
        // 开启位图缓存模式
        this.level_group.cacheAsBitmap = true;
        this.level_group.addChild(group);
        //卷动到最底层
        this.level_group.scrollV = group.height - 1136;
        //跟踪箭头
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(milestone - 1).x;
        this.img_arrow.y = group.getChildAt(milestone - 1).y;
        this.sel_level = milestone;
        group.addChild(this.img_arrow);
    };
    levelskin.prototype.onclick_back = function () {
        this.parent.addChild(SceneBg.Shared());
        this.parent.removeChild(this);
    };
    levelskin.prototype.onclick_level = function (e) {
        var icon = e.currentTarget;
        if (this.sel_level != icon.label) {
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.label;
            SceneGameSkin.Shared().InitLevel(icon.label);
            this.parent.addChild(SceneGameSkin.Shared());
            this.parent.removeChild(this);
        }
        else {
            //进入并开始游戏
            this.parent.addChild(SceneGameSkin.Shared());
            SceneGameSkin.Shared().InitLevel(icon.label);
            this.parent.removeChild(this);
        }
    };
    Object.defineProperty(levelskin.prototype, "img", {
        set: function (x) {
            this.img_arrow.x = x[0];
            this.img_arrow.y = x[1];
        },
        enumerable: true,
        configurable: true
    });
    return levelskin;
}(eui.Component));
__reflect(levelskin.prototype, "levelskin", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=levelskin.js.map