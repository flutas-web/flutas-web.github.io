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
 echo ΢��Office�����
 echo=
 echo �汾 1.3.2
 echo �����µ�OfcAct https://flutas-web.github.io/products/OfcAct
 echo=
 @timeout /nobreak -t 1   >nul
 echo ofcact [/isp]^|[/pk]^|[/act]^|[�޲���]
 echo     /isp ֻ��װ���֤
 echo     /pk ָ������Ϊ25λ�Ĳ�Ʒ�ܳף���ָ����ѡ�ֻʹ��Ĭ��
 echo     /act ����Office����Ͳ�ʹ�ò�����һ����
 exit /b
)
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\Security"
if '%errorlevel%' NEQ '0' (
goto UACPrompt
) else ( goto gotAdmin )
:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "%*", "", "runas", 1 >> "%temp%\getadmin.vbs"
echo �����Թ���Ա�������!!!
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
 echo ΢��Office�����  x64
 echo=
 echo �汾 1.3.2
 echo �����µ�OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo ����ʾ�������ʱ�����Office�������^(��ҳ - �˻� - ����^)�鿴����״̬
echo ע��!����Office 2016�����ϰ汾���Լ���
echo=
echo ���ڰ�װ���֤,���Ժ�...
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
 echo ΢��Office�����
 echo=
 echo �汾 1.3.2
 echo �����µ�OfcAct https://flutas-web.github.io/products/OfcAct
 echo=
 echo ����ʾ�������ʱ�����Office�������^(��ҳ - �˻� - ����^)�鿴����״̬
 echo ע��!����Office 2016�����ϰ汾���Լ���
 echo=
 echo ���ڰ�װ��Ʒ�ܳף����Ժ�...
cscript ospp.vbs /inpkey:%pky%|findstr "Product key installation successful" >nul && echo off || goto pke
cscript ospp.vbs /sethst:kms.03k.org >nul
 cls
 echo OfcAct
 echo ΢��Office�����
 echo=
 echo �汾 1.3.2
 echo �����µ�OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo ����ʾ�������ʱ�����Office�������^(��ҳ - �˻� - ����^)�鿴����״̬
echo ע��!����Office 2016�����ϰ汾���Լ���
echo=
echo ���ڼ����Ʒ�����Ժ�...
cscript ospp.vbs /act|findstr "Product activation successful" >nul && echo off || goto error
)
::color 9F
cls
echo OfcAct
 echo ΢��Office�����
 echo=
 echo �汾 1.3.2
 echo �����µ�OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo ����ʾ�������ʱ�����Office�������^(��ҳ - �˻� - ����^)�鿴����״̬
echo ע��!����Office 2016�����ϰ汾���Լ���
echo=
echo -Office ��������-
echo=
echo �����Ȩ���񱨸��Ѽ���ò�Ʒ����������Ӧ����Ʒʹ��Ȩ����
echo=
echo -Office ��������-
echo=
echo �������鿴����״̬
echo=
color
exit /B
:error
::color 4F
cls
echo OfcAct
 echo ΢��Office�����
 echo=
 echo �汾 1.3.2
 echo �����µ�OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo ����ʾ�������ʱ�����Office�������^(��ҳ - �˻� - ����^)�鿴����״̬
echo ע��!����Office 2016�����ϰ汾���Լ���
echo=
echo -Office ��������-
echo=
echo �����Ȩ���񱨸��Ʒ����ʧ��!���Ժ�����
echo=
echo -Office ��������-
echo=
color
exit /b
:pke
cls
echo OfcAct
 echo ΢��Office�����
 echo=
 echo �汾 1.3.2
 echo �����µ�OfcAct https://flutas-web.github.io/products/OfcAct
echo=
echo ����ʾ�������ʱ�����Office�������^(��ҳ - �˻� - ����^)�鿴����״̬
echo ע��!����Office 2016�����ϰ汾���Լ���
echo=
echo -Office ��������-
echo=
echo �����Ȩ���񱨸��Ʒ�ܳ���Ч!
echo=
echo -Office ��������-
echo=
color
exit /b
:2p
if '%2' neq '' (
  set "pky=%2"
  goto act
)