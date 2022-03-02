/**
 * @packageDocumentation
 * @module xr
 */

import { ccclass, help, menu, type, visible, displayOrder, serializable} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { Vec2 } from '../core/math';

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Fri Feb 11 2022 10:29:16 GMT+0800 (中国标准时间)
 * Author = linyuanyi
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/resources/prefab/ui/home/HMDCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

export enum StereoRendering_Type {
    SINGLE_PASS = 0,
    MUTLI_PASS = 1,
    OFF = 2
}

export enum FoveationRendering_Type {
    None = 0,
    Low = 1, 
    Med = 2, 
    High = 3, 
    Ext = 4
}

export enum IPDOffset_Type {
    Auto = 0,
    Device = 1, 
    Manual = 2
}

export enum AspectRatio_Type {
    Auto = 0,
    Manual = 1
}

export enum TrackingOriginMode_Type {
    Unbond = 0,
    Device = 1, 
    Floor = 2
}

ccenum(StereoRendering_Type);
ccenum(FoveationRendering_Type);
ccenum(IPDOffset_Type);
ccenum(AspectRatio_Type);
ccenum(TrackingOriginMode_Type);
 
@ccclass('cc.HMDCtrl')
@help('i18n:cc.HMDCtrl')
@menu('xr/HMDCtrl')
export class HMDCtrl extends Component {
    @serializable
    protected _stereoRendering : StereoRendering_Type = StereoRendering_Type.SINGLE_PASS;
    @serializable
    protected _foveationRendering : FoveationRendering_Type = FoveationRendering_Type.None;
    @serializable
    protected _IPDOffset : IPDOffset_Type = IPDOffset_Type.Auto;
    @serializable
    protected _offsetValue : Number = 0.064;
    @serializable
    protected _apectRatio : AspectRatio_Type = AspectRatio_Type.Auto;
    @serializable
    protected _ratio : Vec2 = new Vec2(1, 1);
    @serializable
    protected _trackingOriginMode : TrackingOriginMode_Type = TrackingOriginMode_Type.Unbond;
    @serializable
    protected _cameraYOffset : Number = 1.36144;

    @type(StereoRendering_Type)
    @displayOrder(1)
    set stereoRendering (val) {
        if (val === this._stereoRendering) {
            return;
        }
        this._stereoRendering = val;
    }
    get stereoRendering () {
        return this._stereoRendering;
    }

    @type(FoveationRendering_Type)
    @displayOrder(2)
    set foveationRendering (val) {
        if (val === this._foveationRendering) {
            return;
        }
        this._foveationRendering = val;
    }
    get foveationRendering () {
        return this._foveationRendering;
    }

    @type(IPDOffset_Type)
    @displayOrder(3)
    set IPDOffset (val) {
        if (val === this._IPDOffset) {
            return;
        }
        this._IPDOffset = val;
    }
    get IPDOffset () {
        return this._IPDOffset;
    }

    @type(Number)
    @visible(function (this: HMDCtrl) {
        return this._IPDOffset === IPDOffset_Type.Manual;
    })
    @displayOrder(4)
    set offsetValue (val) {
        if (val === this._offsetValue) {
            return;
        }
        this._offsetValue = val;
    }
    get offsetValue () {
        return this._offsetValue;
    }

    @type(AspectRatio_Type)
    @displayOrder(5)
    set apectRatio (val) {
        if (val === this._apectRatio) {
            return;
        }
        this._apectRatio = val;
    }
    get apectRatio () {
        return this._apectRatio;
    }

    @type(Vec2)
    @visible(function (this: HMDCtrl) {
        return this._apectRatio === AspectRatio_Type.Manual;
    })
    @displayOrder(6)
    set ratio (val) {
        if (val === this._ratio) {
            return;
        }
        this._ratio = val;
    }
    get ratio () {
        return this._ratio;
    }

    @type(TrackingOriginMode_Type)
    @displayOrder(7)
    set trackingOriginMode (val) {
        if (val === this._trackingOriginMode) {
            return;
        }
        this._trackingOriginMode = val;
    }
    get trackingOriginMode () {
        return this._trackingOriginMode;
    }

    @type(Number)
    @visible(function (this: HMDCtrl) {
        return this._trackingOriginMode !== TrackingOriginMode_Type.Floor;
    })
    @displayOrder(8)
    set cameraYOffset (val) {
        if (val === this._cameraYOffset) {
            return;
        }
        this._cameraYOffset = val;
    }
    get cameraYOffset () {
        return this._cameraYOffset;
    }

    public start () {

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
