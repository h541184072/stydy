-   [玩转前端 Video 播放器](https://juejin.im/post/6850037275579121671)

video 范围请求的响应

    request:header
        range: bytes=0-
    reponse:header
        Content-Range: bytes 0-7978698/7978699
        accept-ranges: bytes

    成功:206
    范围越界:416
    不支持范围:200

流媒体

    实现流式传输主要有两种方式: 顺序流式传输,实时流式传输

---
HLS (HTTP Live Streaming)
---

    HLS 将播放使用 H.264 或 HEVC / H.265 编解码器编码的视频。
    HLS 将播放使用 AAC 或 MP3 编解码器编码的音频。
    HLS 视频流一般被切成 10 秒的片段。
    HLS 的传输/封装格式是 MPEG-2 TS。
    HLS 支持 DRM（数字版权管理）。
    HLS 支持各种广告标准，例如 VAST 和 VPAID。

为什么苹果要提出 HLS 这个协议，其实它的主要是为了解决 RTMP 协议存在的一些问题。
比如 RTMP 协议不使用标准的 HTTP 接口传输数据，所以在一些特殊的网络环境下可能被防火墙屏蔽掉。
但是 HLS 由于使用的 HTTP 协议传输数据，通常情况下不会遇到被防火墙屏蔽的情况。除此之外，
它也很容易通过 CDN（内容分发网络）来传输媒体流。

HLS 自适应比特流

    自适应每个人的网络状况 传输高清视频或者分辨率较低的视频
    在开始一个流媒体会话时，客户端会下载一个包含元数据的 Extended M3U（m3u8）Playlist 文件，用于寻找可用的媒体流。
    
---
DASH (bilibili)
---    

---
FLV
--- 

Blob

    Blob 由一个可选的字符串 type（通常是 MIME 类型）和 blobParts 组成：

Blob URL/Object URL

    URL.createObjectURL(Blob) 在内存中 文档卸载是才释放
    URL.revokeObjectURL(url)

Blob vs ArrayBuffer

    除非你需要使用 ArrayBuffer 提供的写入/编辑的能力，否则 Blob 格式可能是最好的。
    Blob 对象是不可变的，而 ArrayBuffer 是可以通过 TypedArrays 或 DataView 来操作。
    ArrayBuffer 是存在内存中的，可以直接操作。而 Blob 可以位于磁盘、高速缓存内存和其他不可用的位置。
    虽然 Blob 可以直接作为参数传递给其他函数，比如 window.URL.createObjectURL()。但是，你可能仍需要 FileReader 之类的 File API 才能与 Blob 一起使用。
    Blob 与 ArrayBuffer 对象之间是可以相互转化的：
        使用 FileReader 的 readAsArrayBuffer() 方法，可以把 Blob 对象转换为 ArrayBuffer 对象；
        使用 Blob 构造函数，如 new Blob([new Uint8Array(data]);，可以把 ArrayBuffer 对象转换为 Blob 对象。
