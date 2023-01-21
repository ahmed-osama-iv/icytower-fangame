import {
    Component
} from "../utils/ecs/component";
import {
    Sprite
} from "../sprite";

export class Position extends Component {
    constructor(public x: number, public y: number) {
        super(); 
    }
}