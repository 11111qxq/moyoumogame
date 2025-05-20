var curpage = 1;
var sliding = false;
var click = true;
var left = document.getElementById("left");
var right = document.getElementById("right");
var pagePrefix = "slide";
var pageShift = 500;
var transitionPrefix = "circle";
var svg = true;

function leftSlide() {
  const trailer = document.querySelector(".video-trailer");
  if (trailer.classList.contains("active")) return;

  if (click) {
    if (curpage == 1) curpage = 4;
    console.log("woek");
    sliding = true;
    curpage--;
    svg = true;
    click = false;
    for (k = 1; k <= 3; k++) {
      var a1 = document.getElementById(pagePrefix + k);
      a1.className += " tran";
    }
    setTimeout(() => {
      move();
    }, 200);
    setTimeout(() => {
      for (k = 1; k <= 3; k++) {
        var a1 = document.getElementById(pagePrefix + k);
        a1.classList.remove("tran");
      }
    }, 1400);
  }
}

function rightSlide() {
  const trailer = document.querySelector(".video-trailer");
  if (trailer.classList.contains("active")) return;

  if (click) {
    if (curpage == 3) curpage = 0;
    console.log("woek");
    sliding = true;
    curpage++;
    svg = false;
    click = false;
    for (k = 1; k <= 3; k++) {
      var a1 = document.getElementById(pagePrefix + k);
      a1.className += " tran";
    }
    setTimeout(() => {
      move();
    }, 200);
    setTimeout(() => {
      for (k = 1; k <= 3; k++) {
        var a1 = document.getElementById(pagePrefix + k);
        a1.classList.remove("tran");
      }
    }, 1400);
  }
}

function move() {
  if (sliding) {
    sliding = false;
    if (svg) {
      for (j = 1; j <= 15; j++) {
        var c = document.getElementById(transitionPrefix + j);
        c.classList.remove("steap");
        c.setAttribute("class", transitionPrefix + j + " streak");
        console.log("streak");
      }
    } else {
      for (j = 16; j <= 30; j++) {
        var c = document.getElementById(transitionPrefix + j);
        c.classList.remove("steap");
        c.setAttribute("class", transitionPrefix + j + " streak");
        console.log("streak");
      }
    }
    setTimeout(() => {
      for (i = 1; i <= 4; i++) {
        if (i == curpage) {
          var a = document.getElementById(pagePrefix + i);
          a.className += " up1";
        } else {
          var b = document.getElementById(pagePrefix + i);
          b.classList.remove("up1");
        }
      }
      sliding = true;
    }, 600);
    setTimeout(() => {
      click = true;
    }, 1700);

    setTimeout(() => {
      if (svg) {
        for (j = 1; j <= 15; j++) {
          var c = document.getElementById(transitionPrefix + j);
          c.classList.remove("streak");
          c.setAttribute("class", transitionPrefix + j + " steap");
        }
      } else {
        for (j = 16; j <= 30; j++) {
          var c = document.getElementById(transitionPrefix + j);
          c.classList.remove("streak");
          c.setAttribute("class", transitionPrefix + j + " steap");
        }
        sliding = true;
      }
    }, 850);
    setTimeout(() => {
      click = true;
    }, 1700);
  }
}

left.onmousedown = () => {
  leftSlide();
};

right.onmousedown = () => {
  rightSlide();
};

//视频响应
// 视频控制功能
function setupVideoTriggers() {
  const trailer = document.querySelector(".video-trailer");
  const video = document.querySelector(".video-trailer video");
  const closeBtn = document.querySelector(".video-close-btn");
  const bgMusic = document.getElementById("aud"); // 获取背景音乐元素

  // function toggleVideo() {
  //   if (trailer.classList.contains("active")) {
  //     // 关闭视频时恢复背景音乐
  //     bgMusic.muted = false;
  //     bgMusic.play().catch((e) => console.log("音乐恢复失败"));
  //     // video.pause();
  //     // video.currentTime = 0;
  //   } else {
  //     // 打开视频时暂停背景音乐
  //     bgMusic.pause();
  //     video.play();
  //   }
  //   trailer.classList.toggle("active");
  // }

  // // 设置视频触发区域点击事件
  // document.querySelectorAll(".video-trigger-area").forEach((trigger) => {
  //   trigger.addEventListener("click", function (e) {
  //     // 防止事件冒泡影响滑动功能
  //     if (click) {
  //       e.stopPropagation();
  //       // video.src = this.getAttribute("data-video");
  //       // toggleVideo();
  //       video.src = this.getAttribute("data-video");
  //       video.oncanplay = function () {
  //         toggleVideo();
  //         video.play().catch((e) => console.log("视频播放失败:", e));
  //       };
  //       video.load();
  //     }
  //   });
  // });

  // // 关闭按钮事件
  // closeBtn.addEventListener("click", function (e) {
  //   e.stopPropagation();
  //   video.pause();
  //   toggleVideo();
  // });

  function toggleVideo(open) {
    if (open) {
      // 打开视频时暂停背景音乐
      bgMusic.pause();
      trailer.classList.add("active");
      video.play();
    } else {
      // 关闭视频时恢复背景音乐
      video.pause();
      trailer.classList.remove("active");
      bgMusic.muted = false;
      bgMusic.play().catch((e) => console.log("音乐恢复失败"));
    }
  }

  // 设置视频触发区域点击事件 - 只负责打开视频
  document.querySelectorAll(".video-trigger-area").forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      if (click) {
        e.stopPropagation();
        video.src = this.getAttribute("data-video");
        video.oncanplay = function () {
          toggleVideo(true);
          video.play().catch((e) => console.log("视频播放失败:", e));
        };
        video.load();
      }
    });
  });

  // 关闭按钮事件 - 唯一能关闭视频的方式
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleVideo(false);
  });

  // 阻止点击视频区域关闭视频
  trailer.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // 阻止点击视频本身关闭视频
  video.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

// 初始化
document.addEventListener("DOMContentLoaded", function () {
  // setupVideoTriggers();

  // // 初始化背景音乐（只执行一次）
  // const bgMusic = document.getElementById("aud");
  // bgMusic.play().catch((e) => console.log("自动播放被阻止:", e));
  // bgMusic.loop = true;
  const bgMusic = document.getElementById("aud");

  // 初始化音乐（静音自动播放）
  bgMusic.muted = true;
  bgMusic
    .play()
    .then(() => console.log("静音自动播放成功"))
    .catch((e) => console.log("静音自动播放失败:", e));

  // 用户首次交互时取消静音
  const unmuteOnInteraction = function () {
    bgMusic.muted = false;
    // 尝试播放（非静音）
    bgMusic.play().catch((e) => console.log("非静音播放失败:", e));
    // 移除监听，只需执行一次
    document.body.removeEventListener("click", unmuteOnInteraction);
    document.body.removeEventListener("touchstart", unmuteOnInteraction);
  };

  // 同时监听点击和触摸事件
  document.body.addEventListener("click", unmuteOnInteraction, { once: true });
  document.body.addEventListener("touchstart", unmuteOnInteraction, {
    once: true,
  });

  bgMusic.loop = true;
  setupVideoTriggers();
});

// //BGM
// window.onload = function () {
//   setInterval("toggleSound()", 1);
// };

// function toggleSound() {
//   var music = document.getElementById("aud");
//   if (music.paused) {
//     music.paused = false;
//     music.play();
//   }
// }
