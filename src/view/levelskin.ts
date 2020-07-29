class levelskin extends eui.Component implements eui.UIComponent {
	private level_group: eui.Group;
	private scroller_level: eui.Scroller;
	private sel_level: number = 0;
	private static shared: levelskin;
	private LevelIcons: cybtn[] = [];
	private btn_back: eui.Button;
	private img_arrow: eui.Image;

	public static Shared(num?: number) {
		if (levelskin.shared == null) {
			levelskin.shared = new levelskin();
		}
		return levelskin.shared;
	}
	public constructor() {
		super();
		this.skinName = "levelskinSkin";
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this)
	}
	protected createChildren() {
		super.createChildren();
		let row = 20;
		let col = 10;
		let spanx = 720 / col;      //计算行x间隔,每个片段总共20个关卡
		let spany = 1136 / row;     //计算列y间隔
		let group = new eui.Group();//地图背景
		group.width = 720;
		group.height = (spany * 400);//算出最大尺寸
		//填充背景
		for (let i = 0; i <= (group.height / 1138); i++) {
			let img = new eui.Image();
			img.source = RES.getRes("GameBG2_jpg");
			img.y = i * 1138;
			img.touchEnabled = false;
			this.level_group.addChildAt(img, 0);
		}
		var milestone: number = LevelDataManager.Shared().Milestone;
		// 以正弦曲线绘制关卡图标的路径
		for (var i = 0; i < 400; i++) {
			let icon = new cybtn();
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

	}
	private onclick_back() {
		this.parent.addChild(SceneBg.Shared())
		this.parent.removeChild(this)

	}
	private onclick_level(e: egret.TouchEvent) {
		let icon = <cybtn>e.currentTarget;
		if (this.sel_level != icon.label) {
			this.img_arrow.x = icon.x;
			this.img_arrow.y = icon.y;
			this.sel_level = icon.label;
			SceneGameSkin.Shared().InitLevel(icon.label);
			this.parent.addChild(SceneGameSkin.Shared());
			this.parent.removeChild(this);
		} else {
			//进入并开始游戏
			this.parent.addChild(SceneGameSkin.Shared());
			SceneGameSkin.Shared().InitLevel(icon.label);
			this.parent.removeChild(this);
		}

	}
	public set img(x:number[]){
			this.img_arrow.x=x[0];
			this.img_arrow.y=x[1]
		
	}
	// public OpenLevel(level:number){
	// let icon=this.LevelIcons[level-1]
	    
    //     }
	}




