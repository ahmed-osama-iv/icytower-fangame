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
    GameImage
} from "./gameImage";

const ecs = new ECS();
const drawerSystem = new DrawingSystem("canvas", [
    [GameImage.Idle0, "images/character/idle/0.png"],
    [GameImage.Idle1, "images/character/idle/1.png"],
    [GameImage.Idle2, "images/character/idle/2.png"],
    [GameImage.Idle3, "images/character/idle/3.png"],
    [GameImage.RunRight0, "images/character/run/right/0.png"],
    [GameImage.RunRight1, "images/character/run/right/1.png"],
    [GameImage.RunRight2, "images/character/run/right/2.png"],
    [GameImage.RunRight3, "images/character/run/right/3.png"],
    [GameImage.RunLeft0, "images/character/run/left/0.png"],
    [GameImage.RunLeft1, "images/character/run/left/1.png"],
    [GameImage.RunLeft2, "images/character/run/left/2.png"],
    [GameImage.RunLeft3, "images/character/run/left/3.png"],

    [GameImage.RockLeft, "images/floor/rock/left.png"],
    [GameImage.RockMiddle, "images/floor/rock/middle.png"],
    [GameImage.RockRight, "images/floor/rock/right.png"],
]);

const isKeyPressed = new Map<string, boolean>();

document.addEventListener('keydown', function (event) {
    isKeyPressed[event.code] = true;
});

document.addEventListener('keyup', function (event) {
    isKeyPressed[event.code] = false;
});

const floors : Entity[] = [];
floors.push(ecs.addEntity());
ecs.addComponent(floors[floors.length-1], new PositionComponent(0, 830));
ecs.addComponent(floors[floors.length-1], new BoxColliderComponent(
    ecs.getComponents(floors[floors.length-1]).get(PositionComponent),
    37,
    30*32,
));
ecs.addComponent(floors[floors.length-1], new DrawableSpriteComponent(GameImage.RockMiddle, 30));


for(let i=0; i<10; i++) {
    floors.push(ecs.addEntity());
    ecs.addComponent(floors[floors.length-1], new PositionComponent(i*32, 600));
    ecs.addComponent(floors[floors.length-1], new DrawableSpriteComponent(GameImage.RockMiddle));
    ecs.addComponent(floors[floors.length-1], new BoxColliderComponent(
        ecs.getComponents(floors[floors.length-1]).get(PositionComponent),
        37,
        32,
    ));
}

ecs.addSystem(drawerSystem);
ecs.addSystem(new HorizontalMotionSystem(isKeyPressed));
ecs.addSystem(new VerticalMotionSystem(isKeyPressed, floors));

const character = ecs.addEntity();
ecs.addComponent(character, new CharacterComponent());
ecs.addComponent(character, new DrawableSpriteComponent(GameImage.Idle0));
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
    52,
    30,
));

update()
function update(){
    ecs.update();
    requestAnimationFrame(update);
}