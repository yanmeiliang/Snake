//关于游戏内容
//（1）在开始的以后，食物和蛇出现
//（2）对象有蛇和食物两个
/*---------------------控制键盘的上下左右键来控制蛇移动----------------------
* (1)、键盘控制方向
* （2）、方向定了之后一直运动(定时器)
* （3）、可以暂停（space是暂停）（暂停定时器）
*（4）上下左右键控制方向 space暂停37-40从左 上 右 下
*
* */
/*
------------以后补充功能--------------------
（1）多食物
（2）有多个速度可供选择
 */
// 当蛇的头部和蛇碰撞此时这个食物消失，另外生成一个事物，并且分数加1，蛇身加一节
// 开始的js
//全局变量s
//snake是蛇实例化 snake1是界面的蛇
//------------------------全局变量---------------------
var snakeHead=null, snake1 ,snakeArr=[],snake=null;
var box;
var data=[{x:500,y:180},{x:520,y:180},{x:540,y:180},{x:560,y:180}];//存蛇身
var timeId=null;//运动的定时器的id
var x,y;//蛇的位置
var food;//食物的对象
var SumScore=0,scoreContent;
var flag;
//----------------入口代码----------------------
window.onload=function () {
    snake=new Snake();
    food1=new  Food();
    Show();
    for(var i=0;i<snake1.children.length;i++)
    {
        snakeArr.push(snake1.children[i]);
    }
    //移动
    snake.move();

}
//模块化
//---------------------1、模块化开始界面-----------------------------
function Show() {
    var sho=document.getElementById('shw');
    var score=document.getElementById('score');
    snake1=document.getElementById('snake');
    snakeHead=document.getElementById('snake_head');
    box=document.getElementById('box');
    scoreContent=document.getElementById('scorecontent');
    sho.onclick=function () {
        this.style.display='none';
        score.style.display='block';
        snake1.style.display='block';
        food1.creatFood();
    }
}
//------------------------------------蛇对象---------------------------
function Snake(){
  // 1------------------ 蛇移动-------------------------------
  this.move=function () {
     document.onkeydown=function (event) {
         event=event||window.event;
         var decroation=event.keyCode;
         switch (decroation) {
             case 37:
                 snakeHead.style.left=snakeHead.offsetLeft-20+'px';
                 snake.remove();
                 //重复移动
                 sport(decroation);
                 break;
             case 38:
                 snakeHead.style.top=snakeHead.offsetTop-20+'px';
                 snake.remove();
                 sport(decroation);
                 break;
             case 39:
                 snakeHead.style.left=snakeHead.offsetLeft+20+'px';
                 snake.remove();
                 sport(decroation);
                 break;
             case 40:
                 snakeHead.style.top=snakeHead.offsetTop+20+'px';
                 snake.remove();
                 sport(decroation);
                 break;
             case  32:
                 clearInterval(timeId);
                 break;
         }
     }
     this.remove=function () {
       //  移动
         snake.died();
       for(var i=1;i<snakeArr.length;i++)
       {
           snake1.children[i].style.left=data[i-1].x+'px';
           snake1.children[i].style.top=data[i-1].y+'px';

           if(Math.abs(x-data[0].x)<=20&&Math.abs(y-data[i].y)<=20)
           {
               console.log();
              food1.change();
              //新建的位置
              snake.creat();
           }
       }

       //刷新移动后的距离
       for(var j=0;j<snakeArr.length;j++)
       {
           data[j].x=snake1.children[j].offsetLeft;
           data[j].y=snake1.children[j].offsetTop;
       }
     }
     //-----------------判断是否失败----------------
  //    （1）,撞墙，撞自己
      this.died=function () {
      //   (1)、撞墙
          if(data[0].x<20 || data[0].x>960 ||data[0].y<20 ||data[0].y>500)
          {
             flag=confirm(` 总分数:${SumScore}分   碰到墙壁 game over ！！！！是否重新开始`);
             console.log(flag);
              if(flag)
              {
                  location.reload(true);
              }
              clearInterval(timeId);
            return false;
          }
      //  头碰到身体giveover
          for(var z=1;z<data.length;z++)
          {
              if(Math.abs(data[0].x-data[z].x)<20 && Math.abs(data[0].y-data[z].y)<20)
              {
                  flag=confirm(` 总分数:${SumScore}分   撞到自己 game over ！！！！是否重新开始`);
                  console.log(flag);
                  if(flag)
                  {
                      location.reload(true);
                  }
                  clearInterval(timeId);
                  return false;
              }
          }
      }
  }
  //------------------------------ 蛇身加长创建------------------------------------
  this.creat=function () {
      SumScore+=1;
   var div=document.createElement('div');
    div.className='creatbody';
    div.style.left=data[data.length-2].x+'px';
    div.style.top=data[data.length-2].y+'px';
    snake1.appendChild(div);
    //分数
      scoreContent.innerText=SumScore;
    console.log(snake1);
    snake.remove();
    snakeArr.push(div);
    data.push({x:data[data.length-1].x,y:data[data.length-1].y});
  }
}
//如果确定好方向一直走
//------------------------蛇一直运行---------------------------------
function sport(decroation) {
    if(timeId!=null)
    {
        clearInterval(timeId);
    }
        timeId=setInterval(function () {

            switch (decroation) {
                case 37:
                    snakeHead.style.left=snakeHead.offsetLeft-20+'px';
                    snake.remove();
                    break;
                case 38:
                    snakeHead.style.top=snakeHead.offsetTop-20+'px';
                    snake.remove();
                    break;
                case 39:
                    snakeHead.style.left=snakeHead.offsetLeft+20+'px';
                    snake.remove();
                    break;
                case 40:
                    snakeHead.style.top=snakeHead.offsetTop+20+'px';
                    snake.remove();
                    break;
            }
        },100);

}
//-----------------食物---------------------
    function Food() {
        /*      // 食物的位置width: 1000/20=50;  x:0-49
            height: 500/20=25; y:0-24
         */
        x=parseInt(Math.random()*49)*20;
        y=parseInt(Math.random()*24)*20;

       this.creatFood=function () {
              food=document.createElement('div');
               food.className='food';
             food.style.left=x+'px';
             food.style.top=y+'px';
               box.appendChild(food);
       }
      this.change=function () {
         x=parseInt(Math.random()*49)*20;
          y=parseInt(Math.random()*24)*20;
          food.style.left=x+'px';
          food.style.top=y+'px';
      }
}