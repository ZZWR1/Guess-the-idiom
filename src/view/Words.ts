//普通的一个字，用来做问题的字块使用
class Word extends eui.Component {
    protected lb_text: eui.Label;
    public constructor() {
        super();
        this.skinName = "WordsSkin"
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
        this.lb_text.text = "";
    }
    public static newword: Word;
    public static newWord() {
        if (Word.newword == null) {
            Word.newword = new Word();
        }
        return Word.newword;
    }
    //这里没有做成属性的原因是因为当应用到eui的时候，Skin还未指定，运行时候会出现报错，如果指定了SkinName，那么就会产生两次eui的构建浪费内存
    public set WordText(value: string) {
        let this_=this;
        this_.lb_text.visible=true;
        this_.lb_text.text = value;
    }
    public get WordText(): string {
        return this.lb_text.text;
    }

    //由于当答案字点击的时候，答案字会消失并将对应的问题字还原显示

    protected onclick_tap() {
        let this_=this;
        this.lb_text.visible = this.lb_text.visible ? false : true;
      let SG:SceneGameSkin = SceneGameSkin.Shared()
      SG.onclick_word(this_)
        // SoundMenager.Shared().PlayWord();
    }
}
//继承自“问题字”，“答案字”是放在上面回答区域，
//由于当答案字点击的时候，答案字会消失并将对应的问题字还原显示
// class AnswerWord extends Word {
//     public SelectWord: Word = null;
//     public constructor() {
//         super();
//     }
//     // protected onclick_tap() {
//     //     if (this.SelectWord != null) {
//     //         this.SelectWord.visible = true;
//     //         this.SelectWord = null;
//     //         this.setWordText(null);

//     //         // SoundMenager.Shared().PlayWord();
//     //     }
//     // }
//     //当一个问题字被选择添加到回答的时，设置不可见，并保存到本对象中以后使用
//     public SetSelectWord(word: Word) {//传入的是选中的Word
//         let this_ = this;
//         // if (word) {
//         this_.setWordText(word.getWordText());//将选中的字的内容赋值给答案字
//         this_.SelectWord = word;
//         //     word.visible = false;
//         // }
//         // else {
//         //     this.setWordText(null);
//         //     this.SelectWord = null;
//         // }
//     }
// }
