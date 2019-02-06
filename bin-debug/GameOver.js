var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        /*        let assetAdapter = new AssetAdapter();
                egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
                egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());*/
        _this.once(egret.Event.ADDED_TO_STAGE, _this.runGame, _this);
        _this.runGame().catch(function (e) {
            console.log(e);
        });
        return _this;
    }
    /**
     *  リソース準備後にゲームシーンを作成する
    */
    GameOver.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.GameOverDisplay();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    GameOver.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    GameOver.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * GameOver画面の生成
     */
    GameOver.prototype.GameOverDisplay = function () {
        var background = this.createBitmapByName("wood_background_png");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.addChild(background);
        //euiグループ
        this.euiGroup = new eui.Group();
        this.euiGroup.width = this.stage.stageWidth;
        this.euiGroup.height = this.stage.stageHeight;
        this.addChild(this.euiGroup);
        //スコアの表示
        this.score();
        //Retryボタン Titleボタン
        var retryButton = new eui.Button();
        retryButton.skinName = "resource/eui_skins/GreenRetryButton.exml";
        retryButton.once(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this.euiGroup.addChild(retryButton);
        var titleButton = new eui.Button();
        titleButton.skinName = "resource/eui_skins/GreenTitleButton.exml";
        titleButton.once(egret.TouchEvent.TOUCH_TAP, this.title, this);
        this.euiGroup.addChild(titleButton);
    };
    /*    private loadretryButton(clazz:any,url:string) :void {
            const retryButton : eui.Button = new eui.Button();
            retryButton.skinName =clazz;
            this.addChild(retryButton);
            retryButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneTransition, this);
        }
    */
    GameOver.prototype.retry = function () {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.STAGE1;
        var createGameStage = new CreateGameStage();
        this.stage.addChild(createGameStage);
        this.parameterReset();
    };
    GameOver.prototype.title = function () {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.TITLE;
        var createGameStage = new CreateGameStage();
        this.stage.addChild(createGameStage);
        this.parameterReset();
    };
    GameOver.prototype.score = function () {
        this.scoreText = new egret.TextField();
        this.scoreText.textFlow = [
            { text: "スコア" + GeneratePlate.score.toString(),
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];
        this.stage.addChild(this.scoreText);
        this.scoreText.anchorOffsetX = this.scoreText.width / 2;
        this.scoreText.anchorOffsetY = this.scoreText.height / 2;
        this.scoreText.x = this.stage.stageWidth / 2;
        this.scoreText.y = this.stage.stageHeight / 2;
        this.scoreText.scaleX = 1;
        this.scoreText.scaleY = 1;
    };
    /**
     * スコアやタイム、ガラス破壊枚数やコンボ数等の初期化
     */
    GameOver.prototype.parameterReset = function () {
        GeneratePlate.score = 0;
        TimeDisplay.leftTime = 60;
        GeneratePlate.glassBreakNumber = 0;
        GeneratePlate.breakComboNumber = 0;
        GeneratePlate.breakComboBonus = 1;
        CreateGameStage.glassGenerateSpeed = 1000;
    };
    return GameOver;
}(eui.UILayer));
__reflect(GameOver.prototype, "GameOver");
var GameOver2 = (function (_super) {
    __extends(GameOver2, _super);
    function GameOver2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
 * GameOver画面の生成
 */
    GameOver2.prototype.GameOverDisplay = function () {
        var background = this.createBitmapByName("wood_background_png");
        var stageW = Main.stageWidth;
        var stageH = Main.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.addChild(background);
        //euiグループ
        this.euiGroup = new eui.Group();
        this.euiGroup.width = Main.stageWidth;
        this.euiGroup.height = Main.stageHeight;
        this.addChild(this.euiGroup);
        //スコアの表示
        this.score();
        //Retryボタン Titleボタン
        var retryButton = new eui.Button();
        retryButton.skinName = "resource/eui_skins/GreenRetryButton.exml";
        retryButton.once(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this.euiGroup.addChild(retryButton);
        var titleButton = new eui.Button();
        titleButton.skinName = "resource/eui_skins/GreenTitleButton.exml";
        titleButton.once(egret.TouchEvent.TOUCH_TAP, this.title, this);
        this.euiGroup.addChild(titleButton);
    };
    GameOver2.prototype.retry = function () {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.STAGE1;
        var createGameStage = new CreateGameStage();
        this.addChild(createGameStage);
        this.parameterReset();
    };
    GameOver2.prototype.title = function () {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.TITLE;
        var createGameStage = new CreateGameStage();
        this.addChild(createGameStage);
        this.parameterReset();
    };
    GameOver2.prototype.score = function () {
        this.scoreText = new MyText("スコア" + GeneratePlate.score.toString());
        /*        this.scoreText.textFlow = <Array<egret.ITextElement>>[
                    {text: "スコア" + GeneratePlate.score.toString(),
                        style: {
                            "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                        }
                    }
                ];*/
        this.addChild(this.scoreText);
        this.scoreText.anchorOffsetX = this.scoreText.width / 2;
        this.scoreText.anchorOffsetY = this.scoreText.height / 2;
        this.scoreText.x = Main.stageWidth / 2;
        this.scoreText.y = Main.stageHeight / 2;
        this.scoreText.scaleX = 1.5;
        this.scoreText.scaleY = 1.5;
    };
    /**
     * スコアやタイム、ガラス破壊枚数やコンボ数等の初期化
     */
    GameOver2.prototype.parameterReset = function () {
        GeneratePlate.score = 0;
        TimeDisplay.leftTime = 60;
        GeneratePlate.glassBreakNumber = 0;
        GeneratePlate.breakComboNumber = 0;
        GeneratePlate.breakComboBonus = 1;
        CreateGameStage.glassGenerateSpeed = 1000;
    };
    return GameOver2;
}(GameObject));
__reflect(GameOver2.prototype, "GameOver2");
//# sourceMappingURL=GameOver.js.map