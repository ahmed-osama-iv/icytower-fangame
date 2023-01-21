// These functions can be visualised at http://easings.net
export class EasingFunction{

    static easeInQuad(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
    }

    static easeOutQuad(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
    }

    static easeInOutQuad(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed + initialValue;
        }
        return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
    }

    static easeInCubic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
    }

    static easeOutCubic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
    }

    static easeInOutCubic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
        }
        return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
    }

    static easeInQuart(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed + initialValue;
    }

    static easeOutQuart(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
    }

    static easeInOutQuart(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
        }
        return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
    }

    static easeInQuint(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed * elapsed + initialValue;
    }

    static easeOutQuint(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
    }

    static easeInOutQuint(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
        }
        return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
    }

    static easeInSine(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
    }

    static easeOutSine(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
    }

    static easeInOutSine(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
    }

    static easeInExpo(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
    }

    static easeOutExpo(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return elapsed === duration
            ? initialValue + amountOfChange
            : amountOfChange * (-Math.pow(2, -10 * elapsed / duration) + 1) + initialValue;
    }

    static easeInOutExpo(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if (elapsed === 0) {
            return initialValue;
        }
        if (elapsed === duration) {
            return initialValue + amountOfChange;
        }
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
        }
        return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
    }

    static easeInCirc(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) + initialValue;
    }

    static easeOutCirc(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
    }

    static easeInOutCirc(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if ((elapsed /= duration / 2) < 1) {
            return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
        }
        return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
    }

    static easeInElastic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        let s = 1.70158;
        let p = 0;
        let a = amountOfChange;
        if (elapsed === 0) {
            return initialValue;
        }
        if ((elapsed /= duration) === 1) {
            return initialValue + amountOfChange;
        }
        if (!p) {
            p = duration * 0.3;
        }
        if (a < Math.abs(amountOfChange)) {
            a = amountOfChange;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        }
        return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
    }

    static easeOutElastic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        let s = 1.70158;
        let p = 0;
        let a = amountOfChange;
        if (elapsed === 0) {
            return initialValue;
        }
        if ((elapsed /= duration) === 1) {
            return initialValue + amountOfChange;
        }
        if (!p) {
            p = duration * 0.3;
        }
        if (a < Math.abs(amountOfChange)) {
            a = amountOfChange;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        }
        return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
    }

    static easeInOutElastic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        let s = 1.70158;
        let p = 0;
        let a = amountOfChange;
        if (elapsed === 0) {
            return initialValue;
        }
        if ((elapsed /= duration / 2) === 2) {
            return initialValue + amountOfChange;
        }
        if (!p) {
            p = duration * (0.3 * 1.5);
        }
        if (a < Math.abs(amountOfChange)) {
            a = amountOfChange;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        }
        if (elapsed < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
        }
        return (
            a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue
        );
    }

    static easeInBack(elapsed: number, initialValue: number, amountOfChange: number, duration: number, s: number = 1.70158): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
    }

    static easeOutBack(elapsed: number, initialValue: number, amountOfChange: number, duration: number, s: number = 1.70158): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
    }

    static easeInOutBack(
        elapsed: number,
        initialValue: number,
        amountOfChange: number,
        duration: number,
        s: number = 1.70158
    ): number {
        elapsed = Math.min(elapsed, duration);
        if ((elapsed /= duration / 2) < 1) {
            return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
        }
        return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
    }

    static easeInBounce(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        return amountOfChange - EasingFunction.easeOutBounce(duration - elapsed, 0, amountOfChange, duration) + initialValue;
    }

    static easeOutBounce(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if ((elapsed /= duration) < 1 / 2.75) {
            return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
        } else if (elapsed < 2 / 2.75) {
            return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
        } else if (elapsed < 2.5 / 2.75) {
            return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
        } else {
            return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
        }
    }

    static easeInOutBounce(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
        elapsed = Math.min(elapsed, duration);
        if (elapsed < duration / 2) {
            return EasingFunction.easeInBounce(elapsed * 2, 0, amountOfChange, duration) * 0.5 + initialValue;
        }
        return EasingFunction.easeOutBounce(elapsed * 2 - duration, 0, amountOfChange, duration) * 0.5 + amountOfChange * 0.5 + initialValue;
    }
}