import { ccclass, displayOrder, help, menu, serializable, type } from "cc.decorator";
import { CameraType } from "../core/renderer/scene/camera";
import { Camera, Component } from "../core/components";

@ccclass('cc.XrCamera')
@help('i18n:cc.XrCamera')
@menu('xr/XrCamera')
export class XrCamera extends Component {
    @serializable
    protected _leftCamera: Camera | null = null;
    @serializable
    protected _rightCamera: Camera | null = null;

    @type(Camera)
    @displayOrder(1)
    set leftCamera(val) {
        if (val === this._leftCamera) {
            return;
        }
        this._leftCamera = val;
    }
    get leftCamera() {
        return this._leftCamera;
    }

    @type(Camera)
    @displayOrder(2)
    set rightCamera(val) {
        if (val === this._rightCamera) {
            return;
        }
        this._rightCamera = val;
    }
    get rightCamera() {
        return this._rightCamera;
    }

    onLoad() {
        if (this.enabled) {
            if (this._leftCamera) {
                this._leftCamera.enabled = true;
                this._leftCamera.cameraType = CameraType.LEFT_CAMERA;
                if (this.node.getComponent("cc.HMDCtrl")) {
                    this._leftCamera.isHMD = true;
                } else {
                    this._leftCamera.isHMD = false;
                }
            }
            if (this._rightCamera) {
                this._rightCamera.enabled = true;
                this._rightCamera.cameraType = CameraType.RIGHT_CAMERA;
                if (this.node.getComponent("cc.HMDCtrl")) {
                    this._rightCamera.isHMD = true;
                } else {
                    this._rightCamera.isHMD = false;
                }
            }
        } else {
            if (this._leftCamera) {
                this._leftCamera.enabled = false;
            }
            if (this._rightCamera) {
                this._rightCamera.enabled = false;
            }
        }
    }

    start() {

    }
}