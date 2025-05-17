> 目前该项目已升级为 Artist Search Pro，这是一个基于 Angular、Bootstrap、Express.js 和 MongoDB 构建的增强版本。  
> 请点击此 [链接](https://github.com/zhichzhang/artist-search-pro) 和 [基本功能演示视频](https://drive.google.com/file/d/1s1TLZP6b2hlV72P6W_J_aXHGdjfJovg7/view?usp=sharing) 获取更多详细信息。谢谢！
> The project has now been upgraded to **Artist Search Pro**, an enhanced version built with Angular, Bootstrap, Express.js, and MongoDB.  
> Please check out this [link](https://github.com/zhichzhang/artist-search-pro) and the [demo video](https://drive.google.com/file/d/1s1TLZP6b2hlV72P6W_J_aXHGdjfJovg7/view?usp=sharing) for more details. Thank you!


# 艺术家检索 / Artist Search

This web application allows users to search for artists on [Artsy](https://www.artsy.net/).  
Simply enter an artist’s name to view search results, and click on any result card to view more details.

---

## 部署之前 / Before Deployment

To deploy the application:

1. Visit the [Artsy API](https://developers.artsy.net/) to obtain your `client_id`, `client_secret`, and `token`.
2. Open [`token_util.py`](./app/utils/token_util.py) and configure the credentials as indicated in the comments.
3. In [`main-page.js`](./app/static/js/main-page.js), toggle the deployment mode via the `DEV_VERSION_OPENED` flag:
   - Set `DEV_VERSION_OPENED = true` for local testing.
   - Set `DEV_VERSION_OPENED = false` for deployment, and replace the `DOMAIN` parameter with your actual cloud domain (replace *my-domain* accordingly).

---

## 检索艺术家 / Search Artist

Type a keyword into the search bar to receive relevant results from the server, shown as a horizontal row of result cards.  
Scroll the bar to the right to explore more results.

---

## 获取详细信息 / Get Detailed Info

If you're interested in a particular artist, click their card to reveal more detailed information—  
including birthdate, death date (if applicable), nationality, and biography—displayed below the result section.

---

## 响应式设计 / Responsive Design

The layout of the application adapts responsively to different screen sizes for optimal viewing on various devices.

---

## 注意事项 / Caution

本项目已根据个人需求进行了大幅度修改，因此与 CSCI 571 课程作业的原始要求存在显著差异。  
该项目仅用于学习与交流目的，**请勿抄袭或将代码用作课程作业提交**。

This project has been extensively customized to meet my personal requirements and therefore differs significantly from the original CSCI 571 assignment.  
It is intended solely for study and discussion purposes—**please do not plagiarize or submit the code for academic coursework.**
