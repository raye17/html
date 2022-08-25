            var oImg = document.getElementsByClassName('f1')
            var oImg2 = document.getElementsByClassName('f2')
            var oImg3 = document.getElementsByClassName('f3')
            var len = oImg.length;
            console.log(len)
            var deg = 360 / len;
 
            var oWrap = document.getElementById("imgwrap");
            // var oWrap=document.querySelector('.wrap');
 
            //页面加载完毕在执行的代码
            window.onload = function () {
                  Array.prototype.forEach.call(oImg, function (ele, index, self) {
                        // 旋转并沿Z轴平移
                        ele.style.transform = "rotateY(" + deg * index + "deg) translateZ(645.75px)";
                        //过渡时间1s
                        ele.style.transition = "1s " + (len - index) * 0.1 + "s";
 
                  });
                  Array.prototype.forEach.call(oImg2, function (ele, index, self) {
                        // 旋转并沿Z轴平移
                        ele.style.transform = "rotateY(" + deg * index + "deg) translateZ(645.75px) translateY(240px)";
                        //过渡时间1s
                        ele.style.transition = "1s " + (len - index) * 0.1 + "s";
 
                  });
                  Array.prototype.forEach.call(oImg3, function (ele, index, self) {
                        // 旋转并沿Z轴平移
                        ele.style.transform = "rotateY(" + deg * index + "deg) translateZ(645.75px) translateY(480px)";
                        //过渡时间1s
                        ele.style.transition = "1s " + (len - index) * 0.1 + "s";
 
                  });
                  // Array.prototype.forEach.call(oImg, function (ele, index, self) {
                  //       // 旋转并沿Z轴平移
                  //       ele.style.transform = "rotateY(" + deg * index + "deg) translateZ(350px)";
                  //       //过渡时间1s
                  //       ele.style.transition = "1s " + (len - index) * 0.1 + "s";
 
                  // });
 
            }
            //翻动3D相册
            var newX, newY, lastX, lastY, minusX, minusY, rotX = -20, rotY = 0;
 
            document.onmousedown = function (e) {
                  // 点击设置初值
                  lastX = e.clientX;
                  lastY = e.clientY;
 
                  this.onmousemove = function (e) {
                        newX = e.clientX;
                        newY = e.clientY;
                        minusX = newX - lastX;
                        minusY = newY - lastY;
 
                        rotX -= minusY * 0.2;
                        rotY += minusX * 0.1;
                        oWrap.style.transform = "rotateX(" + rotX + "deg) rotateY(" + rotY + "deg)";
                        lastX = newX;
                        lastY = newY;
 
                  }
                  this.onmouseup = function (e) {
                        //鼠标松开
                        this.onmousemove = null;//清除鼠标移动
                  }
                  function preloadImg(){
                    var loadImg = []; // 创建一个数组，
                    // 通过push方法，将图片路径添加进数组
                    loadImg.push('../img/1.jpg');
                    loadImg.push('../img/2.jpg');
                    loadImg.push('../img/3.jpg');
                    loadImg.push('../img/4.jpg');
                    loadImg.push('../img/5.jpg');
                    loadImg.push('../img/6.jpg');
                    loadImg.push('../img/7.jpg');
                    loadImg.push('../img/8.jpg');
                    loadImg.push('../img/9.jpg');
                    loadImg.push('../img/10.jpg');
                    loadImg.push('../img/11.jpg');
                    loadImg.push('../img/12.jpg');
                    loadImg.push('../img/13.jpg');
                    loadImg.push('../img/14.jpg');
                    loadImg.push('../img/ht01.jpg');
                    loadImg.push('../img/ht02.jpg');
                    loadImg.push('../img/ll01.jpg');
                    loadImg.push('../img/ll02.jpg');
                    //遍历数组    执行上述步骤1和步骤2
                    for(var i=0;i<loadImg.length;i++){
                    var newImg = new Image();
                       newImg.src = loadImg[i];
                    }
                }
                //步骤3
                window.addEventListener('load',function(){
                //调用预加载函数
                    preloadImg()
                })
            }
