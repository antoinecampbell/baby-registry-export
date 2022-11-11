# baby-registry-export
Amazon does not have a feature to export the baby registry to a file,
so you have to manually click a button for each gift to display,
the contact information of the gift giver. There are also some animations
on the page that require some manual delays so Cypress functions properly.

This repo uses Cypress to:
- Login to Amazon
- Load the Thank you & Returns page which lists all purchased gifts
- Extract the gift, gift giver name, and address
- Write the contents to a csv file for easy tracking

# Setup
The following environment variables need to be set before running the test:
- AMAZON_EMAIL
- AMAZON_PASSWORD
- AMAZON_REGISTRY_ID
  - The registry id from the url e.g. https://www.amazon.com/baby-reg/thankyoulist?ref=ID-IS-HERE

Run one of the following commands to extract your baby registry:
```shell
yarn run cypress:open
yarn run cypress:run
```
