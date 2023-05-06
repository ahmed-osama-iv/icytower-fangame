import {
    ECS
} from "./utils/ecs/ecs";
import {
    DrawingSystem
} from "./systems/drawing-system";
import {
    HorizontalMotionSystem
} from "./systems/horizontal-motion-system";
import {
    PositionComponent
} from "./components/position-component";
import {
    DrawableSpriteComponent
} from "./components/drawable-sprite-component";
import {
    CharacterComponent
} from "./components/character-component";
import {
    EasingFunction
} from "./utils/EasingFunction";
import {
    HorizontalMotionComponent
} from "./components/horizontal-motion-component";
import {
    VerticalMotion
} from "./components/vertical-motion";
import {
    BoxColliderComponent
} from "./components/box-collider-component";
import {
    VerticalMotionSystem
} from "./systems/vertical-motion-system";
import {
    Entity
} from "./utils/ecs/entity";
import {
    FloorsGeneratingSystem
} from "./systems/floors-generating-system";
import {
    AssetImage
} from "./asset-image";

const ecs = new ECS();
const drawerSystem = new DrawingSystem("canvas", [
    [AssetImage.CharacterIdle0, "images/character/idle/0.png"],
    [AssetImage.CharacterIdle1, "images/character/idle/1.png"],
    [AssetImage.CharacterIdle2, "images/character/idle/2.png"],
    [AssetImage.CharacterIdle3, "images/character/idle/3.png"],
    [AssetImage.CharacterRunRight0, "images/character/run/right/0.png"],
    [AssetImage.CharacterRunRight1, "images/character/run/right/1.png"],
    [AssetImage.CharacterRunRight2, "images/character/run/right/2.png"],
    [AssetImage.CharacterRunRight3, "images/character/run/right/3.png"],
    [AssetImage.CharacterRunLeft0, "images/character/run/left/0.png"],
    [AssetImage.CharacterRunLeft1, "images/character/run/left/1.png"],
    [AssetImage.CharacterRunLeft2, "images/character/run/left/2.png"],
    [AssetImage.CharacterRunLeft3, "images/character/run/left/3.png"],

    [AssetImage.FloorRockLeft, "images/floor/rock/left.png"],
    [AssetImage.FloorRockMiddle, "images/floor/rock/middle.png"],
    [AssetImage.FloorRockRight, "images/floor/rock/right.png"],

    [AssetImage.Background, "images/background.jpg"],
]);

const isKeyPressed = new Map<string, boolean>();

document.addEventListener('keydown', function (event) {
    isKeyPressed[event.code] = true;
});

document.addEventListener('keyup', function (event) {
    isKeyPressed[event.code] = false;
});

const floors : Entity[] = [];

ecs.addSystem(new FloorsGeneratingSystem(floors));
ecs.addSystem(drawerSystem);
ecs.addSystem(new HorizontalMotionSystem(isKeyPressed));
ecs.addSystem(new VerticalMotionSystem(isKeyPressed, floors));

const background = ecs.addEntity();
ecs.addComponent(background, new DrawableSpriteComponent(AssetImage.Background, 0, 4, 3));
ecs.addComponent(background, new PositionComponent(0, 0));

const character = ecs.addEntity();
ecs.addComponent(character, new CharacterComponent());
ecs.addComponent(character, new DrawableSpriteComponent(AssetImage.CharacterIdle0, 2));
ecs.addComponent(character, new PositionComponent(100, 0));
ecs.addComponent(character, new HorizontalMotionComponent(
    2,
    EasingFunction.easeOutQuad,
    EasingFunction.easeInOutQuad,
    EasingFunction.easeOutQuart,
));
ecs.addComponent(character, new VerticalMotion(
    2,
    EasingFunction.easeOutSine,
    EasingFunction.easeInQuad,
));
ecs.addComponent(character, new BoxColliderComponent(
    ecs.getComponents(character).get(PositionComponent),
    52,
    30,
));

update()
function update(){
    ecs.update();
    requestAnimationFrame(update);
}