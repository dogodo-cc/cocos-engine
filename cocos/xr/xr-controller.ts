import { ccclass, help, menu, displayOrder, type, serializable, executeInEditMode} from 'cc.decorator';
import { Component } from '../core/components';
import { XrControlEventType, XrEventHandle, XrRayEventType } from './xr-event-handle';
import { xrEvent, XrEventType, XrInputDeviceType } from './xr-event';
import { Node } from '../core/scene-graph/node';
import { Input, input } from '../input';
import { EventHandle } from '../input/types';
import { Vec3 } from '../core/math';
import { Ray } from '../core/geometry/ray';
import { PhysicsSystem } from '../physics/framework/physics-system';
import { Line } from '../particle/line';
import { Collider } from '../physics/framework/components/colliders/collider';

@ccclass('cc.XRController')
@help('i18n:cc.XRController')
@menu('xr/XRController')
@executeInEditMode
export class XRController extends Component {
    @serializable
    protected _inputDevice: XrInputDeviceType = XrInputDeviceType.ControllerLeft;

    @serializable
    protected _selectAction: XrEventType = XrEventType.GRIP_LEFT;

    @serializable
    protected _detechAction: XrEventType = XrEventType.BUTTON_Y;

    @serializable
    protected _activateAction: XrEventType = XrEventType.TRIGGER_LEFT;

    @serializable
    protected _UIPressAction: XrEventType = XrEventType.TRIGGER_LEFT;

    @serializable
    protected _axisToPressThreshold = 0.1; 

    @serializable
    protected _model: Node | null = null; 

    @serializable
    private _line: Line | null = null;

    private _linePositions: any = [];
    private _collider: Collider | null = null;
    private _xrEventHandle: XrEventHandle = new XrEventHandle();

    @type(XrInputDeviceType)
    @displayOrder(1)
    set inputDevice(val) {
        if (val === this._inputDevice) {
            return;
        }
        this._inputDevice = val;
    }
    get inputDevice() {
        return this._inputDevice;
    }

    @type(XrEventType)
    @displayOrder(2)
    set selectAction(val) {
        if (val === this._selectAction) {
            return;
        }
        this._selectAction = val;
    }
    get selectAction() {
        return this._selectAction;
    }

    @type(XrEventType)
    @displayOrder(3)
    set detechAction(val) {
        if (val === this._detechAction) {
            return;
        }
        this._detechAction = val;
    }
    get detechAction() {
        return this._detechAction;
    }


    @type(XrEventType)
    @displayOrder(4)
    set activateAction(val) {
        if (val === this._activateAction) {
            return;
        }
        this._activateAction = val;
    }
    get activateAction() {
        return this._activateAction;
    }

    @type(XrEventType)
    @displayOrder(5)
    set UIPressAction(val) {
        if (val === this._UIPressAction) {
            return;
        }
        this._UIPressAction = val;
    }
    get UIPressAction() {
        return this._UIPressAction;
    }

    @type(Number)
    @displayOrder(6)
    set axisToPressThreshold(val) {
        if (val === this._axisToPressThreshold) {
            return;
        }
        this._axisToPressThreshold = val;
    }
    get axisToPressThreshold() {
        return this._axisToPressThreshold;
    }

    @type(Node)
    @displayOrder(7)
    set model(val) {
        if (val === this._model) {
            return;
        }
        this._model = val;
    }
    get model() {
        return this._model;
    }

    @type(Line)
    @displayOrder(8)
    set line(val) {
        if (val === this._line) {
            return;
        }
        this._line = val;
    }
    get line() {
        return this._line;
    }

    public onEnable() {
        this._linePositions = this.line?.positions;
        this.registerInputEvent(this._getInputEventType(this.selectAction), XrControlEventType.SELECT_ACTION);
        this.registerInputEvent(this._getInputEventType(this.detechAction), XrControlEventType.DETECH_ACTION);
        this.registerInputEvent(this._getInputEventType(this.activateAction), XrControlEventType.ACTIVATE_ACTION);
        this.registerInputEvent(this._getInputEventType(this.UIPressAction), XrControlEventType.UIPRESS_ACTION);
    }

    public onDisable() {
        this.unregisterInputEvent(this._getInputEventType(this.selectAction), XrControlEventType.SELECT_ACTION);
        this.unregisterInputEvent(this._getInputEventType(this.detechAction), XrControlEventType.DETECH_ACTION);
        this.unregisterInputEvent(this._getInputEventType(this.activateAction), XrControlEventType.ACTIVATE_ACTION);
        this.unregisterInputEvent(this._getInputEventType(this.UIPressAction), XrControlEventType.UIPRESS_ACTION);
    }

    protected _getInputEventType(type: XrEventType) {
        var eventType = new Array(2);
        switch (type) {
            case XrEventType.BUTTON_A:
                eventType[0] = Input.EventType.BUTTON_A_DOWN;
                eventType[1] = Input.EventType.BUTTON_A_UP;
                break;
            case XrEventType.BUTTON_B:
                eventType[0] = Input.EventType.BUTTON_B_DOWN;
                eventType[1] = Input.EventType.BUTTON_B_UP;
                break;
            case XrEventType.BUTTON_X:
                eventType[0] = Input.EventType.BUTTON_X_DOWN;
                eventType[1] = Input.EventType.BUTTON_X_UP;
                break;
            case XrEventType.BUTTON_Y:
                eventType[0] = Input.EventType.BUTTON_Y_DOWN;
                eventType[1] = Input.EventType.BUTTON_Y_UP;
                break;
            case XrEventType.TRIGGER_LEFT:
                eventType[0] = Input.EventType.TRIGGER_DOWN_LEFT;
                eventType[1] = Input.EventType.TRIGGER_UP_LEFT;
                break;
            case XrEventType.TRIGGER_RIGHT:
                eventType[0] = Input.EventType.TRIGGER_DOWN_RIGHT;
                eventType[1] = Input.EventType.TRIGGER_UP_RIGHT;
                break;
            case XrEventType.GRIP_LEFT:
                eventType[0] = Input.EventType.GRIP_START_LEFT;
                eventType[1] = Input.EventType.GRIP_END_LEFT;
                break;
            case XrEventType.GRIP_RIGHT:
                eventType[0] = Input.EventType.GRIP_START_RIGHT;
                eventType[1] = Input.EventType.GRIP_END_RIGHT;
                break;
            default:
                break;
        }

        return eventType;
    }

    public registerInputEvent(eventType: Input.EventType[], xrControlEventType: XrControlEventType) {
        if (eventType.length !== 2) {
            return;
        }
        switch (xrControlEventType) {
            case XrControlEventType.SELECT_ACTION:
                input.on(eventType[0], this._select, this);
                input.on(eventType[1], this._selectEnd, this);
                break;
            case XrControlEventType.ACTIVATE_ACTION:
                input.on(eventType[0], this._activate, this);
                input.on(eventType[1], this._activateEnd, this);
                break;
            case XrControlEventType.DETECH_ACTION:
                input.on(eventType[0], this._detech, this);
                input.on(eventType[1], this._detechEnd, this);
                break;
            case XrControlEventType.UIPRESS_ACTION:
                input.on(eventType[0], this._UIPress, this);
                input.on(eventType[1], this._UIPressEnd, this);
                break;
            default:
                break;
        }
    }

    public unregisterInputEvent(eventType: Input.EventType[], xrControlEventType: XrControlEventType) {
        if (eventType.length !== 2) {
            return;
        }
        switch (xrControlEventType) {
            case XrControlEventType.SELECT_ACTION:
                input.off(eventType[0], this._select, this);
                input.off(eventType[1], this._selectEnd, this);
                break;
            case XrControlEventType.ACTIVATE_ACTION:
                input.off(eventType[0], this._activate, this);
                input.off(eventType[1], this._activateEnd, this);
                break;
            case XrControlEventType.DETECH_ACTION:
                input.off(eventType[0], this._detech, this);
                input.off(eventType[1], this._detechEnd, this);
                break;
            case XrControlEventType.UIPRESS_ACTION:
                input.off(eventType[0], this._UIPress, this);
                input.off(eventType[1], this._UIPressEnd, this);
                break;
            default:
                break;
        }
    }

    protected _select(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        console.log("xr0207 _select:" + event.x + " " + event.y + " " + event.z);
        xrEvent.selectAction(this._xrEventHandle);
    }

    protected _detech(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        xrEvent.detechAction(this._xrEventHandle);
    }

    protected _activate(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        xrEvent.activateAction(this._xrEventHandle);
    }

    protected _UIPress(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        xrEvent.uipressAction(this._xrEventHandle);
    }

    protected _selectEnd(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        xrEvent.selectEndAction(this._xrEventHandle);
    }

    protected _detechEnd(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        xrEvent.detechEndAction(this._xrEventHandle);
    }

    protected _activateEnd(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        xrEvent.activateEndAction(this._xrEventHandle);
    }

    protected _UIPressEnd(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        xrEvent.uipressEndAction(this._xrEventHandle);
    }

    // // TODO need move to RayInteractor
    // private dispatchEventHandPose(eventHandle: EventHandle) {
    //     this._xrEventHandle.eventHandle = eventHandle;

    //     let dir = new Vec3();
    //     Vec3.transformQuat(dir, Vec3.UP, this.node.getWorldRotation());
    //     const ray:Ray = new Ray();
    //     const start = this.node.getWorldPosition();       
    //     Ray.set(ray, start.x, start.y, start.z, dir.x, dir.y, dir.z);
    //     let ret = PhysicsSystem.instance.raycastClosest(ray);
    //     if (ret) {
    //         const closestResult = PhysicsSystem.instance.raycastClosestResult;
    //         this._xrEventHandle.hitPoint = closestResult.hitPoint;

    //         if (this._collider !== closestResult.collider) {
    //             if (this._collider) {
    //                 this._collider.emit(XrRayEventType.RAY_NOT_HIT, this._xrEventHandle);
    //             }
    //             this._collider = closestResult.collider;
    //             this._collider.emit(XrRayEventType.RAY_HIT, this._xrEventHandle);
    //         }   

    //         if (this._line) {
    //             var pos: any = [];
    //             pos.push(this.node.getWorldPosition());
    //             pos.push(this._xrEventHandle.hitPoint);
    //             this._line.worldSpace = true;
    //             this._line.positions = pos;
    //         } 
    //     } else {
    //         if (this._collider) {
    //             this._collider.emit(XrRayEventType.RAY_NOT_HIT, this);
    //         }
    //         if (this._line) {
    //             this._line.worldSpace = false;
    //             this._line.positions = this._linePositions;
    //         }
    //     }
    // }

}
