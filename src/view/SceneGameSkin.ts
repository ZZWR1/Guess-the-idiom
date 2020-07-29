class SceneGameSkin extends eui.Component implements eui.UIComponent {
	private Group_answer: eui.Group;
	private Group_option: eui.Group;
	private static shared: SceneGameSkin;
	private btn_back: eui.Button;
	private img_question: eui.Image;
	private btn_next: eui.Button;
	private lb_from: eui.Label;
	private lb_explain: eui.Label;
	public constructor() {
		super();
		// this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_setting, this);
		this.skinName = "SceneGameSkinSkin"
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
		// this.img_question.source = "004_jpg";
		// this.img_question.source = "resource/assets/images/001.jpg";
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this);

	}
	public static Shared() {
		if (SceneGameSkin.shared == null) {
			SceneGameSkin.shared = new SceneGameSkin();
		}
		return SceneGameSkin.shared;
	}
	private levelIndex: number;
	/*初始化 */
	public InitLevel(level: number) {
		this.levelIndex = level;
		let leveldata = LevelDataManager.Shared().GetLevel(level);
		//将字段接起来
		let words = leveldata.answer + leveldata.word;
		//随机一个其它题目的字段混合进本题目
		//显示图像 成语解释
		this.img_question.source = "resource/assets/" + leveldata.img;
		this.lb_from.text = leveldata.tip;
		this.lb_explain.text = leveldata.content;
		while (words.length == 10) {
			let i = Math.floor(Math.random() * 400);
			if (i != level) {
				let temp = LevelDataManager.Shared().GetLevel(i);
				words += temp.word + temp.answer;
			}
		}
		//对字段重排
		let wordlist: string[] = [];
		for (let i = 0; i < words.length; i++) {
			wordlist.push(words.charAt(i));
		}
		wordlist = this.randomlist(wordlist);
		//赋值
		for (let i = 0; i < this.Group_option.numChildren; i++) {
			let wordrect = <Word>this.Group_option.getChildAt(i);
			wordrect.WordText = wordlist[i];
			wordrect.visible = true;
		}
		//重置
		for (let i = 0; i < this.Group_answer.numChildren; i++) {
			// let answerrect = <AnswerWord>this.Group_answer.getChildAt(i);
			// // answerrect.SetSelectWord(null);
			// answerrect.visible = true;
			// answerrect.SelectWord = null;
			let answerrect = <Word>this.Group_answer.getChildAt(i);
			answerrect.WordText = null;
		}

	}
	//将一个数列随机
	private randomlist(arr: any[]): any[] {
		let array = [];
		while (arr.length > 0) {
			let i = Math.floor(Math.random() * arr.length);
			array.push(arr[i]);
			arr.splice(i, 1);
		}
		return array;
	}
	private onclick_back() {
		this.parent.addChild(levelskin.Shared());
		this.parent.removeChild(this);
	}
	private onclick_next() {
		this.currentState = "game";
		this.InitLevel(this.levelIndex + 1)

	}
	public onclick_word(word: Word) {
		let w: Word = word
		let s: string = w.WordText;
		let this_ = this;
		// let sel: AnswerWord = null;
		//当点击option 时给answer赋值
		for (let i = 0; i < 20; i++) {
			let option_boon: number = this.Group_option.getChildIndex(w);//判断点击的是否是option
			// let opword=<Word>this.Group_option.getChildAt(i)
			if (option_boon >= 0) {//点击option
				for (let a = 0; a < 4; a++) {
					let aw = <Word>this.Group_answer.getChildAt(a);//找到没有赋值的answer，赋值
					if (aw.WordText == "") {
						aw.WordText = s;
						w.WordText = "";
						break;
					}

				}
				break;
			} else {//点击的是answer
				let op = <Word>this.Group_option.getChildAt(i);
				w.WordText = "";
				if (op.WordText == "") {
					op.WordText = s;
					break;
				}
			}
		}
		let a1 = <Word>this.Group_answer.getChildAt(3);
		let a2 = <Word>this.Group_answer.getChildAt(1);
		let a3 = <Word>this.Group_answer.getChildAt(0);
		let a4 = <Word>this.Group_answer.getChildAt(2);
		let B: boolean = a1.WordText != ""&&a2.WordText != ""&&a3.WordText != ""&&a4.WordText != "";
		//当最后一个字 选择完成 判断是否正确
		if (B) {
			//判断是否胜利
			let check_str: string = "";
			for (let i = 0; i < this.Group_answer.numChildren; i++) {
				let answer = <Word>this.Group_answer.getChildAt(i);
				check_str += answer.WordText;
			}
			if (check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
				//胜利
				// window.alert("您答对了");
				this_.currentState = "gamewin";
			} else {
				this_.currentState = "defeated";
				egret.setTimeout(function (): void { this_.currentState = "game" }, this, 3000)
			}
		}


	}
}