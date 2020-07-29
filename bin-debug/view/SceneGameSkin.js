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
var SceneGameSkin = (function (_super) {
    __extends(SceneGameSkin, _super);
    function SceneGameSkin() {
        var _this = _super.call(this) || this;
        // this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_setting, this);
        _this.skinName = "SceneGameSkinSkin";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        // this.img_question.source = "004_jpg";
        // this.img_question.source = "resource/assets/images/001.jpg";
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_next, _this);
        return _this;
    }
    SceneGameSkin.Shared = function () {
        if (SceneGameSkin.shared == null) {
            SceneGameSkin.shared = new SceneGameSkin();
        }
        return SceneGameSkin.shared;
    };
    /*初始化 */
    SceneGameSkin.prototype.InitLevel = function (level) {
        this.levelIndex = level;
        var leveldata = LevelDataManager.Shared().GetLevel(level);
        //将字段接起来
        var words = leveldata.answer + leveldata.word;
        //随机一个其它题目的字段混合进本题目
        //显示图像 成语解释
        this.img_question.source = "resource/assets/" + leveldata.img;
        this.lb_from.text = leveldata.tip;
        this.lb_explain.text = leveldata.content;
        while (words.length == 10) {
            var i = Math.floor(Math.random() * 400);
            if (i != level) {
                var temp = LevelDataManager.Shared().GetLevel(i);
                words += temp.word + temp.answer;
            }
        }
        //对字段重排
        var wordlist = [];
        for (var i = 0; i < words.length; i++) {
            wordlist.push(words.charAt(i));
        }
        wordlist = this.randomlist(wordlist);
        //赋值
        for (var i = 0; i < this.Group_option.numChildren; i++) {
            var wordrect = this.Group_option.getChildAt(i);
            wordrect.WordText = wordlist[i];
            wordrect.visible = true;
        }
        //重置
        for (var i = 0; i < this.Group_answer.numChildren; i++) {
            // let answerrect = <AnswerWord>this.Group_answer.getChildAt(i);
            // // answerrect.SetSelectWord(null);
            // answerrect.visible = true;
            // answerrect.SelectWord = null;
            var answerrect = this.Group_answer.getChildAt(i);
            answerrect.WordText = null;
        }
    };
    //将一个数列随机
    SceneGameSkin.prototype.randomlist = function (arr) {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            array.push(arr[i]);
            arr.splice(i, 1);
        }
        return array;
    };
    SceneGameSkin.prototype.onclick_back = function () {
        this.parent.addChild(levelskin.Shared());
        this.parent.removeChild(this);
    };
    SceneGameSkin.prototype.onclick_next = function () {
        this.currentState = "game";
        this.InitLevel(this.levelIndex + 1);
    };
    SceneGameSkin.prototype.onclick_word = function (word) {
        var w = word;
        var s = w.WordText;
        var this_ = this;
        // let sel: AnswerWord = null;
        //当点击option 时给answer赋值
        for (var i = 0; i < 20; i++) {
            var option_boon = this.Group_option.getChildIndex(w); //判断点击的是否是option
            // let opword=<Word>this.Group_option.getChildAt(i)
            if (option_boon >= 0) {
                for (var a = 0; a < 4; a++) {
                    var aw = this.Group_answer.getChildAt(a); //找到没有赋值的answer，赋值
                    if (aw.WordText == "") {
                        aw.WordText = s;
                        w.WordText = "";
                        break;
                    }
                }
                break;
            }
            else {
                var op = this.Group_option.getChildAt(i);
                w.WordText = "";
                if (op.WordText == "") {
                    op.WordText = s;
                    break;
                }
            }
        }
        var a1 = this.Group_answer.getChildAt(3);
        var a2 = this.Group_answer.getChildAt(1);
        var a3 = this.Group_answer.getChildAt(0);
        var a4 = this.Group_answer.getChildAt(2);
        var B = a1.WordText != "" && a2.WordText != "" && a3.WordText != "" && a4.WordText != "";
        //当最后一个字 选择完成 判断是否正确
        if (B) {
            //判断是否胜利
            var check_str = "";
            for (var i = 0; i < this.Group_answer.numChildren; i++) {
                var answer = this.Group_answer.getChildAt(i);
                check_str += answer.WordText;
            }
            if (check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
                //胜利
                // window.alert("您答对了");
                this_.currentState = "gamewin";
            }
            else {
                this_.currentState = "defeated";
                egret.setTimeout(function () { this_.currentState = "game"; }, this, 3000);
            }
        }
    };
    return SceneGameSkin;
}(eui.Component));
__reflect(SceneGameSkin.prototype, "SceneGameSkin", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneGameSkin.js.map