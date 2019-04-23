#### To launch the project, just run `npm install` and then `npm start`

Features

First all my manual data are in two files a)secondExpandedField-DATA.js and b)firstExpandedFieldData.js

1> Select **"Matching All of the following"** > 1-st Drowdown select "Within a Country or Region" it will show you 34 Subscribers, but as soon as you select a specific Country from the second dropdown, you will see 1 Subscriber

2> If you select **'Custom Field'** in the you will see the 4-th dropdown getting visible

3> If you select **Subscription Date** in the 1st-Dropdown then the third field will be changed to a Date-Picker

4> If in the 1-st dropdown you select **'Subscribed to'** and the Second dropdown you select **'Products'** the third field becomes an type-ahead Autocompletion field, where you can start typing and the relevant matching list will gradually get filtered.

#### Some additional design I have implemented

1> A side drawer which a can show a list of different modules/sections
2> A NotFound / 404 page if you nevigate to anywhere other than the root route.

### The Component structure in this project withing the ./src/Components/Subscriber directory

SubscriberList.js is the Parent Component and its child is AddNewSubscriberSegment.js. whose chld in turn is AddFilterExpansionPanel.js .
