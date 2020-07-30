var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundMenager = (function () {
    function SoundMenager() {
        this._bgm = new egret.Sound();
        this._bgm.load("resource/assets/sound/Music.mp3");
    }
    SoundMenager.sound = function () {
        if (SoundMenager.SOUND == null)
            SoundMenager.SOUND = new SoundMenager();
        return SoundMenager.SOUND;
    };
    SoundMenager.prototype.start = function () {
        this._bgm_channel = this._bgm.play(0, 0);
    };
    SoundMenager.prototype.stopsound = function () {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    };
    return SoundMenager;
}());
__reflect(SoundMenager.prototype, "SoundMenager");
//# sourceMappingURL=sound.js.map