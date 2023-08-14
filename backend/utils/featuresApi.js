class FeaturesApi {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    let queryStringObject = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit", "keyword", "fields"];

    excludedFields.forEach((field) => delete queryStringObject[field]);

    let queryStr = JSON.stringify(queryStringObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery = this.mongooseQuery.find({
        $or: [
          {
            name: { $regex: this.queryString.keyword.trim(), $options: "i" },
          },
          {
            description: {
              $regex: this.queryString.keyword.trim(),
              $options: "i",
            },
          },
        ],
      });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  // async paginate() {
  //   let page = this.queryString.page * 1 || 1;
  //   let limit = this.queryString.limit * 1 || 4;
  //   let skip = (page - 1) * limit;

  //   const pagination = {};
  //   const documentsLength = await this.mongooseQuery.countDocuments();
  //   pagination.totalPages = Math.ceil(documentsLength / limit);

  //   // if (skip > 0) {
  //   //   pagination.previousPage = page - 1;
  //   // }
  //   // if (page * limit < documentsLength) {
  //   //   pagination.nextPage = page + 1;
  //   // }

  //   this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

  //   this.paginationResult = pagination;

  //   return this;
  // }

  async paginate() {
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 50;
    let skip = (page - 1) * limit;

    const countQuery = this.mongooseQuery.model.find(
      this.mongooseQuery.getQuery()
    );
    const queryObj = await countQuery;

    const filteredDocumentsCount = queryObj.length;

    const pagination = {};
    pagination.totalPages = Math.ceil(filteredDocumentsCount / limit);
    pagination.totalDocumentsCount = filteredDocumentsCount;
    pagination.filteredDocs = queryObj;

    if (skip > 0) {
      pagination.previousPage = page - 1;
    }
    if (page * limit < filteredDocumentsCount) {
      pagination.nextPage = page + 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;

    return this;
  }

  select() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }

    return this;
  }
}

module.exports = FeaturesApi;
