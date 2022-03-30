/**
 * @packageDocumentation
 * @module xr
 */

// import { ccclass, help, menu, type} from '../core/data/decorators';
import { ccclass, help, menu, type, visible, displayOrder, serializable} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { Vec2 } from '../core/math';
import { Input, input } from '../input';
import { EventHandle } from '../input/types';
import { Mat4, Quat, Vec3 } from '../core/math';


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

enum TrackingSource_Type {
    VIEW_POSE_ACTIVE_LEFT = 0,
    VIEW_POSE_ACTIVE_RIGHT = 1,
    VIEW_POSE_ACTIVE_HMD = 2,
    HAND_POSE_ACTIVE_LEFT = 3,
    HAND_POSE_ACTIVE_RIGHT = 4,
}

enum TrackingType_Type {
    UP_TO_3DOF = 0,
    UP_TO_6DOF = 1,
}

enum UpdateType_Type {
    UPDATE_AND_BEFORE_RENDER = 0,
    UPDATE_ONLY = 1,
    BEFORE_RENDER_ONLY = 2
}

ccenum(TrackingSource_Type);
ccenum(TrackingType_Type);
ccenum(UpdateType_Type);
 
@ccclass('cc.PoseTracker')
@help('i18n:cc.PoseTracker')
@menu('xr/PoseTracker')
export class PoseTracker extends Component {
    @serializable
    protected _trackingSource : TrackingSource_Type = TrackingSource_Type.HAND_POSE_ACTIVE_LEFT;
    @serializable
    protected _trackingType : TrackingType_Type = TrackingType_Type.UP_TO_6DOF;
    @serializable
    protected _updateType : UpdateType_Type = UpdateType_Type.UPDATE_AND_BEFORE_RENDER;

    @type(TrackingSource_Type)
    @displayOrder(1)
    set trackingSource (val) {
        if (val === this._trackingSource) {
            return;
        }
        this._trackingSource = val;
    }
    get trackingSource () {
        return this._trackingSource;
    }

    @type(TrackingType_Type)
    @displayOrder(2)
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
    @displayOrder(3)
    set updateType (val) {
        if (val === this._updateType) {
            return;
        }
        this._updateType = val;
    }
    get updateType () {
        return this._updateType;
    }

    private _matOrigin: Mat4 = new Mat4();
    private _matPose: Mat4 = new Mat4();
    private _mat: Mat4 = new Mat4();
    private _quatPose: Quat = new Quat();
    private _quat: Quat = new Quat();
    private _positionPose: Vec3 = new Vec3();
    private _position: Vec3 = new Vec3();
    private _scale: Vec3 = new Vec3();

    onEnable () {
        if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_LEFT) {
            input.on(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_RIGHT) {
            input.on(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_HMD) {
            input.on(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
            input.on(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_LEFT) {
            input.on(Input.EventType.HAND_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_RIGHT) {
            input.on(Input.EventType.HAND_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        }
    }

    onDisable() {
        if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_LEFT) {
            input.off(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_RIGHT) {
            input.off(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_HMD) {
            input.off(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
            input.off(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_LEFT) {
            input.off(Input.EventType.HAND_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_RIGHT) {
            input.off(Input.EventType.HAND_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        }
    }

    private _dispatchEventPose(eventHandle: EventHandle) {
        this._quatPose.set(eventHandle.quaternionX, eventHandle.quaternionY, eventHandle.quaternionZ, eventHandle.quaternionW);
        this._positionPose.set(eventHandle.x, eventHandle.y, eventHandle.z);

        Mat4.invert(this._matPose, this._matPose);
        Mat4.multiply(this._matOrigin, this.node.worldMatrix, this._matPose);
        Mat4.fromRT(this._matPose, this._quatPose, this._positionPose);
        Mat4.multiply(this._mat, this._matOrigin, this._matPose);
        Mat4.toRTS(this._mat, this._quat, this._position, this._scale);
        this.node.setWorldScale(this._scale);
        this.node.setWorldRotation(this._quat);
        this.node.setWorldPosition(this._position);
        this.node.updateWorldTransform();
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
