/**
 * @packageDocumentation
 * @module xr
 */

// import { ccclass, help, menu, type} from '../core/data/decorators';
import { ccclass, help, menu, type, visible, displayOrder, serializable} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { Node } from '../core/scene-graph/node';


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

 enum TrackingOriginMode_Type {
    Unbond = 0,
    Device = 1, 
    Floor = 2
}

ccenum(TrackingOriginMode_Type);
 
@ccclass('cc.TrackingOrigin')
@help('i18n:cc.TrackingOrigin')
@menu('xr/TrackingOrigin')
export class TrackingOrigin extends Component {
    @serializable
    protected _cameraHmdObject: Node | null = null; 
    @serializable
    protected _trackingOriginMode : TrackingOriginMode_Type = TrackingOriginMode_Type.Unbond;
    @serializable
    protected _cameraYOffset = 1.36144;

    @type(Node)
    @displayOrder(1)
    set cameraHmdObject(val) {
        if (val) {
            val.position.set(val.position.x, this._cameraYOffset, val.position.z);
        }
        if (val === this._cameraHmdObject) {
            return;
        }
        this._cameraHmdObject = val;
    }
    get cameraHmdObject() {
        return this._cameraHmdObject;
    }

    @type(TrackingOriginMode_Type)
    @displayOrder(2)
    set trackingOriginMode (val) {
        if (val === this._trackingOriginMode) {
            return;
        }
        this._trackingOriginMode = val;
    }
    get trackingOriginMode () {
        return this._trackingOriginMode;
    }

    @displayOrder(3)
    set cameraYOffset (val) {
        if (this._cameraHmdObject) {
            this._cameraHmdObject.position.set(this._cameraHmdObject.position.x, this._cameraYOffset, this._cameraHmdObject.position.z);
        }
        if (val === this._cameraYOffset) {
            return;
        }
        this._cameraYOffset = val;
    }
    get cameraYOffset () {
        return this._cameraYOffset;
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
