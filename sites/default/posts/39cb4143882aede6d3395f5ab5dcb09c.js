{
    "id": "39cb4143882aede6d3395f5ab5dcb09c",
    "created": 1346933820000,
    "title": "Install Node.VaSH with NGINX !",
    "desc": "How to serve a node.js application with nginx web server ?",
    "raw": "### Some explanations ###\nThis article will explain you how to configure **[Node.VaSH](/node-js/node-js-can-replace-wordpress \"Install and try Node.VaSH\")** with NginX.\n\nIt has two pros for that :\n\n- Host others websites (php or other node.js apps) on same port (80)\n- Serve static files via nginx, and deserve node.js server at the same time.\n\n### Nginx Config ###\n\nChange server_name and log paths.\nYou have to configure : $root_path, $common_path and $public_path.\n\n``` bash\nvi /etc/nginx/sites-enabled/200-js2node.com\n```\n\nPut this into the file\n\n``` nginx\nupstream js2node_cluster_1 {\n    server 127.0.0.1:10000;\n}\n\nserver {\n\t# Server HTTP binding\n\tlisten 80;\n\tserver_name www.js2node.com js2node.com;\n\n\t# Logging\n\taccess_log\t/var/log/nginx/www.js2node.com.log;\n\terror_log\t/var/log/nginx/www.js2node.com_error.log;\n\n\t# Config APP paths\n\tset $root_path\t\t/var/www/Node.VaSH;\n\tset $common_path \t$root_path/libs/common;\n\tset $public_path \t$root_path/sites/default/public;\n\n\t# Root managed by nodejs\n\tlocation / {\n\t\tproxy_set_header\tX-Real-IP $remote_addr;\n\t\tproxy_set_header\tX-Forwarded-For $proxy_add_x_forwarded_for;\n\t\tproxy_set_header\tHost $http_host;\n\t\tproxy_set_header\tX-NginX-Proxy true;\n\t\tproxy_pass\t\t\thttp://js2node_cluster_1/;\n\t}\n\n\t# Static Common Files\n\tlocation /common/ {\n\t\troot            $common_path;\n\t\taccess_log      off;\n\t\texpires         30d;\n\n\t\t# Only allowed files are served\n\t\tif ( $request_filename !~* ^.+\\.(jpg|jpeg|gif|png|css|js|mp3) ) {\n\t\t\treturn   403;\n\t\t}\n\n\t\t# Shorten path \n\t\trewrite  ^/common/(.*)$  /$1 break;\n\t}\n\n\t# Servce assets for public Path\n\tlocation /assets/ {\n\t\troot            $public_path;\n\t\taccess_log      off;\n\t\texpires         30d;\n\n\t\t# Only allowed files are served\n\t\tif ( $request_filename !~* ^.+\\.(jpg|jpeg|gif|png|css|js|mp3) ) {\n\t\t\treturn   403;\n\t\t}\n\t}\n}\n```\n\n### Test config ### \n\nTest nginx config\n\n``` bash\n$ nginx -t\nthe configuration file /etc/nginx/nginx.conf syntax is ok\nconfiguration file /etc/nginx/nginx.conf test is successful\n```\n\nTest that node applications responds\n``` bash\n$ curl http//127.0.0.1:10000/\n```\n\n### Reload NGINX ### \n``` bash\n$ /etc/init.d/nginx reload\n```",
    "tags": [
        "Node.VaSH",
        "Node.js",
        "Nginx"
    ],
    "thumb": "/39cb4143882aede6d3395f5ab5dcb09c/thumb",
    "author": "delarueguillaume@gmail.com",
    "disabled": "no",
    "updated": 1347529656271
}