class setting extends eui.Component implements eui.UIComponent {
	private btn_music: eui.CheckBox;
	public static Setting: setting;
	public static setting() {
		if (setting.Setting == null) {
			setting.Setting = new setting();
			return setting.Setting;
		}
	}
	public constructor() {
		super();
		this.skinName = "settingSkin";
		this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
	}

	private onclick(e: Event) {

		let SM = SoundMenager.sound();
		if (this.btn_music.selected == true) {
			SM.start();
		} else {
			SM.stopsound();
		}

	}

}