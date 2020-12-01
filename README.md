# <div align="center" style="font-weight:800; font-size: 30px">Halo Theme Xue</div>

<p align="center">
追求个性与至简
</p>

![GitHub release (latest by date)](https://img.shields.io/github/v/release/halo-dev/halo?label=halo&style=flat-square)

![](https://cdn.jsdelivr.net/gh/xzzai/static@master/uPic/screenshot-2300.png)



> 感谢https://github.com/ykfe/egg-react-ssr

## 说明

- [开始](https://baozi.fun/2020/09/29/halo-blog-transfer)
- [预览](#预览)
- [文档](https://baozi.fun/2020/10/05/theme-xue-showcase)
- [主题特性](#特性)
- [更新日志](#更新日志)

## 预览

[个人网站](https://baozi.fun)

## 特性

- [x] 前后端分离，使用React编写
- [x] 日志页面
- [x] 友链页面
- [x] 适配移动端
- [x] 代码行号显示
- [x] 链接页面分组显示
- [x] 相册页面
- [x] 随机文章封面

## 更新日志

- 2020-11-30 使用React重写主题

## 使用指南

### 本地开发

```bash
git clone https://github.com/xzhuz/halo-theme-react.git
cd halo-theme-react
npm install
npm start
```

### 发布到服务器

```bash
npm run deploy
```

### 连接halo接口

只用配置Nginx就可以，下面给一个模板。

```nginx
 server {
        listen       80;
        server_name  xxx.com;

         location / {
             proxy_pass http://localhost:7001;
             proxy_set_header X-Forwarded-Host $host;
             proxy_set_header X-Forwarded-Server $host;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $host:$server_port;
         }
                 
         location /api/ {
             proxy_pass http://localhost:8080;
             proxy_set_header X-Forwarded-Host $host;
             proxy_set_header X-Forwarded-Server $host;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $host:$server_port;
         }
                 
         location /upload/ {
             proxy_pass http://localhost:8080;
             proxy_set_header X-Forwarded-Host $host;
             proxy_set_header X-Forwarded-Server $host;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $host:$server_port;
         }

          location /admin/ {
             proxy_pass http://localhost:8080;
             proxy_set_header X-Forwarded-Host $host;
             proxy_set_header X-Forwarded-Server $host;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $host:$server_port;
           }

         }
```

