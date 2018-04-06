#!/bin/bash
#
# Author: Luca Vallerini
# Email: lucavall90@gmail.com
# Last update: 2016-03-13

udev_android="/etc/udev/rules.d/51-android.rules"

device_name_n5="Nexus 5"
device_code_n5="hammerhead"
device_udev_n5="SUBSYSTEM==\"usb\", ATTR{idVendor}==\"18d1\", MODE=\"0666\", GROUP=\"plugdev\""

init_dir=$(pwd)
recovery_dir="$HOME/Android/$device_name_n5/Recovery/"
root_dir="$HOME/Android/$device_name_n5/Root/"

# Function that checks if the necessary dependencies are installed
check_dependencies() {
	for name in adb fastboot md5sum ; do
		if type "$name" >/dev/null 2>&1 ; then
			return 0
		fi
	done
	return 1
}

# Check dependencies
if ! check_dependencies ; then
	echo >&2 "Neither adb, fastboot or md5sum are installed or PATH is not properly configured. Quitting."
	exit 1
fi

# Function that check whether Android devices have sufficient permissions or not
check_permissions() {
	if [ -e "$udev_android" ] && grep -q "$device_udev_n5" $udev_android ; then
		return 0
	else
		return 1
	fi
}

# If the permissions check fails, add a rules in udev
if ! check_permissions ; then
	echo "To grant permissions to the device a small part of the script needs to run with root priviliges."
	sudo bash <<- "EOF"
	echo "# "$device_name_n5 >> $udev_android
	echo $device_udev_n5 >> $udev_android
	udevadm control --reload-rules
	EOF
fi

# MD5 check
# echo "Integrity check of the factory image..."

# Extract files in a sub-directory named tmp
# echo "Extracting files from the factory image..."
# tar -xf hammerhead-*.tgz
# cd hammerhead-*
# unzip image-*.zip

# Plug in a device to continue.
# echo "Plug in your device to PC and press ENTER to continue.\n"

# Check if there is a SuperSU file(s)
# ready to be flashed, otherwise push it.
# echo "Keep read-only /system, flash SuperSU, wipe Davilk/cache and reboot."

# Remove all temporary files (not the factory image)
# rm -rf hammerhead-*/

