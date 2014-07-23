#!/bin/bash
cp myNovellApp /etc/init.d
ln -s /etc/init.d/myNovellApp /sbin/rcmyNovellApp
exit 0