import {
    System
} from "../utils/ecs/system";
import {
    Sprite
} from "../sprite";
import {
    Entity
} from "../utils/ecs/entity";
import {
    PositionComponent
} from "../components/position-component";
import {
    DrawableSpriteComponent
} from "../components/drawable-sprite-component";


export class DrawingSystem extends System {

    private _images: Map<Sprite, HTMLImageElement>;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly width: number;
    private readonly height: number

    constructor(id: string, spriteImagesToLoad: [Sprite, string][]) {
        super();
        this._images = new Map<Sprite, HTMLImageElement>;
        this.loadImages(spriteImagesToLoad);
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    loadImages(spriteImages: [Sprite, string][]): void {
        spriteImages.forEach(([sprite, path]) => {
            const img = new Image;
            img.src = path;
            this._images.set(sprite, img);
        });
    }

    drawSprite(drawable: DrawableSpriteComponent, offsetPosition: PositionComponent) {
        const image = this._images.get(drawable.sprite)!;
        const width = image.width;
        const height = image.height;
        for(let i = 0; i < drawable.horizontalRepetitions; i++) {
            for(let j = 0; j < drawable.verticalRepetitions; j++) {
                this.context.drawImage(image, offsetPosition.x + i * width, offsetPosition.y + j * height);
            }
        }
    }
    
    componentsRequired = new Set<Function>([DrawableSpriteComponent, PositionComponent]);
    
    update(entities: Set<Entity>): void {
        this.context.clearRect(0, 0, this.width, this.height);
        entities.forEach(entity => {
            const drawableSprite = this.ecs.getComponents(entity).get(DrawableSpriteComponent);
            const position = this.ecs.getComponents(entity).get(PositionComponent);
            this.drawSprite(drawableSprite, position);
        })
    }
}