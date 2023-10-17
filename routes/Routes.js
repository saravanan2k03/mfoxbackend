var router = require("express").Router();
const cors = require('cors');
const {InsertCoursecategories, GetCoursecategoriesByCourseId,GetAllCoursecategories,UpdateCoursecategories,DeleteCoursecategories} = require("../controllers/CourseCatecontroller");
const {InsertProgramcategories, GetProgramcategoriesByProgramId,GetAllProgramcategories,UpdateProgramcategories,DeleteProgramcategories} = require("../controllers/ProgramCatecontroller");
const {InsertCourses, GetCourseByCourseId,GetAllCourses,UpdateCourses,DeleteCourses} = require("../controllers/Coursecontroller");
const {InsertProgram, GetProgramByProgramId,GetAllProgram,UpdateProgram, DeleteProgram} = require("../controllers/Programcontroller");

//getAllCourseCategories
router.route("/api/v1/coursecategories").post(InsertCoursecategories);
router.route("/api/v1/coursecategories/:Coursecategoryid").get(GetCoursecategoriesByCourseId);
router.route("/api/v1/coursecategories").get(GetAllCoursecategories);
router.route("/api/v1/coursecategories").put(UpdateCoursecategories);
router.route("/api/v1/coursecategories").delete(DeleteCoursecategories);


//getAllProgramCategories
router.route("/api/v1/productcategories").post(InsertProgramcategories);
router.route("/api/v1/productcategories/:Programcategoryid").get(GetProgramcategoriesByProgramId);
router.route("/api/v1/productcategories/").get(GetAllProgramcategories);
router.route("/api/v1/productcategories").put(UpdateProgramcategories);
router.route("/api/v1/productcategories").delete(DeleteProgramcategories);


//getAllCourse
router.route("/api/v1/courses").post(InsertCourses);
router.route("/api/v1/courses/:courseId").get( GetCourseByCourseId);
router.route("/api/v1/courses/coursecategories/:course").get(GetAllCourses);
router.route("/api/v1/courses").put(UpdateCourses);
router.route("/api/v1/courses").delete(DeleteCourses);

//getAllProduct
router.route("/api/v1/program").post(InsertProgram);
router.route("/api/v1/program/:programId").get(GetProgramByProgramId);
router.route("/api/v1/program/productcategories/program").get(GetAllProgram);
router.route("/api/v1/program").put(UpdateProgram);
router.route("/api/v1/program").delete(DeleteProgram);



module.exports = router;




