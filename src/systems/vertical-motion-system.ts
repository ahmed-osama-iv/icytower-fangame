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
    VerticalMotion
} from "../components/vertical-motion";
import {
    VerticalMotionState
} from "../utils/enums/vertical-motion-state";
import {
    BoxColliderComponent
} from "../components/box-collider-component";

export class VerticalMotionSystem extends System {
    
    private _floors: Entity[];
    private _floorStandingOn: Entity;
    private _isKeyPressed: Map<string, boolean>;


    constructor(isKeyPressed:  Map<string, boolean>, floors:  Entity[]) {
        super();
        this._isKeyPressed = isKeyPressed;
        this._floors = floors;
    }
    
    componentsRequired = new Set<Function>([PositionComponent, VerticalMotion]);

    update(entities: Set<Entity>): void {
        const isJumpPressed = this._isKeyPressed['ArrowUp'] || this._isKeyPressed['Space'];
            
        entities.forEach(entity => {
            const motion = this.ecs.getComponents(entity).get(VerticalMotion);
            const position = this.ecs.getComponents(entity).get(PositionComponent);
            
            motion.updateVelocity();
            
            if(motion.state == VerticalMotionState.Falling) {
                    if(this.tryUpdateFloorStandingOn(entity)) {
                        position.y = this.ecs.getComponents(this._floorStandingOn).get(PositionComponent).y - this.ecs.getComponents(entity).get(BoxColliderComponent).height;
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
        const motion = this.ecs.getComponents(character).get(VerticalMotion);
        const position = this.ecs.getComponents(character).get(PositionComponent);
        
        for(const floor of this._floors) {
            if (this.willCollide(character, floor)) {
                position.y = this.ecs.getComponents(floor).get(PositionComponent).y - this.ecs.getComponents(character).get(BoxColliderComponent).height;
                motion.state = VerticalMotionState.OnGround;
                this._floorStandingOn = floor;
                return true;
            }
        }
        return false;
    }

    private willCollide(character: Entity, floor: Entity): boolean {
        const characterBoxCollider = this.ecs.getComponents(character).get(BoxColliderComponent);
        const characterBottom = characterBoxCollider.position.y + characterBoxCollider.height;

        const floorBoxCollider = this.ecs.getComponents(floor).get(BoxColliderComponent);
        const floorTop = floorBoxCollider.position.y;

        const velocity = this.ecs.getComponents(character).get(VerticalMotion).velocity;

        return this.isHorizontallyAligned(character, floor) &&
            characterBottom <= floorTop && characterBottom + velocity >= floorTop
    }
    
    private isHorizontallyAligned(character: Entity, floor: Entity): boolean {
        const characterBoxCollider = this.ecs.getComponents(character).get(BoxColliderComponent);
        const charcterStart = characterBoxCollider.position.x;
        const charcterEnd = characterBoxCollider.position.x + characterBoxCollider.width;

        const floorBoxCollider = this.ecs.getComponents(floor).get(BoxColliderComponent);
        const floorStart = floorBoxCollider.position.x;
        const floorEnd = floorBoxCollider.position.x + floorBoxCollider.width;
        
        return (charcterStart >= floorStart && charcterStart <= floorEnd) ||
            (charcterEnd >= floorStart && charcterEnd <= floorEnd) ||
            (floorStart >= charcterStart && floorStart <= charcterEnd) ||
            (floorEnd >= charcterStart && floorEnd <= charcterEnd);
    }
}