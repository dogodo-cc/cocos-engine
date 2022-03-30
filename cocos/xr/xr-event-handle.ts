import { Vec3 } from '../core/math';
import { EventTarget } from '../core/event';
import { EventHandle } from '../input/types/event/event-handle';

/**
 * @en The input event type
 * @zh 输入事件类型
 */
 export enum XrControlEventType {
    /**
     * @en
     * The event type for select action
     *
     * @zh
     * xr选择事件。
     */
    SELECT_ACTION = 'select-action',

    /**
     * @en
     * The event type for select action
     *
     * @zh
     * xr选择事件。
     */
    SELECT_END_ACTION = 'select-end-action',

    /**
     * @en
     * The event type for detech action
     *
     * @zh
     * xr分离事件。
     */
    DETECH_ACTION = 'detech-action',
    DETECH_END_ACTION = 'detech-end-action',

    /**
     * @en
     * The event type for activate action
     *
     * @zh
     * xr激活事件。
     */
    ACTIVATE_ACTION = 'activate-action',
    ACTIVATE_END_ACTION = 'activate-end-action',

     /**
     * @en
     * The event type for UI-press action
     *
     * @zh
     * UI点击事件。
     */
    UIPRESS_ACTION = 'UI-press-action',
    UIPRESS_END_ACTION = 'UI-press-end-action',
 }

/**
 * @en
 * The handle event.
 *
 * @zh
 * xr手柄事件。
 */
 export class XrEventHandle {
    /**
     * @en 
     * @zh 碰撞检测点
     */
    public hitPoint: Vec3 = new Vec3;

    public eventHandle: EventHandle | null = null;
}

export enum XrRayEventType {
    RAY_HIT = 0,
    RAY_NOT_HIT = 1,
}

export type XrEventCallback = (res: XrEventHandle) => void;

export class XrHandleInputSource {
    private _eventTarget: EventTarget = new EventTarget();

    public on (eventType: XrControlEventType, callback: XrEventCallback, target?: any) {
        this._eventTarget.on(eventType, callback, target);
    }
}