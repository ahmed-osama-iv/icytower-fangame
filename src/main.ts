import {
    CharacterSprite
} from "./character-sprite";
import {
    FloorSprite
} from "./floor-sprite";
import {
    ECS
} from "./utils/ecs/ecs";
import {
    DrawingSystem
} from "./systems/drawing-system";
import {
    AccelerationSystem
} from "./systems/acceleration-system";
import {
    Position
} from "./components/position";
import {
    DrawableSprite
} from "./components/drawable-sprite";
import {
    PlayerInputSystem
} from "./systems/player-input-system";
import {
    Character
} from "./components/character";
import {
    EasingFunction
} from "./utils/EasingFunction";
import {
    HorizontalMotion
} from "./components/horizontal-motion";


let ecs = new ECS();
let drawerSystem = new DrawingSystem("canvas", [
    [CharacterSprite.Idle0, "images/character/idle/0.png"],
    [CharacterSprite.Idle1, "images/character/idle/1.png"],
    [CharacterSprite.Idle2, "images/character/idle/2.png"],
    [CharacterSprite.Idle3, "images/character/idle/3.png"],
    [CharacterSprite.RunRight0, "images/character/run/right/0.png"],
    [CharacterSprite.RunRight1, "images/character/run/right/1.png"],
    [CharacterSprite.RunRight2, "images/character/run/right/2.png"],
    [CharacterSprite.RunRight3, "images/character/run/right/3.png"],
    [CharacterSprite.RunLeft0, "images/character/run/left/0.png"],
    [CharacterSprite.RunLeft1, "images/character/run/left/1.png"],
    [CharacterSprite.RunLeft2, "images/character/run/left/2.png"],
    [CharacterSprite.RunLeft3, "images/character/run/left/3.png"],

    [FloorSprite.RockLeft, "images/floor/rock/left.png"],
    [FloorSprite.RockMiddle, "images/floor/rock/middle.png"],
    [FloorSprite.RockRight, "images/floor/rock/right.png"],
]);

let isKeyPressed = new Map<string, boolean>();

document.addEventListener('keydown', function (event) {
    isKeyPressed[event.key] = true;
});

document.addEventListener('keyup', function (event) {
    isKeyPressed[event.key] = false;
});

ecs.addSystem(drawerSystem);
ecs.addSystem(new AccelerationSystem(isKeyPressed));
let character = ecs.addEntity();
ecs.addComponent(character, new Character());
ecs.addComponent(character, new DrawableSprite(CharacterSprite.Idle0));
ecs.addComponent(character, new Position(100, 0));
ecs.addComponent(character, new HorizontalMotion(
    12,
    EasingFunction.easeInOutQuad,
    EasingFunction.easeInOutQuad,
    EasingFunction.easeInOutQuad,
));

ecs.addSystem(new PlayerInputSystem(isKeyPressed));


update()
function update(){
    ecs.update();
    requestAnimationFrame(update);
}