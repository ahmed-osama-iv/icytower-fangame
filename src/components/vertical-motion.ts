import {
    Component
} from "../utils/ecs/component";
import {
    VerticalMotionState
} from "../utils/enums/vertical-motion-state";


export class VerticalMotion extends Component {

    private _time = 0;
    private _previousTime = 0;
    private _velocity = 0;
    private _state = VerticalMotionState.Falling;
    private _timeWhenStateUpdated = Date.now();
    private _velocityWhenStateUpdated = 0;
    
    constructor(
        public maxVelocity: number,
        public fall: (elapsed: number, initialValue: number, amountOfChange: number, duration: number) => number,
        public jump: (elapsed: number, initialValue: number, amountOfChange: number, duration: number) => number,

    ) {
        super();
    }

    get velocity(): number {
        return this._velocity;
    }

    get _deltaTime(): number {
        return this._time - this._previousTime;
    }

    /*
    *   v = dx / dt
    *   dx = v * dt
    */
    get deltaDisplacement(): number {
        return this.velocity * this._deltaTime;
    }

    updateVelocity() {
        this._previousTime = this._time;
        this._time = Date.now();
        if(this._state == VerticalMotionState.Falling) {
            this._velocity = this.fall(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, this.maxVelocity-this._velocityWhenStateUpdated, 1000);
        }
        else if(this._state == VerticalMotionState.OnGround) {
            this._velocity = 0;
        }
        else if(this.state == VerticalMotionState.PropelledUp) {
            this._velocity = -1 - this.jump(this.getTimeElapsedAtCurrentState(), this._velocityWhenStateUpdated, -1, 400);
        }
    }

    get state(): VerticalMotionState {
        return this._state;
    }

    set state(value: VerticalMotionState) {
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

