import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { testPlacemarks, blackForest } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.placemarksStore.deleteAllPlacemarks();
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarksStore.addPlacemark(testPlacemarks[i]);
    }
  });

  test("create a placemark", async () => {
    const placemark = await db.placemarksStore.addPlacemark(blackForest);
    assertSubset(blackForest, placemark);
    assert.isDefined(placemark._id);
  });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await db.placemarksStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 3);
    await db.placemarksStore.deleteAllPlacemarks();
    returnedPlacemarks = await db.placemarksStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const placemark = await db.placemarksStore.addPlacemark(blackForest);
    const returnedPlacemark = await db.placemarksStore.getPlacemarkById(placemark._id);
    assertSubset(blackForest, placemark);
  });

  test("delete One Placemark - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarksStore.deletePlacemarkById(id);
    const returnedPlacemarks = await db.placemarksStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarksStore.getPlacemarkById(id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarksStore.getPlacemarkById(""));
    assert.isNull(await db.placemarksStore.getPlacemarkById());
  });

  test("delete One Placemark - fail", async () => {
    await db.placemarksStore.deletePlacemarkById("bad-id");
    const allPlacemarks = await db.placemarksStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, allPlacemarks.length);
  });
});

EventEmitter.setMaxListeners(25);