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
    Floor
} from "./floor";

export class FloorsGeneratingSystem extends System {
    private _floors: Entity[];
    private isInitiated = false;
    constructor(floors:  Entity[]) {
        super();
        this._floors = floors;
        
        
    }

    componentsRequired = new Set<Function>([PositionComponent, HorizontalMotionComponent]);

    update(entities: Set<Entity>): void {
        const levelToCreate = this._floors.length;
        if(levelToCreate > 30) {
            return;
        }
        if(levelToCreate % 50 == 0) {
            const floorEntity = this.ecs.addEntity();
            this._floors.push(floorEntity);
            const floor = new Floor(levelToCreate, 0, 30);
            this.ecs.addComponent(floorEntity, floor.upperLeftCornerPosition);
            this.ecs.addComponent(floorEntity, floor.boxCollider);
            this.ecs.addComponent(floorEntity, floor.drawingInfo);
        } else {
            const floorEntity = this.ecs.addEntity();
            this._floors.push(floorEntity);
            const floor = this.getRandomFloor(levelToCreate);
            this.ecs.addComponent(floorEntity, floor.upperLeftCornerPosition);
            this.ecs.addComponent(floorEntity, floor.boxCollider);
            this.ecs.addComponent(floorEntity, floor.drawingInfo);
        }
    }

    randomIntWithinInterval(min, max) : number { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    getRandomFloor(levelToCreate) : Floor{
        const numberOfBlocks = this.randomIntWithinInterval(5, 15);
        const horizontalOffset = this.randomIntWithinInterval(0, 30 - numberOfBlocks);
        return new Floor(levelToCreate, horizontalOffset, numberOfBlocks);
    }
}
