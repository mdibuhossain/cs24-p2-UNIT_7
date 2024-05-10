import { Router } from "express";
import { ContractorController } from "../controllers/contractor.controller.js";

const contractorRouter = Router();

contractorRouter.get(`/collection-plan`, ContractorController.getCollectionPlans);
contractorRouter.post("/collection-plan", ContractorController.createCollectionPlan);
contractorRouter.delete("/collection-plan/:id", ContractorController.deleteCollectionPlan);
contractorRouter.post("/", ContractorController.registerContractor);
contractorRouter.get("/", ContractorController.getContractors);
contractorRouter.get("/:cid", ContractorController.getSingleContractor);
contractorRouter.put("/managers", ContractorController.assignManager);


export default contractorRouter;
