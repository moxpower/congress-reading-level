## Congress Reading Level

A tool to visualize the reading level of our distinguished representatives in Congress. Data from Sunlight Foundation's Capitol Words API, and reading level analysis done by the Priceonomics Analysis Engine API.

Made with Flask (Python), SQLAlchemy/SQLite, Angular, jQuery and Patrick Garvin's Map Generator (http://patrickgarvin.com/maps/USmap.htm).

#### Methodology
Using politician's bioguide IDs I took the last ~82,000 characters from politicians' speeches in Congress using Sunlight Foundation's Capitol Words API, and then ran them through Priceonomics Analysis Engine API's ReadingLevel test.  Although there are 5 unique indices returned, I used the composite index for calculations and display.  I removed backslashes from the speeches and had 17 politicians with zero results from the Capitol Words API.  I also removed and didn't use politicians whose reading level scores were negative (and there was one, Rep. Boost, that was especially low, albeit positive, that I didn't count).  In total, 21 politicians were excluded from display and calculations.

#### Screenshot
![alt tag](https://raw.githubusercontent.com/pfarnach/congress-reading-level/master/screenshot.png)
