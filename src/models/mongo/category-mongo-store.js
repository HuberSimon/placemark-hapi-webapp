import { Category } from "./category.js";
import { Placemark } from "./placemark.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoryById(id) {
    if (id) {
        const category = await Category.findOne({ _id: id }).lean();
        if (category) {
            return category;
        }
    }
    return null;
  },
  async getCategoryByName(name) {
    if (name) {
        const category = await Category.findOne({ name: name }).lean();
        if (category) {
            return category;
        }
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    const c = await this.getCategoryById(categoryObj._id);
    return c;
  },

  async incrementCategoryById(id) {
    if (id) {
        const category = await Category.findOne({ _id: id }).lean();
        if (category) {
            category.count += 1;
        }
    }
  },

  async decrementCategoryById(id) {
    if (id) {
        const category = await Category.findOne({ _id: id }).lean();
        if (category) {
            category.count -= 1;
            if (category.count === 0){
                await Category.deleteOne({ _id: id });
            }
        }
    }
  },

  async getUserCategories(userid) {
    const placemarks = await Placemark.find({userid: userid }).lean();
    const categoryIds = placemarks.map(placemark => placemark.categoryid);
    const categories = await Category.find({ _id: { $in: categoryIds } }).lean();
    return categories;
  },
};
