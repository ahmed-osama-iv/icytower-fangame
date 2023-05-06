import {
    Component
} from "../utils/ecs/component";

export class PositionComponent extends Component {
    constructor(public x: number, public y: number) {
        super(); 
    }
}