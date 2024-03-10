::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAjk
::fBw5plQjdCuDJH2B50kkJwtoxcVbu5B0Opoa7uH46qSOoUJ9
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+JeA==
::cxY6rQJ7JhzQF1fEqQJQ
::ZQ05rAF9IBncCkqN+0xwdVs0
::ZQ05rAF9IAHYFVzEqQJQ
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCuDJH2B50kkJwtoxcVbu5B0OpMQ/fz6/MiIunGYiiy3pUBdBVQI9DuUO55holOoM61mt80KBRhd+M1L6NvvlUFEtUWGI/iE61mvT1CMhg==
::YB416Ek+ZW8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
set "pgm=%ProgramFiles%"
if '%1' equ '/?' (
 echo OfcAct
 echo 微软Office激活工具
 echo=
 echo 版本 1.3.2
 echo 尝试新的OfcAct https://flutas-web.github.io/products/OfcAct
 echo=
 @timeout /nobreak -t 1   >nul
 echo ofcact [/isp]^|[/pk]^|[/act]^|[无参数]
 echo     /isp 只安装许可证
 echo     /pk 指定长度为25位的产品密匙，不指定该选项将只使用默认
 echo     /act 激活Office。这和不使用参数是一样的
 exit /b
)
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\Security"
if '%errorlevel%' NEQ '0' (
goto UACPrompt
) else ( goto gotAdmin )
:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "%*", "", "runas", 1 >> "%temp%\getadmin.vbs"
echo 正在以管理员身份启动!!!
cscript "%temp%\getadmin.vbs" >nul
exit /B
:gotAdmin
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
pushd "%CD%"
color F0
cd /d %~dp0
set "Type=0"
set "pky=HFTND-W9MK4-8B7MJ-B6C4G-XQBR2"
title OfcAct By Xbodw
if '%1' equ '/isp' (
 set Type=1
 goto act
)
if '%1' equ '/act' (
 goto act
)
if '%1' equ '/pk' (
  goto 2p
)
:act
dir /b "%pgm%\Microsoft Office\Office*" > temp.tmp
for /f %%i in (temp.tmp) do (set "Office=%%i")
cd /d "%pgm%\Microsoft Office\%Office%"
del /f /q "%~dp0\temp.tmp"
echo OfcAct
 echo 微软Office激活工具  x64
 echo=
 echo 版本 1.3.2
 echo 尝试新的OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo 当提示激活完成时，请打开Office任意软件^(主页 - 账户 - 激活^)查看激活状态
echo 注意!仅限Office 2016及以上版本可以激活
echo=
echo 正在安装许可证,请稍候...
for /f %%r in ('dir /b ..\root\Licenses16\mondovl*.xrm-ms') do (cscript ospp.vbs /inslic:"..\root\Licenses16\%%r" >nul )
cscript ospp.vbs /inslic:"..\root\Licenses16\client-issuance-bridge-office.xrm-ms" >nul
cscript ospp.vbs /inslic:"..\root\Licenses16\client-issuance-root-bridge-test.xrm-ms" >nul
cscript ospp.vbs /inslic:"..\root\Licenses16\client-issuance-ul-oob.xrm-ms" >nul
cscript ospp.vbs /inslic:"..\root\Licenses16\client-issuance-ul.xrm-ms" >nul
cscript ospp.vbs /inslic:"..\root\Licenses16\client-issuance-stil.xrm-ms" >nul
cscript ospp.vbs /inslic:"..\root\Licenses16\client-issuance-root.xrm-ms" >nul
cscript ospp.vbs /inslic:"..\root\Licenses16\pkeyconfig-office-client15.xrm-ms" >nul
cscript ospp.vbs /inslic:"..\root\Licenses16\pkeyconfig-office.xrm-ms" >nul
if '%Type%' neq '1' (
 cls
 echo OfcAct
 echo 微软Office激活工具
 echo=
 echo 版本 1.3.2
 echo 尝试新的OfcAct https://flutas-web.github.io/products/OfcAct
 echo=
 echo 当提示激活完成时，请打开Office任意软件^(主页 - 账户 - 激活^)查看激活状态
 echo 注意!仅限Office 2016及以上版本可以激活
 echo=
 echo 正在安装产品密匙，请稍候...
cscript ospp.vbs /inpkey:%pky%|findstr "Product key installation successful" >nul && echo off || goto pke
cscript ospp.vbs /sethst:kms.03k.org >nul
 cls
 echo OfcAct
 echo 微软Office激活工具
 echo=
 echo 版本 1.3.2
 echo 尝试新的OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo 当提示激活完成时，请打开Office任意软件^(主页 - 账户 - 激活^)查看激活状态
echo 注意!仅限Office 2016及以上版本可以激活
echo=
echo 正在激活产品，请稍候...
cscript ospp.vbs /act|findstr "Product activation successful" >nul && echo off || goto error
)
::color 9F
cls
echo OfcAct
 echo 微软Office激活工具
 echo=
 echo 版本 1.3.2
 echo 尝试新的OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo 当提示激活完成时，请打开Office任意软件^(主页 - 账户 - 激活^)查看激活状态
echo 注意!仅限Office 2016及以上版本可以激活
echo=
echo -Office 激活处理服务-
echo=
echo 软件授权服务报告已激活该产品，但所有者应检查产品使用权利。
echo=
echo -Office 激活处理服务-
echo=
echo 请打开软件查看激活状态
echo=
color
exit /B
:error
::color 4F
cls
echo OfcAct
 echo 微软Office激活工具
 echo=
 echo 版本 1.3.2
 echo 尝试新的OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo 当提示激活完成时，请打开Office任意软件^(主页 - 账户 - 激活^)查看激活状态
echo 注意!仅限Office 2016及以上版本可以激活
echo=
echo -Office 激活处理服务-
echo=
echo 软件授权服务报告产品激活失败!请稍候重试
echo=
echo -Office 激活处理服务-
echo=
color
exit /b
:pke
cls
echo OfcAct
 echo 微软Office激活工具
 echo=
 echo 版本 1.3.2
 echo 尝试新的OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo 当提示激活完成时，请打开Office任意软件^(主页 - 账户 - 激活^)查看激活状态
echo 注意!仅限Office 2016及以上版本可以激活
echo=
echo -Office 激活处理服务-
echo=
echo 软件授权服务报告产品密匙无效!
echo=
echo -Office 激活处理服务-
echo=
color
exit /b
:2p
if '%2' neq '' (
  set "pky=%2"
  goto act
)