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

export enum TargetEye_Type {
    BOTH = 0,
    LEFT = 1,
    RIGHT = 2,
    MAINDISPLAY = 3,
}

ccenum(TargetEye_Type);
 
@ccclass('cc.XrTargetEye')
@help('i18n:cc.XrTargetEye')
@menu('xr/XrTargetEye')
export class XrTargetEye extends Component {
    @serializable
    protected _targetEye : TargetEye_Type = TargetEye_Type.BOTH;

    @type(TargetEye_Type)
    @displayOrder(1)
    set targetEye (val) {
        if (val === this._targetEye) {
            return;
        }
        this._targetEye = val;
    }
    get targetEye () {
        return this._targetEye;
    }

    public onLoad() { 

    }
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
