class cybtn extends eui.Component {
	private rbtn: eui.Button;
	private text: eui.Label;
	public constructor() {
		super();
		this.skinName = "button";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
	}
	// protected childrenCreated(): void {
	// 	super.childrenCreated();//用来对未绑定皮肤的手动调用创建皮肤里的内容到界面
	// 	super.createChildren();//创建完成后底层会调用这个函数，用来覆写作一些初始化处理的（是在组件初始化完成后回调）

	// }
	private onclick() {
		let a: number = parseInt(this.text.text);
		let level = <levelskin>levelskin.Shared()
		let x=this.x;
		let y=this.y-20;
		let e:number[]=[x,y]
		level.img=e;
		SceneGameSkin.Shared().InitLevel(a)

	}
	public get label(): number {
		return parseInt(this.text.text);
	}
	public set label(num: number) {
		this.text.text = num.toString();
	}
}