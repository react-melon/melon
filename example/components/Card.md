## Card

将信息聚合在卡片容器中展示

### 使用场景

卡片是包含一组特定数据集的纸片，数据集含有各种相关信息。 例如，关于单一主题的照片，文本，和链接。卡片通常是通往更详细复杂信息的入口。

卡片有固定的宽度和可变的高度。最大高度限制于可适应平台上单一视图的内容，但如果需要它可以临时扩展（例如，显示评论栏）。

卡片不会翻转以展示其背后的信息。

### 基础用法

```react 基础用法
import React from 'react';
import Button from 'melon/Button';
import Card, {CardHeader, CardTitle, CardMedia, CardText, CardActions} from 'melon/Card';
import Icon from 'melon/Icon';
import IMG from './img/uxceo-128.jpg';
import MEDIA from './img/DID3gMcUAAA6eOx.png';

export default function () {
    return (
        <Card>
            <CardHeader title="URL Avatar" subtitle="Subtitle" avatar={IMG} />
            <CardMedia image={MEDIA}>
                <CardTitle title="Overlay title" subtitle="Overlay subtitle" />
            </CardMedia>
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
                <Button>Action1</Button>
                <Button>Action2</Button>
            </CardActions>
        </Card>
    );
};
```
