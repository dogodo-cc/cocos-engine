import { ccclass, help, menu, displayOrder, type, serializable, tooltip} from 'cc.decorator';
import { BoxColliderComponent, CapsuleColliderComponent, CylinderColliderComponent, MeshColliderComponent } from '../physics/framework/deprecated';
import { Component, EventHandler as ComponentEventHandler } from '../core/components';
import { xrEvent } from './xr-event';
import { XrControlEventType, XrEventHandle, XrRayEventType } from './xr-event-handle';
import { Vec3 } from '../core/math/vec3';
import { Enum } from '../core/value-types/enum';

const XrControlType = Enum({
    SELECT_ACTION: 0,
    SELECT_END_ACTION: 1,
    DETECH_ACTION: 2,
    DETECH_END_ACTION: 3,
    ACTIVATE_ACTION: 4,
    ACTIVATE_END_ACTION: 5,
    UIPRESS_ACTION: 6,
    UIPRESS_END_ACTION: 7,
    RAY_HIT_ACTION: 8,
    RAY_END_HIT_ACTION: 9,
});

@ccclass('cc.EventType')
export class EventType {
    /**
     * @zh 事件类型[[Type]]。
     */
    @type(XrControlType)
    @serializable
    @displayOrder(1)
    public type = XrControlType.SELECT_ACTION;

    /**
     * @en
     * If Button is clicked, it will trigger event's handler.
     *
     * @zh
     * 按钮的点击事件列表。
     */
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(2)
    @tooltip('i18n:button.event')
    public events: ComponentEventHandler[] = [];
}

@ccclass('cc.XRObjInteractor')
@help('i18n:cc.XRObjInteractor')
@menu('xr/XRObjInteractor')
export class XRObjInteractor extends Component {
    @type([EventType])
    @serializable
    @displayOrder(1)
    public events: EventType[] = [];

    private _selectAction: ComponentEventHandler[] = [];
    private _selectEndAction: ComponentEventHandler[] = [];
    private _detechAction: ComponentEventHandler[] = [];
    private _detechEndAction: ComponentEventHandler[] = [];
    private _activateAction: ComponentEventHandler[] = [];
    private _activateEndAction: ComponentEventHandler[] = [];
    private _uIPressAction: ComponentEventHandler[] = [];
    private _uIPressEndAction: ComponentEventHandler[] = [];
    private _colliderCom: any = null;
    private _hit = false;

    onLoad () {
        this._colliderCom = this.node.getComponent(BoxColliderComponent) || this.node.getComponent(CylinderColliderComponent) || this.node.getComponent(CapsuleColliderComponent) || this.node.getComponent(MeshColliderComponent);
        
        if (!this._colliderCom) {
            console.error("this node does not have");
        } else {
            console.log("xr0207 _colliderCom" + this._colliderCom.type);
        }
    }

    public onEnable() {
        if (!this._colliderCom) {
            return;
        }
        for (let i = 0; i < this.events.length; ++i) {
            switch (this.events[i].type) {
                case XrControlType.SELECT_ACTION:
                    this._selectAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.SELECT_ACTION, this._onSelectAction, this);
                    break;
                case XrControlType.SELECT_END_ACTION:
                    this._selectEndAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.SELECT_END_ACTION, this._onSelectEndAction, this);
                    break;
                case XrControlType.DETECH_ACTION:
                    this._detechAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.DETECH_ACTION, this._onDetechAction, this);
                    break;
                case XrControlType.DETECH_END_ACTION:
                    this._detechEndAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.DETECH_END_ACTION, this._onDetechEndAction, this);
                    break;
                case XrControlType.ACTIVATE_ACTION:
                    this._activateAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.ACTIVATE_ACTION, this._onActivateAction, this);
                    break;
                case XrControlType.ACTIVATE_END_ACTION:
                    this._activateEndAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.ACTIVATE_END_ACTION, this._onActivateEndAction, this);
                    break;
                case XrControlType.UIPRESS_ACTION:
                    this._uIPressAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.UIPRESS_ACTION, this._onUIPressAction, this);
                    break;
                case XrControlType.UIPRESS_END_ACTION:
                    this._uIPressEndAction = this.events[i].events;
                    xrEvent.on(XrControlEventType.UIPRESS_END_ACTION, this._onUIPressEndAction, this);
                    break;
                default:
                    break;
            }
        }

        this._colliderCom.on(XrRayEventType.RAY_HIT, this._onRayHit, this);
        this._colliderCom.on(XrRayEventType.RAY_NOT_HIT, this._onRayNotHit, this);
    }

    public onDisable() {
        if (!this._colliderCom) {
            return;
        }
        for (let i = 0; i < this.events.length; ++i) {
            switch (this.events[i].type) {
                case XrControlType.SELECT_ACTION:
                    this._selectAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.SELECT_ACTION, this._onSelectAction, this);
                    break;
                case XrControlType.SELECT_END_ACTION:
                    this._selectEndAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.SELECT_END_ACTION, this._onSelectEndAction, this);
                    break;
                case XrControlType.DETECH_ACTION:
                    this._detechAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.DETECH_ACTION, this._onDetechAction, this);
                    break;
                case XrControlType.DETECH_END_ACTION:
                    this._detechEndAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.DETECH_END_ACTION, this._onDetechEndAction, this);
                    break;
                case XrControlType.ACTIVATE_ACTION:
                    this._activateAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.ACTIVATE_ACTION, this._onActivateAction, this);
                    break;
                case XrControlType.ACTIVATE_END_ACTION:
                    this._activateEndAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.ACTIVATE_END_ACTION, this._onActivateEndAction, this);
                    break;
                case XrControlType.UIPRESS_ACTION:
                    this._uIPressAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.UIPRESS_ACTION, this._onUIPressAction, this);
                    break;
                case XrControlType.UIPRESS_END_ACTION:
                    this._uIPressEndAction = this.events[i].events;
                    xrEvent.off(XrControlEventType.UIPRESS_END_ACTION, this._onUIPressEndAction, this);
                    break;
                default:
                    break;
            }
        }

        this._colliderCom.off(XrRayEventType.RAY_HIT, this._onRayHit, this);
        this._colliderCom.off(XrRayEventType.RAY_NOT_HIT, this._onRayNotHit, this);
    }

    protected _onSelectAction(event?: XrEventHandle) {
        if (this._hit) {
            ComponentEventHandler.emitEvents(this._selectAction, event);
        }
    }

    protected _onDetechAction(event?: XrEventHandle) {
        if (this._hit) {
            ComponentEventHandler.emitEvents(this._detechAction, event);
  
        }
    }

    protected _onActivateAction(event?: XrEventHandle) {
        if (this._hit) {
            ComponentEventHandler.emitEvents(this._activateAction, event);
        }
    }

    protected _onUIPressAction(event?: XrEventHandle) {
        if (this._hit) {
            ComponentEventHandler.emitEvents(this._uIPressAction, event);
        }
    }

    protected _onSelectEndAction(event?: XrEventHandle) {
        ComponentEventHandler.emitEvents(this._selectEndAction, event);
    }

    protected _onDetechEndAction(event?: XrEventHandle) {
        ComponentEventHandler.emitEvents(this._detechEndAction, event);
    }

    protected _onActivateEndAction(event?: XrEventHandle) {
        ComponentEventHandler.emitEvents(this._activateEndAction, event);
    }

    protected _onUIPressEndAction(event?: XrEventHandle) {
        ComponentEventHandler.emitEvents(this._uIPressEndAction, event);
    }

    private _onRayHit (hitPoint?: Vec3) {
        this._hit = true;
        let size = new Vec3(this.node.scale.x * 1.3, this.node.scale.y * 1.3, this.node.scale.z * 1.3);
        this.node.scale = size;
        // console.log("xr0207 _onRayHit" + event?.hitPoint + " tyep: " + this._colliderCom.type);
    }
 
    private _onRayNotHit (hitPoint?: Vec3) {
        this._hit = false;
        let size = new Vec3(this.node.scale.x / 1.3, this.node.scale.y / 1.3, this.node.scale.z / 1.3);
        this.node.scale = size;
        // console.error("this node does not have");
    }

}