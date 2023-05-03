# WebP

WebP 是 google 开发的一种旨在取代 JPEG 的有损图像格式。

同等质量下，WebP 比 JPEG 文件更小。后来引入了无损压缩、Alpha 通道和动画等。

WebP 的有损压缩是基于 VP8 视频编解码器中压缩视频关键帧的算法的。

与 JPEG 类似，WebP 以块为单位进行操作，并且也有亮度和色度的划分。WebP 的 luma 块是 16x16，chroma 块是 8x8，这些宏块被进一步细分为 4x4 的子块。

WebP 与 JPEG 的根本不同之处在于两个特点：块预测和自适应块量化。

## 块预测

块预测：每个色度和亮度块的内容是根据其周围区块来预测的，具体来说是当前块的上方和左方块。

用简单的语言来说：如果当前块上方有蓝色，左侧有蓝色，就假设这个块是蓝色。

事实上，PNG 和 JPEG 在某种程度上也做了这种预测。WebP的独特之处在于，它对周围块进行采样，然后通过不同的预测模式来填充当前区块，将每种模式的结果与真实图像比较，选择最接近的预测模式。

<img src="https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/t8neUw7UOsUNTF3uxe08.png?auto=format" alt="A diagram of WebP’s various block prediction methods." style="zoom: 67%;" />

预测不会完全正确，所以块的预测值和实际值之间的差异会被编码在文件中。

对图像进行解码时，渲染引擎使用相同的数据，相同的预测逻辑，导致每个块的预测值相同。预测值和文件中编码的预期图像之间的差异，然后应用在预测值上。

假设我们有一份真实图像数据。

```
111151111
122456389
```

使用块预测编码后的内容为：

```
111111111
123456789
```


预测的数据和实际数据很接近。当然，不是完全吻合，实际数据有几个块与预测值不同。

因此，我们发送的编码还包括任何与预测值不同的块的差异值：

```
_ _ _ _ +4 _ _ _ _
_ _ -1 _ _ _ -4 _ _
```

整个过程大概如下：

```
111111111
123456789
    +
_ _ _ _ +4 _ _ _ _
_ _ -1 _ _ _ -4 _ _
    =
111151111
122456389 
```

最终，我们只需要把预测模型和差值传输就可以了。

## 自适应块量化

JPEG压缩是一个全面的操作，对图像中的每一个块都应用相同的量化水平。

在实践中，这意味着我们的JPEG压缩设置不是由高频细节决定的，在那里JPEG压缩是最出色的，而是由我们图像中最有可能出现压缩伪影的部分决定的。







为了避免这种情况，WebP采取了一种自适应的量化方法：一幅图像被分成最多四个视觉上相似的片段，这些片段的压缩参数被单独调整。用WebP进行同样的大面积压缩：



这两个图像文件的大小是差不多的。



## 使用 WebP

WebP 也可以用 0~100 的数值表示图像质量。google 提供了 cwebp、Squoosh 等 webp 相关工具。

```bash
$ cwebp -q 80 butterfly.jpg -o butterfly.webp

Saving file 'butterfly.webp'
File:  	butterfly.jpg
Dimension: 1676 x 1418
Output:	208418 bytes Y-U-V-All-PSNR 41.00 43.99 44.95   41.87 dB
       	(0.70 bpp)
block count:    intra4:     7644  (81.80%)
          	   Intra16:     1701  (18.20%)
          	   Skipped:       63  (0.67%)
bytes used:  header:            249  (0.1%)
         	  mode-partition:  36885  (17.7%)
Residuals bytes  |segment 1|segment 2|segment 3|segment 4|  total
macroblocks:     |       8%|      22%|      26%|      44%|   9345
quantizer:       |      27 |      25 |      21 |      13 |
filter level:    |       8 |       6 |      19 |      16 |
```