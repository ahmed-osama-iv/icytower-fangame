import {
    System
} from "../utils/ecs/system";
import {
    Entity
} from "../utils/ecs/entity";
import {
    Position
} from "../components/position";
import {
    HorizontalMotion
} from "../components/horizontal-motion";
import {
    HorizontalMotionState
} from "../utils/enums/horizontal-motion-state";


export class AccelerationSystem extends System {
    
    private _previousTimeStamp: number;
    private _currentTimeStamp: number;
    private _deltaTime: number;
    private elapsed: number;
    private intialVelocity: number;
    private _isKeyPressed: Map<string, boolean>;
    private readonly BREAKE_CONSTANT = 1.01;
    private readonly FRICTION_CONSTANT = 0.65;
    constructor(isKeyPressed:  Map<string, boolean>) {
        super();
        this._previousTimeStamp = Date.now();
        this._isKeyPressed = isKeyPressed;
        this.elapsed = 0;
        this.intialVelocity = 0;
    }
    
    componentsRequired = new Set<Function>([Position, HorizontalMotion]);

    update(entities: Set<Entity>): void {
        this._currentTimeStamp = Date.now();
        this._deltaTime = (this._currentTimeStamp - this._previousTimeStamp);
        this._previousTimeStamp = this._currentTimeStamp;

        let isArrowLeftPressed = this._isKeyPressed['ArrowLeft'];
        let isArrowRightPressed = this._isKeyPressed['ArrowRight'];
        
        entities.forEach(entity => {
            let motion = this.ecs.getComponents(entity).get(HorizontalMotion);
            let position = this.ecs.getComponents(entity).get(Position);

            console.log(HorizontalMotionState[motion.state], motion.velocity);
            
            if((motion.state == HorizontalMotionState.Braking || motion.state == HorizontalMotionState.SlidingRight || motion.state == HorizontalMotionState.SlidingLeft) && motion.velocity == 0) {
                motion.state = HorizontalMotionState.Idle;
            }

            if(isArrowRightPressed && !isArrowLeftPressed) {
                if(motion.state == HorizontalMotionState.Idle || motion.state == HorizontalMotionState.SlidingRight) {
                    motion.state = HorizontalMotionState.AcceleratingRight;
                }
                else if(motion.state == HorizontalMotionState.SlidingLeft) {
                    motion.state = HorizontalMotionState.Braking;
                }
            }
            else if (isArrowLeftPressed && !isArrowRightPressed) {
                if(motion.state == HorizontalMotionState.Idle || motion.state == HorizontalMotionState.SlidingLeft) {
                    motion.state = HorizontalMotionState.AcceleratingLeft;
                }
                else if(motion.state == HorizontalMotionState.SlidingRight) {
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
            
            
            
            motion.updateVelocity();
            position.x += motion.velocity;
            // console.log(this._deltaTime, this.elapsed, motion.velocity, position.x, position.y);
        })
    }
}