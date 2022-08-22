# k8s学习总结

## 集群环境搭建

### 安装docker

#### 改变driver

为docker添加配置，，driver采用systemd

```
more /etc/docker/daemon.json
```

#### docker安装完成

Ps:第一次安装为最新版，在阿里云拉不到镜像，后卸载重新安装

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810104247713.png" alt="image-20220810104247713" style="zoom: 67%;" />  

### 安装kubernetes插件

#### 切换镜源

Kubernetes镜源在国外，拉取比较慢，所以选择用阿里的镜源

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810104454246.png" alt="image-20220810104454246" style="zoom:67%;" />  

#### 配置kubelet

配置kubelet的cgroup，并添加以下配置，手动设置ipvs

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810104555643.png" alt="image-20220810104555643" style="zoom:67%;" /> 

###  集群镜像以及初始化

#### 查看所需镜像

- ```
  Kubeadm config images list
  ```

![image-20220810104748754](../AppData/Roaming/Typora/typora-user-images/image-20220810104748754.png) 

```
 for imageName in ${images[@]} ;do
 docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
 docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/$imageNmae k8s.gcr.io/$imageName
 docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
 done
```

![image-20220810104843018](../AppData/Roaming/Typora/typora-user-images/image-20220810104843018.png) 

## 创建dashboard

![image-20220810104924629](../AppData/Roaming/Typora/typora-user-images/image-20220810104924629.png) 

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810104931144.png" alt="image-20220810104931144" style="zoom:50%;" /> 

阿里镜像加速器地址：https://3g4p6hi0.mirror.aliyuncs.com

## 搭建私有仓库

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810105116716.png" alt="image-20220810105116716" style="zoom:67%;" />

- 登录：raye12345

- Data-password:11111

- Server.key:11111

  <img src="../AppData/Roaming/Typora/typora-user-images/image-20220810105152396.png" alt="image-20220810105152396" style="zoom:50%;" />

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810105204405.png" alt="image-20220810105204405" style="zoom:67%;" /> 

### 利用dockerfile拉取镜像

#### 创建镜像

![image-20220810105259486](../AppData/Roaming/Typora/typora-user-images/image-20220810105259486.png) 

拉取镜像到harbor，换电脑后发现打不开：

![image-20220810105329919](../AppData/Roaming/Typora/typora-user-images/image-20220810105329919.png) 

最后./prepare 重新填充配置，然后80端口被占用：

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810105436640.png" alt="image-20220810105436640"  /> 

杀死这个进程，成功访问。

```
netstat -tanlp
kill -9 +pid
```



## 安装helm并使用chart

![image-20220810105519328](../AppData/Roaming/Typora/typora-user-images/image-20220810105519328.png) 

安装前，未注意版本，导致不兼容，后重新安装。

![image-20220810105535841](../AppData/Roaming/Typora/typora-user-images/image-20220810105535841.png) 

## 安装Jenkins

### Java环境搭建

- Ubuntu18.0默认不安装Java，，而Jenkins依赖Java环境


- ```
  sudo apt-get install openjdk-8-jdk
  java -version
  ```

### Jenkins部署

#### 安装Jenkins

- ```
  sudo apt-get install jenkins
  ```


如图提示，Package ‘jenkins’ has no installation candidate，意思是没有包可以安装

![image-20220810102128654](../AppData/Roaming/Typora/typora-user-images/image-20220810102128654.png)  

更新安装包再安装 

![image-20220810102827073](../AppData/Roaming/Typora/typora-user-images/image-20220810102827073.png) 

#### 访问Jenkins

输入IP+8080

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810102942497.png" alt="image-20220810102942497" style="zoom: 33%;" /> 

获得管理员密码

```
 cat /var/lib/jenkins/secrets/initialAdminPassword
```

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810105910002.png" alt="image-20220810105910002" style="zoom: 28%;" /> 

选择安装推荐的插件

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810110008407.png" alt="image-20220810110008407" style="zoom:33%;" /> 

然后选择创建账户

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810111357598.png" alt="image-20220810111357598" style="zoom: 33%;" />

<img src="../AppData/Roaming/Typora/typora-user-images/image-20220810112218689.png" alt="image-20220810112218689" style="zoom: 33%;" />

以上，Jenkins配置完成。

### Jenkins 多分支流水线安装使用

#### 安装JDK

```
下载 jdk-8u341-linux-x64.tar.gz（也可以是其他版本，一样）
解压 /usr/local/jdk1.8.0_341
配置环境变量，在/etc/profile最后面添加如下2行
export JAVA_HOME=/usr/local/jdk1.8.0_341
export PATH=$JAVA_HOME/bin:$PATH
生效命令：source /etc/profile
```

#### 安装完成

![image-20220817093445197](../AppData/Roaming/Typora/typora-user-images/image-20220817093445197.png)

#### 安装maven

#### 下载安装包

下载地址

```
https://maven.apache.org/download.cgi
放在usr/local目录下
tar -zxvf 
```

#### 配置maven仓库

```
cd apache-maven-3.8.6   #进入目录
mkdir ck    #创建ck目录
cd conf            # 进入conf目录
vi settings.xm # settings.xm文件
<localRepository>/usr/local/apache-maven-3.8.6/ck</localRepository>
配置阿里仓库
<mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
       <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
</mirror>
```

#### 配置maven环境变量

```
vi /etc/profile
export MAVEN_HOME=/usr/local/apache-maven-3.8.6
export PATH=$PATH:$MAVEN_HOME/bin
使配置生效
source /etc/profile
```

![image-20220817100311296](../AppData/Roaming/Typora/typora-user-images/image-20220817100311296.png)

### 流水线

![image-20220817104704121](../AppData/Roaming/Typora/typora-user-images/image-20220817104704121.png)

![image-20220817104736453](../AppData/Roaming/Typora/typora-user-images/image-20220817104736453.png)

## Ubuntu安装gitlab

### 安装需要的库和软件

```
 sudo apt-get install curl openssh-server ca-certificates postfix 
```

![image-20220810134423916](../AppData/Roaming/Typora/typora-user-images/image-20220810134423916.png)



选择的第二个，也有选最后一个的。

### 添加[GitLab](https://so.csdn.net/so/search?q=GitLab&spm=1001.2101.3001.7020)的包并进行安装

```
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh |sudo bash 
sudo apt-get install gitlab-ce 
```

![image-20220810141902938](../AppData/Roaming/Typora/typora-user-images/image-20220810141902938.png)

后进度比较慢，选择手动下载

安装链接：https://packages.gitlab.com/gitlab/gitlab-ce

```shell
wget --content-disposition https://packages.gitlab.com/gitlab/gitlab-ce/packages/ubuntu/xenial/gitlab-ce_12.1.4-ce.0_amd64.deb/download.deb
本地安装
dpkg -i gitlab-ce_12.1.4-ce.0_amd64.deb
```

### 遇到的问题：被另一个进程占用：

![image-20220810143752585](../AppData/Roaming/Typora/typora-user-images/image-20220810143752585.png)

处理方式：

找到该进程，然后kill它，然后可以删除锁并重新配置dpkg:

```shell
 lsof /var/lib/dpkg/lock-frontend   
 sudo kill -3662 PID   
 sudo rm /var/lib/dpkg/lock-frontend
 sudo dpkg --configure -a
```

![image-20220810143837264](../AppData/Roaming/Typora/typora-user-images/image-20220810143837264.png)

![image-20220810144711502](../AppData/Roaming/Typora/typora-user-images/image-20220810144711502.png)

出现以上结果，说明安装成功。

### 配置gitlab

PS：unbuntu 下vi 输入i 不进入insert插入模式
原因：ubuntu预装的是vim tiny版本，需要的是vim full版本 —执行 ;

 ````
 sudo apt install vim
 vim /etc/gitlab/gitlab.rb
 ````

配置对外IP和默认端口：

```
 sudo EXTERNAL_URL="http://192.168.49.150:8099" apt-get install gitlab-ee
```









# Question

## Q1：进程被占用：

![image-20220810143752585](../AppData/Roaming/Typora/typora-user-images/image-20220810143752585.png)

处理方式：

找到该进程，然后kill它，然后可以删除锁并重新配置dpkg:

```shell
 lsof /var/lib/dpkg/lock-frontend   
 sudo kill -3662 PID   
 sudo rm /var/lib/dpkg/lock-frontend
 sudo dpkg --configure -a
```

![image-20220810143837264](../AppData/Roaming/Typora/typora-user-images/image-20220810143837264.png)

## Q2:利用docker创建容器,容器被占用

```
root@master:/# docker run -d  -p 443:443 -p 30010:80 -p 222:22 --name gitlab --restart always -v /docker/gitlib/config:/etc/gitlab -v /docker
docker: Error response from daemon: Conflict. The container name "/gitlab" is already in use by container "309061f51869c5380d8b0ed0e311bc17cd
See 'docker run --help'.
1，先查看容器：
docker ps -a
```

![image-20220811103815996](../AppData/Roaming/Typora/typora-user-images/image-20220811103815996.png)

```
看到了这个名为 gitlab/gitlab-ce 的容器
“docker ps” 是查看当前运行的容器，“docker ps -a” 是查看所有容器（包括停止的）。
移除这个容器
docker rm 309061f51869
然后再创建新容器
问题解决
```

## Github问题

### origin已经存在

```
git remote add origin**************
fatal: remote origin already exists.（报错远程起源已经存在。）
解决方法
1.先输入 git remote rm origin
2.再输入 git remote add origin**************
```

### ssh连接

```
git remote add origin******
The authenticity of host 'github.com ' can't be established（无法建立主机“github.com”的真实性）
解决办法：
这是由于git地址采用了ssh方式，切换为https方式即可
也可能是仓库地址不对，可以用命令先查看一下：git remove -v
如果跟你的github地址不一样，那就去你的github上复制一下仓库地址
git remote set-url origin https://github.com/yourname/learngit.git (这个是你的复制的仓库地址)
最后再push下就可以了！
git push origin (branch)
```

### 密码登录失败，token登录

```
问题：
remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/raye-s/test.git/'
大概意思就是你原先的密码凭证从2021年8月13日开始就不能用了，必须使用个人访问令牌（personal access token），就是把你的密码替换成token！
解决
在个人设置页面，找到Settings
选择开发者设置Developer setting
选择个人访问令牌Personal access tokens，然后选中生成令牌Generate new token
设置token的有效期，访问权限等
要使用token从命令行访问仓库，请选择repo。
要使用token从命令行删除仓库，请选择delete_repo
其他根据需要进行勾选
我的token：
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
也可以 把token直接添加远程仓库链接中，这样就可以避免同一个仓库每次提交代码都要输入token了：
git remote set-url origin https://<token>@github.com/<用户名>/<仓库名>.git
<token>：换成你自己得到的token
<用户名>：是你自己github的用户名
<仓库名>：是你的仓库名称
```

### github无法访问或者访问过慢

修改C:\Windows\System32\drivers\etc下的hosts文件

[点击查看](https://www.ipaddress.com/)github IP；

制最新的IP，添加到hosts文件中

![image-20220812155244928](../AppData/Roaming/Typora/typora-user-images/image-20220812155244928.png)

下次不能访问了，修改为最新的IP就行。

如果还是不行，打开cmd输入:

```
ipconfig/flushdns
```

### github推送到仓库

### 在命令行上创建新的仓库

```
echo "# 111" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:<用户名>/<仓库名>.git.
git push -u origin master
```

###  推送现有仓库

```
git remote add origin git@github.com:raye17/111.git
git branch -M master
git push -u origin master
```

### 因远程库与本地库不一致导致问题

![image-20220822150636110](../AppData/Roaming/Typora/typora-user-images/image-20220822150636110.png)

问题原因：远程库与本地库不一致造成的，在hint中也有提示把远程库同步到本地库就可以了。
解决办法：使用命令行：git pull --rebase origin master
该命令的意思是把远程库中的更新合并到（pull=fetch+merge）本地库中，–-rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中。出现如下 图执行pull执行成功后，可以成功执行git push origin master操作。

```
fatal: Updating an unborn branch with changes added to the index.
```

提交到版本库中的文件没有没有提交到 分支中,还在暂存区

所以执行 

```
git commit
```



```
     へ　　　　　／|
　　/＼7　　　 ∠＿/
　 /　│　　 ／　／
　│　Z ＿,＜　／　　 /`ヽ
　│　　　　　ヽ　　 /　　〉
　 Y　　　　　`　 /　　/
　ｲ●　､　●　　⊂⊃〈　　/
　()　 へ　　　　|　＼〈
　　>ｰ ､_　 ィ　 │ ／／
　 / へ　　 /　ﾉ＜| ＼＼
　 ヽ_ﾉ　　(_／　 │／／
　　7　　　　　　　|／
　　＞―r￣￣`ｰ―＿

```

over