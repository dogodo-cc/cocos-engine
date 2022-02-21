import { ccclass, help, menu} from "cc.decorator";
import { Camera } from "../core/components";

@ccclass('cc.XrCamera')
@help('i18n:cc.XrCamera')
@menu('xr/XrCamera')
export class XrCamera extends Camera {
    
}