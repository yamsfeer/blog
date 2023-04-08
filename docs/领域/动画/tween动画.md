# tween 动画

```javascript
const box = document.createElement('div')
box.style.setProperty('background', '#008800')
box.style.setProperty('width', '100px')
box.style.setProperty('height', '100px')
document.body.appendChild(box)
```



```javascript
// Setup the animation loop.
function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
}
requestAnimationFrame(animate)

const coords = {x: 0, y: 0} // Start at (0, 0)
const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({x: 300, y: 200}, 1000) // Move to (300, 200) in 1 second.
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(() => {
		// Called after tween.js updates 'coords'.
		// Move 'box' to the position described by 'coords' with a CSS translation.
		box.style.setProperty('transform', `translate(${coords.x}px, ${coords.y}px)`)
	})
	.start() // Start the tween immediately.
```





```javascript
const tween = {
  linear: (t, b, c, d) => c * t / d + b,
  easeIn: (t, b, c, d) => c * ( t /= d ) * t + b,
  // easeOut ...
}
```



* 用 $x$ 轴表示时间，变化范围 $0 \to d$，提取常数 $d$，即 $d\times(0 \to 1)$，可认为 $x$ 轴的变化范围是 $0 \to 1$。
* 用 $y$ 轴表示动画值，变化范围 $b \to b + c$，提取常数 $d$，即 $b + c \times (0 \to 1)$，可认为 $y$ 轴的变化范围是 $0 \to 1$。
* Linear ( 线性 )
* Quadratic ( 二次 )、Cubic ( 三次 )、Quartic ( 四次 )、Quintic ( 五次 )、Sinusoidal ( 正弦 )、Exponential ( 指数 )、Circular ( 圆形 )、Elastic ( 弹性 )、Back ( 回弹 )、Bounce ( 回弹 )
* easeIn ( 缓入 )、easeOut ( 缓出 )、easeInOut ( 缓入缓出 )



```javascript
const easing = {
  linear() {},
  quadratic: {
    in() {},
    out() {},
    inout() {}
  },
  quadratic: {
    // ...
  }
  // ...
}
```
