import {
    Component
} from "../utils/ecs/component";
import {
    HorizontalMotionState
} from "../utils/enums/horizontal-motion-state";

export class HorizontalMotion extends Component {
    
    private _velocity = 0;
    private _state = HorizontalMotionState.Idle;
    private _timeWhenStateUpdated = Date.now();
    private _velocityWhenStateUpdated = 0;

    constructor(
        public maxVelocity: number,
        public accelerate: (elapsed: number, initialValue: number, amountOfChange: number, duration: number) => number,
        public slide: (elapsed: number, initialValue: number, amountOfChange: number, duration: number) => number,
        public brake: (elapsed: number, initialValue: number, amountOfChange: number, duration: number) => number,
    ) {
        super();
    }

    get velocity(): number {
        return this._velocity;
    }

    updateVelocity() {
        if(this._state == HorizontalMotionState.AcceleratingRight) {
            this._velocity = this.accelerate(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, this.maxVelocity-this._velocityWhenStateUpdated, 1000);
        }
        else if(this._state == HorizontalMotionState.AcceleratingLeft) {
            this._velocity = this.accelerate(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, -this.maxVelocity-this._velocityWhenStateUpdated, 1000);
        }
        else if(this._state == HorizontalMotionState.SlidingRight || this._state == HorizontalMotionState.SlidingLeft) {
            this._velocity = this.slide(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, -this._velocityWhenStateUpdated, 500);
        }
        else if(this._state == HorizontalMotionState.Braking) {
            if(Math.abs(this._velocity) < 0.1) {
                this._velocity = 0;
            }
            else {
                this._velocity = this.brake(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, -this._velocityWhenStateUpdated, 200);
            }
        }
    }
    
    get state(): HorizontalMotionState {
        return this._state;
    }

    set state(value: HorizontalMotionState) {
        if(this._state != value) {
            this._state = value;
            this._timeWhenStateUpdated = Date.now();
            this._velocityWhenStateUpdated = this.velocity;
        }
    }

    getTimeElapsedAtCurrentState(): number{
        return Date.now() - this._timeWhenStateUpdated;
    }
}

