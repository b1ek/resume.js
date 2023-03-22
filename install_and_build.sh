#!/bin/sh

yarn install

yarn run build

while true; do
	read -p "Do you want to copy dist to ../../public/static? (type n for no): " answer
	if [ $answer = 'n' ] || [ $answer = 'N' ]; then exit 0; fi
	cp dist ../../public/static
done
