import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, blackForest, testPlacemarks, blackForestDetails } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Placemark API tests", () => {

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

  test("create placemark", async () => {
    const returnedPlacemark = await placemarkService.createPlacemark(blackForest);
    assert.isNotNull(returnedPlacemark);
    assertSubset(blackForest, returnedPlacemark);
  });

  test("delete a placemark", async () => {
    const placemark = await placemarkService.createPlacemark(blackForest);
    const response = await placemarkService.deletePlacemark(placemark._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlacemark = await placemarkService.getPlacemark(placemark.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });

  test("create multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      testPlacemarks[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(testPlacemarks[i]);
    }
    let returnedLists = await placemarkService.getAllPlacemarks();
    assert.equal(returnedLists.length, testPlacemarks.length);
    await placemarkService.deleteAllPlacemarks();
    returnedLists = await placemarkService.getAllPlacemarks();
    assert.equal(returnedLists.length, 0);
  });

  test("update placemark details", async () => {
    const placemark = await placemarkService.createPlacemark(blackForest);
    blackForestDetails._id = placemark._id;
    blackForestDetails.__v = placemark.__v;
    blackForestDetails.userid = placemark.userid;
    blackForestDetails.name = placemark.name;
    blackForestDetails.categoryid = placemark.categoryid;
    const updatedPlacemark = await placemarkService.updatePlacemark(placemark._id, blackForestDetails);
    assert.isNotNull(updatedPlacemark);
    assert.notEqual(null, updatedPlacemark.description);
    assert.notEqual(null, updatedPlacemark.image); 
    assert.notEqual(null, updatedPlacemark.location);
    assert.notEqual(null, updatedPlacemark.weather);

  });

  test("remove non-existant placemark", async () => {
    try {
      const response = await placemarkService.deletePlacemark("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });
});
