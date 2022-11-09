//Reference to MongoDB connection at ../db/client
const client = require("../db/client");

//outfitUtil Reference HERE
module.exports = class OutfitUtil {
  static async get(date) {
    try {
      const collection = client.db("wornout").collection("outfits");

      const filter = { last_worn: new Date(date) };

      const outfits = collection.find(filter).toArray();
      if (!outfits) return false;

      return outfits;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  static async getOne(outfitId) {
    try {
      const collection = client.db("wornout").collection("outfits");

      const filter = { _id: outfitId };

      const outfit = collection.find(filter).toArray();
      if (!outfit) return false;

      return outfit;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  static async saveOutfit(outfitData) {
    try {
      //inserts outfit Data

      outfitData.image_url = outfitData.image_url.trim();
      outfitData.label = outfitData.label.trim();
      outfitData.details = outfitData.details.trim();
      outfitData.last_worn = outfitData.last_worn.trim();
   

      const collection = client.db("wornout").collection("outfits");

      const response = await collection.insertOne(outfitData);

      if (!response) throw new Error("Error saving outfit");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteOutfit(outfitId) {
    try {
      // Connect to a collection using the client connection object created in ../db/client.js
      const collection = client.db("wornout").collection("outfits");

      // Use this collection to delete one user if the _id in Mongo matches the userId from request
      const response = await collection.deleteOne({
        _id: ObjectId(outfitId),
      });

      // Throw an error if there is no response
      if (!response) throw new Error("Error deleting outfit");

      // Return true if succeeded
      return true;
    } catch (error) {
      // Error thrown above will be shown here
      console.error(error);

      // Return false if failed
      return false;
    }
  }

  static async updateOne(outfitId, outfitData) {
    try {
      const collection = client.db("wornout").collection("outfits");

      const filter = { _id: ObjectId(outfitId) }; // pass in outfitId
// update the key 'label' with the new name from userData
      const updateDoc = {
        $set: {
          image_url: outfitData.image_url,
          label: outfitData.label,
          details:  outfitData.details, 
          last_worn: outfitData.last_worn,
        },
      };

      const response = await collection.updateOne(filter, updateDoc);

      if (!response) throw new Error("Error deleting outfit");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }






};