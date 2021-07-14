'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(_id) {
    if (_id) {
      return this.model.findOne({ _id });
    }
    else {
      return this.model.find({});
    }
  }

  getSearch(search){
    console.log('title in collector', search)
    // currently exact match to complete string
    // wants to be a fuzzy search
    let results = this.model.find({$text:{$search:`${search}`}});
    
    return results;
  }

  create(record) {
    let newRecord = new this.model(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.model.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }

}

module.exports = DataCollection;