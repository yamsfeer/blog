# runtime

### baseRender

```javascript
// { patchProps() {}, nodeOps: {}}
function baseCreateRenderer(options) {
  patch()

  /* Text */
  processText()

  /* Comment */
  processCommentNode()
  mountStaticNode()
  patchStaticNode(), moveStaticNode(), removeStaticNode()
 	
  /* Element */
  processElement()
  mountElement()
  setScopeId()
  mountChildren()

  /* diff */
  patchElement()
  patchChildren
  patchKeyedChildren
  patchUnkeyedChildren
 
  patchBlockChildren()
  patchProps()
  
  /* Fragment */
  processFragment()
  
  /* Component */
  processComponent()
  mountComponent()
  updateComponent()
  setupRenderEffect()
  updateComponentPreRender

  move
  unmount
  remove
  removeFragment
  unmountComponent
  unmountChildren
  getNextHostNode
  render
  
  return {
    render
    createApp: createAppAPI(render)
  }
}
```



mountComponent:

* 创建组件实例 createComponentInstance
* 设置组件实例 setupComponent
* 设置并运行带副作用的渲染函数 setupRenderEffect



```
patch
  - processText
  - processElement
    - mountElement
    - patchElement
    - mountChildren
  - processComponent
    - mountComponent
    - updateComponent
```

