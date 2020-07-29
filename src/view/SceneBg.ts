class SceneBg extends eui.Component {
	private btn:eui.Button;
	private static shared:SceneBg;
		public constructor() {
		super();
		this.skinName="SceneBgSkin";
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
	
	}

	public static Shared() {
        if(SceneBg.shared == null) {
            SceneBg.shared = new SceneBg();
        }
        return SceneBg.shared;
    }
	private onclick(e:Event){
		this.parent.addChild(levelskin.Shared())
		this.parent.removeChild(this);

	}

}