import {
    System
} from "../utils/ecs/system";

import {
    Character
} from "../components/character";
import {
    Entity
} from "../utils/ecs/entity";
import {
    HorizontalMotion
} from "../components/horizontal-motion";


export class PlayerInputSystem extends System {

    private _isKeyPressed: Map<string, boolean>;
    
    constructor(isKeyPressed:  Map<string, boolean>) {
        super();
        this._isKeyPressed = isKeyPressed;
    }
    
    
    componentsRequired = new Set<Function>([Character]);

    update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            let motion = this.ecs.getComponents(entity).get(HorizontalMotion);
            let isArrowLeftPressed = this._isKeyPressed['ArrowLeft'];
            let isArrowRightPressed = this._isKeyPressed['ArrowRight'];
        });
    }

}
