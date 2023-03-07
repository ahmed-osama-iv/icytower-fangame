import {
    Component
} from "../utils/ecs/component";
import {
    PositionComponent
} from "./position";

export class BoxColliderComponent extends Component {
    constructor(public position: PositionComponent, public offset: PositionComponent, public size: PositionComponent) {
        super();
    }
}