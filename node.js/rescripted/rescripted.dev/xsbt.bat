@echo off
set SCRIPT_DIR=%~dp0

set JAVA_HOME=C:\Program Files\Java\jdk1.7.0_01
set PATH=%PATH%;%JAVA_HOME%\bin\

java -Xmx512M -jar "%SCRIPT_DIR%sbt-launch.jar" %*
