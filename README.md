> Artist Search Pro 是我自己开发的使用 Angular、Bootstrap、Express.js 和 MongoDB 构建的增强版。请点击此[链接]((https://github.com/zhichzhang/artist-search-pro))了解更多详细信息。谢谢。
> Artist Search Pro, an enhanced version built using Angular, Bootstrap, Express.js, and MongoDB, was developed by myself. Please follow this [link](https://github.com/zhichzhang/artist-search-pro) for more details. Thanks.

# Artist Search
This web application allows users to search for artists on [Artsy](https://www.artsy.net/). Enter an artist's name to view search results, and click on a result card that interests you for more details.

## Before Deployment
Before deploying the application, visit the [Artsy API](https://developers.artsy.net/) to obtain your `client_id`, `client_secret`, and `token`. Then, go to [token_util.py](./app/utils/token_util.py) and configure the parameters as indicated in the annotations. In [main-page.js](./app/static/js/main-page.js), you can switch between the debug and deployment modes by setting the `DEV_VERSION_OPENED` parameter to `true` or `false`. To test the code locally, set `DEV_VERSION_OPENED` to `true`. For deployment, set `DEV_VERSION_OPENED` to `false` and specify your cloud platform domain in the `DOMAIN` parameter (replace *my-domain* with your actual domain).

## Search Artist
Enter a keyword in the search bar to receive relevant results from the server, displayed as a series of result cards. To explore more results, scroll the horizontal bar to the right.

## Get Detailed Info
If you find an artist interesting and want to learn more about them, click on the corresponding card. Detailed information, including their birthdate, death date (if applicable), nationality, and biography, will be displayed below.

## Responsive Design
The layout of the web application adjusts dynamically based on the screen size.

## Caution
This project has been significantly modified to meet my personal requirements, meaning it greatly diverges from the requirements mentioned in the CSCI 571 assignment. It is intended for discussion and study purposes only—please do not plagiarize the code.
