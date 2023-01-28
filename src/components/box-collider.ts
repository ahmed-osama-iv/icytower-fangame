import {
    Component
} from "../utils/ecs/component";
import {
    Position
} from "./position";

export class BoxCollider extends Component {
    constructor(public position: Position, public offset: Position, public size: Position) {
        super();
    }
}