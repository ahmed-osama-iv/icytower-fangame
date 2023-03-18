import {
    Component
} from "../utils/ecs/component";
import {
    Sprite
} from "../sprite";

export class DrawableSpriteComponent extends Component {
    constructor(public sprite: Sprite, public horizontalRepetitions = 1, public verticalRepetitions = 1) {
        super();
    }
}