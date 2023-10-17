const { DynamoDB, AWSS3 } = require("../db/db");
const { v4: uuidv4 } = require('uuid');


const InsertCoursecategories = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0 && req.body.name.trim() !== "") {
    const Coursecategoryid = uuidv4().toString();
    let data = {
      pk: "COUERSECATEGORY",
      sk: Coursecategoryid,
      CourseCategory: req.body.name,
      Active: true,
    };
    console.log("DataGetted:");
    console.log(data);
    const params = {
      TableName: "mentorfoxdev",
      Item: data,
    };

    DynamoDB.put(params, (err) => {
      if (err) {
        // Handle the error case
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while adding the CourseCategory" });
      } else {
        // Send a success response
        res.status(200).json({ message: "CourseCategory Added successfully" });
      }
    });
  } else {
    res
      .status(412)
      .json({ msg: "precondition failed" });
  }

};

const GetCoursecategoriesByCourseId = async (req, res) => {
  if (req.params.Coursecategoryid.trim() !== "") {
    const Coursecategoryid = req.params.Coursecategoryid;
  const params = {
    TableName: "mentorfoxdev",
    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": "COUERSECATEGORY",
      ":sk": Coursecategoryid,
    },
  };
  console.log(params);
  try {
    const data = await DynamoDB.query(params).promise();
    console.log(params);
    if (data.Items && data.Items.length > 0) {
      res.status(200).json(data.Items);
    } else {
      res.status(404).json({ msg: "No matching data found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
  } else {
    res.status(412).json({ msg: "precondition failed" });

  }
  
};

const GetAllCoursecategories = async (req, res) => {
  const params = {
    TableName: "mentorfoxdev",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "COUERSECATEGORY",
    },
  };

  try {
    const data = await DynamoDB.query(params).promise();
    console.log(params);
    if (data.Items && data.Items.length > 0) {
      res.status(200).json(data.Items);
    } else {
      res.status(404).json({ msg: "No matching data found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};

const UpdateCoursecategories = async (req, res) => {
  if (req.body.Coursecategoryid.trim() !== "") {
    const Coursecategoryid = req.body.Coursecategoryid;
    let data = {
      pk: "COUERSECATEGORY",
      sk: Coursecategoryid,
      CourseCategory: req.body.name,
      Active: true,
    };
    console.log("DataGetted:");
    console.log(data);
    const params = {
      TableName: "mentorfoxdev",
      Item: data,
    };

    DynamoDB.put(params, (err) => {
      if (err) {
        // Handle the error case
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while updating the CourseCategory" });
      } else {
        // Send a success response
        res.status(200).json({ message: "CourseCategory updated successfully" });
      }
    });
  } else {
    res
      .status(412)
      .json({ msg: "precondition failed" });
  }

};

const DeleteCoursecategories = async (req, res) => {
  if (req.body.Coursecategoryid.trim() !== "") {
    const Coursecategoryid = req.body.Coursecategoryid;
    const ActiveStatus = false;
    const params = {
      TableName: "mentorfoxdev",
      Key: {
        pk: "COUERSECATEGORY",
        sk: Coursecategoryid,
      },
      UpdateExpression: "SET Active = :ActiveStatus",
      ExpressionAttributeValues: {
        ":ActiveStatus": ActiveStatus,
      },
      ReturnValues: "ALL_NEW",
    };
    console.log(params);
    try {
      const updatedItem = await DynamoDB.update(params).promise();
      res.status(200).json(updatedItem.Attributes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while Deleting the course category" });
    }
  } else {
    res
      .status(412)
      .json({ msg: "precondition failed" });
  }

};

module.exports = {
  InsertCoursecategories,
  GetCoursecategoriesByCourseId,
  GetAllCoursecategories,
  UpdateCoursecategories,
  DeleteCoursecategories,
};
