import {
    Component
} from "../utils/ecs/component";
import {
    Sprite
} from "../sprite";

export class DrawableSprite extends Component {
    constructor(public sprite: Sprite) {
        super();
    }
}