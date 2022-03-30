/**
 * @packageDocumentation
 * @module xr
 */

// import { ccclass, help, menu, type} from '../core/data/decorators';
import { ccclass, help, menu, type, visible, displayOrder, serializable} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { Node } from '../core/scene-graph/node';
import { Vec3 } from '../core/math';
import { Ray } from '../core/geometry/ray';
import { PhysicsSystem } from '../physics/framework/physics-system';
import { XrRayEventType } from './xr-event-handle';
import { Collider } from '../physics/framework/components/colliders/collider';
import { Line } from '../particle/line';

enum Power_Type {
    ON = 0,
    OFF = 1,
}

enum Line_Type {
    STRAGIHT_LINE = 0,
    PROJECTILE_CURVE = 1,
}

enum Layer_Type {
    EVERYTHING = 0,
    NOTHING = 1,
    IGNORE_RAYCAST = 2,
    GIZMOS = 3,
    EDITOR = 4,
    UI_3D = 5,
    SCENE_GIZMO = 6,
    UI_2D = 7,
    PROFILER = 8,
    DEFAULT = 9
}

enum RaycastTrigger_Type {
    COLLIDE = 0,
    IGNORE = 1,
    USE_GLOBAL = 2
}

enum HitDirection_Type {
    RAY_CAST = 0,
    SPHERE_CAST = 1,
}

enum SelectActionTrigger_Type {
    STATE = 0,
    STATE_CHANGE = 1,
    TOGGLE = 2,
    STICKY = 3
}

ccenum(Power_Type);
ccenum(Line_Type);
ccenum(Layer_Type);
ccenum(RaycastTrigger_Type);
ccenum(HitDirection_Type);
ccenum(SelectActionTrigger_Type);
 
@ccclass('cc.RayInteractor')
@help('i18n:cc.RayInteractor')
@menu('xr/RayInteractor')
export class RayInteractor extends Component {
    @serializable
    protected _interactionWithUINode: Power_Type = Power_Type.ON;
    @serializable
    protected _forceGrab: Power_Type = Power_Type.ON;
    @serializable
    protected _attachTransform: Node | null = null;
    @serializable
    protected _rayOriginTransform: Node | null = null;
    @serializable
    protected _lineType: Line_Type = Line_Type.STRAGIHT_LINE;
    @serializable
    protected _maxRayDistance: Number = 30;
    @serializable
    protected _reticle: Node | null = null;
    @serializable
    protected _raycastMask: Layer_Type = Layer_Type.EVERYTHING;
    @serializable
    protected _raycastTriggerInteraction: RaycastTrigger_Type = RaycastTrigger_Type.IGNORE;
    @serializable
    protected _hitDirectionType: HitDirection_Type = HitDirection_Type.RAY_CAST;
    @serializable
    protected _selectActionTrigger: SelectActionTrigger_Type = SelectActionTrigger_Type.STATE_CHANGE;
    @serializable
    protected _keepSelectedTargetValid: Power_Type = Power_Type.ON;
    @serializable
    protected _hideControllerOnSelect: Power_Type = Power_Type.OFF;
    @serializable
    protected _startingSelectedInteractable: Node | null = null;

    private _hitPoint: Vec3 | null = null;
    private _collider: Collider | null = null;
    private _line: Line | null = null;
    private _linePositions: any = [];

    @type(Power_Type)
    @displayOrder(1)
    set interactionWithUINode (val) {
        if (val === this._interactionWithUINode) {
            return;
        }
        this._interactionWithUINode = val;
    }
    get interactionWithUINode () {
        return this._interactionWithUINode;
    }

    @type(Power_Type)
    @displayOrder(2)
    set forceGrab (val) {
        if (val === this._forceGrab) {
            return;
        }
        this._forceGrab = val;
    }
    get forceGrab () {
        return this._forceGrab;
    }

    @type(Node)
    @displayOrder(3)
    set attachTransform (val) {
        if (val === this._attachTransform) {
            return;
        }
        this._attachTransform = val;
    }
    get attachTransform () {
        return this._attachTransform;
    }

    @type(Node)
    @displayOrder(4)
    set rayOriginTransform (val) {
        if (val === this._rayOriginTransform) {
            return;
        }
        this._attachTransform = val;
    }
    get rayOriginTransform () {
        return this._rayOriginTransform;
    }

    @type(Line_Type)
    @displayOrder(5)
    set lineType (val) {
        if (val === this._lineType) {
            return;
        }
        this._lineType = val;
    }
    get lineType () {
        return this._lineType;
    }

    @type(Number)
    @displayOrder(6)
    set maxRayDistance (val) {
        if (val === this._maxRayDistance) {
            return;
        }
        this._maxRayDistance = val;
    }
    get maxRayDistance () {
        return this._maxRayDistance;
    }

    @type(Node)
    @displayOrder(7)
    set reticle (val) {
        if (val === this._reticle) {
            return;
        }
        this._reticle = val;
    }
    get reticle () {
        return this._reticle;
    }

    @type(Layer_Type)
    @displayOrder(8)
    set raycastMask (val) {
        if (val === this._raycastMask) {
            return;
        }
        this._raycastMask = val;
    }
    get raycastMask () {
        return this._raycastMask;
    }

    @type(RaycastTrigger_Type)
    @displayOrder(9)
    set raycastTiggerInteraction (val) {
        if (val === this._raycastTriggerInteraction) {
            return;
        }
        this._raycastTriggerInteraction = val;
    }
    get raycastTiggerInteraction () {
        return this._raycastTriggerInteraction;
    }

    @type(HitDirection_Type)
    @displayOrder(10)
    set hitDectionType (val) {
        if (val === this._hitDirectionType) {
            return;
        }
        this._hitDirectionType = val;
    }
    get hitDectionType () {
        return this._hitDirectionType;
    }

    @type(SelectActionTrigger_Type)
    @displayOrder(11)
    set selectActionTrigger (val) {
        if (val === this._selectActionTrigger) {
            return;
        }
        this._selectActionTrigger = val;
    }
    get selectActionTrigger () {
        return this._selectActionTrigger;
    }

    @type(Power_Type)
    @displayOrder(12)
    set keepSelectedTargetValid (val) {
        if (val === this._keepSelectedTargetValid) {
            return;
        }
        this._keepSelectedTargetValid = val;
    }
    get keepSelectedTargetValid () {
        return this._keepSelectedTargetValid;
    }

    @type(Power_Type)
    @displayOrder(13)
    set hideControllerOnSelect (val) {
        if (val === this._hideControllerOnSelect) {
            return;
        }
        this._hideControllerOnSelect = val;
    }
    get hideControllerOnSelect () {
        return this._hideControllerOnSelect;
    }

    @type(Node)
    @displayOrder(14)
    set startingSelectedInteractable (val) {
        if (val === this._startingSelectedInteractable) {
            return;
        }
        this._startingSelectedInteractable = val;
    }
    get startingSelectedInteractable () {
        return this._startingSelectedInteractable;
    }
    
    onEnable() {
        this._line = this.node.getComponent(Line);
        this._linePositions = this._line?.positions;
    }

    update (deltaTime: number) {
        let dir = new Vec3();
        if (this._line && this._linePositions.length === 2) {
            let vec3Like = new Vec3(this._linePositions[1].x - this._linePositions[0].x, this._linePositions[1].y - this._linePositions[0].y, this._linePositions[1].z - this._linePositions[0].z);
            Vec3.transformQuat(dir, vec3Like, this.node.getWorldRotation());
        } else {
            Vec3.transformQuat(dir, Vec3.UP, this.node.getWorldRotation());
        }
        const ray:Ray = new Ray();
        const start = this.node.getWorldPosition();       
        Ray.set(ray, start.x, start.y, start.z, dir.x, dir.y, dir.z);
        let ret = PhysicsSystem.instance.raycastClosest(ray);
        if (ret) {
            const closestResult = PhysicsSystem.instance.raycastClosestResult;
            this._hitPoint = closestResult.hitPoint;

            if (this._collider !== closestResult.collider) {
                if (this._collider) {
                    this._collider.emit(XrRayEventType.RAY_NOT_HIT, this._hitPoint);
                }
                this._collider = closestResult.collider;
                this._collider.emit(XrRayEventType.RAY_HIT, this._hitPoint);
            }   

            if (this._line) {
                var pos: any = [];
                pos.push(this.node.getWorldPosition());
                pos.push(this._hitPoint);
                this._line.worldSpace = true;
                this._line.positions = pos;
            } 
        } else {
            if (this._collider) {
                this._collider.emit(XrRayEventType.RAY_NOT_HIT, this);
                this._collider = null;
            }
            if (this._line) {
                this._line.worldSpace = false;
                this._line.positions = this._linePositions;
            }
        }
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
