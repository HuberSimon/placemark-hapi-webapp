import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, blackForest, testPlacemarks } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {

  let user = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    blackForest.userid = user._id;
  });

  teardown(async () => {});

  test("get all categoryies", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
        testPlacemarks[i].userid = user._id;
        // eslint-disable-next-line no-await-in-loop
        await placemarkService.createPlacemark(testPlacemarks[i]);
      }
    const returnedCategories = await placemarkService.getAllCategories();
    assert.isNotNull(returnedCategories);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
        assertSubset(returnedCategories[i].name, testPlacemarks[i].categoryname);
    }
  });

  test("get category name from placemark", async () => {
    const returnedPlacemark = await placemarkService.createPlacemark(blackForest);
    const returnedCategory = await placemarkService.getCategory(returnedPlacemark.categoryid);
    assert.isNotNull(returnedCategory);
    assertSubset(blackForest.categoryname, returnedCategory.name);
  });
});
