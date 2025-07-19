> 本项目的演示视频为[artist-search-web-presentation.mp4](https://drive.google.com/file/d/1s1TLZP6b2hlV72P6W_J_aXHGdjfJovg7/view?usp=drive_link)。  
> 目前该项目已升级为 Artist Search Pro，这是一个基于 Angular、Bootstrap、Express.js 和 MongoDB 构建的增强版本。  
> 请点击此 [Artist Search Pro](https://github.com/zhichzhang/artist-search-pro) 和 [artist-search-pro-web-presentation.mp4](https://drive.google.com/file/d/1s1TLZP6b2hlV72P6W_J_aXHGdjfJovg7/view?usp=sharing) 获取更多详细信息。谢谢！

# 艺术家检索网页

本网页应用允许用户在 [Artsy](https://www.artsy.net/) 上搜索艺术家。只需输入艺术家姓名，即可查看搜索结果，并点击任意结果卡片查看更多详细信息。

## 部署之前

在部署应用之前，请按照以下步骤操作：

1. 访问 [Artsy API](https://developers.artsy.net/)，获取你的 `client_id`、`client_secret` 和 `token`。
2. 打开 [`token_util.py`](./app/utils/token_util.py)，根据注释配置上述参数。
3. 在 [`main-page.js`](./app/static/js/main-page.js) 中，通过设置 `DEV_VERSION_OPENED` 参数切换调试/部署模式：
   - 若为本地测试，设置 `DEV_VERSION_OPENED = true`；
   - 若为部署版本，设置 `DEV_VERSION_OPENED = false`，并将 `DOMAIN` 参数替换为你的实际云平台域名（请将 *my-domain* 替换成你的实际值）。

## 检索艺术家

1. 在搜索框中输入关键词，系统将从服务器获取相关艺术家结果，并以横向卡片形式展示。
2. 向右滑动卡片区域浏览更多结果。

## 获取详细信息

点击某位感兴趣的艺术家卡片，即可在结果区域下方查看该艺术家的出生日期、死亡日期（如适用）、国籍与个人简介等详细信息。

## 响应式设计

该应用采用响应式网页设计，能够根据不同设备自动调整布局，适配不同屏幕尺寸，优化浏览体验。

## 注意事项

本项目已根据个人需求进行了大幅度修改，因此与 CSCI 571 课程作业的原始要求存在显著差异。  
该项目仅用于学习与交流目的，**请勿抄袭或将代码用作课程作业提交**。
