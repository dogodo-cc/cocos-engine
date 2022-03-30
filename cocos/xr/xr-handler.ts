/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

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
 * @module ui
 */

import { ccclass, help, menu, tooltip, displayOrder, type, rangeMin, rangeMax, serializable, executeInEditMode, editable } from 'cc.decorator';
import { Component, EventHandler as ComponentEventHandler } from '../core/components';
import { EventHandle } from '../input/types';
import { input, Input } from '../input/input';
import { ccenum, Enum } from '../core/value-types/enum';

const XrEventType = Enum({
    BUTTON_A_DOWN: 0,
    BUTTON_A_UP: 1,
    BUTTON_B_DOWN: 2,
    BUTTON_B_UP: 3,
    BUTTON_X_DOWN: 4,
    BUTTON_X_UP: 5,
    BUTTON_Y_DOWN: 6,
    BUTTON_Y_UP: 7,
    THUMB_STICK_MOVE_LEFT: 8,
    THUMB_STICK_MOVE_END_LEFT: 9,
    THUMB_STICK_MOVE_RIGHT: 10,
    THUMB_STICK_MOVE_END_RIGHT: 11,
    TRIGGER_UP_LEFT: 12,
    TRIGGER_DOWN_LEFT: 13,
    TRIGGER_UP_RIGHT: 14,
    TRIGGER_DOWN_RIGHT: 15,
    GRIP_START_LEFT: 16,
    GRIP_END_LEFT: 17,
    GRIP_START_RIGHT: 18,
    GRIP_END_RIGHT: 19,
    HAND_POSE_ACTIVE_LEFT: 20,
    HAND_POSE_ACTIVE_RIGHT: 21
});

@ccclass('cc.EventHandlerType')
export class EventHandlerType {
    /**
     * @zh 事件类型[[Type]]。
     */
    @type(XrEventType)
    @serializable
    @displayOrder(1)
    public type = XrEventType.BUTTON_A_DOWN;

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

@ccclass('cc.XRHandler')
@help('i18n:cc.XRHandler')
@menu('xr/XRHandler')
@executeInEditMode
export class XRHandler extends Component {
    @type([EventHandlerType])
    @serializable
    @displayOrder(1)
    public events: EventHandlerType[] = [];

    protected buttonADown: ComponentEventHandler[] = [];
    protected buttonAUp: ComponentEventHandler[] = [];
    protected buttonBDown: ComponentEventHandler[] = [];
    protected buttonBUp: ComponentEventHandler[] = [];
    protected buttonXDown: ComponentEventHandler[] = [];
    protected buttonXUp: ComponentEventHandler[] = [];
    protected buttonYDown: ComponentEventHandler[] = [];
    protected buttonYUp: ComponentEventHandler[] = [];
    protected thumbStickMoveLeft: ComponentEventHandler[] = [];
    protected thumbStickMoveEndLeft: ComponentEventHandler[] = [];
    protected thumbStickMoveRight: ComponentEventHandler[] = [];
    protected thumbStickMoveEndRight: ComponentEventHandler[] = [];
    protected triggerDownLeft: ComponentEventHandler[] = [];
    protected triggerUpLeft: ComponentEventHandler[] = [];
    protected triggerDownRight: ComponentEventHandler[] = [];
    protected triggerUpRight: ComponentEventHandler[] = [];
    protected gripStartLeft: ComponentEventHandler[] = [];
    protected gripEndLeft: ComponentEventHandler[] = [];
    protected gripStartRight: ComponentEventHandler[] = [];
    protected gripEndRight: ComponentEventHandler[] = [];
    protected handPoseActiveLeft: ComponentEventHandler[] = [];
    protected handPoseActiveRight: ComponentEventHandler[] = [];


    public __preload() {

    }

    public onEnable() {
        this._registerNodeEvent();
    }

    public onDisable() {
        this._unregisterNodeEvent();
    }

    public onDestroy() {

    }

    protected _registerNodeEvent() {
        for (let i = 0; i < this.events.length; ++i) {
            switch (this.events[i].type) {
                case XrEventType.BUTTON_A_DOWN:
                    this.buttonADown = this.events[i].events;
                    input.on(Input.EventType.BUTTON_A_DOWN, this._onButtonADown, this);
                    break;
                case XrEventType.BUTTON_A_UP:
                    this.buttonAUp = this.events[i].events;
                    input.on(Input.EventType.BUTTON_A_UP, this._onButtonAUp, this);
                    break;
                case XrEventType.BUTTON_B_DOWN:
                    this.buttonBDown = this.events[i].events;
                    input.on(Input.EventType.BUTTON_B_DOWN, this._onButtonBDown, this);
                    break;
                case XrEventType.BUTTON_B_UP:
                    this.buttonBUp = this.events[i].events;
                    input.on(Input.EventType.BUTTON_B_UP, this._onButtonBUp, this);
                    break;
                case XrEventType.BUTTON_X_DOWN:
                    this.buttonXDown = this.events[i].events;
                    input.on(Input.EventType.BUTTON_X_DOWN, this._onButtonXDown, this);
                    break;
                case XrEventType.BUTTON_X_UP:
                    this.buttonXUp = this.events[i].events;
                    input.on(Input.EventType.BUTTON_X_UP, this._onButtonXUp, this);
                    break;
                case XrEventType.BUTTON_Y_DOWN:
                    this.buttonYDown = this.events[i].events;
                    input.on(Input.EventType.BUTTON_Y_DOWN, this._onButtonYDown, this);
                    break;
                case XrEventType.BUTTON_Y_UP:
                    this.buttonYUp = this.events[i].events;
                    input.on(Input.EventType.BUTTON_Y_UP, this._onButtonYUp, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_LEFT:
                    this.thumbStickMoveLeft = this.events[i].events;
                    input.on(Input.EventType.THUMBSTICK_MOVE_LEFT, this._onThumbStickMoveLeft, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_END_LEFT:
                    this.thumbStickMoveEndLeft = this.events[i].events;
                    input.on(Input.EventType.THUMBSTICK_MOVE_END_LEFT, this._onThumbStickMoveEndLeft, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_RIGHT:
                    this.thumbStickMoveRight = this.events[i].events;
                    input.on(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._onThumbStickMoveRight, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_END_RIGHT:
                    this.thumbStickMoveEndRight = this.events[i].events;
                    input.on(Input.EventType.THUMBSTICK_MOVE_END_RIGHT, this._onThumbStickMoveEndRight, this);
                    break;
                case XrEventType.TRIGGER_DOWN_LEFT:
                    this.triggerDownLeft = this.events[i].events;
                    input.on(Input.EventType.TRIGGER_DOWN_LEFT, this._onTriggerDownLeft, this);
                    break;
                case XrEventType.TRIGGER_UP_LEFT:
                    this.triggerUpLeft = this.events[i].events;
                    input.on(Input.EventType.TRIGGER_UP_LEFT, this._onTriggerUpLeft, this);
                    break;
                case XrEventType.TRIGGER_DOWN_RIGHT:
                    this.triggerDownRight = this.events[i].events;
                    input.on(Input.EventType.TRIGGER_DOWN_RIGHT, this._onTriggerDownRight, this);
                    break;
                case XrEventType.TRIGGER_UP_RIGHT:
                    this.triggerUpRight = this.events[i].events;
                    input.on(Input.EventType.TRIGGER_UP_RIGHT, this._onTriggerUpRight, this);
                    break;
                case XrEventType.GRIP_START_LEFT:
                    this.gripStartLeft = this.events[i].events;
                    input.on(Input.EventType.GRIP_START_LEFT, this._onGripStartLeft, this);
                    break;
                case XrEventType.GRIP_END_LEFT:
                    this.gripEndLeft = this.events[i].events;
                    input.on(Input.EventType.GRIP_END_LEFT, this._onGripEndLeft, this);
                    break;
                case XrEventType.GRIP_START_RIGHT:
                    this.gripStartRight = this.events[i].events;
                    input.on(Input.EventType.GRIP_START_RIGHT, this._onGripStartRight, this);
                    break;
                case XrEventType.GRIP_END_RIGHT:
                    this.gripEndRight = this.events[i].events;
                    input.on(Input.EventType.GRIP_END_RIGHT, this._onGripEndRight, this);
                    break;
                case XrEventType.HAND_POSE_ACTIVE_LEFT:
                    this.handPoseActiveLeft = this.events[i].events;
                    input.on(Input.EventType.HAND_POSE_ACTIVE_LEFT, this._onHandPoseActiveLeft, this);
                    break;
                case XrEventType.HAND_POSE_ACTIVE_RIGHT:
                    this.handPoseActiveRight = this.events[i].events;
                    input.on(Input.EventType.HAND_POSE_ACTIVE_RIGHT, this._onHandPoseActiveRight, this);
                    break;
                default:
                    break;
            }
        }
    }

    protected _registerTargetEvent(target) {

    }

    protected _unregisterNodeEvent() {
        for (let i = 0; i < this.events.length; ++i) {
            switch (this.events[i].type) {
                case XrEventType.BUTTON_A_DOWN:
                    input.off(Input.EventType.BUTTON_A_DOWN, this._onButtonADown, this);
                    break;
                case XrEventType.BUTTON_A_UP:
                    input.off(Input.EventType.BUTTON_A_UP, this._onButtonAUp, this);
                    break;
                case XrEventType.BUTTON_B_DOWN:
                    input.off(Input.EventType.BUTTON_B_DOWN, this._onButtonBDown, this);
                    break;
                case XrEventType.BUTTON_B_UP:
                    input.off(Input.EventType.BUTTON_B_UP, this._onButtonBUp, this);
                    break;
                case XrEventType.BUTTON_X_DOWN:
                    input.off(Input.EventType.BUTTON_X_DOWN, this._onButtonXDown, this);
                    break;
                case XrEventType.BUTTON_X_UP:
                    input.off(Input.EventType.BUTTON_X_UP, this._onButtonXUp, this);
                    break;
                case XrEventType.BUTTON_Y_DOWN:
                    input.off(Input.EventType.BUTTON_Y_DOWN, this._onButtonYDown, this);
                    break;
                case XrEventType.BUTTON_Y_UP:
                    input.off(Input.EventType.BUTTON_Y_UP, this._onButtonYUp, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_LEFT:
                    input.off(Input.EventType.THUMBSTICK_MOVE_LEFT, this._onThumbStickMoveLeft, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_END_LEFT:
                    input.off(Input.EventType.THUMBSTICK_MOVE_END_LEFT, this._onThumbStickMoveEndLeft, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_RIGHT:
                    input.off(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._onThumbStickMoveRight, this);
                    break;
                case XrEventType.THUMB_STICK_MOVE_END_RIGHT:
                    input.off(Input.EventType.THUMBSTICK_MOVE_END_RIGHT, this._onThumbStickMoveEndRight, this);
                    break;
                case XrEventType.TRIGGER_DOWN_LEFT:
                    input.off(Input.EventType.TRIGGER_DOWN_LEFT, this._onTriggerDownLeft, this);
                    break;
                case XrEventType.TRIGGER_UP_LEFT:
                    input.off(Input.EventType.TRIGGER_UP_LEFT, this._onTriggerUpLeft, this);
                    break;
                case XrEventType.TRIGGER_DOWN_RIGHT:
                    input.off(Input.EventType.TRIGGER_DOWN_RIGHT, this._onTriggerDownRight, this);
                    break;
                case XrEventType.TRIGGER_UP_RIGHT:
                    input.off(Input.EventType.TRIGGER_UP_RIGHT, this._onTriggerUpRight, this);
                    break;
                case XrEventType.GRIP_START_LEFT:
                    input.off(Input.EventType.GRIP_START_LEFT, this._onGripStartLeft, this);
                    break;
                case XrEventType.GRIP_END_LEFT:
                    input.off(Input.EventType.GRIP_END_LEFT, this._onGripEndLeft, this);
                    break;
                case XrEventType.GRIP_START_RIGHT:
                    input.off(Input.EventType.GRIP_START_RIGHT, this._onGripStartRight, this);
                    break;
                case XrEventType.GRIP_END_RIGHT:
                    input.off(Input.EventType.GRIP_END_RIGHT, this._onGripEndRight, this);
                    break;
                case XrEventType.HAND_POSE_ACTIVE_LEFT:
                    input.off(Input.EventType.HAND_POSE_ACTIVE_LEFT, this._onHandPoseActiveLeft, this);
                    break;
                case XrEventType.HAND_POSE_ACTIVE_RIGHT:
                    input.off(Input.EventType.HAND_POSE_ACTIVE_RIGHT, this._onHandPoseActiveRight, this);
                    break;
                default:
                    break;
            }
        }
    }

    protected _unregisterTargetEvent(target) {

    }

    protected _onButtonADown(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonADown, event);
        this.node.emit(Input.EventType.BUTTON_A_DOWN, this);
    }

    protected _onButtonAUp(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonAUp, event);
        this.node.emit(Input.EventType.BUTTON_A_UP, this);
    }

    protected _onButtonBDown(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonBDown, event);
        this.node.emit(Input.EventType.BUTTON_B_DOWN, this);
    }

    protected _onButtonBUp(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonBUp, event);
        this.node.emit(Input.EventType.BUTTON_B_UP, this);
    }

    protected _onButtonXDown(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonXDown, event);
        this.node.emit(Input.EventType.BUTTON_X_DOWN, this);
    }

    protected _onButtonXUp(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonXUp, event);
        this.node.emit(Input.EventType.BUTTON_X_UP, this);
    }

    protected _onButtonYDown(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonYDown, event);
        this.node.emit(Input.EventType.BUTTON_Y_DOWN, this);
    }

    protected _onButtonYUp(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.buttonYUp, event);
        this.node.emit(Input.EventType.BUTTON_Y_UP, this);
    }

    protected _onThumbStickMoveLeft(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.thumbStickMoveLeft, event);
        this.node.emit(Input.EventType.THUMBSTICK_MOVE_LEFT, this);
    }

    protected _onThumbStickMoveEndLeft(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.thumbStickMoveEndLeft, event);
        this.node.emit(Input.EventType.THUMBSTICK_MOVE_END_LEFT, this);
    }

    protected _onThumbStickMoveRight(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.thumbStickMoveRight, event);
        this.node.emit(Input.EventType.THUMBSTICK_DOWN_RIGHT, this);
    }

    protected _onThumbStickMoveEndRight(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.thumbStickMoveEndRight, event);
        this.node.emit(Input.EventType.THUMBSTICK_MOVE_END_RIGHT, this);
    }

    protected _onTriggerDownLeft(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.triggerDownLeft, event);
        this.node.emit(Input.EventType.TRIGGER_DOWN_LEFT, this);
    }

    protected _onTriggerUpLeft(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.triggerUpLeft, event);
        this.node.emit(Input.EventType.TRIGGER_UP_LEFT, this);
    }

    protected _onTriggerDownRight(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.triggerDownRight, event);
        this.node.emit(Input.EventType.TRIGGER_DOWN_RIGHT, this);
    }

    protected _onTriggerUpRight(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.triggerUpRight, event);
        this.node.emit(Input.EventType.TRIGGER_UP_RIGHT, this);
    }

    protected _onGripStartLeft(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.gripStartLeft, event);
        this.node.emit(Input.EventType.GRIP_START_LEFT, this);
    }

    protected _onGripEndLeft(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.gripEndLeft, event);
        this.node.emit(Input.EventType.GRIP_END_LEFT, this);
    }

    protected _onGripStartRight(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.gripStartRight, event);
        this.node.emit(Input.EventType.GRIP_START_RIGHT, this);
    }

    protected _onGripEndRight(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.gripEndRight, event);
        this.node.emit(Input.EventType.GRIP_END_RIGHT, this);
    }

    protected _onHandPoseActiveLeft(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.handPoseActiveLeft, event);
        this.node.emit(Input.EventType.HAND_POSE_ACTIVE_LEFT, this);
    }

    protected _onHandPoseActiveRight(event?: EventHandle) {
        ComponentEventHandler.emitEvents(this.handPoseActiveRight, event);
        this.node.emit(Input.EventType.HAND_POSE_ACTIVE_RIGHT, this);
    }
}
