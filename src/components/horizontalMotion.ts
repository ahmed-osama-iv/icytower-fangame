import {
    Component
} from "../utils/ecs/component";
import {
    MotionState
} from "../utils/enums/MotionState";

export class HorizontalMotion extends Component {
    
    private _velocity = 0;
    private _state = MotionState.Idle;
    private _timeWherStateUpdated = Date.now();
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
        if(this._state == MotionState.AcceleratingRight) {
            this._velocity = this.accelerate(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, this.maxVelocity-this._velocityWhenStateUpdated, 1000);
        }
        else if(this._state == MotionState.AcceleratingLeft) {
            this._velocity = this.accelerate(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, -this.maxVelocity-this._velocityWhenStateUpdated, 1000);
        }
        else if(this._state == MotionState.SlidingRight || this._state == MotionState.SlidingLeft) {
            this._velocity = this.slide(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, -this._velocityWhenStateUpdated, 500);
        }
        else if(this._state == MotionState.Braking) {
            this._velocity = this.slide(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, -this._velocityWhenStateUpdated, 200);
        }
    }
    
    get state(): MotionState {
        return this._state;
    }

    set state(value: MotionState) {
        if(this._state != value) {
            this._state = value;
            this._timeWherStateUpdated = Date.now();
            this._velocityWhenStateUpdated = this.velocity;
        }
    }

    getTimeElapsedAtCurrentState(): number{
        return Date.now() - this._timeWherStateUpdated;
    }
}

