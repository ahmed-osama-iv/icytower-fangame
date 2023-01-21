/**
 * This type is so functions like the ComponentContainer's get(...) will
 * automatically tell TypeScript the type of the Component returned. In
 * other words, we can say get(Position) and TypeScript will know that an
 * instance of Position was returned. This is amazingly helpful.
 */
import {
    Component
} from "./component";

export type ComponentClass<T extends Component> = new (...args: any[]) => T