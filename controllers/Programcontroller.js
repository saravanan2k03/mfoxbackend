const { DynamoDB, AWSS3 } = require("../db/db");
const { v4: uuidv4 } = require('uuid');
const { FileUpload } = require('../controllers/uploadFile');

const InsertProgram = async (req, res) => {
  if (req.body && req.body.GreyProgramTitle.trim() !== "" && req.body.BlackProgramTitle.trim() !== "") {
    const Syllabus = await FileUpload(req.body.SyllabusFiledata, req.body.SyllabusFilename);
    const Thumbnail = await FileUpload(req.body.ThumbnailFiledata, req.body.ThumbnailFilename);
    const ProgramId = uuidv4().toString();
    if (Syllabus && Thumbnail != false) {
      let data = {
        pk: "PROGRAM#",
        sk: "PROGRAMCATEGORY#" + ProgramId,
        GreyProgramTitle: req.body.GreyProgramTitle,
        BlackProgramTitle: req.body.BlackProgramTitle,
        Format: req.body.Format,
        Price: req.body.Price,
        Duration: req.body.Duration,
        Syllabus: Syllabus,
        Thumbnail: Thumbnail,
        DescriptionAfterThumbnails: req.body.DescriptionAfterThumbnails,
        ProgramOutComeDescription: req.body.ProgramOutComeDescription,
        OutComes: req.body.OutComes,
        Description: req.body.Description,
        ProgramSteps: {},
        CertificationDescription: req.body.CertificationDescription,
        CertifacateImage: req.body.CertifacateImage,
        Faq: {},
        Active: true,
      };

      for (const key in req.body.ProgramSteps) {
        if (req.body.ProgramSteps.hasOwnProperty(key)) {
          const steps = {};
          for (const stepKey in req.body.ProgramSteps[key].steps) {
            if (req.body.ProgramSteps[key].steps.hasOwnProperty(stepKey)) {
              steps[stepKey] = req.body.ProgramSteps[key].steps[stepKey];
            }
          }
          data.ProgramSteps[key] = {
            Title: req.body.ProgramSteps[key].Title,
            steps: steps,
          };
        }
      }

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
          res.status(500).json({ error: "An error occurred while adding the Program" });
        } else {
          // Send a success response
          res.status(200).json({ message: "Program Added successfully" });
        }
      });
    }
  } else {
    res.status(412).json({ msg: "precondition failed" });

  }


};



const GetProgramByProgramId = async (req, res) => {
  if (req.params.ProgramId.trim() !== "") {
    const ProgramId = req.params.ProgramId;
    const params = {
      TableName: "mentorfoxdev",
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": "PROGRAM#",
        ":sk": "PROGRAMCATEGORY#" + ProgramId,
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


const GetAllProgram = async (req, res) => {
  if (req.params.program.trim() !== "") {
    const program = req.params.program;
    const params = {
      TableName: "mentorfoxdev",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": program + "#",
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
  } else {
    res.status(412).json({ msg: "precondition failed" });

  }

};

const UpdateProgram = async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    const ProgramId = req.body.ProgramId;
    if (req.body.Syllabus && req.body.Thumbnail != null || req.body.Syllabus && req.body.Thumbnail != "") {
      let data = {
        pk: "PROGRAM#",
        sk: "PROGRAMCATEGORY#" + ProgramId,
        GreyProgramTitle: req.body.GreyProgramTitle,
        BlackProgramTitle: req.body.BlackProgramTitle,
        Format: req.body.Format,
        Price: req.body.Price,
        Duration: req.body.Duration,
        // Syllabus: req.body.Syllabus,
        // Thumbnail: req.body.Thumbnail,
        DescriptionAfterThumbnails: req.body.DescriptionAfterThumbnails,
        ProgramOutComeDescription: req.body.ProgramOutComeDescription,
        OutComes: req.body.OutComes,
        Description: req.body.Description,
        ProgramSteps: {},
        CertificationDescription: req.body.CertificationDescription,
        CertifacateImage: req.body.CertifacateImage,
        Faq: {},
        Active: true,
      };

      for (const key in req.body.ProgramSteps) {
        if (req.body.ProgramSteps.hasOwnProperty(key)) {
          const steps = {};
          for (const stepKey in req.body.ProgramSteps[key].steps) {
            if (req.body.ProgramSteps[key].steps.hasOwnProperty(stepKey)) {
              steps[stepKey] = req.body.ProgramSteps[key].steps[stepKey];
            }
          }
          data.ProgramSteps[key] = {
            Title: req.body.ProgramSteps[key].Title,
            steps: steps,
          };
        }
      }

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
          res.status(500).json({ error: "An error occurred while Updating the Program" });
        } else {
          // Send a success response
          res.status(200).json({ message: "Program Updated successfully" });
        }
      });
    } else if (req.body.Syllabus != null || req.body.Syllabus != "") {
      let data = {
        pk: "PROGRAM#",
        sk: "PROGRAMCATEGORY#" + ProgramId,
        GreyProgramTitle: req.body.GreyProgramTitle,
        BlackProgramTitle: req.body.BlackProgramTitle,
        Format: req.body.Format,
        Price: req.body.Price,
        Duration: req.body.Duration,
        Syllabus: req.body.Syllabus,
        // Thumbnail: req.body.Thumbnail,
        DescriptionAfterThumbnails: req.body.DescriptionAfterThumbnails,
        ProgramOutComeDescription: req.body.ProgramOutComeDescription,
        OutComes: req.body.OutComes,
        Description: req.body.Description,
        ProgramSteps: {},
        CertificationDescription: req.body.CertificationDescription,
        CertifacateImage: req.body.CertifacateImage,
        Faq: {},
        Active: true,
      };

      for (const key in req.body.ProgramSteps) {
        if (req.body.ProgramSteps.hasOwnProperty(key)) {
          const steps = {};
          for (const stepKey in req.body.ProgramSteps[key].steps) {
            if (req.body.ProgramSteps[key].steps.hasOwnProperty(stepKey)) {
              steps[stepKey] = req.body.ProgramSteps[key].steps[stepKey];
            }
          }
          data.ProgramSteps[key] = {
            Title: req.body.ProgramSteps[key].Title,
            steps: steps,
          };
        }
      }

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
          res.status(500).json({ error: "An error occurred while Updating the Program" });
        } else {
          // Send a success response
          res.status(200).json({ message: "Program Updated successfully" });
        }
      });
    } else if (req.body.Thumbnail != null || req.body.Thumbnail != "") {
      let data = {
        pk: "PROGRAM#",
        sk: "PROGRAMCATEGORY#" + ProgramId,
        GreyProgramTitle: req.body.GreyProgramTitle,
        BlackProgramTitle: req.body.BlackProgramTitle,
        Format: req.body.Format,
        Price: req.body.Price,
        Duration: req.body.Duration,
        // Syllabus: req.body.Syllabus,
        Thumbnail: req.body.Thumbnail,
        DescriptionAfterThumbnails: req.body.DescriptionAfterThumbnails,
        ProgramOutComeDescription: req.body.ProgramOutComeDescription,
        OutComes: req.body.OutComes,
        Description: req.body.Description,
        ProgramSteps: {},
        CertificationDescription: req.body.CertificationDescription,
        CertifacateImage: req.body.CertifacateImage,
        Faq: {},
        Active: true,
      };

      for (const key in req.body.ProgramSteps) {
        if (req.body.ProgramSteps.hasOwnProperty(key)) {
          const steps = {};
          for (const stepKey in req.body.ProgramSteps[key].steps) {
            if (req.body.ProgramSteps[key].steps.hasOwnProperty(stepKey)) {
              steps[stepKey] = req.body.ProgramSteps[key].steps[stepKey];
            }
          }
          data.ProgramSteps[key] = {
            Title: req.body.ProgramSteps[key].Title,
            steps: steps,
          };
        }
      }

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
          res.status(500).json({ error: "An error occurred while Updating the Program" });
        } else {
          // Send a success response
          res.status(200).json({ message: "Program Updated successfully" });
        }
      });
    }
  } else {
    res.status(412).json({ msg: "precondition failed" });

  }

};

const DeleteProgram = async (req, res) => {
  if (req.body.ProgramId.trim() !== "") {
    const ProgramId = req.body.ProgramId;
    const ActiveStatus = false;
    const params = {
      TableName: "mentorfoxdev",
      Key: {
        pk: "COURSE#",
        sk: "COURSECATEGORY#" + ProgramId,
      },
      UpdateExpression: "SET Active = :Active",
      ExpressionAttributeValues: {
        ":Active": ActiveStatus,
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
        .json({ error: "An error occurred while deleting the Program" });
    }
  } else {
    res
    .status(412)
    .json({ msg: "precondition failed" });
  }

};


module.exports = { InsertProgram, GetProgramByProgramId, GetAllProgram, UpdateProgram, DeleteProgram };