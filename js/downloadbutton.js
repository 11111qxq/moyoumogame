// $(document).ready(function () {
//   $(".download").click(function () {
//     const button = $(this);

//     // 添加 active 类，开始加载动画
//     button.addClass("active");

//     // 模拟下载过程
//     setTimeout(() => {
//       // 添加 verity 类，显示对勾动画
//       button.addClass("verity");

//       // 模拟下载完成后，恢复初始状态
//       setTimeout(() => {
//         button.removeClass("active verity"); // 移除 active 和 verity 类
//       }, 2000); // 对勾动画显示 1 秒后恢复初始状态
//     }, 2000); // 模拟下载过程持续 2 秒
//   });
// });
$(document).ready(function () {
  // 为第一个下载按钮（download1）添加点击事件
  $(".download1").click(function (e) {
    e.preventDefault();
    const button = $(this);

    // 开始加载动画
    button.addClass("active");

    setTimeout(() => {
      // 显示完成动画
      button.addClass("verity");

      // 下载第一个压缩包（鹤忆算学）
      downloadFile("../downloads/MemoryodMath", "鹤忆算学.zip");

      setTimeout(() => {
        button.removeClass("active verity");
      }, 2000);
    }, 2000);
  });

  // 为第二个下载按钮（download2）添加点击事件
  $(".download2").click(function (e) {
    e.preventDefault();
    const button = $(this);

    // 开始加载动画
    button.addClass("active");

    setTimeout(() => {
      // 显示完成动画
      button.addClass("verity");

      // 下载第二个压缩包（梦百草）
      downloadFile("../downloads/DreamofHerbs", "梦百草.zip");

      setTimeout(() => {
        button.removeClass("active verity");
      }, 2000);
    }, 2000);
  });

  // 通用的文件下载函数
  function downloadFile(filePath, fileName) {
    // 创建隐藏的下载链接
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;

    // 添加到DOM并触发点击
    document.body.appendChild(link);
    link.click();

    // 清理
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  }
});
