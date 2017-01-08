
# Get present working directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Testing data fetching:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50&offset=3"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50&offset=3&order=statetax&reverse=DESC&ward=10"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50&offset=3&order=statetax&reverse=DESC&ward=10&sect=120"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50&offset=3&order=statetax&reverse=DESC&councildistrict=10"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50&offset=3&order=statetax&reverse=DESC&councildistrict=10&ward=25"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50&offset=3&order=statetax&reverse=DESC&councildistrict=10&ward=25&sect=120"

# No data because coun distr does not match sect and ward
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=50&offset=3&order=statetax&reverse=DESC&councildistrict=10&ward=25&sect=121"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?search=Russell"
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?search=Russell&idlookup=0841%20001"


# Testing chart properties:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=25&chartwidth=400&chartheight=800"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=25&chartwidth=400&chartheight=800&charttype=pie2d"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=25&chartwidth=400&chartheight=800&charttype=pie3d"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=25&chartwidth=400&chartheight=800&charttype=bar2d&chartlabel=propertyid"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=25&chartwidth=400&chartheight=800&charttype=bar2d&chartlabel=propertyid"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome "file://${DIR}/index.html?limit=25&chartwidth=400&chartheight=800&charttype=bar2d&chartlabel=propertyid&chartvalue=amountdue"