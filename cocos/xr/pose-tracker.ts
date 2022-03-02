/**
 * @packageDocumentation
 * @module xr
 */

// import { ccclass, help, menu, type} from '../core/data/decorators';
import { ccclass, help, menu, type, visible, displayOrder, serializable} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { Vec2 } from '../core/math';


// import * as modules from 'cc';
// import { _decorator, Component, ccenum} from 'cc';

// const { ccclass, property } = _decorator;

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

export enum TrackingType_Type {
    UP_TO_3DOF = 0,
    UP_TO_6DOF = 1,
}

export enum UpdateType_Type {
    UPDATE_AND_BEFORE_RENDER = 0,
    UPDATE_ONLY = 1,
    BEFORE_RENDER_ONLY = 2
}

ccenum(TrackingType_Type);
ccenum(UpdateType_Type);
 
@ccclass('cc.PoseTracker')
@help('i18n:cc.PoseTracker')
@menu('xr/PoseTracker')
export class PoseTracker extends Component {
    @serializable
    protected _trackingType : TrackingType_Type = TrackingType_Type.UP_TO_6DOF;
    @serializable
    protected _updateType : UpdateType_Type = UpdateType_Type.UPDATE_AND_BEFORE_RENDER;


    @type(TrackingType_Type)
    @displayOrder(1)
    set trackingType (val) {
        if (val === this._trackingType) {
            return;
        }
        this._trackingType = val;
    }
    get trackingType () {
        return this._trackingType;
    }

    @type(UpdateType_Type)
    @displayOrder(2)
    set updateType (val) {
        if (val === this._updateType) {
            return;
        }
        this._updateType = val;
    }
    get updateType () {
        return this._updateType;
    }

    start () {
        
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
