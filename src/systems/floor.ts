import {
    BoxColliderComponent
} from "../components/box-collider-component";
import {
    PositionComponent
} from "../components/position-component";
import {
    GameImage
} from "../gameImage";
import {
    DrawableSpriteComponent
} from "../components/drawable-sprite-component";
import {
    AssetImage
} from "../asset-image";

export class Floor {
    public static readonly BLOCK_WIDTH = 32;
    public static readonly BLOCK_HEIGHT = 37;
    public static readonly VERTICAL_DISTANCE_BETWEEN_FLOORS = 120;

    public upperLeftCornerPosition : PositionComponent;
    public boxCollider : BoxColliderComponent;
    public drawingInfo : DrawableSpriteComponent;

    constructor(public level: number, public horizontalOffset, public numberOfBlocks: number) {
        this.upperLeftCornerPosition = new PositionComponent(horizontalOffset * Floor.BLOCK_WIDTH, 900 - Floor.BLOCK_HEIGHT - level * Floor.VERTICAL_DISTANCE_BETWEEN_FLOORS);
        this.boxCollider = new BoxColliderComponent(
            this.upperLeftCornerPosition,
            Floor.BLOCK_HEIGHT,
            this.numberOfBlocks * Floor.BLOCK_WIDTH,
        );
        this.drawingInfo = new DrawableSpriteComponent(AssetImage.FloorRockMiddle, 1, numberOfBlocks);
    }
}