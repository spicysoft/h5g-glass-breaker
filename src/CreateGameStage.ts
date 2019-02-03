　class CreateGameStage extends egret.DisplayObjectContainer {

    //Get stageLevel
/*    private stageLevel : number;
    static stageLevel : number ;//ステージレベルの設定*/
    private touchGlassEvent : egret.Event;//ガラスをタッチした時のイベント
    private glassGenerateSpeed : number = 1000;
    private timer : egret.Timer;

    constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.runGame, this );
/*        this.runGame().catch(e => {
            console.log(e);
        })*/
    }


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
     * ゲームシーンの作成
     */
    public createGameScene(): void {

        switch(Main.stageLevel){

            case Stage.TITLE:
            let title : Title = new Title();
            this.addChild(title);
            break;

            case Stage.STAGE1:
                // 背景画像の設定/描画
                let background = this.createBitmapByName("wood_background_png");
                let stageW = this.stage.stageWidth;
                let stageH = this.stage.stageHeight;
                background.width = stageW;
                background.height = stageH;
                this.addChild(background);

                //Instance of Time
                const timeDisplay = new TimeDisplay();
                this.stage.addChild(timeDisplay);

                //ガラスの破壊枚数の表示
                const brokenGlassDisplay = new BrokenGlassDisplay();
                this.stage.addChild(brokenGlassDisplay);

                //スコアの表示
                const scoreDisplay = new ScoreDisplay();
                this.stage.addChild(scoreDisplay);

                //Instance of glassPlate
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

            break;
        }
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
       
        switch(TimeDisplay.leftTime){
            case 60:
                Main.stageLevel = Stage.STAGE1
                this.glassGenerateSpeed = 600;
            break;
            case 55:
                Main.stageLevel = Stage.STAGE2
                //ガラスの生成スピードの変更
                this.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 2;

            break;
            case 50:
                Main.stageLevel = Stage.STAGE3
                this.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 3;
            break;
            case 45:
                Main.stageLevel = Stage.STAGE4
                this.glassGenerateSpeed = 500;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 4;
            break;
            case 40:
                Main.stageLevel = Stage.STAGE5
                this.glassGenerateSpeed = 400;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 10;
            break;
        }
    }










}