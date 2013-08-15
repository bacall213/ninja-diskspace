Ninja Diskspace Monitor
=======================
Author: Brian Call
Based on ninja-diskspace by Paul Cull
Version: 0.0.3
Status: Stable
License: MIT


## Installation
### Step 1 - fetch driver
```
cd PATH_TO_NINJA_CLIENT/drivers
git clone https://github.com/bacall213/ninja-diskspace.git
cd ninja-diskspace
npm install
```

check the device that you want monitor
df -k

Results should look like
```
ubuntu@ninjablock:~$ df -k
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/mmcblk0p2   3736512 1026724   2522448  29% /
udev              124224       4    124220   1% /dev
tmpfs              50316     180     50136   1% /run
none                5120       0      5120   0% /run/lock
none              125780       0    125780   0% /run/shm
tmpfs              51200    6128     45072  12% /var/log
/dev/mmcblk0p1     65390   11152     54238  18% /boot/uboot
```
This driver defaults to 0p2 for the Ninja Block. Use the driver 
config dialog to change the disk you want to monitor.

### Step 2 - restart process
sudo service ninjablock restart


## Notes
- Install instructions have not been tested
- This driver based on the ninja-diskspace driver by Paul Cull


## License
Copyright (c) 2013 Brian Call

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
