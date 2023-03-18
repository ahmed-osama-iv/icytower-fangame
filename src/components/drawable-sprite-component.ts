import {
    Component
} from "../utils/ecs/component";
import {
    AssetImage
} from "../asset-image";

export class DrawableSpriteComponent extends Component {
    constructor(public image: AssetImage, public horizontalRepetitions = 1, public verticalRepetitions = 1) {
        super();
    }
}