import {
    System
} from "../utils/ecs/system";
import {
    Entity
} from "../utils/ecs/entity";
import {
    PositionComponent
} from "../components/position-component";
import {
    HorizontalMotionComponent
} from "../components/horizontal-motion-component";
import {
    HorizontalMotionState
} from "../utils/enums/horizontal-motion-state";
import {
    Component
} from "../utils/ecs/component";


export class AccelerationSystem extends System {

    private _isKeyPressed: Map<string, boolean>;
    constructor(isKeyPressed:  Map<string, boolean>) {
        super();
        this._isKeyPressed = isKeyPressed;
    }
    
    componentsRequired = new Set<Function>([PositionComponent, HorizontalMotionComponent]);

    update(entities: Set<Entity>): void {
        let isArrowLeftPressed = this._isKeyPressed['ArrowLeft'];
        let isArrowRightPressed = this._isKeyPressed['ArrowRight'];
        
        entities.forEach(entity => {
            let motion = this.ecs.getComponents(entity).get(HorizontalMotionComponent);
            let position = this.ecs.getComponents(entity).get(PositionComponent);

            motion.updateVelocity();
            
            if((motion.state == HorizontalMotionState.Braking || motion.state == HorizontalMotionState.SlidingRight || motion.state == HorizontalMotionState.SlidingLeft) && motion.velocity == 0) {
                motion.state = HorizontalMotionState.Idle;
            }

            if(isArrowRightPressed && !isArrowLeftPressed) {
                if(motion.state == HorizontalMotionState.Idle || motion.state == HorizontalMotionState.SlidingRight) {
                    motion.state = HorizontalMotionState.AcceleratingRight;
                }
                else if(motion.state == HorizontalMotionState.SlidingLeft || motion.state == HorizontalMotionState.AcceleratingLeft) {
                    motion.state = HorizontalMotionState.Braking;
                }
            }
            else if (isArrowLeftPressed && !isArrowRightPressed) {
                if(motion.state == HorizontalMotionState.Idle || motion.state == HorizontalMotionState.SlidingLeft) {
                    motion.state = HorizontalMotionState.AcceleratingLeft;
                }
                else if(motion.state == HorizontalMotionState.SlidingRight || motion.state == HorizontalMotionState.AcceleratingRight) {
                    motion.state = HorizontalMotionState.Braking;
                }
            }
            else {
                if(motion.velocity > 0) {
                    motion.state = HorizontalMotionState.SlidingRight;
                }
                else if(motion.velocity < 0) {
                    motion.state = HorizontalMotionState.SlidingLeft;
                }
            }
            
            position.x += motion.velocity;
        })
    }
}