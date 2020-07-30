class SoundMenager {
    public static SOUND: SoundMenager;
    public static sound(): SoundMenager {
        if (SoundMenager.SOUND == null)
            SoundMenager.SOUND = new SoundMenager();
        return SoundMenager.SOUND;
    }
    private _bgm: egret.Sound;//背景音乐
    private _bgm_channel: egret.SoundChannel;//保存用来静音用
     public constructor() {
        this._bgm = new egret.Sound();
        this._bgm.load("resource/assets/sound/Music.mp3");
    }
    public start() {
      this._bgm_channel=this._bgm.play(0,0);
    }

    public stopsound() {
           if(this._bgm_channel!= null){
            this._bgm_channel.stop();
        }
    }
}