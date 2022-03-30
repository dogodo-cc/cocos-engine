/*
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @packageDocumentation
 * @hidden
 */

import { EDITOR, NATIVE } from 'internal:constants';
import { sys } from '../core/platform/sys';
import { EventTarget } from '../core/event/event-target';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { ccenum } from '../core/value-types/enum';

interface InputEventMap {
    [XrControlEventType.SELECT_ACTION]: (event: XrEventHandle) => void,
    [XrControlEventType.SELECT_END_ACTION]: (event: XrEventHandle) => void,
    [XrControlEventType.DETECH_ACTION]: (event: XrEventHandle) => void,
    [XrControlEventType.DETECH_END_ACTION]: (event: XrEventHandle) => void,
    [XrControlEventType.ACTIVATE_ACTION]: (event: XrEventHandle) => void,
    [XrControlEventType.ACTIVATE_END_ACTION]: (event: XrEventHandle) => void,
    [XrControlEventType.UIPRESS_ACTION]: (event: XrEventHandle) => void,
    [XrControlEventType.UIPRESS_END_ACTION]: (event: XrEventHandle) => void,
}

export enum XrEventType {
    BUTTON_A = 0,
    BUTTON_B = 1,
    BUTTON_X = 2,
    BUTTON_Y = 3,
    TRIGGER_LEFT = 6,
    TRIGGER_RIGHT = 7,
    GRIP_LEFT = 8,
    GRIP_RIGHT = 9
};

export enum XrEventLeft {
    BUTTON_X_DOWN = 0,
    BUTTON_X_UP = 1,
    BUTTON_Y_DOWN = 2,
    BUTTON_Y_UP = 3,
};

export enum XrEventRight {
    BUTTON_A_DOWN = 0,
    BUTTON_A_UP = 1,
    BUTTON_B_DOWN = 2,
    BUTTON_B_UP = 3,
};

ccenum(XrEventLeft);
ccenum(XrEventRight);

export enum XrInputDeviceType {
    ControllerLeft,
    ControllerRight
};

ccenum(XrInputDeviceType);
ccenum(XrEventType);

export class XrEvent {
    /**
     * @en The event type
     * @zh 事件类型
     */
    public static EventType = XrControlEventType;

    /**
     * @en Dispatch input event immediately.
     * The input events are collocted to be dispatched in each main loop by default.
     * If you need to recieve the input event immediately, please set this to true.
     * NOTE: if set this to true, the input events are dispatched between each tick, the input event can't be optimized by engine.
     *
     * @zh 立即派发输入事件。
     * 输入事件默认会被收集到每一帧主循环里派发，如果你需要立即接收到输入事件，请把该属性设为 true。
     * 注意：如果设置为 true，则输入事件可能会在帧间触发，这样的输入事件是没办法被引擎优化的。
     */
    // private _dispatchImmediately = !NATIVE;

    private _eventTarget: EventTarget = new EventTarget();
    // private _leftHitPoint: Vec3 = new Vec3();
    // private _rightHitPoint: Vec3 = new Vec3();

    // private _handleInput = new XrHandleInputSource();

    // private _xrEventHandleList: XrEventHandle[] = [];

    // set leftHitPoint(val) {
    //     if (val === this._leftHitPoint) {
    //         return;
    //     }
    //     this._leftHitPoint = val;
    // }
    // get leftHitPoint() {
    //     return this._leftHitPoint;
    // }

    // set rightHitPoint(val) {
    //     if (val === this._rightHitPoint) {
    //         return;
    //     }
    //     this._rightHitPoint = val;
    // }
    // get rightHitPoint() {
    //     return this._rightHitPoint;
    // }

    // constructor() {
    //     this._registerEvent();
    // }

    // private _registerEvent() {
    //     if (sys.hasFeature(sys.Feature.EVENT_HANDLE)) {
    //         const xrEventHandleList = this._xrEventHandleList;
    //         this._handleInput.on(XrControlEventType.SELECT_ACTION, (event) => { this._dispatchOrPushEvent(event, xrEventHandleList); });
    //         this._handleInput.on(XrControlEventType.DETECH_ACTION, (event) => { this._dispatchOrPushEvent(event, xrEventHandleList); });
    //         this._handleInput.on(XrControlEventType.ACTIVATE_ACTION, (event) => { this._dispatchOrPushEvent(event, xrEventHandleList); });
    //         this._handleInput.on(XrControlEventType.UIPRESS_ACTION, (event) => { this._dispatchOrPushEvent(event, xrEventHandleList); });
    //     }
    // }

    // private _clearEvents() {
    //     this._xrEventHandleList.length = 0;
    // }

    // private _dispatchOrPushEvent(event: XrEventHandle, eventList: XrEventHandle[]) {
    //     if (this._dispatchImmediately) {
    //         this._eventTarget.emit(event.type, event);
    //     } else {
    //         eventList.push(event);
    //     }
    // }

    // private _frameDispatchEvents() {
    //     const xrEventHandleList = this._xrEventHandleList;
    //     // TODO: culling event queue
    //     for (let i = 0, length = xrEventHandleList.length; i < length; ++i) {
    //         const xrEventHandle = xrEventHandleList[i];
    //         this._eventTarget.emit(xrEventHandle.type, xrEventHandle);
    //     }

    //     this._clearEvents();
    // }

    /**
     * @en
     * Register a callback of a specific input event type.
     * @zh
     * 注册特定的输入事件回调。
     *
     * @param eventType - The event type
     * @param callback - The event listener's callback
     * @param target - The event listener's target and callee
     */
    public on<K extends keyof InputEventMap>(eventType: K, callback: InputEventMap[K], target?: any) {
        if (EDITOR) {
            return callback;
        }

        this._eventTarget.on(eventType, callback, target);
        return callback;
    }

    /**
     * @en
     * Register a callback of a specific input event type once.
     * @zh
     * 注册单次的输入事件回调。
     *
     * @param eventType - The event type
     * @param callback - The event listener's callback
     * @param target - The event listener's target and callee
     */
    public once<K extends keyof InputEventMap>(eventType: K, callback: InputEventMap[K], target?: any) {
        if (EDITOR) {
            return callback;
        }
        this._eventTarget.once(eventType, callback, target);
        return callback;
    }

    /**
     * @en
     * Unregister a callback of a specific input event type.
     * @zh
     * 取消注册特定的输入事件回调。
     *
     * @param eventType - The event type
     * @param callback - The event listener's callback
     * @param target - The event listener's target and callee
     */
    public off<K extends keyof InputEventMap>(eventType: K, callback?: InputEventMap[K], target?: any) {
        if (EDITOR) {
            return;
        }
        this._eventTarget.off(eventType, callback, target);
    }

    public selectAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.SELECT_ACTION, event);
    }

    public activateAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.ACTIVATE_ACTION, event);
    }

    public detechAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.DETECH_ACTION, event);
    }

    public uipressAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.UIPRESS_ACTION, event);
    }

    public selectEndAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.SELECT_END_ACTION, event);
    }

    public activateEndAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.ACTIVATE_END_ACTION, event);
    }

    public detechEndAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.DETECH_END_ACTION, event);
    }

    public uipressEndAction(event: XrEventHandle) {
        this._eventTarget.emit(XrControlEventType.UIPRESS_END_ACTION, event);
    }
}

/**
 * @en
 * The singleton of the xr event class.
 *
 * @zh
 * xr动作事件单例
 *
 * @example
 * ```
 * xrEvent.on(XrControlEventType.SELECT_ACTION, this.onDeviceMotionEvent, this);
 * xrEvent.off(XrControlEventType.SELECT_ACTION, this.onDeviceMotionEvent, this);
 * ```
 */
export const xrEvent = new XrEvent();
