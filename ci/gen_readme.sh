#!/bin/bash
set -euo pipefail

# Reset README to template stub
cp ci/README.tpl.md README.md

for filename in *.jscad; do
	title=$(awk -F ':' '/title\s*:/{ print $2 }' "${filename}")
	rev=$(awk -F ':' '/revision\s*:/{ print $2 }' "${filename}")
	echo "| [\`${filename%%.jscad}.stl\`](${filename%%.jscad}.stl) | [\`${filename}\`](${filename}) | ${rev# *} | ${title# *} |" >>README.md
done
