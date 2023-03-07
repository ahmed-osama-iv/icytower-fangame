import {
    Component
} from "../utils/ecs/component";
import {
    Sprite
} from "../sprite";

export class PositionComponent extends Component {
    constructor(public x: number, public y: number) {
        super(); 
    }
}