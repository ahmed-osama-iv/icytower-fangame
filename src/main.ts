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
    PositionComponent
} from "./components/position";
import {
    DrawableSpriteComponent
} from "./components/drawable-sprite-component";
import {
    CharacterComponent
} from "./components/character";
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
    isKeyPressed[event.code] = true;
});

document.addEventListener('keyup', function (event) {
    isKeyPressed[event.code] = false;
});

ecs.addSystem(drawerSystem);
ecs.addSystem(new AccelerationSystem(isKeyPressed));
let character = ecs.addEntity();
ecs.addComponent(character, new CharacterComponent());
ecs.addComponent(character, new DrawableSpriteComponent(CharacterSprite.Idle0));
ecs.addComponent(character, new PositionComponent(100, 0));
ecs.addComponent(character, new HorizontalMotionComponent(
    12,
    EasingFunction.easeOutQuad,
    EasingFunction.easeInOutQuad,
    EasingFunction.easeOutQuart,
));
ecs.addComponent(character, new VerticalMotion(
    12,
    EasingFunction.easeOutSine,
    EasingFunction.easeInQuad,
));
ecs.addComponent(character, new BoxColliderComponent(
    ecs.getComponents(character).get(PositionComponent),
    new PositionComponent(0, 0),
    new PositionComponent(30, 52),
));

let floors : Entity[] = [];
for(var i=0; i<30; i++) {
    floors.push(ecs.addEntity());
    ecs.addComponent(floors[floors.length-1], new PositionComponent(i*32, 830));
    ecs.addComponent(floors[floors.length-1], new DrawableSpriteComponent(FloorSprite.RockMiddle));
    ecs.addComponent(floors[floors.length-1], new BoxColliderComponent(
        ecs.getComponents(floors[floors.length-1]).get(PositionComponent),
        new PositionComponent(0, 0),
        new PositionComponent(32, 37),
    ));
}

for(var i=0; i<10; i++) {
    floors.push(ecs.addEntity());
    ecs.addComponent(floors[floors.length-1], new PositionComponent(i*32, 600));
    ecs.addComponent(floors[floors.length-1], new DrawableSpriteComponent(FloorSprite.RockMiddle));
    ecs.addComponent(floors[floors.length-1], new BoxColliderComponent(
        ecs.getComponents(floors[floors.length-1]).get(PositionComponent),
        new PositionComponent(0, 0),
        new PositionComponent(32, 37),
    ));
}

ecs.addSystem(new VerticalMotionSystem(isKeyPressed, floors));


update()
function update(){
    ecs.update();
    requestAnimationFrame(update);
}