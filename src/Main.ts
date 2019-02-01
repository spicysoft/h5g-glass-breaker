　class Main extends egret.DisplayObjectContainer {

        public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.runGame, this );
    }

    /**
     * ステージ追加時に一度発生する
     * (UILayerクラスの継承元(Groupクラス)のメソッド)
     */
/*    protected createChildren(): void {
        super.createChildren();
        
        this.runGame().catch(e => {
            console.log(e);
        })
    }*/

    /** 
     *  リソース準備後にゲームシーンを作成する
    */
    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    /** 
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload");
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 変数まとめ
     */
    static stageLevel : number ;//ステージレベルの設定
    private touchGlassEvent : egret.Event;//ガラスをタッチした時のイベント
    private glassGenerateSpeed : number = 1000;
    private timer : egret.Timer;
    /**
     * ゲームシーンの作成
     */
    private createGameScene(): void {

        //Instance of background
        Main.stageLevel = Stage.STAGE1;
        const createGameStage = new CreateGameStage(Main.stageLevel);
        this.stage.addChild(createGameStage);


        //Instance of Time
        const timeDisplay = new TimeDisplay();
        this.stage.addChild(timeDisplay);

        //Instance of glassPlate
        this.timer = new egret.Timer(this.glassGenerateSpeed,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
        this.timer.start();

        
    }

    /**
     * ガラスの生成
     * Generate Glass Plates
     */
    public generatePlates(){
        this.changeStageLevel();
        let generatePlate = new GeneratePlate();//プレートの生成
        this.stage.addChild(generatePlate);
    }

    /**
     * ステージレベルの変更
     * Change stage level
     */
    public changeStageLevel(){
        console.log(Main.stageLevel);
       
        switch(TimeDisplay.leftTime){
            case 60:
                Main.stageLevel = Stage.STAGE1
                this.glassGenerateSpeed = 600;
            break;
            case 55:
                Main.stageLevel = Stage.STAGE2
                //ガラスの生成スピードの変更
                this.glassGenerateSpeed = 400;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 1.2;

            break;
            case 50:
                Main.stageLevel = Stage.STAGE3
                this.glassGenerateSpeed = 200;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 1.4;
            break;
            case 45:
                Main.stageLevel = Stage.STAGE4
                this.glassGenerateSpeed = 100;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 1.6;
            break;
            case 40:
                Main.stageLevel = Stage.STAGE5
                this.glassGenerateSpeed = 50;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 1.8;
            break;
        }
    }

    /**
     * Get Set
     */
/*    get getStageLevel() : number{
        return this.stageLevel;
    }
    set setStageLevel(value : number){
        this.stageLevel = value;
    }*/

}

// Main Class はここまで

enum Stage{
    STAGE1,
    STAGE2,
    STAGE3,
    STAGE4,
    STAGE5,
}

