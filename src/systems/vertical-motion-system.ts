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
    VerticalMotion
} from "../components/vertical-motion";
import {
    VerticalMotionState
} from "../utils/enums/vertical-motion-state";
import {
    BoxCollider
} from "../components/box-collider";

export class VerticalMotionSystem extends System {
    
    private _floors: Entity[];
    private _floorStandingOn: Entity;
    private _isKeyPressed: Map<string, boolean>;


    constructor(isKeyPressed:  Map<string, boolean>, floors:  Entity[]) {
        super();
        this._isKeyPressed = isKeyPressed;
        this._floors = floors;
    }
    
    componentsRequired = new Set<Function>([Position, VerticalMotion]);

    update(entities: Set<Entity>): void {
        let isJumpPressed = this._isKeyPressed['ArrowUp'] || this._isKeyPressed['Space'];
            
        entities.forEach(entity => {
            let motion = this.ecs.getComponents(entity).get(VerticalMotion);
            let position = this.ecs.getComponents(entity).get(Position);
            
            motion.updateVelocity();
            
            if(motion.state == VerticalMotionState.Falling) {
                    if(this.tryUpdateFloorStandingOn(entity)) {
                        position.y = this.ecs.getComponents(this._floorStandingOn).get(Position).y - this.ecs.getComponents(entity).get(BoxCollider).size.y;
                    }
                    else {
                        position.y += motion.velocity;
                    }
                
            }
            else if(motion.state == VerticalMotionState.OnGround) {
                if(!this.isHorizontallyAligned(entity, this._floorStandingOn)) {
                    if(!this.tryUpdateFloorStandingOn(entity)) {
                        motion.state = VerticalMotionState.Falling;
                    }
                }
                
                if(isJumpPressed) {
                    motion.state = VerticalMotionState.PropelledUp;
                }
            }
            else if(motion.state == VerticalMotionState.PropelledUp) {
                position.y += motion.velocity;
                if(motion.velocity == 0) {
                    motion.state = VerticalMotionState.Falling;
                }
            }
        })
    }
    
    private tryUpdateFloorStandingOn(character: Entity): boolean {
        let motion = this.ecs.getComponents(character).get(VerticalMotion);
        let position = this.ecs.getComponents(character).get(Position);
        
        for(let floor of this._floors) {
            if (this.willCollide(character, floor)) {
                position.y = this.ecs.getComponents(floor).get(Position).y - this.ecs.getComponents(character).get(BoxCollider).size.y;
                motion.state = VerticalMotionState.OnGround;
                this._floorStandingOn = floor;
                return true;
            }
        }
        return false;
    }

    private willCollide(character: Entity, floor: Entity): boolean {
        let characterBoxCollider = this.ecs.getComponents(character).get(BoxCollider);
        let characterBottom = characterBoxCollider.position.y +
            characterBoxCollider.offset.y + characterBoxCollider.size.y;
        
        let floorBoxCollider = this.ecs.getComponents(floor).get(BoxCollider);
        let floorTop = floorBoxCollider.position.y + floorBoxCollider.offset.y;

        let velocity = this.ecs.getComponents(character).get(VerticalMotion).velocity;

        console.log(characterBottom, floorTop, velocity, this.isHorizontallyAligned(character, floor), characterBottom <= floorTop && characterBottom + velocity >= floorTop);
        return this.isHorizontallyAligned(character, floor) &&
            characterBottom <= floorTop && characterBottom + velocity >= floorTop
    }
    
    private isHorizontallyAligned(character: Entity, floor: Entity): boolean {
        let characterBoxCollider = this.ecs.getComponents(character).get(BoxCollider);
        let charcterStart = characterBoxCollider.position.x + characterBoxCollider.offset.x;
        let charcterEnd = characterBoxCollider.position.x + characterBoxCollider.offset.x + characterBoxCollider.size.x;

        let floorBoxCollider = this.ecs.getComponents(floor).get(BoxCollider);
        let floorStart = floorBoxCollider.position.x + floorBoxCollider.offset.x;
        let floorEnd = floorBoxCollider.position.x + floorBoxCollider.offset.x + floorBoxCollider.size.x;
        
        return (charcterStart >= floorStart && charcterStart <= floorEnd) ||
            (charcterEnd >= floorStart && charcterEnd <= floorEnd) ||
            (floorStart >= charcterStart && floorStart <= charcterEnd) ||
            (floorEnd >= charcterStart && floorEnd <= charcterEnd);
    }
}