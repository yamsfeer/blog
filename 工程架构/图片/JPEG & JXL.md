# JPEG

JPEG ( Joint Photographic Experts Group ) 是网络上最常见的图像类型。

JPEG 的意思也可以是联合摄影专家组，该委员会于 1992 年首次发布 JPEG 标准，JPEG 文件的后缀名为 .jpg 或 .jpeg。

JPEG 使用有损压缩，将图像数据编码为多个 8x8 的像素块，并以算法描述这些块。在实践中，这种针对块而不是像素的方式意味着 JPEG 非常适用于微妙的、分层的渐变，构成现实世界的照片。

![Horizontal alignment of green blocks going from light to dark.](https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/TFKgf2FgDGkoyg7wnVai.png?auto=format)

用 GIF 编码风格描述这个像素梯度，是非常冗长的。

```
第一行，第一列到第九列是#00CC00
第一行，第十列是#00BB00
第一行，第十一列是#00AA00
第一行，第十二列是#009900
第一行，第十三列是#008800
第一行，第十四列是#007700
第一行，第十五列是#006600
第一行，第十六列是#005500
```

用 JPEG 编码风格来描述这个梯度，效率要高得多。

```
第一块是 #00CC00
第二块是一个从 #00CC00 到 #005500 的梯度
```

![An eight-by-sixteen grid of green blocks ranging in hue from light to dark.](https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/ttnejYz6sQKRpzv1v8cl.png?auto=format)

## JPEG 的有损压缩

GIF 的色板量化是一个相对简单的操作：减少图像中的颜色数量从而使文件变小。这种方式很容易被人眼发现。

JPEG 的压缩方式与我们的心理视觉系统对周围世界的量化方式大致相同。实际上，JPEG 试图抛弃我们首先不可能看到的细节。

* 人的眼睛对亮度的差异比对色调的差异更敏感。

  利用离散余弦变换，将图像按频率分割成两层 ( layer )。

  * 明度 brightness，也称 luminance ( luma )
  * 色度 color，也称 chrominance ( chroma )

  luma layer 被少量压缩，丢弃了人眼不可能注意到的小细节。

  chroma layer 被大幅压缩，而不是像 GIF 那样简单地量化色度层的调色板。

* JPEG 执行子采样过程，将 chroma layer 以较低的分辨率存储。
* 将低分辨率的 chroma layer 拉伸到 luma layer 上进行重新组合时，其差异往往是难以察觉的。

当然，压缩力度过大，细节的缺失会变得很明显，人眼还是会察觉的。而且由于 JPEG 是以块为单位进行操作的，块之间的接缝会开始显示出来。

## 渐进式 JPEG

渐进式 JPEG ( Progressive JPEG, PJPEG ) 有效地重新安排了渲染 JPEG 的过程。

普通 JPEG 从上到下渲染，而  PJPEG 将渲染分成一组全尺寸的 "扫描"：从上到下，每次扫描都会提高图像的质量。整个图像立即出现，一开始是模糊的，随着扫描越来越清晰。





PJPEG 的优点：

* 立即提供一个全尺寸的图像，让用户感觉更快
* PJPEG 通常比普通 JPEG 文件要小一些

相比普通 JPEG，解码 PJPEG 对浏览器和硬件造成了额外的压力。这种开销很难精确量化，但它非常小，一般不太可能被注意到。

总的来说，将图像编码为 JPEG 时，渐进式是一个明智的默认方法。

## 使用 JPEG

JPEG 的图片质量可以用一个 0~100 的整数量化表示。数值越小，图片质量越低，文件也越小。

我们用 Squoosh 来看质量值对 JPEG 图片的影响。



当质量设置为 60 时，文件大小减少了 79%。文件小很多，但大部分的质量差异对人眼来说是难以察觉的。

## 参考

[JPEG不可思议的压缩率——归功于信号处理理论](https://www.bilibili.com/video/BV1iv4y1N7sq/)
