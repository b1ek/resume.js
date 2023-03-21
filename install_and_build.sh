#!/bin/sh

yarn install

yarn run build

while true; do
		read -p "Do you want to copy dist to ../../public/static/dist? (Y/n): " yn
		case $yn in
				[Yy]* cp dist ../../public/static/dist; break;;
				[Nn]* break;;
				[]* ) cp dist ../../public/static/dist; break;;
				* ) echo "(Y/n)";;
		esac
done
