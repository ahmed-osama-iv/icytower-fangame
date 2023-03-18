import {
    System
} from "../utils/ecs/system";
import {
    Entity
} from "../utils/ecs/entity";

export class FloorsGeneratingSystem extends System {
    componentsRequired: Set<Function>;

    update(entities: Set<Entity>): void {
    }
}
